using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SmartDriver.Application.Dtos;
using SmartDriver.Domain.identity;
using SmartDriver.Application.Contracts;

namespace SmartDriver.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IMapper _mapper;
        private readonly iUserService _userService;
        public UserController(IConfiguration config,
                              UserManager<User> userManager,
                              SignInManager<User> signInManager,
                              IMapper mapper
                              , iUserService userService
                              )
        {
            _config = config;
            _userManager = userManager;
            _signInManager = signInManager;
            _mapper = mapper;
            _userService = userService;
        }

        [HttpGet("GetUser")]
        public async Task<IActionResult> GetUser()
        {
            return Ok(new UserDto());
        }

        [HttpGet("dpto/{dpto}/uf/{uf}")]
        public async Task<IActionResult> Get(string dpto, string uf)
        {
            try
            {
                var users = await _userService.GetAllUsersAsync(dpto, uf);
                if (users == null) return NoContent();
                return Ok(users);
            }
            catch (Exception err)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao recuperar Veículos. Erro: {err.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var user = await _userService.GetUserByIdAsync(id);
                if (user == null) return NoContent();
                return Ok(user);
            }
            catch (Exception err)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao recuperar Saída. Erro: {err.Message}");
            }
        }

        [HttpPost("Register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(UserDto userDto)
        {
            try
            {
                var user = _mapper.Map<User>(userDto);
                var res = await _userManager.CreateAsync(user, userDto.Password);
                var userResult = _mapper.Map<UserDto>(user);
                if (res.Succeeded)
                {
                    return Created("GetUser", userResult);
                }
                return BadRequest(res.Errors);
            }
            catch (System.Exception err)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                                       $"Falha ao conectar ao Banco de dados. {err.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, UserDto userDto)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(id);
                user.FullName = userDto.FullName;
                user.UserName = userDto.UserName;
                user.Uf = userDto.Uf;
                user.Dpto = userDto.Dpto;
                user.PasswordHash = _userManager.PasswordHasher.HashPassword(user, userDto.Password);
                var res = await _userManager.UpdateAsync(user);
                var userResult = _mapper.Map<UserDto>(user);
                if (res.Succeeded)
                {
                    return Created("GetUser", userResult);
                }
                return BadRequest(res.Errors);
            }
            catch (Exception err)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao alterar Usuário. Erro: {err.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var saida = await _userService.GetUserByIdAsync(id);
                if (saida == null) return NoContent();

                return await _userService.DeleteUsers(id)
                        ? Ok(new { msg = "Deletado" })
                        : throw new Exception("Ocorreu um problema ao tentar excluir o Usuário.");
            }
            catch (Exception err)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao deletar Usuário. Erro: {err.Message}");
            }
        }

        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(UserLoginDto userLogin)
        {
            try
            {
                var user = await _userManager.FindByNameAsync(userLogin.UserName);
                var res = await _signInManager.CheckPasswordSignInAsync(user, userLogin.Password, false);
                if (res.Succeeded)
                {
                    var appUser = await _userManager.Users
                        .FirstOrDefaultAsync(u => u.NormalizedUserName == userLogin.UserName.ToUpper());
                    var userReturn = _mapper.Map<UserLoginDto>(appUser);
                    return Ok(new
                    {
                        token = GenerateJWToken(appUser).Result,
                        //user = userReturn,
                        id = userReturn.Id,
                        fullname = userReturn.FullName,
                        perfil = userReturn.Perfil,
                        setor = userReturn.Setor,
                        dpto = userReturn.Dpto,
                        uf = userReturn.Uf
                    });
                }
                return Unauthorized();
            }
            catch (System.Exception err)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                                       $"Falha ao conectar ao Banco de dados. {err.Message}");
            }
        }

        private async Task<string> GenerateJWToken(User user)
        {
            var claims = new List<Claim>{
                new Claim(ClaimTypes.NameIdentifier, user.UserName.ToString()),
                new Claim(ClaimTypes.Name, user.UserName)
            };
            var roles = await _userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("xecretKeywqejane"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}