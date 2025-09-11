using RealEstate.DAL.Entities;

namespace RealEstate.DAL.Persistance.Seeds
{
    public static class InquirySeeds
    {
        private static readonly Guid user1Id = new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e");
        private static readonly Guid user2Id = new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2");

        private static readonly Guid property1Id = new Guid("a1b2c3d4-e5f6-7890-abcd-ef1234567890");
        private static readonly Guid property2Id = new Guid("b2c3d4e5-f6a7-8901-bcde-f23456789012");
        private static readonly Guid property3Id = new Guid("c3d4e5f6-a7b8-9012-cdef-345678901234");
        private static readonly Guid property4Id = new Guid("d4e5f6a7-b8c9-0123-def4-567890123456");

        public static List<Inquiry> GetInquiries()
        {
            return new List<Inquiry>
            {
                new Inquiry
                {
                    Id = new Guid("1a2b3c4d-e5f6-7890-abcd-ef1234567890"),
                    PropertyId = property1Id,
                    UserId = user1Id,
                    Message = "Доброго дня! Цікавлюся цією квартирою. Чи можна домовитися про перегляд? Який час буде зручно?",
                    CreatedAt = DateTime.UtcNow.AddDays(-5)
                },
                new Inquiry
                {
                    Id = new Guid("2b3c4d5e-f6a7-8901-bcde-f23456789012"),
                    PropertyId = property2Id,
                    UserId = user2Id,
                    Message = "Дуже подобається будинок! Чи можна дізнатися більше про комунальні платежі та податки?",
                    CreatedAt = DateTime.UtcNow.AddDays(-4)
                },
                new Inquiry
                {
                    Id = new Guid("3c4d5e6f-a7b8-9012-cdef-345678901234"),
                    PropertyId = property3Id,
                    UserId = user1Id,
                    Message = "Ідеально для студента! Чи можна зняти на довгострок? Який депозит потрібен?",
                    CreatedAt = DateTime.UtcNow.AddDays(-3)
                },
                new Inquiry
                {
                    Id = new Guid("4d5e6f7a-b8c9-0123-def4-567890123456"),
                    PropertyId = property4Id,
                    UserId = user2Id,
                    Message = "Розкішний пентхаус! Чи можна домовитися про перегляд в суботу?",
                    CreatedAt = DateTime.UtcNow.AddDays(-2)
                },

                new Inquiry
                {
                    Id = new Guid("5e6f7a8b-c9d0-1234-ef56-789012345678"),
                    PropertyId = property1Id,
                    UserId = null,
                    Name = "Олена Петренко",
                    Email = "elena.petrenko@gmail.com",
                    Phone = "0501234567",
                    Message = "Доброго дня! Цікавлюся квартирою. Чи можна дізнатися про парковку?",
                    CreatedAt = DateTime.UtcNow.AddDays(-1)
                },
                new Inquiry
                {
                    Id = new Guid("6f7a8b9c-d0e1-2345-ef67-890123456789"),
                    PropertyId = property2Id,
                    UserId = null,
                    Name = "Михайло Іваненко",
                    Email = "mikhail.ivanenko@ukr.net",
                    Phone = "0679876543",
                    Message = "Дуже подобається будинок! Чи можна дізнатися про школу та садочок поблизу?",
                    CreatedAt = DateTime.UtcNow.AddHours(-12)
                },
                new Inquiry
                {
                    Id = new Guid("7a8b9c0d-e1f2-3456-ef78-901234567890"),
                    PropertyId = property3Id,
                    UserId = null,
                    Name = "Анна Коваленко",
                    Email = "anna.kovalenko@yahoo.com",
                    Phone = "0634567890",
                    Message = "Студія виглядає чудово! Чи можна зняти на місяць?",
                    CreatedAt = DateTime.UtcNow.AddHours(-6)
                },
                new Inquiry
                {
                    Id = new Guid("8b9c0d1e-f2a3-4567-ef89-012345678901"),
                    PropertyId = property4Id,
                    UserId = null,
                    Name = "Віктор Сидоренко",
                    Email = "viktor.sydorenko@gmail.com",
                    Phone = "0509876543",
                    Message = "Пентхаус просто неймовірний! Чи можна домовитися про перегляд?",
                    CreatedAt = DateTime.UtcNow.AddHours(-2)
                }
            };
        }
    }
} 