using RealEstate.DAL.Entities.Enums;
using RealEstate.BLL.Models.UserModels;
using RealEstate.BLL.Models.InquiryModels;

namespace RealEstate.BLL.Models.PropertyModels;

public record PropertyDetailedViewModel
{
    public Guid Id { get; init; }
    public string Title { get; init; } = string.Empty;
    public string Description { get; init; } = string.Empty;
    public decimal Price { get; init; }
    public int Bedrooms { get; init; }
    public int Bathrooms { get; init; }
    public double SquareMeters { get; init; }
    public PropertyType PropertyType { get; init; }
    public Location Location { get; init; }
    public PropertyStatus Status { get; init; }
    public string Address { get; init; } = string.Empty;
    public List<string> Features { get; init; } = new();
    public DateTime CreatedAt { get; init; }
    public string UserName { get; init; } = string.Empty;
    
    // Детальна інформація
    public UserViewModel User { get; init; } = new();
    public List<InquiryViewModel> Inquiries { get; init; } = new();
    public List<PropertyImageViewModel> Images { get; init; } = new();
    public bool IsFavoritedByCurrentUser { get; init; }
} 