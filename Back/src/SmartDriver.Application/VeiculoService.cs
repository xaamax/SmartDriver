using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using SmartDriver.Application.Contracts;
using SmartDriver.Application.Dtos;
using SmartDriver.Domain;
using SmartDriver.Persistence.Contracts;

namespace SmartDriver.Application
{
    public class VeiculoService : iVeiculoService
    {
        private readonly iGeralPersist _geralPersist;
        private readonly IMapper _mapper;
        private readonly iVeiculoPersist _veiculoPersist;
        public VeiculoService(iGeralPersist geralPersist,
                              iVeiculoPersist veiculoPersist,
                              IMapper mapper)
                              
        {
            _veiculoPersist = veiculoPersist;
            _geralPersist = geralPersist;
            _mapper = mapper;
        }

    public async Task<VeiculoDto> AddVeiculos(VeiculoDto model)
    {
        try
        {
            var veiculo = _mapper.Map<Veiculo>(model);

            _geralPersist.Add<Veiculo>(veiculo);
            if (await _geralPersist.SaveChangesAsync())
            {
                var res = await _veiculoPersist.GetVeiculoByPlacaAsync(model.placa);
                return _mapper.Map<VeiculoDto>(res);
            }
            return null;
        }
        catch (Exception err)
        {
            throw new Exception(err.Message);
        }
    }


    public async Task<VeiculoDto> UpdateVeiculos(string placa, VeiculoDto model)
    {
        try
        {
            var veiculo = await _veiculoPersist.GetVeiculoByPlacaAsync(placa);
            if (veiculo == null) return null;

            model.placa = veiculo.placa;
            _mapper.Map(model, veiculo);
            _geralPersist.Update<Veiculo>(veiculo);
            if (await _geralPersist.SaveChangesAsync())
            {
                var res = await _veiculoPersist.GetVeiculoByPlacaAsync(model.placa);
                return _mapper.Map<VeiculoDto>(res);
            }
            return null;
        }
        catch (Exception err)
        {

            throw new Exception(err.Message);
        }
    }
    public async Task<bool> DeleteVeiculos(string veiculoplaca)
    {
        try
        {
            var veiculo = await _veiculoPersist.GetVeiculoByPlacaAsync(veiculoplaca);
            if (veiculo == null) throw new Exception("Veículo não foi encontrado.");

            _geralPersist.Delete<Veiculo>(veiculo);
            return await _geralPersist.SaveChangesAsync();
        }
        catch (Exception err)
        {

            throw new Exception(err.Message);
        }
    }

    public async Task<VeiculoDto[]> GetAllVeiculosAsync(string dpto, string uf)
    {
        try
        {
            var veiculos = await _veiculoPersist.GetAllVeiculosAsync(dpto, uf);
            if (veiculos == null) return null;
            var res = _mapper.Map<VeiculoDto[]>(veiculos);
            return res;
        }
        catch (Exception err)
        {

            throw new Exception(err.Message);
        }
    }

    public async Task<VeiculoDto[]> GetAllVeiculosByModeloAsync(string modelo)
    {
        try
        {
            var veiculos = await _veiculoPersist.GetAllVeiculosByModeloAsync(modelo);
            if (veiculos == null) return null;
            var res = _mapper.Map<VeiculoDto[]>(veiculos);
            return res;
        }
        catch (Exception err)
        {

            throw new Exception(err.Message);
        }
    }

    public async Task<VeiculoDto> GetVeiculoByPlacaAsync(string placa)
    {
        try
        {
            var veiculo = await _veiculoPersist.GetVeiculoByPlacaAsync(placa);
            if (veiculo == null) return null;
            var res = _mapper.Map<VeiculoDto>(veiculo);
            return res;
        }
        catch (Exception err)
        {

            throw new Exception(err.Message);
        }
    }
}
}