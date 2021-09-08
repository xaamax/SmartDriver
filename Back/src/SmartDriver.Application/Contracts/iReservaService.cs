using System.Threading.Tasks;
using SmartDriver.Application.Dtos;

namespace SmartDriver.Application.Contracts
{
    public interface iReservaService
    {
        Task<ReservaDto> AddReservas(ReservaDto model);
        Task<ReservaDto> UpdateReservas(int num, ReservaDto model);
        Task<bool> DeleteReservas(int num);
        Task<ReservaDto[]> GetAllReservasAsync(string dpto, string uf);
        Task<ReservaDto> GetReservaByIdAsync(int num, bool dadosCondutorVeiculo = false);
    }
}