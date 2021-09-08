using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SmartDriver.Domain;
using SmartDriver.Persistence.Contexts;
using SmartDriver.Persistence.Contracts;

namespace SmartDriver.Persistence
{
    public class ReservaPersist : iReservaPersist
    {
        private readonly SmartDriverContext _context;
        public ReservaPersist(SmartDriverContext context)
        {
            _context = context;
        }

        public async Task<Reserva[]> GetAllReservasAsync(string dpto, string uf)
        {
            IQueryable<Reserva> query = _context.Reservas
            .Include(rv => rv.User)
            .Where(v => v.User.Dpto.Contains(dpto))
            .Where(v => v.User.Uf.Contains(uf))
            .OrderByDescending(rv => rv.datasaida);
            return await query.ToArrayAsync();
        }

        public async Task<Reserva> GetReservaByIdAsync(int reservaId, bool dadosCondutorVeiculo = false)
        {
            IQueryable<Reserva> query = _context.Reservas;
            if (dadosCondutorVeiculo)
            {
                query = query
                .Include(sv => sv.Veiculo)
                .Include(sv => sv.User);
            }
            query = query.AsNoTracking()
            .OrderBy(r => r.num)
            .Where(r => r.num == reservaId);
            return await query.FirstOrDefaultAsync();
        }
    }
}