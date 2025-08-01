using Microsoft.AspNetCore.Mvc;
using RealEstate.BLL.Managers;
using RealEstate.BLL.Models.PropertyModels;
using RealEstate.DAL.Entities.Enums;

namespace RealEstate.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertyController : ControllerBase
    {
        private readonly PropertyManager _manager;

        public PropertyController(PropertyManager manager)
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
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var entities = await _manager.SearchAsync(
                propertyType, location, status, minPrice, maxPrice,
                minBedrooms, maxBedrooms, minBathrooms, maxBathrooms,
                minSquareMeters, maxSquareMeters, features,
                page, pageSize);
            return Ok(entities);
        }

        [HttpGet("by-type/{propertyType}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetByType(PropertyType propertyType)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var entities = await _manager.GetByTypeAsync(propertyType);
            return Ok(entities);
        }

        [HttpGet("by-location/{location}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetByLocation(Location location)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var entities = await _manager.GetByLocationAsync(location);
            return Ok(entities);
        }

        [HttpGet("by-status/{status}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetByStatus(PropertyStatus status)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var entities = await _manager.GetByStatusAsync(status);
            return Ok(entities);
        }

        [HttpGet("user/{userId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetByUser(Guid userId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var entities = await _manager.GetByUserAsync(userId);
            return Ok(entities);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Create(PropertyCreateModel model)
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
        public async Task<IActionResult> Update(PropertyUpdateModel model)
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