using RealEstate.DAL.Entities.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RealEstate.DAL.Entities
{
    public class Property
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Address { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
        public string ZipCode { get; set; } = string.Empty;
        public PropertyType PropertyType { get; set; }
        public Location Location { get; set; }
        public bool IsActive { get; set; } = true;

        // Foreign keys
        public Guid UserId { get; set; }

        // Navigation properties
        public User User { get; set; } = null!;
        public ICollection<PropertyImage> Images { get; set; } = new List<PropertyImage>();
        public ICollection<Inquiry> Inquiries { get; set; } = new List<Inquiry>();
        public ICollection<PropertyAmenity> PropertyAmenities { get; set; } = new List<PropertyAmenity>();
    }
}
