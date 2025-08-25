using Microsoft.AspNetCore.Identity;

namespace RealEstate.DAL.Entities
{
    public class User : IdentityUser<Guid>
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public ICollection<Property> Properties { get; set; } = new List<Property>();
        public ICollection<Favorite> Favorites { get; set; } = new List<Favorite>();
    }
}
