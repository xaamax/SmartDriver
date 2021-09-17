using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SmartDriver.Domain.identity;

namespace SmartDriver.Domain
{
    public class Abastecimento
    {
        public int id { get; set; }
        [Required]
        public DateTime dataAbastecimento { get; set; }
        public int kmAbastecimento { get; set; } 
        public double valor { get; set; } 
        [ForeignKey("User"), Required]
        public int condutorid { get; set; }
        public User User { get; set; }
        [ForeignKey("Veiculo"), Required]
        public string placaid { get; set; }
        public Veiculo Veiculo { get; set; }
    }
}