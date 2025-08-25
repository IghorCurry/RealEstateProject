using FluentValidation;
using RealEstate.BLL.Models.FavoriteModels;
using RealEstate.DAL.Persistance;
using Microsoft.EntityFrameworkCore;

namespace RealEstate.WebApi.Validators.FavoriteValidators
{
    public class FavoriteCreateValidator : AbstractValidator<FavoriteCreateModel>
    {
        private readonly RealEstateDbContext _context;

        public FavoriteCreateValidator(RealEstateDbContext context)
        {
            _context = context;

            RuleFor(x => x.UserId)
                .NotEmpty().WithMessage("ID користувача є обов'язковим полем")
                .MustAsync(async (userId, cancellation) => 
                    await _context.Users.AnyAsync(u => u.Id == userId))
                .WithMessage("Користувач не існує");

            RuleFor(x => x.PropertyId)
                .NotEmpty().WithMessage("ID нерухомості є обов'язковим полем")
                .MustAsync(async (propertyId, cancellation) => 
                    await _context.Properties.AnyAsync(p => p.Id == propertyId))
                .WithMessage("Нерухомість не існує")
                .MustAsync(async (model, propertyId, cancellation) => 
                    !await _context.Favorites.AnyAsync(f => f.UserId == model.UserId && f.PropertyId == propertyId))
                .WithMessage("Ця нерухомість вже додана до обраного");
        }
    }
} 