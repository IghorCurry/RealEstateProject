using FluentValidation;
using RealEstate.BLL.Models.PropertyModels;

namespace RealEstate.WebApi.Validators.PropertyValidators
{
    public class PropertyUpdateValidator : AbstractValidator<PropertyUpdateModel>
    {
        public PropertyUpdateValidator()
        {
            Include(new PropertyCreateValidator());

            RuleFor(x => x.Id)
                .NotEmpty().WithMessage("ID нерухомості є обов'язковим полем");
        }
    }
} 