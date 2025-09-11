using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace RealEstate.BLL.Managers.BlobStorageManager
{
    public class BlobStorageManager : IBlobStorageManager
    {
        private readonly HttpClient _httpClient;
        private readonly string _supabaseUrl;
        private readonly string _supabaseKey;
        private readonly string _bucketName = "real-estate-images";

        public BlobStorageManager(IConfiguration configuration, HttpClient httpClient)
        {
            _httpClient = httpClient;
            _supabaseUrl = configuration["Supabase:Url"] ?? throw new ArgumentNullException("Supabase:Url");
            _supabaseKey = configuration["Supabase:AnonKey"] ?? throw new ArgumentNullException("Supabase:AnonKey");
            
            _httpClient.DefaultRequestHeaders.Add("apikey", _supabaseKey);
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {_supabaseKey}");
        }

        public async Task<string> UploadImageAsync(IFormFile file, string containerName)
        {
            try
            {
                // Створюємо унікальну назву файлу
                var fileName = $"{Guid.NewGuid()}_{file.FileName}";
                
                // Читаємо файл в байти
                using var memoryStream = new MemoryStream();
                await file.CopyToAsync(memoryStream);
                var fileBytes = memoryStream.ToArray();

                // Завантажуємо в Supabase Storage через HTTP API
                var uploadUrl = $"{_supabaseUrl}/storage/v1/object/{_bucketName}/{fileName}";
                
                using var content = new ByteArrayContent(fileBytes);
                content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue(file.ContentType);
                
                var response = await _httpClient.PostAsync(uploadUrl, content);
                response.EnsureSuccessStatusCode();

                // Повертаємо публічний URL
                return $"{_supabaseUrl}/storage/v1/object/public/{_bucketName}/{fileName}";
            }
            catch (Exception ex)
            {
                throw new Exception($"Error uploading image to Supabase: {ex.Message}");
            }
        }

        public async Task<bool> DeleteImageAsync(string imageUrl, string containerName)
        {
            try
            {
                // Отримуємо назву файлу з URL
                var uri = new Uri(imageUrl);
                var fileName = Path.GetFileName(uri.LocalPath);

                // Видаляємо з Supabase Storage через HTTP API
                var deleteUrl = $"{_supabaseUrl}/storage/v1/object/{_bucketName}/{fileName}";
                
                var response = await _httpClient.DeleteAsync(deleteUrl);
                return response.IsSuccessStatusCode;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error deleting image from Supabase: {ex.Message}");
            }
        }

        public Task<string> GetImageUrlAsync(string imageName, string containerName)
        {
            try
            {
                // Отримуємо публічний URL з Supabase Storage
                var url = $"{_supabaseUrl}/storage/v1/object/public/{_bucketName}/{imageName}";
                return Task.FromResult(url);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error getting image URL from Supabase: {ex.Message}");
            }
        }
    }
}
