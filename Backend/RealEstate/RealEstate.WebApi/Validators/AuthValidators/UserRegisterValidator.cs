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
                .Matches(@"^[\p{L}\p{M}\s'\u2019\u2018\u02BC-]+$").WithMessage("Ім'я може містити літери, пробіли, дефіс і апостроф");

            RuleFor(x => x.LastName)
                .NotEmpty().WithMessage("Прізвище є обов'язковим полем")
                .MinimumLength(2).WithMessage("Прізвище повинно містити мінімум 2 символи")
                .MaximumLength(50).WithMessage("Прізвище не може перевищувати 50 символів")
                .Matches(@"^[\p{L}\p{M}\s'\u2019\u2018\u02BC-]+$").WithMessage("Прізвище може містити літери, пробіли, дефіс і апостроф");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email є обов'язковим полем")
                .EmailAddress().WithMessage("Некоректний формат email")
                .MaximumLength(100).WithMessage("Email не може перевищувати 100 символів");

            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Пароль є обов'язковим полем")
                .MinimumLength(8).WithMessage("Пароль повинен містити мінімум 8 символів")
                .MaximumLength(50).WithMessage("Пароль не може перевищувати 50 символів")
                .Matches(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])").WithMessage("Пароль повинен містити хоча б одну велику літеру, одну малу літеру, одну цифру та один спеціальний символ");

            RuleFor(x => x.PhoneNumber)
                .NotEmpty().WithMessage("Номер телефону є обов'язковим полем")
                .Matches(@"^\+\d{10,15}$").WithMessage("Некоректний формат номера телефону. Приклад: +380XXXXXXXXX");
        }
    }
} 