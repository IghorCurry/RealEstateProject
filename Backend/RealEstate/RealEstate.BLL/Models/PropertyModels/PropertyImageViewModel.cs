namespace RealEstate.BLL.Models.PropertyModels;

public record PropertyImageViewModel
{
    public Guid Id { get; init; }
    public string ImageUrl { get; init; } = string.Empty;
    public int Order { get; init; } = 0;
} 