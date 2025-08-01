namespace RealEstate.BLL.Models.InquiryModels;

public record InquiryCreateModel
{
    public string Message { get; init; } = string.Empty;
    public Guid PropertyId { get; init; }
    public Guid? UserId { get; init; } // Optional for anonymous inquiries
    
    // Contact info for anonymous users
    public string? Name { get; init; }
    public string? Email { get; init; }
    public string? Phone { get; init; }
} 