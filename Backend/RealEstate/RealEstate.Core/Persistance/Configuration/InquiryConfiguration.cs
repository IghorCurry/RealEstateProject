using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealEstate.DAL.Entities;

namespace RealEstate.DAL.Persistance.Configuration
{
    internal class InquiryConfiguration : IEntityTypeConfiguration<Inquiry>
    {
        public void Configure(EntityTypeBuilder<Inquiry> builder)
        {
            builder.HasKey(i => i.Id);

            builder.Property(i => i.Name)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(i => i.Email)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(i => i.Message)
                .IsRequired()
                .HasMaxLength(1000);

            // Relationships
            builder.HasOne(i => i.Property)
                .WithMany(p => p.Inquiries)
                .HasForeignKey(i => i.PropertyId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
} 