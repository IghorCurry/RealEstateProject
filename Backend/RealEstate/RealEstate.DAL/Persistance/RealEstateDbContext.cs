using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using RealEstate.DAL.Entities;
using RealEstate.DAL.Persistance.Configuration;
using RealEstate.DAL.Persistance.Settings;
using RealEstate.DAL.Persistance.Seeds;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RealEstate.DAL.Persistance
{
    public class RealEstateDbContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
    {
        private readonly IConfiguration _configuration;

        public RealEstateDbContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // DbSets for entities
        public DbSet<Property> Properties { get; set; }
        public DbSet<PropertyImage> PropertyImages { get; set; }
        public DbSet<Inquiry> Inquiries { get; set; }
        public DbSet<Favorite> Favorites { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql(_configuration.GetConnectionString("REDatabase"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Apply configurations
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new PropertyConfiguration());
            modelBuilder.ApplyConfiguration(new PropertyImageConfiguration());
            modelBuilder.ApplyConfiguration(new InquiryConfiguration());
            modelBuilder.ApplyConfiguration(new FavoriteConfiguration());

            // Add seed data
            var defaultAdminSettings = _configuration.GetSection(nameof(DefaultAdminSettings)).Get<DefaultAdminSettings>();
            if (defaultAdminSettings != null)
            {
                modelBuilder.AddTestableData(defaultAdminSettings);
            }

            // ТИМЧАСОВО ВИМКНУТО: Add additional seed data
            // AllSeeds.SeedAllData(modelBuilder);
        }
    }
}
