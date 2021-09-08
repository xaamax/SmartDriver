using System.Threading.Tasks;
using SmartDriver.Application.Dtos;

namespace SmartDriver.Application.Contracts
{
    public interface iSaidaService
    {
        Task<SaidaDto> AddSaidas(SaidaDto model);
        Task<SaidaDto> UpdateSaidas(int id, SaidaDto model);
        Task<bool> DeleteSaidas(int id);
        Task<SaidaDto[]> GetAllSaidasAsync(string dpto, string uf);
        Task<SaidaDto> GetSaidaByIdAsync(int id, bool dadosCondutorVeiculo = false);
    }
}