using Microsoft.AspNetCore.Mvc;
using RealEstate.BLL.Managers;
using RealEstate.BLL.Models.PropertyModels;
using RealEstate.DAL.Entities.Enums;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using RealEstate.DAL.Persistance;

namespace RealEstate.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertyController : ControllerBase
    {
        private readonly IPropertyManager _manager;
        private readonly ILogger<PropertyController> _logger;
        private readonly RealEstateDbContext _dataContext;

        public PropertyController(IPropertyManager manager, ILogger<PropertyController> logger, RealEstateDbContext dataContext)
        {
            _manager = manager;
            _logger = logger;
            _dataContext = dataContext;
        }

        [HttpGet]
        [ResponseCache(Duration = 300)] // ВИПРАВЛЕНО: кешування на 5 хвилин
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAll()
        {
            _logger.LogInformation("Getting all properties");
            
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Invalid model state when getting all properties");
                return BadRequest(ModelState);
            }

            var entities = await Task.FromResult(_manager.GetAll());
            _logger.LogInformation("Retrieved {Count} properties", entities.Count());
            return Ok(entities);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetById(Guid id)
        {
            _logger.LogInformation("Getting property by ID: {PropertyId}", id);
            
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Invalid model state when getting property by ID: {PropertyId}", id);
                return BadRequest(ModelState);
            }

            if (!await _manager.IsExists(id))
            {
                _logger.LogWarning("Property not found with ID: {PropertyId}", id);
                return NotFound();
            }

            var entity = await _manager.GetByIdAsync(id);
            _logger.LogInformation("Retrieved property: {PropertyId} - {Title}", id, entity.Title);
            return Ok(entity);
        }

        [HttpGet("search")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Search(
            [FromQuery] PropertyType? propertyType = null,
            [FromQuery] Location? location = null,
            [FromQuery] PropertyStatus? status = null,
            [FromQuery] decimal? minPrice = null,
            [FromQuery] decimal? maxPrice = null,
            [FromQuery] int? minBedrooms = null,
            [FromQuery] int? maxBedrooms = null,
            [FromQuery] int? minBathrooms = null,
            [FromQuery] int? maxBathrooms = null,
            [FromQuery] double? minSquareMeters = null,
            [FromQuery] double? maxSquareMeters = null,
            [FromQuery] List<string>? features = null,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            _logger.LogInformation("Searching properties with filters: Type={PropertyType}, Location={Location}, Status={Status}, Price={MinPrice}-{MaxPrice}, Page={Page}", 
                propertyType, location, status, minPrice, maxPrice, page);
            
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Invalid model state when searching properties");
                return BadRequest(ModelState);
            }

            try
            {
                var entities = await _manager.SearchAsync(
                    propertyType, location, status, minPrice, maxPrice,
                    minBedrooms, maxBedrooms, minBathrooms, maxBathrooms,
                    minSquareMeters, maxSquareMeters, features,
                    page, pageSize);
                _logger.LogInformation("Search completed: found {Count} properties", entities.Count());
                return Ok(entities);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to search properties");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("by-type/{propertyType}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetByType(PropertyType propertyType)
        {
            _logger.LogInformation("Getting properties by type: {PropertyType}", propertyType);
            
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Invalid model state when getting properties by type: {PropertyType}", propertyType);
                return BadRequest(ModelState);
            }

            var entities = await _manager.GetByTypeAsync(propertyType);
            _logger.LogInformation("Retrieved {Count} properties of type {PropertyType}", entities.Count(), propertyType);
            return Ok(entities);
        }

        [HttpGet("by-location/{location}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetByLocation(Location location)
        {
            _logger.LogInformation("Getting properties by location: {Location}", location);
            
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Invalid model state when getting properties by location: {Location}", location);
                return BadRequest(ModelState);
            }

            var entities = await _manager.GetByLocationAsync(location);
            _logger.LogInformation("Retrieved {Count} properties in location {Location}", entities.Count(), location);
            return Ok(entities);
        }

        [HttpGet("by-status/{status}")]
        [Authorize(Policy = "RequireAdmin")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetByStatus(PropertyStatus status)
        {
            _logger.LogInformation("Getting properties by status: {Status}", status);
            
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Invalid model state when getting properties by status: {Status}", status);
                return BadRequest(ModelState);
            }

            var entities = await _manager.GetByStatusAsync(status);
            _logger.LogInformation("Retrieved {Count} properties with status {Status}", entities.Count(), status);
            return Ok(entities);
        }

        [HttpGet("user/{userId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetByUser(Guid userId)
        {
            _logger.LogInformation("Getting properties by user: {UserId}", userId);
            
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Invalid model state when getting properties by user: {UserId}", userId);
                return BadRequest(ModelState);
            }

            var entities = await _manager.GetByUserAsync(userId);
            _logger.LogInformation("Retrieved {Count} properties for user {UserId}", entities.Count(), userId);
            return Ok(entities);
        }

        [HttpPost]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Create([FromForm] PropertyCreateModel model)
        {
            _logger.LogInformation("Creating new property: {Title}", model?.Title);
            _logger.LogInformation("Model Images count: {ImagesCount}", model?.Images?.Count ?? 0);
            _logger.LogInformation("Model ImageUrls count: {ImageUrlsCount}", model?.ImageUrls?.Count ?? 0);
            
            if (model == null)
            {
                _logger.LogWarning("Property creation failed: model is null");
                return BadRequest(ModelState);
            }

            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Property creation failed: invalid model state for {Title}", model.Title);
                _logger.LogWarning("ModelState errors: {Errors}", string.Join(", ", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage)));
                return BadRequest(ModelState);
            }

            try
            {
                // Set the current user's ID as the property owner
                var currentUserId = GetCurrentUserId();
                model = model with { UserId = currentUserId };

                var entity = await _manager.CreateAsync(model);
                _logger.LogInformation("Property created successfully: {PropertyId} - {Title}", entity.Id, entity.Title);
                return Ok(entity);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to create property: {Title}", model.Title);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Update([FromForm] PropertyUpdateModel model)
        {
            _logger.LogInformation("Updating property: {PropertyId}", model?.Id);
            
            if (model == null)
            {
                _logger.LogWarning("Property update failed: model is null");
                return BadRequest(ModelState);
            }

            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Property update failed: invalid model state for {PropertyId}", model.Id);
                return BadRequest(ModelState);
            }

            try
            {
                // Check if property exists
                if (!await _manager.IsExists(model.Id))
                {
                    _logger.LogWarning("Property not found for update: {PropertyId}", model.Id);
                    return NotFound();
                }

                // Check if user has permission to update this property
                var currentUserId = GetCurrentUserId();
                var isAdmin = User.IsInRole("Admin");
                
                if (!await _manager.CanUserModifyPropertyAsync(model.Id, currentUserId, isAdmin))
                {
                    _logger.LogWarning("User {UserId} attempted to update property {PropertyId} without permission", currentUserId, model.Id);
                    return Forbid();
                }

                // Preserve the original UserId from the existing property
                var existingUserId = await _manager.GetUserIdAsync(model.Id);
                model = model with { UserId = existingUserId };

                // Check if title is already used by another property
                try
                {
                    var propertyWithSameTitle = await _manager.GetByTitleAsync(model.Title);
                    if (propertyWithSameTitle.Id != model.Id)
                    {
                        _logger.LogWarning("Title {Title} is already used by another property", model.Title);
                        return Conflict("Title is already in use");
                    }
                }
                catch (Exception)
                {
                    // Title doesn't exist, which is good
                }

                var entity = await _manager.UpdateAsync(model);
                _logger.LogInformation("Property updated successfully: {PropertyId} - {Title}", entity.Id, entity.Title);
                return Ok(entity);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to update property: {PropertyId}", model.Id);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Delete(Guid id)
        {
            _logger.LogInformation("Deleting property with ID: {PropertyId}", id);
            
            if (!await _manager.IsExists(id))
            {
                _logger.LogWarning("Property not found for deletion: {PropertyId}", id);
                return NotFound();
            }

            try
            {
                // Check if user has permission to delete this property
                var currentUserId = GetCurrentUserId();
                var isAdmin = User.IsInRole("Admin");
                
                if (!await _manager.CanUserModifyPropertyAsync(id, currentUserId, isAdmin))
                {
                    _logger.LogWarning("User {UserId} attempted to delete property {PropertyId} without permission", currentUserId, id);
                    return Forbid();
                }

                var result = await _manager.DeleteAsync(id);
                _logger.LogInformation("Property deleted successfully: {PropertyId}", id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to delete property: {PropertyId}", id);
                return StatusCode(500, "Internal server error");
            }
        }

        // Image management endpoints
        [HttpPost("{propertyId}/images")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UploadImages(Guid propertyId, List<IFormFile> files)
        {
            _logger.LogInformation("Uploading images for property: {PropertyId}", propertyId);
            
            if (files == null || !files.Any())
            {
                _logger.LogWarning("No files provided for upload");
                return BadRequest("No files provided");
            }

            try
            {
                // Check if property exists
                if (!await _manager.IsExists(propertyId))
                {
                    _logger.LogWarning("Property not found for image upload: {PropertyId}", propertyId);
                    return NotFound();
                }

                // Check if user has permission to modify this property
                var currentUserId = GetCurrentUserId();
                var isAdmin = User.IsInRole("Admin");
                
                if (!await _manager.CanUserModifyPropertyAsync(propertyId, currentUserId, isAdmin))
                {
                    _logger.LogWarning("User {UserId} attempted to upload images to property {PropertyId} without permission", currentUserId, propertyId);
                    return Forbid();
                }

                var uploadedImages = new List<PropertyImageViewModel>();
                foreach (var file in files)
                {
                    var image = await _manager.AddImageAsync(propertyId, file);
                    uploadedImages.Add(image);
                }

                _logger.LogInformation("Successfully uploaded {Count} images for property: {PropertyId}", uploadedImages.Count, propertyId);
                return Ok(uploadedImages);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to upload images for property: {PropertyId}", propertyId);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("{propertyId}/images/{imageId}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteImage(Guid propertyId, Guid imageId)
        {
            _logger.LogInformation("Deleting image {ImageId} from property: {PropertyId}", imageId, propertyId);
            
            try
            {
                // Check if property exists
                if (!await _manager.IsExists(propertyId))
                {
                    _logger.LogWarning("Property not found for image deletion: {PropertyId}", propertyId);
                    return NotFound();
                }

                // Check if user has permission to modify this property
                var currentUserId = GetCurrentUserId();
                var isAdmin = User.IsInRole("Admin");
                
                if (!await _manager.CanUserModifyPropertyAsync(propertyId, currentUserId, isAdmin))
                {
                    _logger.LogWarning("User {UserId} attempted to delete image from property {PropertyId} without permission", currentUserId, propertyId);
                    return Forbid();
                }

                var result = await _manager.DeleteImageAsync(propertyId, imageId);
                _logger.LogInformation("Successfully deleted image {ImageId} from property: {PropertyId}", imageId, propertyId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to delete image {ImageId} from property: {PropertyId}", imageId, propertyId);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("{propertyId}/images/reorder")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ReorderImages(Guid propertyId, [FromBody] List<Guid> imageIds)
        {
            _logger.LogInformation("Reordering images for property: {PropertyId}", propertyId);
            
            if (imageIds == null || !imageIds.Any())
            {
                _logger.LogWarning("No image IDs provided for reordering");
                return BadRequest("No image IDs provided");
            }

            try
            {
                // Check if property exists
                if (!await _manager.IsExists(propertyId))
                {
                    _logger.LogWarning("Property not found for image reordering: {PropertyId}", propertyId);
                    return NotFound();
                }

                // Check if user has permission to modify this property
                var currentUserId = GetCurrentUserId();
                var isAdmin = User.IsInRole("Admin");
                
                if (!await _manager.CanUserModifyPropertyAsync(propertyId, currentUserId, isAdmin))
                {
                    _logger.LogWarning("User {UserId} attempted to reorder images for property {PropertyId} without permission", currentUserId, propertyId);
                    return Forbid();
                }

                var result = await _manager.ReorderImagesAsync(propertyId, imageIds);
                _logger.LogInformation("Successfully reordered images for property: {PropertyId}", propertyId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to reorder images for property: {PropertyId}", propertyId);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{propertyId}/images")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetPropertyImages(Guid propertyId)
        {
            _logger.LogInformation("Getting images for property: {PropertyId}", propertyId);
            
            try
            {
                // Check if property exists
                if (!await _manager.IsExists(propertyId))
                {
                    _logger.LogWarning("Property not found for getting images: {PropertyId}", propertyId);
                    return NotFound();
                }

                var images = await _manager.GetPropertyImagesAsync(propertyId);
                _logger.LogInformation("Retrieved {Count} images for property: {PropertyId}", images.Count, propertyId);
                return Ok(images);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to get images for property: {PropertyId}", propertyId);
                return StatusCode(500, "Internal server error");
            }
        }



        private Guid GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out var userId))
            {
                throw new UnauthorizedAccessException("User ID not found in token");
            }
            return userId;
        }
    }
} 