using RealEstate.BLL.Models.PropertyModels;
using RealEstate.BLL.Models.InquiryModels;

namespace RealEstate.BLL.Models.UserModels;

public record UserDetailedViewModel : UserViewModel
{
    public List<PropertyViewModel> Properties { get; init; } = new();
    public List<InquiryViewModel> SentInquiries { get; init; } = new();
    public List<InquiryViewModel> ReceivedInquiries { get; init; } = new();
    public List<PropertyViewModel> FavoriteProperties { get; init; } = new();
} 