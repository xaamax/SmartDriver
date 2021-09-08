using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SmartDriver.Domain;
using SmartDriver.Persistence.Contexts;
using SmartDriver.Persistence.Contracts;

namespace SmartDriver.Persistence
{
    public class VeiculoPersist : iVeiculoPersist
    {
        private readonly SmartDriverContext _context;
        public VeiculoPersist(SmartDriverContext context)
        {
            _context = context;
            //_context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public async Task<Veiculo[]> GetAllVeiculosAsync(string dpto, string uf)
        {
            IQueryable<Veiculo> query = _context.Veiculos
            .Where(v => v.dpto.Contains(dpto)) 
            .Where(v => v.uf.Contains(uf))
            .AsNoTracking();
            query = query.OrderBy(v => v.placa);
            return await query.ToArrayAsync();
        }

        public async Task<Veiculo[]> GetAllVeiculosByModeloAsync(string modelo)
        {
            IQueryable<Veiculo> query = _context.Veiculos.AsNoTracking();
            query = query.OrderBy(v => v.modelo)
                         .Where(v => v.modelo.ToLower().Contains(modelo.ToLower()));
            return await query.ToArrayAsync();
        }

        public async Task<Veiculo> GetVeiculoByPlacaAsync(string placa)
        {
            IQueryable<Veiculo> query = _context.Veiculos.AsNoTracking();
            query = query.OrderBy(v => v.placa)
             .Where(v => v.placa.ToLower().Contains(placa.ToLower()));
            return await query.FirstOrDefaultAsync();
        }
    }
}