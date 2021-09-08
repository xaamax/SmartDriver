using System.Threading.Tasks;
using SmartDriver.Application.Dtos;

namespace SmartDriver.Application.Contracts
{
    public interface iVeiculoService
    {
        Task<VeiculoDto> AddVeiculos(VeiculoDto model);
        Task<VeiculoDto> UpdateVeiculos(string placa, VeiculoDto model);
        Task<bool> DeleteVeiculos(string placa);
        Task<VeiculoDto[]> GetAllVeiculosAsync(string dpto, string uf);
        Task<VeiculoDto> GetVeiculoByPlacaAsync(string placa);
        Task<VeiculoDto[]> GetAllVeiculosByModeloAsync(string modelo);
    }
}