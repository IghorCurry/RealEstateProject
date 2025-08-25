namespace RealEstate.DAL.Entities
{
    public class PropertyImage
    {
        public Guid Id { get; set; }
        public Guid PropertyId { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public int Order { get; set; } = 0; 
        
        // Navigation property
        public Property Property { get; set; } = null!;
    }
}
