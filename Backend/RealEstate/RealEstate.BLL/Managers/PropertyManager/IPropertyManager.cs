using RealEstate.DAL.Entities;
using RealEstate.DAL.Entities.Enums;
using RealEstate.BLL.Models.PropertyModels;
using Microsoft.AspNetCore.Http;

namespace RealEstate.BLL.Managers
{
    public interface IPropertyManager
    {
        public IQueryable<PropertyViewModel> GetAll();
        public Task<PropertyDetailedViewModel> GetByIdAsync(Guid id);
        public Task<IQueryable<PropertyViewModel>> GetByTypeAsync(PropertyType propertyType);
        public Task<IQueryable<PropertyViewModel>> GetByLocationAsync(Location location);
        public Task<IQueryable<PropertyViewModel>> GetByStatusAsync(PropertyStatus status);
        public Task<IQueryable<PropertyViewModel>> SearchAsync(
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
            int pageSize = 10);
        public Task<IQueryable<PropertyViewModel>> GetByUserAsync(Guid userId);
        public Task<PropertyDetailedViewModel> CreateAsync(PropertyCreateModel model);
        public Task<bool> IsExists(Guid id);
        public Task<bool> IsExists(string title);
        public Task<PropertyDetailedViewModel> GetByTitleAsync(string title);
        public Task<Guid> GetUserIdAsync(Guid propertyId);
        public Task<PropertyDetailedViewModel> UpdateAsync(PropertyUpdateModel model);
        public Task<bool> DeleteAsync(Guid id);
        public Task<bool> CanUserModifyPropertyAsync(Guid propertyId, Guid userId, bool isAdmin);
        
        // Image management methods
        public Task<PropertyImageViewModel> AddImageAsync(Guid propertyId, IFormFile file);
        public Task<bool> DeleteImageAsync(Guid propertyId, Guid imageId);
        public Task<bool> ReorderImagesAsync(Guid propertyId, List<Guid> imageIds);
        public Task<List<PropertyImageViewModel>> GetPropertyImagesAsync(Guid propertyId);
    }
} 