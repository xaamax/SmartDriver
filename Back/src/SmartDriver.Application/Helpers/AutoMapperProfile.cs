using System.Linq;
using AutoMapper;
using SmartDriver.Application.Dtos;
using SmartDriver.Domain;
using SmartDriver.Domain.identity;

namespace SmartDriver.Application.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<User, UserLoginDto>().ReverseMap();
            CreateMap<Veiculo, VeiculoDto>().ReverseMap();
            CreateMap<Saida, SaidaDto>()
            .ForMember(dest => dest.dadosveiculo, opt => { opt.MapFrom(src => src.Veiculo.Saidas.Select(x => x.Veiculo));})
            .ForMember(dest => dest.dadoscondutor, opt => { opt.MapFrom(src => src.User.Saidas.Select(x => x.User));})
            .ReverseMap();
            CreateMap<Reserva, ReservaDto>().ForMember(dest => dest.dadoscondutor, opt => { opt.MapFrom(src => src.User.Reservas.Select(x => x.User));})
            .ReverseMap();
            CreateMap<Abastecimento, AbastecimentoDto>()
            .ForMember(dest => dest.dadoscondutor, opt => { opt.MapFrom(src => src.User.Abastecimentos.Select(x => x.User));})
            .ReverseMap();
        }
    }
}