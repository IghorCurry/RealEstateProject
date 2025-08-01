using FluentValidation;
using RealEstate.BLL.Models.FavoriteModels;

namespace RealEstate.WebApi.Validators.FavoriteValidators
{
    public class FavoriteCreateValidator : AbstractValidator<FavoriteCreateModel>
    {
        public FavoriteCreateValidator()
        {
            RuleFor(x => x.UserId)
                .NotEmpty().WithMessage("ID користувача є обов'язковим полем");

            RuleFor(x => x.PropertyId)
                .NotEmpty().WithMessage("ID нерухомості є обов'язковим полем");
        }
    }
} 