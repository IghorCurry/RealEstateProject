using RealEstate.DAL.Entities.Enums;

namespace RealEstate.BLL.Models.PropertyModels;

public record PropertyViewModel
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
    public Guid UserId { get; init; } // Додано для перевірки власника
    public string UserName { get; init; } = string.Empty;
    public List<PropertyImageViewModel> Images { get; init; } = new(); // Додаємо зображення для списку
} 