namespace RealEstate.BLL.Models.PropertyModels;

public record PropertyImageUpdateModel
{
    public Guid Id { get; init; }
    public Guid PropertyId { get; init; }
    public string ImageUrl { get; init; } = string.Empty;
}
