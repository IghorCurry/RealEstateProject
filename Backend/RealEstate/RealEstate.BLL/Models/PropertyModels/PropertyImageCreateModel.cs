using Microsoft.AspNetCore.Http;

namespace RealEstate.BLL.Models.PropertyModels;

public record PropertyImageCreateModel
{
    public Guid PropertyId { get; init; }
    public IFormFile Image { get; init; } = null!;
}
