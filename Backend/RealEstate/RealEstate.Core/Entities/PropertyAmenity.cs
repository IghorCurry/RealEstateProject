using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RealEstate.DAL.Entities
{
    public class PropertyAmenity
    {
        public int PropertyId { get; set; }
        public int AmenityId { get; set; }
        public string Value { get; set; } = string.Empty; // The actual value for this property

        
        // Navigation properties
        public Property Property { get; set; } = null!;
        public Amenity Amenity { get; set; } = null!;
    }
}
