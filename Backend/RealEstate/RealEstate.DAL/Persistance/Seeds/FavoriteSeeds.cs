using RealEstate.DAL.Entities;

namespace RealEstate.DAL.Persistance.Seeds
{
    public static class FavoriteSeeds
    {
        private static readonly Guid user1Id = new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e");
        private static readonly Guid user2Id = new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2");

        private static readonly Guid property1Id = new Guid("a1b2c3d4-e5f6-7890-abcd-ef1234567890");
        private static readonly Guid property2Id = new Guid("b2c3d4e5-f6a7-8901-bcde-f23456789012");
        private static readonly Guid property3Id = new Guid("c3d4e5f6-a7b8-9012-cdef-345678901234");
        private static readonly Guid property4Id = new Guid("d4e5f6a7-b8c9-0123-def4-567890123456");
        private static readonly Guid property5Id = new Guid("e5f6a7b8-c9d0-1234-ef56-789012345678");

        public static List<Favorite> GetFavorites()
        {
            return new List<Favorite>
            {
                new Favorite
                {
                    Id = new Guid("1a1b2c3d-e5f6-7890-abcd-ef1234567890"),
                    UserId = user1Id,
                    PropertyId = property1Id,
                    CreatedAt = DateTime.UtcNow.AddDays(-10)
                },
                new Favorite
                {
                    Id = new Guid("1a2b3c4d-e6f7-8901-bcde-f23456789012"),
                    UserId = user1Id,
                    PropertyId = property3Id,
                    CreatedAt = DateTime.UtcNow.AddDays(-8)
                },
                new Favorite
                {
                    Id = new Guid("1a3c4d5e-f7a8-9012-cdef-345678901234"),
                    UserId = user1Id,
                    PropertyId = property4Id,
                    CreatedAt = DateTime.UtcNow.AddDays(-5)
                },

                new Favorite
                {
                    Id = new Guid("1a4d5e6f-a8b9-0123-def4-567890123456"),
                    UserId = user2Id,
                    PropertyId = property2Id,
                    CreatedAt = DateTime.UtcNow.AddDays(-12)
                },
                new Favorite
                {
                    Id = new Guid("1a5e6f7a-b9c0-1234-ef56-789012345678"),
                    UserId = user2Id,
                    PropertyId = property5Id,
                    CreatedAt = DateTime.UtcNow.AddDays(-7)
                },
                new Favorite
                {
                    Id = new Guid("1a6f7a8b-c0d1-2345-ef67-890123456789"),
                    UserId = user2Id,
                    PropertyId = property1Id,
                    CreatedAt = DateTime.UtcNow.AddDays(-3)
                },

                new Favorite
                {
                    Id = new Guid("1a7a8b9c-d1e2-3456-ef78-901234567890"),
                    UserId = new Guid("cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae"),
                    PropertyId = property2Id,
                    CreatedAt = DateTime.UtcNow.AddDays(-15)
                },
                new Favorite
                {
                    Id = new Guid("1a8b9c0d-e2f3-4567-ef89-012345678901"),
                    UserId = new Guid("cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae"),
                    PropertyId = property5Id,
                    CreatedAt = DateTime.UtcNow.AddDays(-6)
                }
            };
        }
    }
} 