namespace RealEstate.BLL.Models.UserModels;

public record UserDetailedViewModel : UserViewModel
{
    public List<PropertyViewModel> Properties { get; init; } = new();
    public List<InquiryViewModel> SentInquiries { get; init; } = new();
    public List<InquiryViewModel> ReceivedInquiries { get; init; } = new();
    public List<PropertyViewModel> FavoriteProperties { get; init; } = new();
    public DateTime LastLoginAt { get; init; }
    public bool IsEmailVerified { get; init; }
    public bool IsPhoneVerified { get; init; }
    public string? ProfileImageUrl { get; init; }
    public string? Bio { get; init; }
    public Dictionary<string, object> Preferences { get; init; } = new();
} 