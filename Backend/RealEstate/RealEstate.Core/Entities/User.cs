using Microsoft.AspNetCore.Identity;

namespace RealEstate.DAL.Entities
{
    public class User : IdentityUser<Guid>
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;

        // Navigation properties
        public ICollection<Property> Properties { get; set; } = new List<Property>();
    }
}
