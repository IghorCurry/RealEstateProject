using Microsoft.EntityFrameworkCore;
using Mapster;
using RealEstate.DAL.Entities;
using RealEstate.DAL.Entities.Enums;
using RealEstate.DAL.Persistance;
using RealEstate.BLL.Models.PropertyModels;
using RealEstate.BLL.Models.InquiryModels;
using Microsoft.AspNetCore.Http;
using System.IO;
using RealEstate.BLL.Managers.BlobStorageManager;

namespace RealEstate.BLL.Managers
{
    public class PropertyManager : IPropertyManager
    {
        protected RealEstateDbContext _dataContext;
        private readonly IBlobStorageManager _blobStorageManager;
        private readonly string _uploadPath = "wwwroot/uploads/properties";
        private const string ContainerName = "property-images";

        public PropertyManager(RealEstateDbContext dataContext, IBlobStorageManager blobStorageManager)
        {
            _dataContext = dataContext;
            _blobStorageManager = blobStorageManager;
            // Ensure upload directory exists
            Directory.CreateDirectory(_uploadPath);
        }

        private static PropertyViewModel CreatePropertyViewModel(Property p)
        {
            return p.Adapt<PropertyViewModel>();
        }

        public IQueryable<PropertyViewModel> GetAll()
        {
            var properties = _dataContext.Properties
                .AsNoTracking()
                .Include(p => p.User) // Тільки User для UserName
                .Include(p => p.Images) // Включаємо зображення для списку
                .Select(p => CreatePropertyViewModel(p));
            return properties;
        }

        public async Task<PropertyDetailedViewModel> GetByIdAsync(Guid id)
        {
            var property = await _dataContext.Properties
                .AsNoTracking()
                .Include(p => p.User)
                .Include(p => p.Images) // Включаємо зображення
                .Where(p => p.Id == id)
                .FirstOrDefaultAsync()
                ?? throw new Exception("The property with such id doesn't exist");

            var result = property.Adapt<PropertyDetailedViewModel>();
            
            var inquiries = await GetPropertyInquiriesAsync(id);
            
            return result with 
            {
                Inquiries = inquiries
            };
        }

        public async Task<IQueryable<PropertyViewModel>> GetByTypeAsync(PropertyType propertyType)
        {
            var properties = _dataContext.Properties
                .AsNoTracking()
                .Include(p => p.User)
                .Include(p => p.Images) // Включаємо зображення для списку
                .Where(p => p.PropertyType == propertyType)
                .Select(p => CreatePropertyViewModel(p));
            
            return await Task.FromResult(properties);
        }

        public async Task<IQueryable<PropertyViewModel>> GetByLocationAsync(Location location)
        {
            var properties = _dataContext.Properties
                .AsNoTracking()
                .Include(p => p.User)
                .Include(p => p.Images) // Включаємо зображення для списку
                .Where(p => p.Location == location)
                .Select(p => CreatePropertyViewModel(p));
            
            return await Task.FromResult(properties);
        }

        public async Task<IQueryable<PropertyViewModel>> GetByStatusAsync(PropertyStatus status)
        {
            var properties = _dataContext.Properties
                .AsNoTracking()
                .Include(p => p.User)
                .Include(p => p.Images) 
                .Where(p => p.Status == status)
                .Select(p => CreatePropertyViewModel(p));
            
            return await Task.FromResult(properties);
        }

