using RealEstate.DAL.Entities;

namespace RealEstate.DAL.Persistance.Seeds
{
    public static class PropertyImageSeeds
    {
        // Property IDs from PropertySeeds
        private static readonly Guid property1Id = new Guid("a1b2c3d4-e5f6-7890-abcd-ef1234567890");
        private static readonly Guid property2Id = new Guid("b2c3d4e5-f6a7-8901-bcde-f23456789012");
        private static readonly Guid property3Id = new Guid("c3d4e5f6-a7b8-9012-cdef-345678901234");
        private static readonly Guid property4Id = new Guid("d4e5f6a7-b8c9-0123-def4-567890123456");
        private static readonly Guid property5Id = new Guid("e5f6a7b8-c9d0-1234-ef56-789012345678");
        private static readonly Guid property6Id = new Guid("f6a7b8c9-d0e1-2345-ef67-890123456789");
        private static readonly Guid property7Id = new Guid("a7b8c9d0-e1f2-3456-ef78-901234567890");
        private static readonly Guid property8Id = new Guid("b8c9d0e1-f2a3-4567-ef89-012345678901");

        public static List<PropertyImage> GetPropertyImages()
        {
            return new List<PropertyImage>
            {
                // Property 1 - Сучасна квартира в центрі міста
                new PropertyImage
                {
                    Id = new Guid("f1a2b3c4-d5e6-7890-abcd-ef1234567890"),
                    PropertyId = property1Id,
                    ImageUrl = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop"
                },
                new PropertyImage
                {
                    Id = new Guid("f2b3c4d5-e6f7-8901-bcde-f23456789012"),
                    PropertyId = property1Id,
                    ImageUrl = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop"
                },

                // Property 2 - Затишний будинок з садом
                new PropertyImage
                {
                    Id = new Guid("f4d5e6f7-a8b9-0123-def4-567890123456"),
                    PropertyId = property2Id,
                    ImageUrl = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop"
                },
                new PropertyImage
                {
                    Id = new Guid("f5e6f7a8-b9c0-1234-ef56-789012345678"),
                    PropertyId = property2Id,
                    ImageUrl = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop"
                },

                // Property 3 - Студія для молодих
                new PropertyImage
                {
                    Id = new Guid("f6f7a8b9-c0d1-2345-ef67-890123456789"),
                    PropertyId = property3Id,
                    ImageUrl = "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop"
                },
                new PropertyImage
                {
                    Id = new Guid("f7a8b9c0-d1e2-3456-ef78-901234567890"),
                    PropertyId = property3Id,
                    ImageUrl = "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop"
                },

                // Property 4 - Пентхаус з панорамним видом
                new PropertyImage
                {
                    Id = new Guid("f8b9c0d1-e2f3-4567-ef89-012345678901"),
                    PropertyId = property4Id,
                    ImageUrl = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
                },
                new PropertyImage
                {
                    Id = new Guid("f9c0d1e2-f3a4-5678-ef90-123456789012"),
                    PropertyId = property4Id,
                    ImageUrl = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop"
                },

                // Property 5 - Комерційне приміщення
                new PropertyImage
                {
                    Id = new Guid("f1e2f3a4-b5c6-7890-ef12-345678901234"),
                    PropertyId = property5Id,
                    ImageUrl = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
                },
                new PropertyImage
                {
                    Id = new Guid("f2f3a4b5-c6d7-8901-ef23-456789012345"),
                    PropertyId = property5Id,
                    ImageUrl = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop"
                },

                // Property 6 - Сучасна квартира з ремонтом
                new PropertyImage
                {
                    Id = new Guid("f3a4b5c6-d7e8-9012-ef34-567890123456"),
                    PropertyId = property6Id,
                    ImageUrl = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop"
                },

                // Property 7 - Офісне приміщення в бізнес-центрі (Condo)
                new PropertyImage
                {
                    Id = new Guid("f4b5c6d7-e8f9-0123-ef45-678901234567"),
                    PropertyId = property7Id,
                    ImageUrl = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
                },

                // Property 8 - Стильна квартира в центрі
                new PropertyImage
                {
                    Id = new Guid("f5c6d7e8-f9a0-1234-ef56-789012345678"),
                    PropertyId = property8Id,
                    ImageUrl = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
                }
            };
        }
    }
} 