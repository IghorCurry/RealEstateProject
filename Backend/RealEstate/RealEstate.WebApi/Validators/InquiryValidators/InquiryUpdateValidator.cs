using FluentValidation;
using RealEstate.BLL.Models.InquiryModels;

namespace RealEstate.WebApi.Validators.InquiryValidators
{
    public class InquiryUpdateValidator : AbstractValidator<InquiryUpdateModel>
    {
        public InquiryUpdateValidator()
        {
            Include(new InquiryCreateValidator());

            RuleFor(x => x.Id)
                .NotEmpty().WithMessage("ID запиту є обов'язковим полем");
        }
    }
} 