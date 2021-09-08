using System;
using System.Threading.Tasks;
using AutoMapper;
using SmartDriver.Application.Contracts;
using SmartDriver.Application.Dtos;
using SmartDriver.Domain.identity;
using SmartDriver.Persistence.Contracts;

namespace SmartDriver.Application
{
    public class UserService : iUserService
    {
        private readonly iGeralPersist _geralPersist;
        private readonly IMapper _mapper;
        private readonly iUserPersist _userPersist;
        public UserService(iGeralPersist geralPersist,
                              iUserPersist userPersist,
                              IMapper mapper)

        {
            _userPersist = userPersist;
            _geralPersist = geralPersist;
            _mapper = mapper;
        }

        public async Task<bool> DeleteUsers(int id)
    {
        try
        {
            var user = await _userPersist.GetUserByIdAsync(id);
            if (user == null) throw new Exception("Usuário não foi encontrado.");

            _geralPersist.Delete<User>(user);
            return await _geralPersist.SaveChangesAsync();
        }
        catch (Exception err)
        {

            throw new Exception(err.Message);
        }
    }

        public async Task<UserDto[]> GetAllUsersAsync(string dpto, string uf)
        {
            try
            {
                var users = await _userPersist.GetAllUsersAsync(dpto, uf);
                if (users == null) return null;
                var res = _mapper.Map<UserDto[]>(users);
                return res;
            }
            catch (Exception err)
            {
                throw new Exception(err.Message);
            }
        }

        public async Task<UserDto> GetUserByIdAsync(int userId)
        {
            try
            {
                var users = await _userPersist.GetUserByIdAsync(userId);
                if (users == null) return null;
                var res = _mapper.Map<UserDto>(users);
                return res;
            }
            catch (Exception err)
            {
                throw new Exception(err.Message);
            }
        }
    }
}