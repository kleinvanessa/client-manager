using AutoMapper;
using ClientManager.Backend.DTOs;
using ClientManager.Backend.Entities;

namespace ClientManager.Backend.Mapping
{
    public class ClientProfile : Profile
    {
        public ClientProfile()
        {
            CreateMap<ClientDTO, Client>()
                .ForMember(dest => dest.RegistrationDate, opt => opt.Ignore());
        }
    }
}