        public async Task<IQueryable<PropertyViewModel>> SearchAsync(
            PropertyType? propertyType = null,
            Location? location = null,
            PropertyStatus? status = null,
            decimal? minPrice = null,
            decimal? maxPrice = null,
            int? minBedrooms = null,
            int? maxBedrooms = null,
            int? minBathrooms = null,
            int? maxBathrooms = null,
            double? minSquareMeters = null,
            double? maxSquareMeters = null,
            List<string>? features = null,
            int page = 1,
            int pageSize = 10)
        {
            var query = _dataContext.Properties
                .AsNoTracking()
                .AsQueryable();

            if (propertyType.HasValue)
                query = query.Where(p => p.PropertyType == propertyType.Value);

            if (location.HasValue)
                query = query.Where(p => p.Location == location.Value);

            if (status.HasValue)
                query = query.Where(p => p.Status == status.Value);

            if (minPrice.HasValue)
                query = query.Where(p => p.Price >= minPrice.Value);

            if (maxPrice.HasValue)
                query = query.Where(p => p.Price <= maxPrice.Value);

            if (minBedrooms.HasValue)
                query = query.Where(p => p.Bedrooms >= minBedrooms.Value);

            if (maxBedrooms.HasValue)
                query = query.Where(p => p.Bedrooms <= maxBedrooms.Value);

            if (minBathrooms.HasValue)
                query = query.Where(p => p.Bathrooms >= minBathrooms.Value);

            if (maxBathrooms.HasValue)
                query = query.Where(p => p.Bathrooms <= maxBathrooms.Value);

            if (minSquareMeters.HasValue)
                query = query.Where(p => p.SquareMeters >= minSquareMeters.Value);

            if (maxSquareMeters.HasValue)
                query = query.Where(p => p.SquareMeters <= maxSquareMeters.Value);

            if (features != null && features.Any())
            {
                foreach (var feature in features)
                {
                    query = query.Where(p => p.Features.Contains(feature));
                }
            }

           
            if (page < 1) page = 1;
            if (pageSize < 1) pageSize = 10;
            if (pageSize > 100) pageSize = 100; 

            var properties = query
                .Include(p => p.User)
                .Include(p => p.Images) 
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(p => CreatePropertyViewModel(p));

            return await Task.FromResult(properties);
        }

        public async Task<IQueryable<PropertyViewModel>> GetByUserAsync(Guid userId)
        {
            var properties = _dataContext.Properties
                .AsNoTracking()
                .Include(p => p.User)
                .Include(p => p.Images) 
                .Where(p => p.UserId == userId)
                .Select(p => CreatePropertyViewModel(p));
            
            return await Task.FromResult(properties);
        }

        public async Task<PropertyDetailedViewModel> CreateAsync(PropertyCreateModel model)
        {
            var property = model.Adapt<Property>();
            
            _dataContext.Properties.Add(property);
            await _dataContext.SaveChangesAsync();
            
            try
            {
                if (model.Images != null && model.Images.Any())
                {
                    await ProcessPropertyImagesAsync(property.Id, model.Images);
                }
                else if (model.ImageUrls != null && model.ImageUrls.Any())
                {
                    await ProcessImageUrlsAsync(property.Id, model.ImageUrls);
                }
            }
            catch (Exception ex)
            {
                // Log error but continue with property creation
            }
            
            return await GetByIdAsync(property.Id);
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var propertyById = await _dataContext.Properties
                .Where(p => p.Id == id)
                .FirstOrDefaultAsync()
                ?? throw new Exception("The property with such id doesn't exist");

            _dataContext.Entry(propertyById).State = EntityState.Deleted;
            await _dataContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> IsExists(Guid id)
        {
            return await _dataContext.Properties.AnyAsync(p => p.Id == id);
        }

        public async Task<bool> IsExists(string title)
        {
            return await _dataContext.Properties.AnyAsync(p => p.Title == title);
        }

        public async Task<PropertyDetailedViewModel> GetByTitleAsync(string title)
        {
            var property = await _dataContext.Properties
                .AsNoTracking()
                .Include(p => p.User)
                .Include(p => p.Images)
                .Where(p => p.Title == title)
                .FirstOrDefaultAsync()
                ?? throw new Exception("The property with such title doesn't exist");

            var result = property.Adapt<PropertyDetailedViewModel>();
            
            var inquiries = await GetPropertyInquiriesAsync(property.Id);
            
            return result with 
            {
                Inquiries = inquiries
            };
        }

        public async Task<Guid> GetUserIdAsync(Guid propertyId)
        {
            var property = await _dataContext.Properties
                .AsNoTracking()
                .Where(p => p.Id == propertyId)
                .Select(p => p.UserId)
                .FirstOrDefaultAsync();

            if (property == Guid.Empty)
                throw new Exception("The property with such id doesn't exist");

            return property;
        }

        public async Task<PropertyDetailedViewModel> UpdateAsync(PropertyUpdateModel model)
        {
            var existingProperty = await _dataContext.Properties
                .FirstOrDefaultAsync(p => p.Id == model.Id)
                ?? throw new Exception("The property with such id doesn't exist");

            existingProperty.Title = model.Title;
            existingProperty.Description = model.Description;
            existingProperty.Price = model.Price;
            existingProperty.Bedrooms = model.Bedrooms;
            existingProperty.Bathrooms = model.Bathrooms;
            existingProperty.SquareMeters = model.SquareMeters;
            existingProperty.PropertyType = model.PropertyType;
            existingProperty.Location = model.Location;
            existingProperty.Status = model.Status;
            existingProperty.Address = model.Address;
            existingProperty.Features = model.Features;

            if (model.ImagesToDelete != null && model.ImagesToDelete.Any())
            {
                await DeleteImagesAsync(model.Id, model.ImagesToDelete);
            }

            if (model.Images != null && model.Images.Any())
            {
                await ProcessPropertyImagesAsync(model.Id, model.Images);
            }
            
            if (model.ImageUrls != null && model.ImageUrls.Any())
            {
                await ProcessImageUrlsAsync(model.Id, model.ImageUrls);
            }

            await _dataContext.SaveChangesAsync();
            
            return await GetByIdAsync(existingProperty.Id);
        }

        public async Task<bool> CanUserModifyPropertyAsync(Guid propertyId, Guid userId, bool isAdmin)
        {
            if (isAdmin)
            {
                return true;
            }

            var property = await _dataContext.Properties
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id == propertyId);

            if (property == null)
            {
                return false;
            }

            return property.UserId == userId;
        }

