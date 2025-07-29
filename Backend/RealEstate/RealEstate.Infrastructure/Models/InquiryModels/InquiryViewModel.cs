namespace RealEstate.BLL.Models.InquiryModels;

public record InquiryViewModel : InquiryUpdateModel
{
    public DateTime CreatedAt { get; init; }
    public DateTime? UpdatedAt { get; init; }
    public bool IsRead { get; init; }
    public string PropertyTitle { get; init; } = string.Empty;
    public string UserName { get; init; } = string.Empty;
    public string UserEmail { get; init; } = string.Empty;
} 