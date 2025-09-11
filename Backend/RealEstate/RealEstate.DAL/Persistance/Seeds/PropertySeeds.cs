using RealEstate.DAL.Entities;
using RealEstate.DAL.Entities.Enums;

namespace RealEstate.DAL.Persistance.Seeds
{
    public static class PropertySeeds
    {
        private static readonly Guid adminId = new Guid("cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae");
        private static readonly Guid user1Id = new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e");
        private static readonly Guid user2Id = new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2");

        public static List<Property> GetProperties()
        {
            return new List<Property>
            {
                new Property
                {
                    Id = new Guid("a1b2c3d4-e5f6-7890-abcd-ef1234567890"),
                    Title = "Сучасна квартира в центрі міста",
                    Description = "Розкішна 3-кімнатна квартира з ремонтом, меблями та технікою. Ідеальне розташування, поруч метро, магазини, ресторани.",
                    Price = 85000,
                    Bedrooms = 3,
                    Bathrooms = 2,
                    SquareMeters = 85.5,
                    Address = "вул. Хрещатик, 15, Київ",
                    PropertyType = PropertyType.Apartment,
                    Location = Location.Urban,
                    Status = PropertyStatus.Available,
                    Features = new List<string> { "Меблі", "Техніка", "Кондиціонер", "Балкон", "Парковка" },
                    CreatedAt = DateTime.UtcNow.AddDays(-30),
                    UserId = adminId
                },
                new Property
                {
                    Id = new Guid("b2c3d4e5-f6a7-8901-bcde-f23456789012"),
                    Title = "Затишний будинок з садом",
                    Description = "Двоповерховий будинок з великим садом та гаражем. Тиха вулиця, зелена зона, ідеально для сім'ї.",
                    Price = 250000,
                    Bedrooms = 4,
                    Bathrooms = 3,
                    SquareMeters = 180.0,
                    Address = "вул. Садова, 42, Буча",
                    PropertyType = PropertyType.House,
                    Location = Location.Suburban,
                    Status = PropertyStatus.Available,
                    Features = new List<string> { "Сад", "Гараж", "Камін", "Тераса", "Підвал" },
                    CreatedAt = DateTime.UtcNow.AddDays(-25),
                    UserId = user1Id
                },
                new Property
                {
                    Id = new Guid("c3d4e5f6-a7b8-9012-cdef-345678901234"),
                    Title = "Студія для молодих",
                    Description = "Компактна студія з сучасним ремонтом. Ідеально для молодих людей або студентів. Розумна ціна.",
                    Price = 35000,
                    Bedrooms = 1,
                    Bathrooms = 1,
                    SquareMeters = 35.0,
                    Address = "вул. Студентська, 8, Київ",
                    PropertyType = PropertyType.Apartment,
                    Location = Location.Urban,
                    Status = PropertyStatus.Available,
                    Features = new List<string> { "Меблі", "Техніка", "Wi-Fi", "Безпека" },
                    CreatedAt = DateTime.UtcNow.AddDays(-20),
                    UserId = user2Id
                },
                new Property
                {
                    Id = new Guid("d4e5f6a7-b8c9-0123-def4-567890123456"),
                    Title = "Пентхаус з панорамним видом",
                    Description = "Розкішний пентхаус на останньому поверсі з панорамним видом на місто. Елітний район, найкраща інфраструктура.",
                    Price = 500000,
                    Bedrooms = 3,
                    Bathrooms = 2,
                    SquareMeters = 120.0,
                    Address = "вул. Печерська, 25, Київ",
                    PropertyType = PropertyType.Apartment,
                    Location = Location.Urban,
                    Status = PropertyStatus.Available,
                    Features = new List<string> { "Панорамні вікна", "Тераса", "Консьєрж", "Підземна парковка", "Спортзал" },
                    CreatedAt = DateTime.UtcNow.AddDays(-15),
                    UserId = adminId
                },
                new Property
                {
                    Id = new Guid("e5f6a7b8-c9d0-1234-ef56-789012345678"),
                    Title = "Комерційне приміщення",
                    Description = "Готове комерційне приміщення для бізнесу. Висока прохідність, зручне розташування, можна відкрити магазин або кафе.",
                    Price = 180000,
                    Bedrooms = 0,
                    Bathrooms = 1,
                    SquareMeters = 150.0,
                    Address = "вул. Торгова, 10, Київ",
                    PropertyType = PropertyType.Commercial,
                    Location = Location.Urban,
                    Status = PropertyStatus.Available,
                    Features = new List<string> { "Вхід з вулиці", "Вентиляція", "Електрика", "Водопостачання" },
                    CreatedAt = DateTime.UtcNow.AddDays(-10),
                    UserId = user1Id
                },
                // Нові об'єкти без дублікатів
                new Property
                {
                    Id = new Guid("f6a7b8c9-d0e1-2345-ef67-890123456789"),
                    Title = "Сучасна квартира з ремонтом",
                    Description = "Сучасна квартира з ремонтом. Зручне розташування, поруч транспорт та магазини.",
                    Price = 65000,
                    Bedrooms = 2,
                    Bathrooms = 1,
                    SquareMeters = 55.0,
                    Address = "вул. Центральна, 5, Київ",
                    PropertyType = PropertyType.Apartment,
                    Location = Location.Urban,
                    Status = PropertyStatus.Available,
                    Features = new List<string> { "Меблі", "Балкон", "Парковка" },
                    CreatedAt = DateTime.UtcNow.AddDays(-5),
                    UserId = user2Id
                },
                new Property
                {
                    Id = new Guid("a7b8c9d0-e1f2-3456-ef78-901234567890"),
                    Title = "Офісне приміщення в бізнес-центрі",
                    Description = "Сучасне офісне приміщення в бізнес-центрі. Ідеально для компаній середнього розміру.",
                    Price = 800000,
                    Bedrooms = 0,
                    Bathrooms = 2,
                    SquareMeters = 200.0,
                    Address = "вул. Бізнесова, 15, Київ",
                    PropertyType = PropertyType.Condo,
                    Location = Location.Urban,
                    Status = PropertyStatus.Available,
                    Features = new List<string> { "Конференц-зал", "Кухня", "Парковка", "Охорона" },
                    CreatedAt = DateTime.UtcNow.AddDays(-3),
                    UserId = adminId
                },
                new Property
                {
                    Id = new Guid("b8c9d0e1-f2a3-4567-ef89-012345678901"),
                    Title = "Стильна квартира в центрі",
                    Description = "Стильна квартира з дизайнерським ремонтом. Елітний район, найкраща інфраструктура.",
                    Price = 250000,
                    Bedrooms = 3,
                    Bathrooms = 2,
                    SquareMeters = 95.0,
                    Address = "вул. Елітна, 8, Київ",
                    PropertyType = PropertyType.Apartment,
                    Location = Location.Urban,
                    Status = PropertyStatus.Available,
                    Features = new List<string> { "Дизайнерський ремонт", "Меблі", "Техніка", "Балкон" },
                    CreatedAt = DateTime.UtcNow.AddDays(-2),
                    UserId = user1Id
                }
            };
        }
    }
} 