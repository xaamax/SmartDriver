using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartDriver.Domain
{
    public class Veiculo
    {
        [Key, MaxLength(10)]
        public string placa { get; set; }
        [Required]
        public string modelo { get; set; }
        public int km { get; set; }
        public int? manutencaokm { get; set; }
        [Column(TypeName = "ENUM('Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira')")]
        public string rodizio { get; set; }
        [Required]
        public string dpto { get; set; }
        [Required]
        public string uf { get; set; }
        [Required, Column(TypeName = "ENUM('Disponível','Indisponível','Em Manutenção','Em Uso')")]
        public string situacao { get; set; }
        public string obs { get; set; }
        public IEnumerable<Saida> Saidas { get; set; }
    }
}