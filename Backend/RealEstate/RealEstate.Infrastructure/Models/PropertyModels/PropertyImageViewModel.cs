namespace RealEstate.BLL.Models.PropertyModels;

public record PropertyImageViewModel
{
    public Guid Id { get; init; }
    public string ImageUrl { get; init; } = string.Empty;
    public string? AltText { get; init; }
    public bool IsPrimary { get; init; }
    public int Order { get; init; }
    public DateTime UploadedAt { get; init; }
} 