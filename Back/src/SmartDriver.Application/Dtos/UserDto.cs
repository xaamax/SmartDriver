using System.ComponentModel.DataAnnotations;

namespace SmartDriver.Application.Dtos
{
    public class UserDto
    {
        public int Id { get; set; }
        [StringLength(12, MinimumLength = 6, ErrorMessage = "(*) Login deve ter de 6 a 12 caracteres.")]
        public string UserName { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
        public string Perfil { get; set; }
        public string Dpto { get; set; }
        public string Setor { get; set; }
        public string Uf { get; set; }
    }
}