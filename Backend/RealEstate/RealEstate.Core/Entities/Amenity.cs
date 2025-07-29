using RealEstate.DAL.Entities.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RealEstate.DAL.Entities
{
    public class Amenity
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Icon { get; set; } = string.Empty;
        public string Value { get; set; } = string.Empty; // Default value like "3" for bedrooms
        public AmenityType Type { get; set; } // Numeric, Boolean, Text
        public bool IsActive { get; set; }

        public ICollection<PropertyAmenity> PropertyAmenities { get; set; } = new List<PropertyAmenity>();
    }
}
