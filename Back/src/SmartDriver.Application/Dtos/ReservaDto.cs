using System;
using System.Collections.Generic;

namespace SmartDriver.Application.Dtos
{
    public class ReservaDto
    {          
        public int num { get; set; }
        public DateTime datasaida { get; set; }
        public DateTime dataretorno { get; set; }
        public string destino { get; set; }
        public string motivo { get; set; }
        public int qtdpessoas { get; set; }
        public string obs { get; set; }
        public string fluig { get; set; }
        public string situacao { get; set; }
        public string placaid { get; set; }
        public string condutorid { get; set; }
        public IEnumerable<UserDto> dadoscondutor { get; set; }
    }
}