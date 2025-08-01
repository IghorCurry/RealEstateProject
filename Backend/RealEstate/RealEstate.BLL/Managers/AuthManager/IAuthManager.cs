using RealEstate.BLL.Models.AuthModels;

namespace RealEstate.BLL.Managers
{
    internal interface IAuthManager
    {
        public Task<TokenPairModel> LoginAsync(UserLoginModel model);
        public Task<TokenPairModel> RegisterAsync(UserRegisterModel model);
        public Task<TokenPairModel> RefreshTokenAsync(string refreshToken);
        public Task<bool> LogoutAsync(string refreshToken);
        public Task<bool> ValidateTokenAsync(string token);
    }
} 