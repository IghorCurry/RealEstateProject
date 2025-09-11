using Supabase.Storage;
using Supabase;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace RealEstate.BLL.Managers.BlobStorageManager
{
    public class BlobStorageManager : IBlobStorageManager
    {
        private readonly SupabaseClient _supabaseClient;
        private readonly string _bucketName = "real-estate-images";

        public BlobStorageManager(IConfiguration configuration)
        {
            var supabaseUrl = configuration["Supabase:Url"];
            var supabaseKey = configuration["Supabase:AnonKey"];
            
            _supabaseClient = new SupabaseClient(supabaseUrl, supabaseKey);
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

                // Завантажуємо в Supabase Storage
                var result = await _supabaseClient.Storage
                    .From(_bucketName)
                    .Upload(fileBytes, fileName);

                // Повертаємо публічний URL
                return _supabaseClient.Storage.From(_bucketName).GetPublicUrl(fileName);
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

                // Видаляємо з Supabase Storage
                var result = await _supabaseClient.Storage
                    .From(_bucketName)
                    .Remove(new[] { fileName });

                return result.Count > 0;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error deleting image from Supabase: {ex.Message}");
            }
        }

        public async Task<string> GetImageUrlAsync(string imageName, string containerName)
        {
            try
            {
                // Отримуємо публічний URL з Supabase Storage
                return _supabaseClient.Storage.From(_bucketName).GetPublicUrl(imageName);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error getting image URL from Supabase: {ex.Message}");
            }
        }
    }
}
