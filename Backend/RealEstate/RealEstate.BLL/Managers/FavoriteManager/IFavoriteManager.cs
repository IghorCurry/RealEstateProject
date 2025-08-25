using RealEstate.BLL.Models.PropertyModels;
using RealEstate.BLL.Models.FavoriteModels;

namespace RealEstate.BLL.Managers
{
    public interface IFavoriteManager
{
    Task<IEnumerable<PropertyViewModel>> GetUserFavoritesAsync(Guid userId);
    Task<bool> CreateAsync(FavoriteCreateModel model);
    Task<bool> DeleteAsync(Guid userId, Guid propertyId);
    Task<bool> IsFavoriteAsync(Guid userId, Guid propertyId);
    Task<int> GetFavoriteCountAsync(Guid propertyId);
    }
} 