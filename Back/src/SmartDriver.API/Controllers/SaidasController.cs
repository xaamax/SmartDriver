using System;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartDriver.Application.Contracts;
using SmartDriver.Application.Dtos;

namespace SmartDriver.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SaidasController : ControllerBase
    {
        private readonly iSaidaService _saidaService;
        private readonly IMapper _mapper;
        public SaidasController(iSaidaService saidaService, IMapper mapper)
        {
            _mapper = mapper;
            _saidaService = saidaService;

        }

        [HttpPost("upload")]
        public async Task<IActionResult> upload()
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources","Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if(file.Length > 0)
                {
                    var filename = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName;
                    var fullPath = Path.Combine(pathToSave, filename.Replace("\""," ").Trim());
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                }

                return Ok();
            }
            catch (Exception err)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao recuperar Saídas. Erro: {err.Message}");
            }
            return BadRequest("Erro ao tentar carregar imagem.");
        }

        [HttpGet("dpto/{dpto}/uf/{uf}")]
        public async Task<IActionResult> Get(string dpto, string uf)
        {
            try
            {
                var saidas = await _saidaService.GetAllSaidasAsync(dpto, uf);
                if (saidas == null) return NoContent();
                var res = _mapper.Map<SaidaDto[]>(saidas);
                return Ok(res);
            }
            catch (Exception err)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao recuperar Saídas. Erro: {err.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var saida = await _saidaService.GetSaidaByIdAsync(id, true);
                if (saida == null) return NoContent();
                return Ok(saida);
            }
            catch (Exception err)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao recuperar Saída. Erro: {err.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(SaidaDto model)
        {
            try
            {
                var saida = await _saidaService.AddSaidas(model);
                if (saida == null) return NoContent();
                return Ok(saida);
            }
            catch (Exception err)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao adicionar Saída. Erro: {err.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, SaidaDto model)
        {
            try
            {
                var saida = await _saidaService.UpdateSaidas(id, model);
                if (saida == null) return NoContent();
                return Ok(saida);
            }
            catch (Exception err)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao alterar Saída. Erro: {err.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var saida = await _saidaService.GetSaidaByIdAsync(id);
                if (saida == null) return NoContent();

                return await _saidaService.DeleteSaidas(id) 
                        ? Ok(new { msg = "Deletado" }) 
                        : throw new Exception("Ocorreu um problema ao tentar excluir o Saída.");
            }
            catch (Exception err)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao deletar Saída. Erro: {err.Message}");
            }
        }
    }
}