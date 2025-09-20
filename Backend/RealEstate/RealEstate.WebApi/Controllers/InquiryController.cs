using Microsoft.AspNetCore.Mvc;
using RealEstate.BLL.Managers;
using RealEstate.BLL.Models.InquiryModels;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;

namespace RealEstate.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InquiryController : ControllerBase
    {
        private readonly IInquiryManager _manager;
        private readonly ILogger<InquiryController> _logger;

        public InquiryController(IInquiryManager manager, ILogger<InquiryController> logger)
        {
            _manager = manager;
            _logger = logger;
        }
        [HttpGet("my")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetMyInquiries()
        {
            try
            {
                var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
                if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out var currentUserId))
                {
                    return Unauthorized();
                }

                var data = await _manager.GetMyInquiriesAsync(currentUserId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to get current user's inquiries");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet]
        [Authorize(Policy = "RequireAdmin")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAll()
        {
            _logger.LogInformation("Getting all inquiries");
            
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Invalid model state when getting all inquiries");
                return BadRequest(ModelState);
            }

            var entities = await Task.FromResult(_manager.GetAll());
            _logger.LogInformation("Retrieved {Count} inquiries", entities.Count());
            return Ok(entities);
        }

        [HttpGet("{id}")]
        [Authorize(Policy = "RequireAdmin")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetById(Guid id)
        {
            _logger.LogInformation("Getting inquiry by ID: {InquiryId}", id);
            
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Invalid model state when getting inquiry by ID: {InquiryId}", id);
                return BadRequest(ModelState);
            }

            if (!await _manager.IsExists(id))
            {
                _logger.LogWarning("Inquiry not found with ID: {InquiryId}", id);
                return NotFound();
            }

            var entity = await _manager.GetByIdAsync(id);
            _logger.LogInformation("Retrieved inquiry: {InquiryId}", id);
            return Ok(entity);
        }

        [HttpGet("by-property/{propertyId}")]
        [Authorize(Policy = "RequireAdmin")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetByPropertyId(Guid propertyId)
        {
            _logger.LogInformation("Getting inquiries by property ID: {PropertyId}", propertyId);
            
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Invalid model state when getting inquiries by property ID: {PropertyId}", propertyId);
                return BadRequest(ModelState);
            }

            var entities = await _manager.GetByPropertyIdAsync(propertyId);
            _logger.LogInformation("Retrieved {Count} inquiries for property {PropertyId}", entities.Count(), propertyId);
            return Ok(entities);
        }

        [HttpGet("by-user/{userId}")]
        [Authorize(Policy = "RequireAdmin")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetByUserId(Guid userId)
        {
            _logger.LogInformation("Getting inquiries by user ID: {UserId}", userId);
            
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Invalid model state when getting inquiries by user ID: {UserId}", userId);
                return BadRequest(ModelState);
            }

            var entities = await _manager.GetByUserIdAsync(userId);
            _logger.LogInformation("Retrieved {Count} inquiries for user {UserId}", entities.Count(), userId);
            return Ok(entities);
        }

        [HttpPost]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Create(InquiryCreateModel model)
        {
            _logger.LogInformation("Creating new inquiry for property: {PropertyId}", model?.PropertyId);
            
            if (model == null)
            {
                _logger.LogWarning("Inquiry creation failed: model is null");
                return BadRequest(ModelState);
            }

            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Inquiry creation failed: invalid model state for property {PropertyId}", model.PropertyId);
                return BadRequest(ModelState);
            }

            try
            {
                // Ensure UserId is always set from the authenticated user
                var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
                if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out var currentUserId))
                {
                    return Unauthorized();
                }

                var createModel = new InquiryCreateModel
                {
                    Message = model.Message,
                    PropertyId = model.PropertyId,
                    UserId = currentUserId,
                    Name = model.Name,
                    Email = model.Email,
                    Phone = model.Phone
                };

                var entity = await _manager.CreateAsync(createModel);
                _logger.LogInformation("Inquiry created successfully: {InquiryId} for property {PropertyId}", entity.Id, entity.PropertyId);
                return Ok(entity);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to create inquiry for property: {PropertyId}", model.PropertyId);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "RequireAdmin")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Update(InquiryUpdateModel model)
        {
            _logger.LogInformation("Updating inquiry: {InquiryId}", model?.Id);
            
            if (model == null)
            {
                _logger.LogWarning("Inquiry update failed: model is null");
                return BadRequest(ModelState);
            }

            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Inquiry update failed: invalid model state for {InquiryId}", model.Id);
                return BadRequest(ModelState);
            }

            try
            {
                var entity = await _manager.UpdateAsync(model);
                _logger.LogInformation("Inquiry updated successfully: {InquiryId}", entity.Id);
                return Ok(entity);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to update inquiry: {InquiryId}", model.Id);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Delete(Guid id)
        {
            _logger.LogInformation("Deleting inquiry with ID: {InquiryId}", id);
            
            if (!await _manager.IsExists(id))
            {
                _logger.LogWarning("Inquiry not found for deletion: {InquiryId}", id);
                return NotFound();
            }

            try
            {
                var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
                var roleClaim = User.FindFirst(System.Security.Claims.ClaimTypes.Role);
                if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out var currentUserId))
                {
                    return Unauthorized();
                }

                var isAdmin = roleClaim != null && roleClaim.Value == "Admin";
                var currentUserEmail = User.FindFirst(System.Security.Claims.ClaimTypes.Email)?.Value;

                var result = await _manager.DeleteAsync(id, currentUserId, isAdmin, currentUserEmail);
                if (!result)
                {
                    _logger.LogWarning("Forbidden delete attempt for inquiry {InquiryId} by user {UserId}", id, currentUserId);
                    return Forbid();
                }

                _logger.LogInformation("Inquiry deleted successfully: {InquiryId}", id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to delete inquiry: {InquiryId}", id);
                return StatusCode(500, "Internal server error");
            }
        }
    }
} 