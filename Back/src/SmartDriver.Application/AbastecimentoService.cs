using System;
using System.Threading.Tasks;
using AutoMapper;
using SmartDriver.Application.Contracts;
using SmartDriver.Application.Dtos;
using SmartDriver.Domain;
using SmartDriver.Persistence.Contracts;

namespace SmartDriver.Application
{
    public class AbastecimentoService : iAbastecimentoService
    {
        private readonly iGeralPersist _geralPersist;
        private readonly IMapper _mapper;
        private readonly iAbastecimentoPersist _abastecimentoPersist;
        public AbastecimentoService(iGeralPersist geralPersist,
                                    iAbastecimentoPersist abastecimentoPersist,
                                    IMapper mapper)

        {
            _abastecimentoPersist = abastecimentoPersist;
            _geralPersist = geralPersist;
            _mapper = mapper;
        }

        public async Task<AbastecimentoDto> AddAbastecimentos(AbastecimentoDto model)
        {
            try
            {
                var abastecimento = _mapper.Map<Abastecimento>(model);

                _geralPersist.Add<Abastecimento>(abastecimento);
                if (await _geralPersist.SaveChangesAsync())
                {
                    var res = await _abastecimentoPersist.GetAbastecimentoByIdAsync(model.id);
                    return _mapper.Map<AbastecimentoDto>(res);
                }
                return null;
            }
            catch (Exception err)
            {
                throw new Exception(err.Message);
            }
        }

        public async Task<AbastecimentoDto> UpdateAbastecimentos(int id, AbastecimentoDto model)
        {
            try
            {
                var abastecimento = await _abastecimentoPersist.GetAbastecimentoByIdAsync(id);
                if (abastecimento == null) return null;

                model.id = abastecimento.id;
                _mapper.Map(model, abastecimento);
                _geralPersist.Update<Abastecimento>(abastecimento);
                if (await _geralPersist.SaveChangesAsync())
                {
                    var res = await _abastecimentoPersist.GetAbastecimentoByIdAsync(model.id);
                    return _mapper.Map<AbastecimentoDto>(res);
                }
                return null;
            }
            catch (Exception err)
            {

                throw new Exception(err.Message);
            }
        }

        public async Task<bool> DeleteAbastecimentos(int id)
        {
            try
            {
                var abastecimento = await _abastecimentoPersist.GetAbastecimentoByIdAsync(id);
                if (abastecimento == null) throw new Exception("Abastecimento não foi encontrado.");

                _geralPersist.Delete<Abastecimento>(abastecimento);
                return await _geralPersist.SaveChangesAsync();
            }
            catch (Exception err)
            {

                throw new Exception(err.Message);
            }
        }

        public async Task<AbastecimentoDto[]> GetAllAbastecimentosAsync(string placa, bool dadoscondutor = false)
        {
            try
            {
                var abastecimentos = await _abastecimentoPersist.GetAllAbastecimentosAsync(placa, true);
                if (abastecimentos == null) return null;
                var res = _mapper.Map<AbastecimentoDto[]>(abastecimentos);
                return res;
            }
            catch (Exception err)
            {

                throw new Exception(err.Message);
            }
        }

        public async Task<AbastecimentoDto> GetAbastecimentoByIdAsync(int id)
        {
            try
            {
                var abastecimento = await _abastecimentoPersist.GetAbastecimentoByIdAsync(id);
                if (abastecimento == null) return null;
                var res = _mapper.Map<AbastecimentoDto>(abastecimento);
                return res;
            }
            catch (Exception err)
            {
                throw new Exception(err.Message);
            }
        }
    }
}