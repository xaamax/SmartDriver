using System.Threading.Tasks;
using SmartDriver.Application.Dtos;

namespace SmartDriver.Application.Contracts
{
    public interface iAbastecimentoService
    {
        Task<AbastecimentoDto> AddAbastecimentos(AbastecimentoDto model);
        Task<AbastecimentoDto> UpdateAbastecimentos(int id, AbastecimentoDto model);
        Task<bool> DeleteAbastecimentos(int id);
        Task<AbastecimentoDto[]> GetAllAbastecimentosAsync(string placa, bool dadoscondutor = false);
        Task<AbastecimentoDto> GetAbastecimentoByIdAsync(int id);
    }
}