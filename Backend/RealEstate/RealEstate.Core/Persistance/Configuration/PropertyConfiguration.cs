using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealEstate.DAL.Entities;

namespace RealEstate.DAL.Persistance.Configuration
{
    internal class PropertyConfiguration : IEntityTypeConfiguration<Property>
    {
        public void Configure(EntityTypeBuilder<Property> builder)
        {
            builder.HasKey(p => p.Id);

            builder.Property(p => p.Title)
                .IsRequired()
                .HasMaxLength(200);

            builder.Property(p => p.Description)
                .HasMaxLength(2000);

            builder.Property(p => p.Price)
                .HasColumnType("decimal(18,2)")
                .IsRequired();

            builder.Property(p => p.Address)
                .IsRequired()
                .HasMaxLength(500);

            builder.Property(p => p.City)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(p => p.State)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(p => p.ZipCode)
                .IsRequired()
                .HasMaxLength(20);

            builder.Property(p => p.IsActive)
                .HasDefaultValue(true);

            // Relationships
            builder.HasOne(p => p.User)
                .WithMany(u => u.Properties)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
} 