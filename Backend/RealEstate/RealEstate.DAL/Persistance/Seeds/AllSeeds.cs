using Microsoft.EntityFrameworkCore;
using RealEstate.DAL.Entities;

namespace RealEstate.DAL.Persistance.Seeds
{
    public static class AllSeeds
    {
        public static void SeedAllData(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Property>().HasData(PropertySeeds.GetProperties());

            modelBuilder.Entity<PropertyImage>().HasData(PropertyImageSeeds.GetPropertyImages());

            modelBuilder.Entity<Inquiry>().HasData(InquirySeeds.GetInquiries());

            modelBuilder.Entity<Favorite>().HasData(FavoriteSeeds.GetFavorites());
        }
    }
} 