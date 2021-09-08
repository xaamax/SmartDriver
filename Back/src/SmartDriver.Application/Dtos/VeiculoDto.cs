using System.ComponentModel.DataAnnotations;

namespace SmartDriver.Application.Dtos
{
    public class VeiculoDto
    {
        [Display(Name = "Placa"),
        Required(ErrorMessage = "(*) Campo {0} é obrigatório."),
        StringLength(7, MinimumLength = 7, ErrorMessage = "(*) Placa deve ter 7 caracteres.")
        ]
        public string placa { get; set; }
        [Display(Name = "Modelo"),
        Required(ErrorMessage = "(*) Campo {0} é obrigatório."),
        MaxLength(20)]
        public string modelo { get; set; }
        [RegularExpression("([0-9]+)", ErrorMessage = "(*) O campo KM está com número inválido.")]
        public int km { get; set; }
        [RegularExpression("([0-9]+)", ErrorMessage = "(*) O campo KM está com número inválido.")]
        public int? manutencaokm { get; set; }
        public string rodizio { get; set; }
        [Display(Name = "Dpto"),
        Required(ErrorMessage = "(*) Campo {0} é obrigatório.")]
        public string dpto { get; set; }
        [Display(Name = "UF"),
        Required(ErrorMessage = "(*) Campo {0} é obrigatório.")]
        public string uf { get; set; }
        [Display(Name = "Situação"),
        Required(ErrorMessage = "(*) Campo {0} é obrigatório.")]
        public string situacao { get; set; }
        public string obs { get; set; }
    }
}