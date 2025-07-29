using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RealEstate.DAL.Entities
{
    public class Inquiry
    {
        public int Id { get; set; }
        public int PropertyId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;

        
        
        // Navigation property
        public Property Property { get; set; } = null!;
    }
}
