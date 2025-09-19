using Microsoft.AspNetCore.Mvc;
using RealEstate.BLL.Managers;
using RealEstate.BLL.Models.AuthModels;
using Microsoft.Extensions.Logging;

namespace RealEstate.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthManager _manager;
        private readonly ILogger<AuthController> _logger;

        public AuthController(IAuthManager manager, ILogger<AuthController> logger)
        {
            _manager = manager;
            _logger = logger;
        }

        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Login(UserLoginModel model)
        {
            _logger.LogInformation("Login attempt for user: {Email}", model?.Email);
            
            if (model == null)
            {
                _logger.LogWarning("Login failed: model is null");
                return BadRequest(ModelState);
            }

            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Login failed: invalid model state for {Email}", model.Email);
                return BadRequest(ModelState);
            }

            try
            {
                var result = await _manager.LoginAsync(model);
                _logger.LogInformation("User logged in successfully: {Email}", model.Email);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Login failed for user: {Email}", model.Email);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("register")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Register(UserRegisterModel model)
        {
            _logger.LogInformation("Registration attempt for user: {Email}", model?.Email);
            
            if (model == null)
            {
                _logger.LogWarning("Registration failed: model is null");
                return BadRequest(ModelState);
            }

            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Registration failed: invalid model state for {Email}", model.Email);
                return BadRequest(ModelState);
            }

            try
            {
                var result = await _manager.RegisterAsync(model);
                _logger.LogInformation("User registered successfully: {Email}", model.Email);
                return Ok(result);
            }
            catch (Exception ex)
            {
                var message = ex.Message ?? "Registration failed";
                _logger.LogWarning(ex, "Registration business error for user: {Email}", model.Email);

                if (message.Contains("already exists", StringComparison.OrdinalIgnoreCase))
                {
                    return Conflict(new { message });
                }

                if (message.Contains("Invalid phone", StringComparison.OrdinalIgnoreCase) ||
                    message.Contains("password", StringComparison.OrdinalIgnoreCase) ||
                    message.Contains("Failed to create user", StringComparison.OrdinalIgnoreCase))
                {
                    return BadRequest(new { message });
                }

                _logger.LogError(ex, "Registration unexpected error for user: {Email}", model.Email);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("refresh-token")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> RefreshToken(RefreshTokenModel model)
        {
            _logger.LogInformation("Token refresh attempt");
            
            if (model == null || string.IsNullOrEmpty(model.RefreshToken))
            {
                _logger.LogWarning("Token refresh failed: refresh token is null or empty");
                return BadRequest(ModelState);
            }

            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Token refresh failed: invalid model state");
                return BadRequest(ModelState);
            }

            try
            {
                var result = await _manager.RefreshTokenAsync(model.RefreshToken);
                _logger.LogInformation("Token refreshed successfully");
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Token refresh failed");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("logout")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Logout(RefreshTokenModel model)
        {
            _logger.LogInformation("Logout attempt");
            
            if (model == null || string.IsNullOrEmpty(model.RefreshToken))
            {
                _logger.LogWarning("Logout failed: refresh token is null or empty");
                return BadRequest(ModelState);
            }

            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Logout failed: invalid model state");
                return BadRequest(ModelState);
            }

            try
            {
                var result = await _manager.LogoutAsync(model.RefreshToken);
                _logger.LogInformation("User logged out successfully");
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Logout failed");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("validate-token")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult ValidateToken([FromBody] string token)
        {
            _logger.LogInformation("Token validation attempt");
            
            if (string.IsNullOrEmpty(token))
            {
                _logger.LogWarning("Token validation failed: token is null or empty");
                return BadRequest(ModelState);
            }

            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Token validation failed: invalid model state");
                return BadRequest(ModelState);
            }

            try
            {
                var result = _manager.ValidateTokenAsync(token);
                _logger.LogInformation("Token validation completed");
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Token validation failed");
                return StatusCode(500, "Internal server error");
            }
        }
    }
} 