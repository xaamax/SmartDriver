using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SmartDriver.Domain;
using SmartDriver.Domain.identity;
using SmartDriver.Persistence.Contexts;
using SmartDriver.Persistence.Contracts;

namespace SmartDriver.Persistence
{
    public class UserPersist : iUserPersist
    {
        private readonly SmartDriverContext _context;
        public UserPersist(SmartDriverContext context)
        {
            _context = context;
        }

        public async Task<User[]> GetAllUsersAsync(string dpto, string uf)
        {
            IQueryable<User> query = _context.Users
            .OrderBy(u => u.FullName)
            .Where(u => u.Dpto.Contains(dpto))
            .Where(u => u.Uf.Contains(uf))
            .Where(u => u.UserName != "admin-smartdriver");
            return await query.ToArrayAsync();
        }
        public async Task<User> GetUserByIdAsync(int id)
        {
            IQueryable<User> query = _context.Users
             .OrderBy(u => u.FullName)
             .Where(u => u.Id == id);
            return await query.FirstOrDefaultAsync();
        }
    }
}