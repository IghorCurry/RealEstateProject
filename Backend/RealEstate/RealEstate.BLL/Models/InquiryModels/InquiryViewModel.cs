namespace RealEstate.BLL.Models.InquiryModels;

public record InquiryViewModel : InquiryUpdateModel
{
    public DateTime CreatedAt { get; init; }

    // Extras for UI
    public string PropertyTitle { get; init; } = string.Empty;
    public Guid? PropertyOwnerId { get; init; }
    public string PropertyOwnerName { get; init; } = string.Empty;
    public string SenderName { get; init; } = string.Empty;
} 