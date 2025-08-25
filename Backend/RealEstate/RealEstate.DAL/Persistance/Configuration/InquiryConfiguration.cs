using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealEstate.DAL.Entities;

namespace RealEstate.DAL.Persistance.Configuration
{
    public class InquiryConfiguration : IEntityTypeConfiguration<Inquiry>
    {
        public void Configure(EntityTypeBuilder<Inquiry> builder)
        {
            builder.HasKey(i => i.Id);

            builder.Property(i => i.Name)
                .HasMaxLength(100);

            builder.Property(i => i.Email)
                .HasMaxLength(100);

            builder.Property(i => i.Phone)
                .HasMaxLength(20);

            builder.Property(i => i.Message)
                .IsRequired()
                .HasMaxLength(1000);

            builder.Property(i => i.CreatedAt)
                .IsRequired();

            builder.HasOne(i => i.Property)
                .WithMany(p => p.Inquiries)
                .HasForeignKey(i => i.PropertyId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(i => i.User)
                .WithMany()
                .HasForeignKey(i => i.UserId)
                .OnDelete(DeleteBehavior.SetNull)
                .IsRequired(false);

            // Indexes
            builder.HasIndex(i => i.CreatedAt);
            builder.HasIndex(i => i.UserId);
            builder.HasIndex(i => i.PropertyId); // ВИПРАВЛЕНО: додано індекс для покращення продуктивності
        }
    }
} 