using Microsoft.AspNetCore.Mvc;
using RealEstate.BLL.Managers.BlobStorageManager;

namespace RealEstate.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImageController : ControllerBase
    {
        private readonly IBlobStorageManager _blobStorageManager;
        private const string ContainerName = "property-images";

        public ImageController(IBlobStorageManager blobStorageManager)
        {
            _blobStorageManager = blobStorageManager;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                {
                    return BadRequest("No file uploaded");
                }

                var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".webp" };
                var fileExtension = Path.GetExtension(file.FileName).ToLowerInvariant();
                
                if (!allowedExtensions.Contains(fileExtension))
                {
                    return BadRequest("Invalid file type. Only JPG, PNG, GIF, and WebP are allowed.");
                }

                if (file.Length > 10 * 1024 * 1024)
                {
                    return BadRequest("File size too large. Maximum size is 10MB.");
                }

                var imageUrl = await _blobStorageManager.UploadImageAsync(file, ContainerName);

                return Ok(new { imageUrl });
            }
            catch (Exception ex)
            {
                return BadRequest($"Error uploading image: {ex.Message}");
            }
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteImage([FromQuery] string imageUrl)
        {
            try
            {
                if (string.IsNullOrEmpty(imageUrl))
                {
                    return BadRequest("Image URL is required");
                }

                var result = await _blobStorageManager.DeleteImageAsync(imageUrl, ContainerName);

                if (result)
                {
                    return Ok("Image deleted successfully");
                }
                else
                {
                    return NotFound("Image not found");
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error deleting image: {ex.Message}");
            }
        }

        [HttpGet("url")]
        public async Task<IActionResult> GetImageUrl([FromQuery] string imageName)
        {
            try
            {
                if (string.IsNullOrEmpty(imageName))
                {
                    return BadRequest("Image name is required");
                }

                var imageUrl = await _blobStorageManager.GetImageUrlAsync(imageName, ContainerName);

                if (!string.IsNullOrEmpty(imageUrl))
                {
                    return Ok(new { imageUrl });
                }
                else
                {
                    return NotFound("Image not found");
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error getting image URL: {ex.Message}");
            }
        }
    }
}
