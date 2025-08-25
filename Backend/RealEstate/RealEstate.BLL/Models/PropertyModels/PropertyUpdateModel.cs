using RealEstate.DAL.Entities.Enums;
using Microsoft.AspNetCore.Http;

namespace RealEstate.BLL.Models.PropertyModels;

public record PropertyUpdateModel : PropertyCreateModel
{
    public Guid Id { get; init; }
    
    // Additional image management
    public List<Guid>? ImagesToDelete { get; init; } // IDs of images to remove
} 