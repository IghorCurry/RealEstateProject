using Microsoft.EntityFrameworkCore;
using RealEstate.DAL.Entities;

namespace RealEstate.DAL.Persistance.Seeds
{
    public static class AllSeeds
    {
        public static void SeedAllData(ModelBuilder modelBuilder)
        {
            // Seed Properties
            modelBuilder.Entity<Property>().HasData(PropertySeeds.GetProperties());

            // Seed Property Images
            modelBuilder.Entity<PropertyImage>().HasData(PropertyImageSeeds.GetPropertyImages());

            // Seed Inquiries
            modelBuilder.Entity<Inquiry>().HasData(InquirySeeds.GetInquiries());

            // Seed Favorites
            modelBuilder.Entity<Favorite>().HasData(FavoriteSeeds.GetFavorites());
        }
    }
} 