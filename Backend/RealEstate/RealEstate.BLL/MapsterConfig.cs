using Mapster;
using RealEstate.DAL.Entities;
using RealEstate.BLL.Models.PropertyModels;
using RealEstate.BLL.Models.UserModels;

namespace RealEstate.BLL
{
    public static class MapsterConfig
    {
        public static void RegisterMappings()
        {
            // Property -> PropertyViewModel
            TypeAdapterConfig<Property, PropertyViewModel>
                .NewConfig()
                .Map(dest => dest.UserName, src => $"{src.User.FirstName} {src.User.LastName}")
                .Map(dest => dest.ImageUrls, src => src.Images.Select(i => i.ImageUrl).ToList());

            // Property -> PropertyDetailedViewModel
            TypeAdapterConfig<Property, PropertyDetailedViewModel>
                .NewConfig()
                .Map(dest => dest.UserName, src => $"{src.User.FirstName} {src.User.LastName}")
                .Map(dest => dest.ImageUrls, src => src.Images.Select(i => i.ImageUrl).ToList())
                .Map(dest => dest.User, src => src.User)
                .Map(dest => dest.Images, src => src.Images);

            // User -> UserViewModel
            TypeAdapterConfig<User, UserViewModel>
                .NewConfig()
                .Map(dest => dest.FullName, src => $"{src.FirstName} {src.LastName}");
        }
    }
} 