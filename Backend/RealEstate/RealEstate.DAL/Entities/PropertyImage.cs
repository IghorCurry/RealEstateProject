namespace RealEstate.DAL.Entities
{
    public class PropertyImage
    {
        public Guid Id { get; set; }
        public Guid PropertyId { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        
        // Navigation property
        public Property Property { get; set; } = null!;
    }
}
