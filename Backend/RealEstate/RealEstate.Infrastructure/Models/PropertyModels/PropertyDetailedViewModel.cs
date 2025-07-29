using RealEstate.DAL.Entities.Enums;

namespace RealEstate.BLL.Models.PropertyModels;

public record PropertyDetailedViewModel : PropertyViewModel
{
    public UserViewModel Owner { get; init; } = new();
    public List<InquiryViewModel> Inquiries { get; init; } = new();
    public List<AmenityViewModel> Amenities { get; init; } = new();
    public List<PropertyImageViewModel> Images { get; init; } = new();
    public int TotalViews { get; init; }
    public int TotalFavorites { get; init; }
    public bool IsFavoritedByCurrentUser { get; init; }
    public string? VirtualTourUrl { get; init; }
    public string? FloorPlanUrl { get; init; }
    public Dictionary<string, object> AdditionalFeatures { get; init; } = new();
} 