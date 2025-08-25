using Microsoft.AspNetCore.Mvc;
using RealEstate.BLL.Managers;
using RealEstate.BLL.Models.FavoriteModels;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;

namespace RealEstate.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteController : ControllerBase
    {
        private readonly IFavoriteManager _manager;
        private readonly ILogger<FavoriteController> _logger;

        public FavoriteController(IFavoriteManager manager, ILogger<FavoriteController> logger)
        {
            _manager = manager;
            _logger = logger;
        }

        [HttpPost]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AddToFavorites(FavoriteCreateModel model)
        {
            if (model == null)
            {
                _logger.LogWarning("Add to favorites failed: model is null");
                return BadRequest(ModelState);
            }

            // ВИПРАВЛЕНО: перевірка, чи користувач додає до обраного від свого імені
            var currentUserId = GetCurrentUserId();
            if (model.UserId != currentUserId)
            {
                _logger.LogWarning("User {CurrentUserId} attempted to add favorites for user {TargetUserId}", currentUserId, model.UserId);
                return Forbid("Можна додавати тільки свої обране");
            }

            _logger.LogInformation("Adding property {PropertyId} to favorites for user {UserId}", model.PropertyId, model.UserId);
            
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Add to favorites failed: invalid model state");
                return BadRequest(ModelState);
            }

            try
            {
                var result = await _manager.CreateAsync(model);
                _logger.LogInformation("Property {PropertyId} added to favorites for user {UserId}", model.PropertyId, model.UserId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to add property {PropertyId} to favorites for user {UserId}", model.PropertyId, model.UserId);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("{userId}/{propertyId}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> RemoveFromFavorites(Guid userId, Guid propertyId)
        {
            // ВИПРАВЛЕНО: перевірка, чи користувач видаляє своє обране
            var currentUserId = GetCurrentUserId();
            if (userId != currentUserId)
            {
                _logger.LogWarning("User {CurrentUserId} attempted to remove favorites for user {TargetUserId}", currentUserId, userId);
                return Forbid("Можна видаляти тільки свої обране");
            }

            _logger.LogInformation("Removing property {PropertyId} from favorites for user {UserId}", propertyId, userId);
            
            try
            {
                var result = await _manager.DeleteAsync(userId, propertyId);
                
                if (!result)
                {
                    _logger.LogWarning("Property {PropertyId} not found in favorites for user {UserId}", propertyId, userId);
                    return NotFound();
                }

                _logger.LogInformation("Property {PropertyId} removed from favorites for user {UserId}", propertyId, userId);
                return Ok(new { message = "Removed from favorites" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to remove property {PropertyId} from favorites for user {UserId}", propertyId, userId);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("user/{userId}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetUserFavorites(Guid userId)
        {
            // ВИПРАВЛЕНО: перевірка, чи користувач переглядає своє обране
            var currentUserId = GetCurrentUserId();
            if (userId != currentUserId)
            {
                _logger.LogWarning("User {CurrentUserId} attempted to view favorites for user {TargetUserId}", currentUserId, userId);
                return Forbid("Можна переглядати тільки свої обране");
            }

            _logger.LogInformation("Getting favorites for user: {UserId}", userId);
            
            try
            {
                var favorites = await _manager.GetUserFavoritesAsync(userId);
                _logger.LogInformation("Retrieved {Count} favorites for user {UserId}", favorites.Count(), userId);
                return Ok(favorites);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to get favorites for user: {UserId}", userId);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("check/{userId}/{propertyId}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CheckIfFavorite(Guid userId, Guid propertyId)
        {
            // ВИПРАВЛЕНО: перевірка, чи користувач перевіряє своє обране
            var currentUserId = GetCurrentUserId();
            if (userId != currentUserId)
            {
                _logger.LogWarning("User {CurrentUserId} attempted to check favorites for user {TargetUserId}", currentUserId, userId);
                return Forbid("Можна перевіряти тільки свої обране");
            }

            _logger.LogInformation("Checking if property {PropertyId} is favorite for user {UserId}", propertyId, userId);
            
            try
            {
                var isFavorite = await _manager.IsFavoriteAsync(userId, propertyId);
                _logger.LogInformation("Property {PropertyId} is favorite for user {UserId}: {IsFavorite}", propertyId, userId, isFavorite);
                return Ok(new { isFavorite });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to check if property {PropertyId} is favorite for user {UserId}", propertyId, userId);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("count/{propertyId}")]
        [Authorize(Policy = "RequireAdmin")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetFavoriteCount(Guid propertyId)
        {
            _logger.LogInformation("Getting favorite count for property: {PropertyId}", propertyId);
            
            try
            {
                var count = await _manager.GetFavoriteCountAsync(propertyId);
                _logger.LogInformation("Property {PropertyId} has {Count} favorites", propertyId, count);
                return Ok(new { count });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to get favorite count for property: {PropertyId}", propertyId);
                return StatusCode(500, "Internal server error");
            }
        }

        // ВИПРАВЛЕНО: додано метод для отримання ID поточного користувача
        private Guid GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out var userId))
            {
                throw new UnauthorizedAccessException("User ID not found in token");
            }
            return userId;
        }
    }
} 