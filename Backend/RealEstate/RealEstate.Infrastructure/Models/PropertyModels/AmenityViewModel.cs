using RealEstate.DAL.Entities.Enums;

namespace RealEstate.BLL.Models.PropertyModels;

public record AmenityViewModel
{
    public Guid Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public string Description { get; init; } = string.Empty;
    public AmenityType Type { get; init; }
    public string? Icon { get; init; }
} 