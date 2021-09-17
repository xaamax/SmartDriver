using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SmartDriver.Domain;
using SmartDriver.Persistence.Contexts;
using SmartDriver.Persistence.Contracts;

namespace SmartDriver.Persistence
{
    public class AbastecimentoPersist : iAbastecimentoPersist
    {
        private readonly SmartDriverContext _context;
        public AbastecimentoPersist(SmartDriverContext context)
        {
            _context = context;
        }
        public async Task<Abastecimento[]> GetAllAbastecimentosAsync(string placa, bool dadoscondutor = false)
        {
            IQueryable<Abastecimento> query = _context.Abastecimentos;
            if(dadoscondutor){
            query = query
            .Include(u => u.User);
            }
            query = query.AsNoTracking()
            .OrderBy(a => a.id)
            .Where(a => a.placaid.ToLower().Contains(placa.ToLower()));;
            return await query.ToArrayAsync();
        }
        public async Task<Abastecimento> GetAbastecimentoByIdAsync(int id)
        {
            IQueryable<Abastecimento> query = _context.Abastecimentos.AsNoTracking();
            query = query.OrderBy(a => a.id)
            .Where(a => a.id == id);
            return await query.FirstOrDefaultAsync();
        }

    }
}