using RealEstate.BLL.Models.AuthModels;
using RealEstate.BLL.Models.PropertyModels;
using RealEstate.DAL.Entities;
using RealEstate.DAL.Entities.Enums;

namespace RealEstate.Tests.Helpers
{
    /// <summary>
    /// Фабрика для создания тестовых данных
    /// Помогает создавать объекты для тестов с минимальными усилиями
    /// </summary>
    public static class TestDataFactory
    {
        /// <summary>
        /// Создает тестовую модель для входа пользователя
        /// </summary>
        /// <param name="email">Email пользователя (по умолчанию: test@example.com)</param>
        /// <param name="password">Пароль (по умолчанию: Password123!)</param>
        /// <returns>Модель для входа</returns>
        public static UserLoginModel CreateLoginModel(string email = "test@example.com", string password = "Password123!")
        {
            return new UserLoginModel
            {
                Email = email,
                Password = password
            };
        }

        /// <summary>
        /// Создает тестового пользователя
        /// </summary>
        /// <param name="id">ID пользователя (по умолчанию: новый GUID)</param>
        /// <param name="email">Email (по умолчанию: test@example.com)</param>
        /// <param name="firstName">Имя (по умолчанию: Test)</param>
        /// <param name="lastName">Фамилия (по умолчанию: User)</param>
        /// <returns>Тестовый пользователь</returns>
        public static User CreateUser(
            Guid? id = null, 
            string email = "test@example.com", 
            string firstName = "Test", 
            string lastName = "User")
        {
            return new User
            {
                Id = id ?? Guid.NewGuid(),
                Email = email,
                UserName = email,
                FirstName = firstName,
                LastName = lastName,
                PhoneNumber = "+1234567890"
            };
        }

        /// <summary>
        /// Создает тестовую модель для создания недвижимости
        /// </summary>
        /// <param name="title">Название недвижимости</param>
        /// <param name="price">Цена</param>
        /// <param name="propertyType">Тип недвижимости</param>
        /// <param name="location">Локация</param>
        /// <param name="userId">ID владельца</param>
        /// <returns>Модель для создания недвижимости</returns>
        public static PropertyCreateModel CreatePropertyModel(
            string title = "Test Property",
            decimal price = 100000,
            PropertyType propertyType = PropertyType.Apartment,
            Location location = Location.Downtown,
            Guid? userId = null)
        {
            return new PropertyCreateModel
            {
                Title = title,
                Description = "A beautiful test property",
                Price = price,
                Bedrooms = 2,
                Bathrooms = 1,
                SquareMeters = 75.5,
                PropertyType = propertyType,
                Location = location,
                Status = PropertyStatus.Available,
                Address = "123 Test Street",
                Features = new List<string> { "Parking", "Balcony" },
                UserId = userId ?? Guid.NewGuid()
            };
        }

        /// <summary>
        /// Создает тестовую недвижимость
        /// </summary>
        /// <param name="id">ID недвижимости (по умолчанию: новый GUID)</param>
        /// <param name="title">Название</param>
        /// <param name="price">Цена</param>
        /// <param name="propertyType">Тип недвижимости</param>
        /// <param name="location">Локация</param>
        /// <param name="userId">ID владельца</param>
        /// <returns>Тестовая недвижимость</returns>
        public static Property CreateProperty(
            Guid? id = null,
            string title = "Test Property",
            decimal price = 100000,
            PropertyType propertyType = PropertyType.Apartment,
            Location location = Location.Downtown,
            Guid? userId = null)
        {
            return new Property
            {
                Id = id ?? Guid.NewGuid(),
                Title = title,
                Description = "A beautiful test property",
                Price = price,
                Bedrooms = 2,
                Bathrooms = 1,
                SquareMeters = 75.5,
                PropertyType = propertyType,
                Location = location,
                Status = PropertyStatus.Available,
                Address = "123 Test Street",
                Features = new List<string> { "Parking", "Balcony" },
                UserId = userId ?? Guid.NewGuid()
            };
        }

        /// <summary>
        /// Создает список тестовых недвижимостей
        /// </summary>
        /// <param name="count">Количество недвижимостей</param>
        /// <returns>Список тестовых недвижимостей</returns>
        public static List<Property> CreateProperties(int count = 3)
        {
            var properties = new List<Property>();
            
            for (int i = 0; i < count; i++)
            {
                properties.Add(CreateProperty(
                    title: $"Test Property {i + 1}",
                    price: 100000 + (i * 50000),
                    propertyType: i % 2 == 0 ? PropertyType.Apartment : PropertyType.House,
                    location: i % 3 == 0 ? Location.Downtown : i % 3 == 1 ? Location.Suburban : Location.Rural
                ));
            }
            
            return properties;
        }
    }
}
