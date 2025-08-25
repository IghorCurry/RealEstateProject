using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using RealEstate.DAL.Entities;
using RealEstate.BLL.Models.AuthModels;
using RealEstate.BLL.Models.UserModels;
using RealEstate.DAL.Persistance.Settings;

namespace RealEstate.BLL.Managers
{
    public class AuthManager : IAuthManager
    {
        private readonly UserManager<User> _userManager;
        private readonly AccessTokenSettings _accessTokenSettings;

        public AuthManager(
            UserManager<User> userManager, 
            IOptions<AccessTokenSettings> accessTokenSettings)
        {
            _userManager = userManager;
            _accessTokenSettings = accessTokenSettings.Value;
        }

        public async Task<TokenPairModel> LoginAsync(UserLoginModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                throw new Exception("Invalid email or password");
            }

            var isPasswordValid = await _userManager.CheckPasswordAsync(user, model.Password);
            if (!isPasswordValid)
            {
                throw new Exception("Invalid email or password");
            }

            return await GenerateTokenPairAsync(user);
        }

        public async Task<TokenPairModel> RegisterAsync(UserRegisterModel model)
        {
            var existingUser = await _userManager.FindByEmailAsync(model.Email);
            if (existingUser != null)
            {
                throw new Exception("User with this email already exists");
            }

            var user = new User
            {
                UserName = model.Email,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                PhoneNumber = model.PhoneNumber
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                throw new Exception($"Failed to create user: {string.Join(", ", result.Errors.Select(e => e.Description))}");
            }

            // Assign default role to new user
            await _userManager.AddToRoleAsync(user, "User");

            return await GenerateTokenPairAsync(user);
        }

        public async Task<TokenPairModel> RefreshTokenAsync(string refreshToken)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_accessTokenSettings.SigningKey);
            
            try
            {
                var tokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidIssuer = _accessTokenSettings.Issuer,
                    ValidAudience = _accessTokenSettings.Audience,
                    ClockSkew = TimeSpan.Zero
                };

                var principal = tokenHandler.ValidateToken(refreshToken, tokenValidationParameters, out var validatedToken);
                
                var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId) || !Guid.TryParse(userId, out var userGuid))
                {
                    throw new Exception("Invalid refresh token");
                }

                var user = await _userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    throw new Exception("User not found");
                }

                return await GenerateTokenPairAsync(user);
            }
            catch
            {
                throw new Exception("Invalid refresh token");
            }
        }

        public Task<bool> LogoutAsync(string refreshToken)
        {
            // In a real application, you would invalidate the refresh token
            // by storing it in a blacklist or marking it as revoked in the database
            return Task.FromResult(true);
        }

        public bool ValidateTokenAsync(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_accessTokenSettings.SigningKey);
            
            try
            {
                var tokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidIssuer = _accessTokenSettings.Issuer,
                    ValidAudience = _accessTokenSettings.Audience,
                    ClockSkew = TimeSpan.Zero
                };

                tokenHandler.ValidateToken(token, tokenValidationParameters, out var validatedToken);
                return true;
            }
            catch
            {
                return false;
            }
        }

        private async Task<TokenPairModel> GenerateTokenPairAsync(User user)
        {
            var accessToken = await GenerateAccessTokenAsync(user);
            var refreshToken = GenerateRefreshTokenAsync(user);
            var userViewModel = await MapUserToViewModel(user);

            return new TokenPairModel
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                AccessTokenExpiresAt = DateTime.UtcNow.AddHours(1),
                RefreshTokenExpiresAt = DateTime.UtcNow.AddDays(7),
                TokenType = "Bearer",
                User = userViewModel
            };
        }

        private async Task<string> GenerateAccessTokenAsync(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_accessTokenSettings.SigningKey);
            
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName ?? ""),
                new Claim(ClaimTypes.Email, user.Email ?? "")
            };

            var roles = await _userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1),
                Issuer = _accessTokenSettings.Issuer,
                Audience = _accessTokenSettings.Audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private string GenerateRefreshTokenAsync(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_accessTokenSettings.SigningKey);
            
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim("type", "refresh")
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7),
                Issuer = _accessTokenSettings.Issuer,
                Audience = _accessTokenSettings.Audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private async Task<UserViewModel> MapUserToViewModel(User user)
        {
            var roles = await _userManager.GetRolesAsync(user);
            var role = roles.FirstOrDefault() ?? "User";

            return new UserViewModel
            {
                Id = user.Id,
                FirstName = user.FirstName ?? "",
                LastName = user.LastName ?? "",
                Email = user.Email ?? "",
                UserName = user.UserName ?? "",
                PhoneNumber = user.PhoneNumber ?? "",
                FullName = $"{user.FirstName ?? ""} {user.LastName ?? ""}".Trim(),
                CreatedAt = user.CreatedAt,
                Role = role
            };
        }
    }
} 