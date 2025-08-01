using FluentValidation;
using RealEstate.BLL.Models.AuthModels;

namespace RealEstate.WebApi.Validators.AuthValidators
{
    public class UserLoginValidator : AbstractValidator<UserLoginModel>
    {
        public UserLoginValidator()
        {
            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email є обов'язковим полем")
                .EmailAddress().WithMessage("Некоректний формат email")
                .MaximumLength(50).WithMessage("Email не може перевищувати 50 символів");

            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Пароль є обов'язковим полем")
                .MinimumLength(5).WithMessage("Пароль повинен містити мінімум 5 символів")
                .MaximumLength(30).WithMessage("Пароль не може перевищувати 30 символів");
        }
    }
} 