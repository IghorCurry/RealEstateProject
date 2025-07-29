namespace RealEstate.BLL.Models.InquiryModels;

public record InquiryCreateModel
{
    public string Message { get; init; } = string.Empty;
    public Guid PropertyId { get; init; }
    public Guid UserId { get; init; }
} 