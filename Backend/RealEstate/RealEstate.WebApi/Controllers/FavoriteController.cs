using Microsoft.AspNetCore.Mvc;
using RealEstate.BLL.Managers.FavoriteManager;
using RealEstate.BLL.Models.FavoriteModels;

namespace RealEstate.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteController : ControllerBase
    {
        private readonly FavoriteManager _manager;

        public FavoriteController(FavoriteManager manager)
        {
            _manager = manager;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AddToFavorites(FavoriteCreateModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _manager.CreateAsync(model);
            return Ok(result);
        }

        [HttpDelete("{userId}/{propertyId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> RemoveFromFavorites(Guid userId, Guid propertyId)
        {
            var result = await _manager.DeleteAsync(userId, propertyId);
            
            if (!result)
                return NotFound();

            return Ok(new { message = "Removed from favorites" });
        }

        [HttpGet("user/{userId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetUserFavorites(Guid userId)
        {
            var favorites = await _manager.GetUserFavoritesAsync(userId);
            return Ok(favorites);
        }

        [HttpGet("check/{userId}/{propertyId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CheckIfFavorite(Guid userId, Guid propertyId)
        {
            var isFavorite = await _manager.IsFavoriteAsync(userId, propertyId);
            return Ok(new { isFavorite });
        }

        [HttpGet("count/{propertyId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetFavoriteCount(Guid propertyId)
        {
            var count = await _manager.GetFavoriteCountAsync(propertyId);
            return Ok(new { count });
        }
    }
} 