using FluentValidation;
using RealEstate.BLL.Models.AuthModels;

namespace RealEstate.WebApi.Validators.AuthValidators
{
    public class RefreshTokenValidator : AbstractValidator<RefreshTokenModel>
    {
        public RefreshTokenValidator()
        {
            RuleFor(x => x.RefreshToken)
                .NotEmpty().WithMessage("Refresh token є обов'язковим полем")
                .MinimumLength(10).WithMessage("Refresh token повинен містити мінімум 10 символів")
                .MaximumLength(500).WithMessage("Refresh token не може перевищувати 500 символів");
        }
    }
}