        public async Task<PropertyImageViewModel> AddImageAsync(Guid propertyId, IFormFile file)
        {
            var property = await _dataContext.Properties
                .FirstOrDefaultAsync(p => p.Id == propertyId)
                ?? throw new Exception("Property not found");

            var currentImageCount = await _dataContext.PropertyImages
                .Where(pi => pi.PropertyId == propertyId)
                .CountAsync();
            
            if (currentImageCount >= 20)
                throw new Exception("Maximum number of images (20) reached for this property");

            if (file == null || file.Length == 0)
                throw new Exception("No file provided");


            if (file.Length > 10 * 1024 * 1024) // 10MB limit
                throw new Exception("File size too large. Maximum size is 10MB");

            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".webp" };
            var fileExtension = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (!allowedExtensions.Contains(fileExtension))
                throw new Exception("Invalid file type. Allowed types: jpg, jpeg, png, gif, webp");

            if (!IsValidImageFile(file))
            {
                throw new Exception("Invalid image file format");
            }

            var imageUrl = await _blobStorageManager.UploadImageAsync(file, ContainerName);

            var maxOrder = await _dataContext.PropertyImages
                .Where(pi => pi.PropertyId == propertyId)
                .MaxAsync(pi => (int?)pi.Order) ?? -1; 

            var propertyImage = new PropertyImage
            {
                Id = Guid.NewGuid(),
                PropertyId = propertyId,
                ImageUrl = imageUrl, 
                Order = maxOrder + 1 
            };

            _dataContext.PropertyImages.Add(propertyImage);
            await _dataContext.SaveChangesAsync();

            return propertyImage.Adapt<PropertyImageViewModel>();
        }

        public async Task<bool> DeleteImageAsync(Guid propertyId, Guid imageId)
        {
            var image = await _dataContext.PropertyImages
                .FirstOrDefaultAsync(pi => pi.Id == imageId && pi.PropertyId == propertyId)
                ?? throw new Exception("Image not found");

            if (!string.IsNullOrEmpty(image.ImageUrl))
            {
                try
                {
                    await _blobStorageManager.DeleteImageAsync(image.ImageUrl, ContainerName);
                }
                catch (Exception ex)
                {
                    // Continue with database deletion even if storage deletion fails
                }
            }

            _dataContext.PropertyImages.Remove(image);
            await _dataContext.SaveChangesAsync();

            return true;
        }

