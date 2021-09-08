using System;
using System.Collections.Generic;

namespace SmartDriver.Application.Dtos
{
    public class SaidaDto
    {
        public int id { get; set; }
        public DateTime datasaida { get; set; }
        public int kmsaida { get; set; }
        public string combustsaida { get; set; }
        public string destino { get; set; }
        public string obssaida { get; set; }
        public DateTime? dataretorno { get; set; }
        public int? kmretorno { get; set; }
        public string combustretorno { get; set; }  
        public string localestacionado { get; set; }
        public string desclocalestacionado { get; set; }
        public string obsretorno { get; set; }
        public string placaid { get; set; }
        public string condutorid { get; set; }
        public IEnumerable<VeiculoDto> dadosveiculo { get; set; }
        public IEnumerable<UserDto> dadoscondutor { get; set; }
    }
}