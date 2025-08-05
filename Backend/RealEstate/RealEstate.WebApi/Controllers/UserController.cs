using Microsoft.AspNetCore.Mvc;
using RealEstate.BLL.Managers;
using RealEstate.BLL.Models.UserModels;
using Microsoft.Extensions.Logging;

namespace RealEstate.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager _manager;
        private readonly ILogger<UserController> _logger;

        public UserController(UserManager manager, ILogger<UserController> logger)
        {
            _manager = manager;
            _logger = logger;
        }

        [HttpGet("get-all")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAll()
        {
            _logger.LogInformation("Getting all users");
            
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Invalid model state when getting all users");
                return BadRequest(ModelState);
            }

            var entities = await Task.FromResult(_manager.GetAll());
            _logger.LogInformation("Retrieved {Count} users", entities.Count());
            return Ok(entities);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetById(Guid id)
        {
            _logger.LogInformation("Getting user by ID: {UserId}", id);
            
            if (!await _manager.IsExists(id))
            {
                _logger.LogWarning("User not found with ID: {UserId}", id);
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Invalid model state when getting user by ID: {UserId}", id);
                return BadRequest(ModelState);
            }

            var entity = await _manager.GetByIdAsync(id);
            _logger.LogInformation("Retrieved user: {UserId} - {Email}", id, entity.Email);
            return Ok(entity);
        }

        [HttpGet("by-email/{email}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetByEmail(string email)
        {
            _logger.LogInformation("Getting user by email: {Email}", email);
            
            if (!await _manager.IsExists(email))
            {
                _logger.LogWarning("User not found with email: {Email}", email);
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Invalid model state when getting user by email: {Email}", email);
                return BadRequest(ModelState);
            }

            var entity = await _manager.GetByEmailAsync(email);
            _logger.LogInformation("Retrieved user by email: {Email} - {UserId}", email, entity.Id);
            return Ok(entity);
        }

        [HttpGet("by-username/{username}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetByUsername(string username)
        {
            _logger.LogInformation("Getting user by username: {Username}", username);
            
            if (!await _manager.IsExistsByUsername(username))
            {
                _logger.LogWarning("User not found with username: {Username}", username);
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Invalid model state when getting user by username: {Username}", username);
                return BadRequest(ModelState);
            }

            var entity = await _manager.GetByUsernameAsync(username);
            _logger.LogInformation("Retrieved user by username: {Username} - {UserId}", username, entity.Id);
            return Ok(entity);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Create(UserCreateModel model)
        {
            _logger.LogInformation("Creating new user: {Email}", model?.Email);
            
            if (model == null)
            {
                _logger.LogWarning("User creation failed: model is null");
                return BadRequest(ModelState);
            }

            if (!ModelState.IsValid)
            {
                _logger.LogWarning("User creation failed: invalid model state for {Email}", model.Email);
                return BadRequest(ModelState);
            }

            try
            {
                var entity = await _manager.CreateAsync(model);
                _logger.LogInformation("User created successfully: {UserId} - {Email}", entity.Id, entity.Email);
                return Ok(entity);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to create user: {Email}", model.Email);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Update(UserUpdateModel model)
        {
            _logger.LogInformation("Updating user: {UserId}", model?.Id);
            
            if (model == null)
            {
                _logger.LogWarning("User update failed: model is null");
                return BadRequest(ModelState);
            }

            if (!ModelState.IsValid)
            {
                _logger.LogWarning("User update failed: invalid model state for {UserId}", model.Id);
                return BadRequest(ModelState);
            }

            try
            {
                var entity = await _manager.UpdateAsync(model);
                _logger.LogInformation("User updated successfully: {UserId} - {Email}", entity.Id, entity.Email);
                return Ok(entity);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to update user: {UserId}", model.Id);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Delete(Guid id)
        {
            _logger.LogInformation("Deleting user with ID: {UserId}", id);
            
            if (!await _manager.IsExists(id))
            {
                _logger.LogWarning("User not found for deletion: {UserId}", id);
                return NotFound();
            }

            try
            {
                var result = await _manager.DeleteAsync(id);
                _logger.LogInformation("User deleted successfully: {UserId}", id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to delete user: {UserId}", id);
                return StatusCode(500, "Internal server error");
            }
        }
    }
} 