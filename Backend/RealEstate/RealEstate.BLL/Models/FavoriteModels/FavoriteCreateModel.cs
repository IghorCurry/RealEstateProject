using System.ComponentModel.DataAnnotations;

namespace RealEstate.BLL.Models.FavoriteModels;

public class FavoriteCreateModel
{
    [Required]
    public Guid UserId { get; set; }
    
    [Required]
    public Guid PropertyId { get; set; }
} 