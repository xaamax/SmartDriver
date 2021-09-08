using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SmartDriver.Domain.identity;

namespace SmartDriver.Domain
{
    public class Saida
    {       
        public int id { get; set; }
        [Required,Column(TypeName="TIMESTAMP")]
        public DateTime datasaida { get; set; }
        [Required]
        public int kmsaida { get; set; }
        [Required, Column(TypeName="ENUM('Completo','1/2','1/4','3/4','Reserva')")]
        public string combustsaida { get; set; }
        [Required]
        public string destino { get; set; }
        public string obssaida { get; set; }
        [Column(TypeName="TIMESTAMP")]
        public DateTime? dataretorno { get; set; }
        public int? kmretorno { get; set; }
        [Column(TypeName="ENUM('Completo','1/2','1/4','3/4','Reserva')")]
        public string combustretorno { get; set; }
        public string localestacionado { get; set; }
        public string desclocalestacionado { get; set; }
        public string obsretorno { get; set; }
        [ForeignKey("Veiculo"), Required]
        public string placaid { get; set; }
        public Veiculo Veiculo { get; set; }

        [ForeignKey("User"), Required]
        public int condutorid { get; set; }
        public User User { get; set; }
    }
}