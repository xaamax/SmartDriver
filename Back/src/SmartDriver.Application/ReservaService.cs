using System;
using System.Threading.Tasks;
using AutoMapper;
using SmartDriver.Application.Contracts;
using SmartDriver.Application.Dtos;
using SmartDriver.Domain;
using SmartDriver.Persistence.Contracts;

namespace SmartDriver.Application
{
    public class ReservaService : iReservaService
    {
        private readonly iGeralPersist _geralPersist;
        private readonly IMapper _mapper;
        private readonly iReservaPersist _reservaPersist;
        public ReservaService(iGeralPersist geralPersist,
                              iReservaPersist reservaPersist,
                              IMapper mapper)
                              
        {
            _reservaPersist = reservaPersist;
            _geralPersist = geralPersist;
            _mapper = mapper;
        }

    public async Task<ReservaDto> AddReservas(ReservaDto model)
    {
        try
        {
            var reserva = _mapper.Map<Reserva>(model);
            _geralPersist.Add<Reserva>(reserva);
            if (await _geralPersist.SaveChangesAsync())
            {
                var res = await _reservaPersist.GetReservaByIdAsync(model.num);
                return _mapper.Map<ReservaDto>(res);
            }
            return null;
        }
        catch (Exception err)
        {
            throw new Exception(err.Message);
        }
    }


    public async Task<ReservaDto> UpdateReservas(int reservaId, ReservaDto model)
    {
        try
        {
            var reserva = await _reservaPersist.GetReservaByIdAsync(reservaId);
            if (reserva == null) return null;
            model.num = reserva.num;
            _mapper.Map(model, reserva);
            _geralPersist.Update<Reserva>(reserva);
            if (await _geralPersist.SaveChangesAsync())     
            {
                var res = await _reservaPersist.GetReservaByIdAsync(reserva.num);
                return _mapper.Map<ReservaDto>(res);
            }
            return null;
        }
        catch (Exception err)
        {
            throw new Exception(err.Message);
        }
    }
    public async Task<bool> DeleteReservas(int id)
    {
        try
        {
            var reserva = await _reservaPersist.GetReservaByIdAsync(id);
            if (reserva == null) throw new Exception("Reserva não foi encontrada.");

            _geralPersist.Delete<Reserva>(reserva);
            return await _geralPersist.SaveChangesAsync();
        }
        catch (Exception err)
        {

            throw new Exception(err.Message);
        }
    }

    public async Task<ReservaDto[]> GetAllReservasAsync(string dpto, string uf)
    {
        try
        {
            var reservas = await _reservaPersist.GetAllReservasAsync(dpto, uf);
            if (reservas == null) return null;
            var res = _mapper.Map<ReservaDto[]>(reservas);
            return res;
        }
        catch (Exception err)
        {

            throw new Exception(err.Message);
        }
    }

    public async Task<ReservaDto> GetReservaByIdAsync(int reservaId, bool dadosCondutorVeiculo = false)
    {
        try
        {
            var reserva = await _reservaPersist.GetReservaByIdAsync(reservaId, dadosCondutorVeiculo);
            if (reserva == null) return null;
            var res = _mapper.Map<ReservaDto>(reserva);
            return res;
        }
        catch (Exception err)
        {

            throw new Exception(err.Message);
        }
    }
}
}