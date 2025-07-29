using RealEstate.DAL.Entities.Enums;

namespace RealEstate.BLL.Models.PropertyModels;

public record PropertyViewModel : PropertyUpdateModel
{
    public DateTime CreatedAt { get; init; }
    public DateTime? UpdatedAt { get; init; }
    public bool IsAvailable { get; init; }
    public List<string> ImageUrls { get; init; } = new();
    public List<string> Amenities { get; init; } = new();
    public string OwnerName { get; init; } = string.Empty;
} 