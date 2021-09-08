using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SmartDriver.Domain;
using SmartDriver.Persistence.Contexts;
using SmartDriver.Persistence.Contracts;

namespace SmartDriver.Persistence
{
    public class SaidaPersist : iSaidaPersist
    {
        private readonly SmartDriverContext _context;
        public SaidaPersist(SmartDriverContext context)
        {
            _context = context;
        }

        public async Task<Saida[]> GetAllSaidasAsync(string dpto, string uf)
        {
            IQueryable<Saida> query = _context.Saidas
            .Include(sv => sv.Veiculo)
            .Include(sv => sv.User)
            .Where(v => v.Veiculo.dpto.Contains(dpto))
            .Where(v => v.Veiculo.uf.Contains(uf))
            .OrderByDescending(sv => sv.datasaida);
            return await query.ToArrayAsync();
        }
        public async Task<Saida> GetSaidaByIdAsync(int id, bool dadosCondutorVeiculo = false)
        {
            IQueryable<Saida> query = _context.Saidas;
            if(dadosCondutorVeiculo){
            query = query
            .Include(sv => sv.Veiculo)
            .Include(sv => sv.User);
            }
            query = query.AsNoTracking()
            .OrderBy(s => s.id)
            .Where(s => s.id == id);
            return await query.FirstOrDefaultAsync();
        }
    }
}