using Mapster;
using System.Linq;
using RealEstate.DAL.Entities;
using RealEstate.BLL.Models.PropertyModels;
using RealEstate.BLL.Models.UserModels;
using RealEstate.BLL.Models.InquiryModels;

namespace RealEstate.BLL
{
    public static class MapsterConfig
    {
        public static void RegisterMappings()
        {
            // Property -> PropertyViewModel (для списку)
            TypeAdapterConfig<Property, PropertyViewModel>
                .NewConfig()
                .Map(dest => dest.UserId, src => src.UserId) // Додано маппінг UserId
                .Map(dest => dest.UserName, src => src.User != null ? $"{(src.User.FirstName != null ? src.User.FirstName : "")} {(src.User.LastName != null ? src.User.LastName : "")}".Trim() : "")
                .Map(dest => dest.Images, src => src.Images != null ? src.Images.Adapt<List<PropertyImageViewModel>>() : new List<PropertyImageViewModel>()); // Додаємо зображення

            // Property -> PropertyDetailedViewModel (для деталей)
            TypeAdapterConfig<Property, PropertyDetailedViewModel>
                .NewConfig()
                .Map(dest => dest.UserName, src => src.User != null ? $"{(src.User.FirstName != null ? src.User.FirstName : "")} {(src.User.LastName != null ? src.User.LastName : "")}".Trim() : "")
                .Map(dest => dest.Images, src => src.Images != null ? src.Images.Adapt<List<PropertyImageViewModel>>() : new List<PropertyImageViewModel>()) 
                .Map(dest => dest.Inquiries, src => new List<InquiryViewModel>()); 

            // PropertyImage -> PropertyImageViewModel
            TypeAdapterConfig<PropertyImage, PropertyImageViewModel>
                .NewConfig();

            // User -> UserViewModel
            TypeAdapterConfig<User, UserViewModel>
                .NewConfig()
                .Map(dest => dest.FirstName, src => src.FirstName != null ? src.FirstName : "")
                .Map(dest => dest.LastName, src => src.LastName != null ? src.LastName : "")
                .Map(dest => dest.Email, src => src.Email != null ? src.Email : "")
                .Map(dest => dest.UserName, src => src.UserName != null ? src.UserName : (src.Email != null ? src.Email : ""))
                .Map(dest => dest.PhoneNumber, src => src.PhoneNumber != null ? src.PhoneNumber : "")
                .Map(dest => dest.FullName, src => $"{(src.FirstName != null ? src.FirstName : "")} {(src.LastName != null ? src.LastName : "")}".Trim())
                .Map(dest => dest.Role, src => "User"); // Default role, will be overridden in AuthManager
        }
    }
} 