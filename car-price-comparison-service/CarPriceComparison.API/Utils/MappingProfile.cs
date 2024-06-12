using AutoMapper;
using CarPriceComparison.API.Models;
using CarPriceComparison.API.Models.DTO;

namespace CarPriceComparison.API.Utils;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // DTO to Entity
        CreateMap<UserCreateDto, User>();
        CreateMap<UserUpdateDto, User>()
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
    }
}