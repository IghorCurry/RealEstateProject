namespace RealEstate.DAL.Entities
{
    public class Inquiry
    {
        public Guid Id { get; set; }
        public Guid PropertyId { get; set; }
        public Guid? UserId { get; set; } // Optional for anonymous inquiries
        
        // Contact info (for anonymous users)
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        
        public string Message { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        public Property Property { get; set; } = null!;
        public User? User { get; set; }
    }
}
