using RealEstate.DAL.Entities.Enums;

namespace RealEstate.DAL.Entities
{
    public class Property
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Bedrooms { get; set; }
        public int Bathrooms { get; set; }
        public double SquareMeters { get; set; }
        public string Address { get; set; } = string.Empty;
        public PropertyType PropertyType { get; set; }
        public Location Location { get; set; }
        public PropertyStatus Status { get; set; } = PropertyStatus.Available;
        public List<string> Features { get; set; } = new();
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public Guid UserId { get; set; }

        public User User { get; set; } = null!;
        public ICollection<PropertyImage> Images { get; set; } = new List<PropertyImage>();
        public ICollection<Inquiry> Inquiries { get; set; } = new List<Inquiry>();
        public ICollection<Favorite> Favorites { get; set; } = new List<Favorite>();
    }
}
