using RealEstate.DAL.Entities.Enums;
using RealEstate.BLL.Models.UserModels;
using RealEstate.BLL.Models.InquiryModels;

namespace RealEstate.BLL.Models.PropertyModels;

public record PropertyDetailedViewModel : PropertyViewModel
{
    public UserViewModel User { get; init; } = new();
    public List<InquiryViewModel> Inquiries { get; init; } = new();
    public List<PropertyImageViewModel> Images { get; init; } = new();
    public bool IsFavoritedByCurrentUser { get; init; }
} 