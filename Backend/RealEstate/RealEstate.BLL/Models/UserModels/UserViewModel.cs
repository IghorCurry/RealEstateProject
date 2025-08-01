namespace RealEstate.BLL.Models.UserModels;

public record UserViewModel : UserUpdateModel
{
    public string FullName { get; init; } = string.Empty;
    public DateTime CreatedAt { get; init; }
} 