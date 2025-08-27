using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace RealEstate.BLL.Managers.BlobStorageManager
{
    public class BlobStorageManager : IBlobStorageManager
    {
        private readonly BlobServiceClient _blobServiceClient;
        private readonly string _connectionString;

        public BlobStorageManager(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("AzureStorage");
            _blobServiceClient = new BlobServiceClient(_connectionString);
        }

        public async Task<string> UploadImageAsync(IFormFile file, string containerName)
        {
            try
            {
                // Створюємо унікальну назву файлу
                var fileName = $"{Guid.NewGuid()}_{file.FileName}";
                
                // Отримуємо контейнер
                var containerClient = _blobServiceClient.GetBlobContainerClient(containerName);
                await containerClient.CreateIfNotExistsAsync();

                // Отримуємо blob client
                var blobClient = containerClient.GetBlobClient(fileName);

                // Завантажуємо файл
                using var stream = file.OpenReadStream();
                await blobClient.UploadAsync(stream, overwrite: true);

                // Повертаємо URL файлу
                return blobClient.Uri.ToString();
            }
            catch (Exception ex)
            {
                throw new Exception($"Error uploading image: {ex.Message}");
            }
        }

        public async Task<bool> DeleteImageAsync(string imageUrl, string containerName)
        {
            try
            {
                // Отримуємо назву файлу з URL
                var uri = new Uri(imageUrl);
                var fileName = Path.GetFileName(uri.LocalPath);

                // Отримуємо контейнер
                var containerClient = _blobServiceClient.GetBlobContainerClient(containerName);
                
                // Отримуємо blob client
                var blobClient = containerClient.GetBlobClient(fileName);

                // Видаляємо файл
                var response = await blobClient.DeleteIfExistsAsync();
                return response.Value;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error deleting image: {ex.Message}");
            }
        }

        public async Task<string> GetImageUrlAsync(string imageName, string containerName)
        {
            try
            {
                // Отримуємо контейнер
                var containerClient = _blobServiceClient.GetBlobContainerClient(containerName);
                
                // Отримуємо blob client
                var blobClient = containerClient.GetBlobClient(imageName);

                // Перевіряємо чи існує файл
                if (await blobClient.ExistsAsync())
                {
                    return blobClient.Uri.ToString();
                }

                return string.Empty;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error getting image URL: {ex.Message}");
            }
        }
    }
}
