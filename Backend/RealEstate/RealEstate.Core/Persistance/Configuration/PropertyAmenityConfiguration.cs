using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealEstate.DAL.Entities;

namespace RealEstate.DAL.Persistance.Configuration
{
    internal class PropertyAmenityConfiguration : IEntityTypeConfiguration<PropertyAmenity>
    {
        public void Configure(EntityTypeBuilder<PropertyAmenity> builder)
        {
            // Composite key
            builder.HasKey(pa => new { pa.PropertyId, pa.AmenityId });

            builder.Property(pa => pa.Value)
                .HasMaxLength(100);

            // Relationships
            builder.HasOne(pa => pa.Property)
                .WithMany(p => p.PropertyAmenities)
                .HasForeignKey(pa => pa.PropertyId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(pa => pa.Amenity)
                .WithMany(a => a.PropertyAmenities)
                .HasForeignKey(pa => pa.AmenityId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
} 