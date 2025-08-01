using Microsoft.AspNetCore.Mvc;
using RealEstate.BLL.Managers;
using RealEstate.BLL.Models.InquiryModels;

namespace RealEstate.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InquiryController : ControllerBase
    {
        private readonly InquiryManager _manager;

        public InquiryController(InquiryManager manager)
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

        [HttpGet("by-property/{propertyId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetByPropertyId(Guid propertyId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var entities = await _manager.GetByPropertyIdAsync(propertyId);
            return Ok(entities);
        }

        [HttpGet("by-user/{userId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetByUserId(Guid userId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var entities = await _manager.GetByUserIdAsync(userId);
            return Ok(entities);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Create(InquiryCreateModel model)
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
        public async Task<IActionResult> Update(InquiryUpdateModel model)
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