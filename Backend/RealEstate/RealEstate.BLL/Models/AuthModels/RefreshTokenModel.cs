namespace RealEstate.BLL.Models.AuthModels;

public record RefreshTokenModel
{
    public string RefreshToken { get; init; } = string.Empty;
}
