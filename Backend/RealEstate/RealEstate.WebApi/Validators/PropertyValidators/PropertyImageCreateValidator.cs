using FluentValidation;
using RealEstate.BLL.Models.PropertyModels;
using RealEstate.DAL.Persistance;
using Microsoft.EntityFrameworkCore;

namespace RealEstate.WebApi.Validators.PropertyValidators
{
    public class PropertyImageCreateValidator : AbstractValidator<PropertyImageCreateModel>
    {
        private readonly RealEstateDbContext _context;

        public PropertyImageCreateValidator(RealEstateDbContext context)
        {
            _context = context;

            RuleFor(x => x.PropertyId)
                .NotEmpty().WithMessage("ID нерухомості є обов'язковим полем")
                .MustAsync(async (propertyId, cancellation) => 
                    await _context.Properties.AnyAsync(p => p.Id == propertyId))
                .WithMessage("Нерухомість не існує")
                .MustAsync(async (propertyId, cancellation) => 
                {
                    var imageCount = await _context.PropertyImages
                        .Where(pi => pi.PropertyId == propertyId)
                        .CountAsync();
                    return imageCount < 20;
                }).WithMessage("Досягнуто максимальну кількість зображень (20) для цієї нерухомості");

            RuleFor(x => x.Image)
                .NotNull().WithMessage("Зображення є обов'язковим полем")
                .Must(file => file.Length > 0).WithMessage("Файл не може бути порожнім")
                .Must(file => file.Length <= 10 * 1024 * 1024).WithMessage("Розмір файлу не може перевищувати 10MB")
                .Must(file => 
                {
                    var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".webp" };
                    var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
                    return allowedExtensions.Contains(extension);
                }).WithMessage("Дозволені тільки файли: jpg, jpeg, png, gif, webp")
                .Must(file => 
                {
                    var allowedMimeTypes = new[] { "image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp" };
                    return allowedMimeTypes.Contains(file.ContentType.ToLowerInvariant());
                }).WithMessage("Некоректний тип файлу");
        }
    }
}
