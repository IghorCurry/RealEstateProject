namespace RealEstate.BLL.Models.InquiryModels;

public class MyInquiriesViewModel
{
    public IEnumerable<InquiryViewModel> Sent { get; set; } = Enumerable.Empty<InquiryViewModel>();
    public IEnumerable<InquiryViewModel> Received { get; set; } = Enumerable.Empty<InquiryViewModel>();
}


