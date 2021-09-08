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
    public class VeiculosController : ControllerBase
    {
        private readonly iVeiculoService _veiculoService;
        public VeiculosController(iVeiculoService veiculoService)
        {
            _veiculoService = veiculoService;

        }

        [HttpGet("dpto/{dpto}/uf/{uf}")]
        public async Task<IActionResult> Get(string dpto, string uf)
        {
            try
            {
                var veiculos = await _veiculoService.GetAllVeiculosAsync(dpto, uf);
                if (veiculos == null) return NoContent();
                return Ok(veiculos);
            }
            catch (Exception err)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao recuperar Veículos. Erro: {err.Message}");
            }
        }

        [HttpGet("{placa}")]
        public async Task<IActionResult> GetByPlaca(string placa)
        {
            try
            {
                var veiculo = await _veiculoService.GetVeiculoByPlacaAsync(placa);
                if (veiculo == null) return NoContent();
                return Ok(veiculo);
            }
            catch (Exception err)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao recuperar Veículo. Erro: {err.Message}");
            }
        }

        [HttpGet("{modelo}/modelo")]
        public async Task<IActionResult> GetByModelo(string modelo)
        {
            try
            {
                var veiculos = await _veiculoService.GetAllVeiculosByModeloAsync(modelo);
                if (veiculos == null) return NoContent();
                return Ok(veiculos);
            }
            catch (Exception err)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao recuperar Veículos. Erro: {err.Message}");
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post(VeiculoDto model)
        {
            try
            {
                var veiculo = await _veiculoService.AddVeiculos(model);
                if (veiculo == null) return NoContent();
                return Ok(veiculo);
            }
            catch (Exception err)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao adicionar Veículo. Erro: {err.Message}");
            }
        }

        [HttpPut("{placa}")]
        public async Task<IActionResult> Put(string placa, VeiculoDto model)
        {
            try
            {
                var veiculo = await _veiculoService.UpdateVeiculos(placa, model);
                if (veiculo == null) return NoContent();
                return Ok(veiculo);
            }
            catch (Exception err)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao atualizar Veículo. Erro: {err.Message}");
            }
        }

        [HttpDelete("{placa}")]
        public async Task<IActionResult> Delete(string placa)
        {
            try
            {
                var veiculo = await _veiculoService.GetVeiculoByPlacaAsync(placa);
                if (veiculo == null) return NoContent();

                return await _veiculoService.DeleteVeiculos(placa) 
                        ? Ok(new { msg = "Deletado" }) 
                        : throw new Exception("Ocorreu um problema ao tentar excluir o Veículo.");
            }
            catch (Exception err)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao deletar Veículo. Erro: {err.Message}");
            }
        }
    }
}