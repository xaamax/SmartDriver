using System.Threading.Tasks;
using SmartDriver.Application.Dtos;

namespace SmartDriver.Application.Contracts
{
    public interface iUserService
    {
        Task<bool> DeleteUsers(int id);
        Task<UserDto[]> GetAllUsersAsync(string dpto, string uf);
        Task<UserDto> GetUserByIdAsync(int id);
    }
}