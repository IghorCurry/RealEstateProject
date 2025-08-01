using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealEstate.DAL.Entities;
using System;

namespace RealEstate.DAL.Persistance.Configuration
{
    public class PropertyConfiguration : IEntityTypeConfiguration<Property>
    {
        public void Configure(EntityTypeBuilder<Property> builder)
        {
            builder.HasKey(p => p.Id);

            builder.Property(p => p.Title)
                .IsRequired()
                .HasMaxLength(200);

            builder.Property(p => p.Description)
                .IsRequired()
                .HasMaxLength(2000);

            builder.Property(p => p.Price)
                .IsRequired()
                .HasColumnType("decimal(18,2)");

            builder.Property(p => p.Bedrooms)
                .IsRequired();

            builder.Property(p => p.Bathrooms)
                .IsRequired();

            builder.Property(p => p.SquareMeters)
                .IsRequired();

            builder.Property(p => p.Address)
                .IsRequired()
                .HasMaxLength(500);

            builder.Property(p => p.Status)
                .IsRequired()
                .HasDefaultValue(RealEstate.DAL.Entities.Enums.PropertyStatus.Available);

            builder.Property(p => p.Features)
                .HasConversion(
                    v => string.Join(',', v),
                    v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList()
                );

            builder.Property(p => p.CreatedAt)
                .IsRequired();

            builder.HasOne(p => p.User)
                .WithMany(u => u.Properties)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Indexes for search
            builder.HasIndex(p => p.PropertyType);
            builder.HasIndex(p => p.Location);
            builder.HasIndex(p => p.Status);
            builder.HasIndex(p => p.Price);
            builder.HasIndex(p => p.CreatedAt);
        }
    }
} 