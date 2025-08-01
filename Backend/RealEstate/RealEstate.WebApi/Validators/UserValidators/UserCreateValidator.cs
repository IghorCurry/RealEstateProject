using FluentValidation;
using RealEstate.BLL.Models.UserModels;

namespace RealEstate.WebApi.Validators.UserValidators
{
    public class UserCreateValidator : AbstractValidator<UserCreateModel>
    {
        public UserCreateValidator()
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
                .MaximumLength(50).WithMessage("Email не може перевищувати 50 символів");

            RuleFor(x => x.UserName)
                .NotEmpty().WithMessage("Ім'я користувача є обов'язковим полем")
                .MinimumLength(2).WithMessage("Ім'я користувача повинно містити мінімум 2 символи")
                .MaximumLength(50).WithMessage("Ім'я користувача не може перевищувати 50 символів")
                .Matches(@"^[a-zA-Z0-9_]+$").WithMessage("Ім'я користувача може містити тільки літери, цифри та підкреслення");

            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Пароль є обов'язковим полем")
                .MinimumLength(5).WithMessage("Пароль повинен містити мінімум 5 символів")
                .MaximumLength(50).WithMessage("Пароль не може перевищувати 50 символів")
                .Matches(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)").WithMessage("Пароль повинен містити хоча б одну велику літеру, одну малу літеру та одну цифру");

            RuleFor(x => x.PhoneNumber)
                .NotEmpty().WithMessage("Номер телефону є обов'язковим полем")
                .Matches(@"^\+380\d{9}$").WithMessage("Некоректний формат номера телефону. Використовуйте формат: +380XXXXXXXXX");
        }
    }
} 