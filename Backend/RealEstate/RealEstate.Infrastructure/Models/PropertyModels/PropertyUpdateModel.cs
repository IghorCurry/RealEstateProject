using RealEstate.DAL.Entities.Enums;

namespace RealEstate.BLL.Models.PropertyModels;

public record PropertyUpdateModel : PropertyCreateModel
{
    public Guid Id { get; init; }
} 