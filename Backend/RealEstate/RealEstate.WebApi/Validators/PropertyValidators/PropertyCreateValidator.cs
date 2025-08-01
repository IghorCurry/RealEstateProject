using FluentValidation;
using RealEstate.BLL.Models.PropertyModels;
using RealEstate.DAL.Entities.Enums;

namespace RealEstate.WebApi.Validators.PropertyValidators
{
    public class PropertyCreateValidator : AbstractValidator<PropertyCreateModel>
    {
        public PropertyCreateValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Назва нерухомості є обов'язковим полем")
                .MinimumLength(4).WithMessage("Назва повинна містити мінімум 4 символів")
                .MaximumLength(100).WithMessage("Назва не може перевищувати 100 символів");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Опис є обов'язковим полем")
                .MinimumLength(5).WithMessage("Опис повинен містити мінімум 5 символів")
                .MaximumLength(1000).WithMessage("Опис не може перевищувати 1000 символів");

            RuleFor(x => x.Price)
                .GreaterThan(0).WithMessage("Ціна повинна бути більше 0")
                .LessThanOrEqualTo(100000000).WithMessage("Ціна не може перевищувати 100,000,000");

            RuleFor(x => x.Bedrooms)
                .GreaterThanOrEqualTo(0).WithMessage("Кількість спалень не може бути від'ємною")
                .LessThanOrEqualTo(50).WithMessage("Кількість спалень не може перевищувати 50");

            RuleFor(x => x.Bathrooms)
                .GreaterThanOrEqualTo(0).WithMessage("Кількість ванних кімнат не може бути від'ємною")
                .LessThanOrEqualTo(10).WithMessage("Кількість ванних кімнат не може перевищувати 10");

            RuleFor(x => x.SquareMeters)
                .GreaterThan(0).WithMessage("Площа повинна бути більше 0")
                .LessThanOrEqualTo(10000).WithMessage("Площа не може перевищувати 10,000 м²");

            RuleFor(x => x.Address)
                .NotEmpty().WithMessage("Адреса є обов'язковим полем")
                .MinimumLength(10).WithMessage("Адреса повинна містити мінімум 10 символів")
                .MaximumLength(500).WithMessage("Адреса не може перевищувати 500 символів");

            RuleFor(x => x.PropertyType)
                .IsInEnum().WithMessage("Некоректний тип нерухомості");

            RuleFor(x => x.Location)
                .IsInEnum().WithMessage("Некоректне розташування");

            RuleFor(x => x.Status)
                .IsInEnum().WithMessage("Некоректний статус нерухомості");

            RuleFor(x => x.Features)
                .NotNull().WithMessage("Особливості не можуть бути null")
                .Must(features => features.Count <= 20).WithMessage("Кількість особливостей не може перевищувати 20");

            RuleForEach(x => x.Features)
                .NotEmpty().WithMessage("Особливість не може бути пустою")
                .MaximumLength(100).WithMessage("Особливість не може перевищувати 100 символів");

            RuleFor(x => x.UserId)
                .NotEmpty().WithMessage("ID користувача є обов'язковим полем");
        }
    }
} 