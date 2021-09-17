using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartDriver.Application.Contracts;
using SmartDriver.Application.Dtos;

namespace SmartDriver.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AbastecimentosController : ControllerBase
    {
        private readonly iAbastecimentoService _abastecimentoService;
        public AbastecimentosController(iAbastecimentoService abastecimentoService)
        {
            _abastecimentoService = abastecimentoService;

        }

        [HttpGet("{placa}/placa")]
        public async Task<IActionResult> Get(string placa)
        {
            try
            {
                var abastecimentos = await _abastecimentoService.GetAllAbastecimentosAsync(placa, true);
                if (abastecimentos == null) return NoContent();
                return Ok(abastecimentos);
            }
            catch (Exception err)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao recuperar Abastecimentos. Erro: {err.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var abastecimento = await _abastecimentoService.GetAbastecimentoByIdAsync(id);
                if (abastecimento == null) return NoContent();
                return Ok(abastecimento);
            }
            catch (Exception err)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao recuperar Abastecimento. Erro: {err.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(AbastecimentoDto model)
        {
            try
            {
                var abastecimento = await _abastecimentoService.AddAbastecimentos(model);
                if (abastecimento == null) return NoContent();
                return Ok(abastecimento);
            }
            catch (Exception err)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao adicionar Abastecimento. Erro: {err.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, AbastecimentoDto model)
        {
            try
            {
                var abastecimento = await _abastecimentoService.UpdateAbastecimentos(id, model);
                if (abastecimento == null) return NoContent();
                return Ok(abastecimento);
            }
            catch (Exception err)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao atualizar Abastecimento. Erro: {err.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var veiculo = await _abastecimentoService.GetAbastecimentoByIdAsync(id);
                if (veiculo == null) return NoContent();

                return await _abastecimentoService.DeleteAbastecimentos(id) 
                        ? Ok(new { msg = "Deletado" }) 
                        : throw new Exception("Ocorreu um problema ao tentar excluir o Abastecimento.");
            }
            catch (Exception err)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao deletar Abastecimento. Erro: {err.Message}");
            }
        }
    }
}