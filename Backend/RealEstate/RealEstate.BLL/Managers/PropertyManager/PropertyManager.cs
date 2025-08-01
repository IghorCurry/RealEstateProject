using Microsoft.EntityFrameworkCore;
using Mapster;
using RealEstate.DAL.Entities;
using RealEstate.DAL.Entities.Enums;
using RealEstate.DAL.Persistance;
using RealEstate.BLL.Models.PropertyModels;

namespace RealEstate.BLL.Managers
{
    public class PropertyManager : IPropertyManager
    {
        protected RealEstateDbContext _dataContext;

        public PropertyManager(RealEstateDbContext dataContext)
        {
            _dataContext = dataContext;
        }

        public IQueryable<PropertyViewModel> GetAll()
        {
            var properties = _dataContext.Properties
                .AsNoTracking()
                .Include(p => p.Images)
                .Include(p => p.User)
                .ProjectToType<PropertyViewModel>();
            return properties;
        }

        public async Task<PropertyDetailedViewModel> GetByIdAsync(Guid id)
        {
            var propertyById = await _dataContext.Properties
                .AsNoTracking()
                .Include(p => p.Images)
                .Include(p => p.User)
                .Include(p => p.Inquiries)
                .Where(p => p.Id == id)
                .ProjectToType<PropertyDetailedViewModel>()
                .FirstOrDefaultAsync()
                ?? throw new Exception("The property with such id doesn't exist");
            
            return propertyById;
        }

        public async Task<IQueryable<PropertyViewModel>> GetByTypeAsync(PropertyType propertyType)
        {
            var properties = _dataContext.Properties
                .AsNoTracking()
                .Include(p => p.Images)
                .Include(p => p.User)
                .Where(p => p.PropertyType == propertyType)
                .ProjectToType<PropertyViewModel>();
            
            return await Task.FromResult(properties);
        }

        public async Task<IQueryable<PropertyViewModel>> GetByLocationAsync(Location location)
        {
            var properties = _dataContext.Properties
                .AsNoTracking()
                .Include(p => p.Images)
                .Include(p => p.User)
                .Where(p => p.Location == location)
                .ProjectToType<PropertyViewModel>();
            
            return await Task.FromResult(properties);
        }

        public async Task<IQueryable<PropertyViewModel>> GetByStatusAsync(PropertyStatus status)
        {
            var properties = _dataContext.Properties
                .AsNoTracking()
                .Include(p => p.Images)
                .Include(p => p.User)
                .Where(p => p.Status == status)
                .ProjectToType<PropertyViewModel>();
            
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
                .Include(p => p.Images)
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

            var properties = query
                .Include(p => p.User)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ProjectToType<PropertyViewModel>();

            return await Task.FromResult(properties);
        }

        public async Task<IQueryable<PropertyViewModel>> GetByUserAsync(Guid userId)
        {
            var properties = _dataContext.Properties
                .AsNoTracking()
                .Include(p => p.Images)
                .Include(p => p.User)
                .Where(p => p.UserId == userId)
                .ProjectToType<PropertyViewModel>();
            
            return await Task.FromResult(properties);
        }

        public async Task<PropertyDetailedViewModel> CreateAsync(PropertyCreateModel model)
        {
            var property = model.Adapt<Property>();
            
            _dataContext.Properties.Add(property);
            await _dataContext.SaveChangesAsync();
            
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

        public async Task<PropertyDetailedViewModel> UpdateAsync(PropertyUpdateModel model)
        {
            var existingProperty = await _dataContext.Properties
                .FirstOrDefaultAsync(p => p.Id == model.Id)
                ?? throw new Exception("The property with such id doesn't exist");

            // Update basic properties
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

            await _dataContext.SaveChangesAsync();
            
            return await GetByIdAsync(existingProperty.Id);
        }
    }
} 