using System.Threading.Tasks;
using SmartDriver.Domain;

namespace SmartDriver.Persistence.Contracts
{
    public interface iReservaPersist
    {   
         Task<Reserva> GetReservaByIdAsync(int reservaId, bool dadosCondutorVeiculo = false);
         Task<Reserva[]> GetAllReservasAsync(string dpto, string uf);

    }
}