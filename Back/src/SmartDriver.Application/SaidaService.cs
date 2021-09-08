using System;
using System.Threading.Tasks;
using AutoMapper;
using SmartDriver.Application.Contracts;
using SmartDriver.Application.Dtos;
using SmartDriver.Domain;
using SmartDriver.Persistence.Contracts;

namespace SmartDriver.Application
{
    public class SaidaService : iSaidaService
    {
        private readonly iGeralPersist _geralPersist;
        private readonly IMapper _mapper;
        private readonly iSaidaPersist _saidaPersist;
        public SaidaService(iGeralPersist geralPersist,
                              iSaidaPersist saidaPersist,
                              IMapper mapper)
                              
        {
            _saidaPersist = saidaPersist;
            _geralPersist = geralPersist;
            _mapper = mapper;
        }

    public async Task<SaidaDto> AddSaidas(SaidaDto model)
    {
        try
        {
            var saida = _mapper.Map<Saida>(model);
            _geralPersist.Add<Saida>(saida);
            if (await _geralPersist.SaveChangesAsync())
            {
                var res = await _saidaPersist.GetSaidaByIdAsync(model.id);
                return _mapper.Map<SaidaDto>(res);
            }
            return null;
        }
        catch (Exception err)
        {
            throw new Exception(err.Message);
        }
    }


    public async Task<SaidaDto> UpdateSaidas(int saidaId, SaidaDto model)
    {
        try
        {
            var saida = await _saidaPersist.GetSaidaByIdAsync(saidaId);
            if (saida == null) return null;
            model.id = saida.id;
            _mapper.Map(model, saida);
            _geralPersist.Update<Saida>(saida);
            if (await _geralPersist.SaveChangesAsync())     
            {
                var res = await _saidaPersist.GetSaidaByIdAsync(saida.id);
                return _mapper.Map<SaidaDto>(res);
            }
            return null;
        }
        catch (Exception err)
        {
            throw new Exception(err.Message);
        }
    }
    public async Task<bool> DeleteSaidas(int id)
    {
        try
        {
            var saida = await _saidaPersist.GetSaidaByIdAsync(id);
            if (saida == null) throw new Exception("Saída não foi encontrada.");

            _geralPersist.Delete<Saida>(saida);
            return await _geralPersist.SaveChangesAsync();
        }
        catch (Exception err)
        {

            throw new Exception(err.Message);
        }
    }

    public async Task<SaidaDto[]> GetAllSaidasAsync(string dpto, string uf)
    {
        try
        {
            var saidas = await _saidaPersist.GetAllSaidasAsync(dpto, uf);
            if (saidas == null) return null;
            var res = _mapper.Map<SaidaDto[]>(saidas);
            return res;
        }
        catch (Exception err)
        {

            throw new Exception(err.Message);
        }
    }

    public async Task<SaidaDto> GetSaidaByIdAsync(int saidaId, bool dadosCondutorVeiculo = false)
    {
        try
        {
            var saida = await _saidaPersist.GetSaidaByIdAsync(saidaId, dadosCondutorVeiculo);
            if (saida == null) return null;
            var res = _mapper.Map<SaidaDto>(saida);
            return res;
        }
        catch (Exception err)
        {

            throw new Exception(err.Message);
        }
    }
}
}