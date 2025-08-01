using RealEstate.DAL.Entities.Enums;

namespace RealEstate.BLL.Models.PropertyModels;

public record PropertyViewModel : PropertyUpdateModel
{
    public DateTime CreatedAt { get; init; }
    public List<string> ImageUrls { get; init; } = new();
    public string UserName { get; init; } = string.Empty;
} 