        public async Task<bool> ReorderImagesAsync(Guid propertyId, List<Guid> imageIds)
        {
            var property = await _dataContext.Properties
                .FirstOrDefaultAsync(p => p.Id == propertyId)
                ?? throw new Exception("Property not found");

            var existingImages = await _dataContext.PropertyImages
                .Where(pi => pi.PropertyId == propertyId)
                .ToListAsync();

            var existingImageIds = existingImages.Select(pi => pi.Id).ToHashSet();
            if (!imageIds.All(id => existingImageIds.Contains(id)))
                throw new Exception("Some images do not belong to this property");

            
            for (int i = 0; i < imageIds.Count; i++)
            {
                var image = existingImages.FirstOrDefault(pi => pi.Id == imageIds[i]);
                if (image != null)
                {
                    image.Order = i;
                }
            }
            
            await _dataContext.SaveChangesAsync();
            return true;
        }

        public async Task<List<PropertyImageViewModel>> GetPropertyImagesAsync(Guid propertyId)
        {
            var images = await _dataContext.PropertyImages
                .AsNoTracking()
                .Where(pi => pi.PropertyId == propertyId)
                .OrderBy(pi => pi.Order) 
                .Select(pi => new PropertyImageViewModel
                {
                    Id = pi.Id,
                    ImageUrl = pi.ImageUrl,
                    Order = pi.Order
                })
                .ToListAsync();
            
            return images;
        }

        private async Task<List<InquiryViewModel>> GetPropertyInquiriesAsync(Guid propertyId)
        {
            return await _dataContext.Inquiries
                .AsNoTracking()
                .Where(i => i.PropertyId == propertyId)
                .Select(i => new InquiryViewModel
                {
                    Id = i.Id,
                    Message = i.Message,
                    PropertyId = i.PropertyId,
                    UserId = i.UserId,
                    Name = i.Name,
                    Email = i.Email,
                    Phone = i.Phone,
                    CreatedAt = i.CreatedAt
                })
                .ToListAsync();
        }

        private async Task ProcessPropertyImagesAsync(Guid propertyId, List<IFormFile> images)
        {
            var currentImageCount = await _dataContext.PropertyImages
                .Where(pi => pi.PropertyId == propertyId)
                .CountAsync();
            
            if (currentImageCount + images.Count > 20)
                throw new Exception($"Cannot add {images.Count} images. Maximum allowed is 20. Current count: {currentImageCount}");

            foreach (var image in images)
            {
                await AddImageAsync(propertyId, image);
            }
        }

        private async Task ProcessImageUrlsAsync(Guid propertyId, List<string> imageUrls)
        {
            var maxOrder = await _dataContext.PropertyImages
                .Where(pi => pi.PropertyId == propertyId)
                .MaxAsync(pi => (int?)pi.Order) ?? -1;

            foreach (var imageUrl in imageUrls)
            {
                maxOrder++;
                var propertyImage = new PropertyImage
                {
                    Id = Guid.NewGuid(),
                    PropertyId = propertyId,
                    ImageUrl = imageUrl,
                    Order = maxOrder 
                };

                _dataContext.PropertyImages.Add(propertyImage);
            }
            await _dataContext.SaveChangesAsync();
        }

        private async Task DeleteImagesAsync(Guid propertyId, List<Guid> imageIds)
        {
            foreach (var imageId in imageIds)
            {
                await DeleteImageAsync(propertyId, imageId);
            }
        }

        private bool IsValidImageFile(IFormFile file)
        {
            if (file == null || file.Length == 0) return false;
            
            if (file.Length > 10 * 1024 * 1024) return false; // 10MB
            
            var allowedMimeTypes = new[] 
            { 
                "image/jpeg", 
                "image/jpg", 
                "image/png", 
                "image/gif", 
                "image/webp" 
            };
            
            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".webp" };
            
            var mimeType = file.ContentType.ToLowerInvariant();
            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
            
            return allowedMimeTypes.Contains(mimeType) && allowedExtensions.Contains(extension);
        }
    }
} 