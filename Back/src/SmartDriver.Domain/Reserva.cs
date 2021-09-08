using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SmartDriver.Domain.identity;

namespace SmartDriver.Domain
{
    public class Reserva
    {          
        [Key] 
        public int num { get; set; }
        [Required,Column(TypeName="DATE")]
        public DateTime datasaida { get; set; }
        
        [Required,Column(TypeName="DATE")]
        public DateTime dataretorno { get; set; }
        
        [Required]
        public string destino { get; set; }
        public string motivo { get; set; }
        public int qtdpessoas { get; set; }
        public string obs { get; set; }
        public string fluig { get; set; }
        [Required, Column(TypeName="ENUM('À confirmar','Confirmada')")]
        public string situacao { get; set; }

        [ForeignKey("Veiculo")]
        public string placaid { get; set; }
        public Veiculo Veiculo { get; set; }

        [ForeignKey("User"), Required]
        public int condutorid { get; set; }
        public User User { get; set; }
    }
}