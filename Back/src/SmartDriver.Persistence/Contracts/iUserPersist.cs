using System.Threading.Tasks;
using SmartDriver.Domain.identity;

namespace SmartDriver.Persistence.Contracts
{
    public interface iUserPersist
    {   
         Task<User[]> GetAllUsersAsync(string dpto, string uf);
         Task<User> GetUserByIdAsync(int id);

    }
}