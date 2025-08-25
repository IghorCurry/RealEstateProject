using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealEstate.DAL.Entities;

namespace RealEstate.DAL.Persistance.Configuration
{
    public class PropertyImageConfiguration : IEntityTypeConfiguration<PropertyImage>
    {
        public void Configure(EntityTypeBuilder<PropertyImage> builder)
        {
            builder.HasKey(pi => pi.Id);

            builder.Property(pi => pi.ImageUrl)
                .IsRequired()
                .HasMaxLength(500);

            
            builder.Property(pi => pi.Order)
                .IsRequired()
                .HasDefaultValue(0);

            // Relationships
            builder.HasOne(pi => pi.Property)
                .WithMany(p => p.Images)
                .HasForeignKey(pi => pi.PropertyId)
                .OnDelete(DeleteBehavior.Cascade);

            // Indexes
            builder.HasIndex(pi => pi.PropertyId);
            
            builder.HasIndex(pi => new { pi.PropertyId, pi.Order });
        }
    }
} 