using FluentValidation;
using RealEstate.BLL.Models.AuthModels;

namespace RealEstate.WebApi.Validators.AuthValidators
{
    public class UserRegisterValidator : AbstractValidator<UserRegisterModel>
    {
        public UserRegisterValidator()
        {
            RuleFor(x => x.FirstName)
                .NotEmpty().WithMessage("Ім'я є обов'язковим полем")
                .MinimumLength(2).WithMessage("Ім'я повинно містити мінімум 2 символи")
                .MaximumLength(50).WithMessage("Ім'я не може перевищувати 50 символів")
                .Matches(@"^[а-яА-Яa-zA-Z\s]+$").WithMessage("Ім'я може містити тільки літери та пробіли");

            RuleFor(x => x.LastName)
                .NotEmpty().WithMessage("Прізвище є обов'язковим полем")
                .MinimumLength(2).WithMessage("Прізвище повинно містити мінімум 2 символи")
                .MaximumLength(50).WithMessage("Прізвище не може перевищувати 50 символів")
                .Matches(@"^[а-яА-Яa-zA-Z\s]+$").WithMessage("Прізвище може містити тільки літери та пробіли");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email є обов'язковим полем")
                .EmailAddress().WithMessage("Некоректний формат email")
                .MaximumLength(100).WithMessage("Email не може перевищувати 50 символів");

            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Пароль є обов'язковим полем")
                .MinimumLength(8).WithMessage("Пароль повинен містити мінімум 5 символів")
                .MaximumLength(100).WithMessage("Пароль не може перевищувати 30 символів")
                .Matches(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)").WithMessage("Пароль повинен містити хоча б одну велику літеру, одну малу літеру та одну цифру");

            RuleFor(x => x.PhoneNumber)
                .NotEmpty().WithMessage("Номер телефону є обов'язковим полем")
                .Matches(@"^\+380\d{9}$").WithMessage("Некоректний формат номера телефону. Використовуйте формат: +380XXXXXXXXX");
        }
    }
} 