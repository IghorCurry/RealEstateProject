using FluentValidation;
using RealEstate.BLL.Models.PropertyModels;
using RealEstate.DAL.Entities.Enums;

namespace RealEstate.WebApi.Validators.PropertyValidators
{
    public class PropertyUpdateValidator : AbstractValidator<PropertyUpdateModel>
    {
        public PropertyUpdateValidator()
        {
            RuleFor(x => x.Id)
                .NotEmpty().WithMessage("ID нерухомості є обов'язковим полем");

            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Назва нерухомості є обов'язковим полем")
                .MinimumLength(3).WithMessage("Назва повинна містити мінімум 3 символи")
                .MaximumLength(100).WithMessage("Назва не може перевищувати 100 символів");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Опис є обов'язковим полем")
                .MinimumLength(3).WithMessage("Опис повинен містити мінімум 3 символи")
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
                .MinimumLength(1).WithMessage("Адреса повинна містити мінімум 1 символ")
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

            RuleFor(x => x.Images)
                .Must(images => images == null || images.Count <= 10)
                .WithMessage("Максимальна кількість зображень: 10");

            RuleForEach(x => x.Images)
                .Must(file => file == null || file.Length <= 10 * 1024 * 1024)
                .WithMessage("Розмір файлу не може перевищувати 10MB");

            RuleFor(x => x.ImageUrls)
                .Must(urls => urls == null || urls.Count <= 10)
                .WithMessage("Максимальна кількість URL зображень: 10");

            RuleFor(x => x.ImagesToDelete)
                .Must(ids => ids == null || ids.Count <= 20)
                .WithMessage("Максимальна кількість зображень для видалення: 20");

            // UserId не валідується при оновленні - він встановлюється в контролері
        }
    }
} 