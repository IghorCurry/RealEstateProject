using FluentValidation;
using RealEstate.BLL.Models.UserModels;

namespace RealEstate.WebApi.Validators.UserValidators
{
    public class UserUpdateValidator : AbstractValidator<UserUpdateModel>
    {
        public UserUpdateValidator()
        {
            Include(new UserCreateValidator());

            RuleFor(x => x.Id)
                .NotEmpty().WithMessage("ID користувача є обов'язковим полем");
        }
    }
} 