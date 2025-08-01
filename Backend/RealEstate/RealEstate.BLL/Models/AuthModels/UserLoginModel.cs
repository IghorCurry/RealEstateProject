namespace RealEstate.BLL.Models.AuthModels;

public record UserLoginModel
{
    public string Email { get; init; } = string.Empty;
    public string Password { get; init; } = string.Empty;
} 