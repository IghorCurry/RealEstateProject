using Microsoft.AspNetCore.Mvc;
using RealEstate.BLL.Managers;
using RealEstate.BLL.Models.UserModels;

namespace RealEstate.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager _manager;

        public UserController(UserManager manager)
        {
            _manager = manager;
        }

        [HttpGet("get-all")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAll()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var entities = await Task.FromResult(_manager.GetAll());
            return Ok(entities);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetById(Guid id)
        {
            if (!await _manager.IsExists(id))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var entity = await _manager.GetByIdAsync(id);
            return Ok(entity);
        }

        [HttpGet("by-email/{email}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetByEmail(string email)
        {
            if (!await _manager.IsExists(email))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var entity = await _manager.GetByEmailAsync(email);
            return Ok(entity);
        }

        [HttpGet("by-username/{username}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetByUsername(string username)
        {
            if (!await _manager.IsExistsByUsername(username))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var entity = await _manager.GetByUsernameAsync(username);
            return Ok(entity);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Create(UserCreateModel model)
        {
            if (model == null)
                return BadRequest(ModelState);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var entity = await _manager.CreateAsync(model);
            return Ok(entity);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Update(UserUpdateModel model)
        {
            if (model == null)
                return BadRequest(ModelState);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var entity = await _manager.UpdateAsync(model);
            return Ok(entity);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Delete(Guid id)
        {
            if (!await _manager.IsExists(id))
                return NotFound();

            var result = await _manager.DeleteAsync(id);
            return Ok(result);
        }
    }
} 