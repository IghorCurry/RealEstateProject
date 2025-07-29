using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RealEstate.DAL.Entities.Enums
{
    public enum AmenityType
    {
        Numeric = 1,    // Bedrooms, Bathrooms, SquareFeet
        Boolean = 2,    // Pool, Garage, Garden
        Text = 3        // Description, Notes
    }
}
