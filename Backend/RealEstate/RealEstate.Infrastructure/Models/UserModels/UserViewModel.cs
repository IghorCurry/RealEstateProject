namespace RealEstate.BLL.Models.UserModels;

public record UserViewModel : UserUpdateModel
{
    public DateTime CreatedAt { get; init; }
    public DateTime? UpdatedAt { get; init; }
    public bool IsActive { get; init; }
    public int PropertiesCount { get; init; }
} 