namespace RealEstate.BLL.Models.InquiryModels;

public record InquiryViewModel : InquiryUpdateModel
{
    public DateTime CreatedAt { get; init; }
} 