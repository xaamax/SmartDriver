using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace SmartDriver.Domain.identity
{
    public class User : IdentityUser<int>
    {   
        [Required, Column(TypeName="VARCHAR(50)")]
        public string FullName { get; set; }
        [Required]
        public string Perfil { get; set; }
        [Required]
        public string Dpto { get; set; }
        [Required]
        public string Setor { get; set; }
        [Required]
        public string Uf { get; set; }
        public List<UserRole> UserRoles { get; set; }
        public IEnumerable<Saida> Saidas { get; set; }
        public IEnumerable<Reserva> Reservas { get; set; }
    }
}