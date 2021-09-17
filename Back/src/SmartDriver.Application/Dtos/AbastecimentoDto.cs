using System;
using System.Collections.Generic;

namespace SmartDriver.Application.Dtos
{
    public class AbastecimentoDto
    {
        public int id { get; set; }
        public DateTime dataAbastecimento { get; set; }
        public int kmAbastecimento { get; set; }
        public double valor { get; set; } 
        public string condutorid { get; set; }
        public string placaid { get; set; }
        public IEnumerable<UserDto> dadoscondutor { get; set; }
    }
}