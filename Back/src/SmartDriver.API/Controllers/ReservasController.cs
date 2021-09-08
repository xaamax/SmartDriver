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
    public class ReservasController : ControllerBase
    {
        private readonly iReservaService _reservaService;
        private readonly IMapper _mapper;
        public ReservasController(iReservaService reservaService, IMapper mapper)
        {
            _mapper = mapper;
            _reservaService = reservaService;

        }

        [HttpGet("dpto/{dpto}/uf/{uf}")]
        public async Task<IActionResult> Get(string dpto, string uf)
        {
            try
            {
                var reservas = await _reservaService.GetAllReservasAsync(dpto, uf);
                if (reservas == null) return NoContent();
                var res = _mapper.Map<ReservaDto[]>(reservas);
                return Ok(res);
            }
            catch (Exception err)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao recuperar Reservas. Erro: {err.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var Reserva = await _reservaService.GetReservaByIdAsync(id, true);
                if (Reserva == null) return NoContent();
                return Ok(Reserva);
            }
            catch (Exception err)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao recuperar Reserva. Erro: {err.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(ReservaDto model)
        {
            try
            {
                var Reserva = await _reservaService.AddReservas(model);
                if (Reserva == null) return NoContent();
                return Ok(Reserva);
            }
            catch (Exception err)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao adicionar Reserva. Erro: {err.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, ReservaDto model)
        {
            try
            {
                var Reserva = await _reservaService.UpdateReservas(id, model);
                if (Reserva == null) return NoContent();
                return Ok(Reserva);
            }
            catch (Exception err)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao alterar Reserva. Erro: {err.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var Reserva = await _reservaService.GetReservaByIdAsync(id);
                if (Reserva == null) return NoContent();

                return await _reservaService.DeleteReservas(id) 
                        ? Ok(new { msg = "Deletado" }) 
                        : throw new Exception("Ocorreu um problema ao tentar excluir o Reserva.");
            }
            catch (Exception err)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao deletar Reserva. Erro: {err.Message}");
            }
        }
    }
}