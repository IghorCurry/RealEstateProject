namespace RealEstate.BLL.Models.InquiryModels;

public record InquiryUpdateModel : InquiryCreateModel
{
    public Guid Id { get; init; }
} 