using RealEstate.BLL.Models.PropertyModels;
using RealEstate.BLL.Models.FavoriteModels;
using RealEstate.DAL.Persistance;
using RealEstate.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Mapster;

namespace RealEstate.BLL.Managers.FavoriteManager;

public class FavoriteManager : IFavoriteManager
{
    private readonly RealEstateDbContext _context;

    public FavoriteManager(RealEstateDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<PropertyViewModel>> GetUserFavoritesAsync(Guid userId)
    {
        var favorites = await _context.Favorites
            .Where(f => f.UserId == userId)
            .Include(f => f.Property)
                .ThenInclude(p => p.Images)
            .Include(f => f.Property)
                .ThenInclude(p => p.User)
            .Select(f => f.Property)
            .ProjectToType<PropertyViewModel>()
            .ToListAsync();

        return favorites;
    }

    public async Task<bool> CreateAsync(FavoriteCreateModel model)
    {
        var existingFavorite = await _context.Favorites
            .FirstOrDefaultAsync(f => f.UserId == model.UserId && f.PropertyId == model.PropertyId);

        if (existingFavorite != null)
            return false;

        var favorite = new Favorite
        {
            UserId = model.UserId,
            PropertyId = model.PropertyId
        };

        _context.Favorites.Add(favorite);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(Guid userId, Guid propertyId)
    {
        var favorite = await _context.Favorites
            .FirstOrDefaultAsync(f => f.UserId == userId && f.PropertyId == propertyId);

        if (favorite == null)
            return false;

        _context.Favorites.Remove(favorite);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> IsFavoriteAsync(Guid userId, Guid propertyId)
    {
        return await _context.Favorites
            .AnyAsync(f => f.UserId == userId && f.PropertyId == propertyId);
    }

    public async Task<int> GetFavoriteCountAsync(Guid propertyId)
    {
        return await _context.Favorites
            .CountAsync(f => f.PropertyId == propertyId);
    }
} 