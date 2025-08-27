using Microsoft.AspNetCore.Http;

namespace RealEstate.BLL.Managers.BlobStorageManager
{
    public interface IBlobStorageManager
    {
        Task<string> UploadImageAsync(IFormFile file, string containerName);
        Task<bool> DeleteImageAsync(string imageUrl, string containerName);
        Task<string> GetImageUrlAsync(string imageName, string containerName);
    }
}
