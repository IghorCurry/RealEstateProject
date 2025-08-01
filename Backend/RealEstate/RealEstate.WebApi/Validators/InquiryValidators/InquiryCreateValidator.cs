using FluentValidation;
using RealEstate.BLL.Models.InquiryModels;

namespace RealEstate.WebApi.Validators.InquiryValidators
{
    public class InquiryCreateValidator : AbstractValidator<InquiryCreateModel>
    {
        public InquiryCreateValidator()
        {
            RuleFor(x => x.Message)
                .NotEmpty().WithMessage("Повідомлення є обов'язковим полем")
                .MinimumLength(5).WithMessage("Повідомлення повинно містити мінімум 5 символів")
                .MaximumLength(1000).WithMessage("Повідомлення не може перевищувати 1000 символів");

            RuleFor(x => x.PropertyId)
                .NotEmpty().WithMessage("ID нерухомості є обов'язковим полем");

            // Умовна валідація для анонімних користувачів
            When(x => x.UserId == null, () =>
            {
                RuleFor(x => x.Name)
                    .NotEmpty().WithMessage("Ім'я є обов'язковим для анонімних запитів")
                    .MinimumLength(2).WithMessage("Ім'я повинно містити мінімум 2 символи")
                    .MaximumLength(100).WithMessage("Ім'я не може перевищувати 100 символів")
                    .Matches(@"^[а-яА-Яa-zA-Z\s]+$").WithMessage("Ім'я може містити тільки літери та пробіли");

                RuleFor(x => x.Email)
                    .NotEmpty().WithMessage("Email є обов'язковим для анонімних запитів")
                    .EmailAddress().WithMessage("Некоректний формат email")
                    .MaximumLength(100).WithMessage("Email не може перевищувати 100 символів");

                RuleFor(x => x.Phone)
                    .NotEmpty().WithMessage("Номер телефону є обов'язковим для анонімних запитів")
                    .Matches(@"^\+380\d{9}$").WithMessage("Некоректний формат номера телефону. Використовуйте формат: +380XXXXXXXXX");
            });

            // Валідація для зареєстрованих користувачів
            When(x => x.UserId != null, () =>
            {
                RuleFor(x => x.Name)
                    .MaximumLength(100).WithMessage("Ім'я не може перевищувати 50 символів")
                    .When(x => !string.IsNullOrEmpty(x.Name))
                    .Matches(@"^[а-яА-Яa-zA-Z\s]+$").WithMessage("Ім'я може містити тільки літери та пробіли")
                    .When(x => !string.IsNullOrEmpty(x.Name));

                RuleFor(x => x.Email)
                    .EmailAddress().WithMessage("Некоректний формат email")
                    .MaximumLength(100).WithMessage("Email не може перевищувати 50 символів")
                    .When(x => !string.IsNullOrEmpty(x.Email));

                RuleFor(x => x.Phone)
                    .Matches(@"^\+380\d{9}$").WithMessage("Некоректний формат номера телефону. Використовуйте формат: +380XXXXXXXXX")
                    .When(x => !string.IsNullOrEmpty(x.Phone));
            });
        }
    }
} 