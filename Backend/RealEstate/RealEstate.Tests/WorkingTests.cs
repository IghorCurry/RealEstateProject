using NUnit.Framework;
using RealEstate.BLL.Models.AuthModels;
using RealEstate.BLL.Models.PropertyModels;
using RealEstate.DAL.Entities.Enums;
using RealEstate.Tests.Helpers;

namespace RealEstate.Tests
{
    /// <summary>
    /// Простые рабочие тесты для вашего проекта недвижимости
    /// Эти тесты проверяют базовую функциональность без сложных моков
    /// </summary>
    [TestFixture]
    public class WorkingTests
    {
        /// <summary>
        /// Тест 1: Проверяем создание модели для входа пользователя
        /// </summary>
        [Test]
        public void UserLoginModel_ShouldBeCreatedSuccessfully()
        {
            // Arrange & Act
            var loginModel = new UserLoginModel
            {
                Email = "test@example.com",
                Password = "Password123!"
            };

            // Assert
            Assert.That(loginModel, Is.Not.Null);
            Assert.That(loginModel.Email, Is.EqualTo("test@example.com"));
            Assert.That(loginModel.Password, Is.EqualTo("Password123!"));
        }

        /// <summary>
        /// Тест 2: Проверяем создание модели для создания недвижимости
        /// </summary>
        [Test]
        public void PropertyCreateModel_ShouldBeCreatedSuccessfully()
        {
            // Arrange & Act
            var propertyModel = new PropertyCreateModel
            {
                Title = "Beautiful Apartment",
                Description = "A wonderful place to live",
                Price = 150000,
                Bedrooms = 2,
                Bathrooms = 1,
                SquareMeters = 75.5,
                PropertyType = PropertyType.Apartment,
                Location = Location.Downtown,
                Status = PropertyStatus.Available,
                Address = "123 Main Street",
                Features = new List<string> { "Parking", "Balcony" },
                UserId = Guid.NewGuid()
            };

            // Assert
            Assert.That(propertyModel, Is.Not.Null);
            Assert.That(propertyModel.Title, Is.EqualTo("Beautiful Apartment"));
            Assert.That(propertyModel.Price, Is.EqualTo(150000));
            Assert.That(propertyModel.PropertyType, Is.EqualTo(PropertyType.Apartment));
            Assert.That(propertyModel.Location, Is.EqualTo(Location.Downtown));
            Assert.That(propertyModel.Features.Count, Is.EqualTo(2));
        }

        /// <summary>
        /// Тест 3: Проверяем фабрику тестовых данных
        /// </summary>
        [Test]
        public void TestDataFactory_ShouldCreateValidData()
        {
            // Arrange & Act
            var loginModel = TestDataFactory.CreateLoginModel();
            var user = TestDataFactory.CreateUser();
            var propertyModel = TestDataFactory.CreatePropertyModel();

            // Assert
            Assert.That(loginModel, Is.Not.Null);
            Assert.That(user, Is.Not.Null);
            Assert.That(propertyModel, Is.Not.Null);
            
            Assert.That(loginModel.Email, Is.EqualTo("test@example.com"));
            Assert.That(user.Email, Is.EqualTo("test@example.com"));
            Assert.That(propertyModel.Title, Is.EqualTo("Test Property"));
        }

        /// <summary>
        /// Тест 4: Проверяем enum значения PropertyType
        /// </summary>
        [Test]
        public void PropertyTypeEnum_ShouldHaveCorrectValues()
        {
            // Arrange & Act
            var apartment = PropertyType.Apartment;
            var house = PropertyType.House;

            // Assert
            Assert.That(apartment, Is.EqualTo(PropertyType.Apartment));
            Assert.That(house, Is.EqualTo(PropertyType.House));
            Assert.That(apartment, Is.Not.EqualTo(house));
        }

        /// <summary>
        /// Тест 5: Проверяем enum значения Location
        /// </summary>
        [Test]
        public void LocationEnum_ShouldHaveCorrectValues()
        {
            // Arrange & Act
            var downtown = Location.Downtown;
            var suburban = Location.Suburban;
            var rural = Location.Rural;

            // Assert
            Assert.That(downtown, Is.EqualTo(Location.Downtown));
            Assert.That(suburban, Is.EqualTo(Location.Suburban));
            Assert.That(rural, Is.EqualTo(Location.Rural));
            Assert.That(downtown, Is.Not.EqualTo(suburban));
        }

        /// <summary>
        /// Тест 6: Проверяем enum значения PropertyStatus
        /// </summary>
        [Test]
        public void PropertyStatusEnum_ShouldHaveCorrectValues()
        {
            // Arrange & Act
            var available = PropertyStatus.Available;
            var sold = PropertyStatus.Sold;
            var rented = PropertyStatus.Rented;

            // Assert
            Assert.That(available, Is.EqualTo(PropertyStatus.Available));
            Assert.That(sold, Is.EqualTo(PropertyStatus.Sold));
            Assert.That(rented, Is.EqualTo(PropertyStatus.Rented));
        }

        /// <summary>
        /// Тест 7: Проверяем создание нескольких недвижимостей через фабрику
        /// </summary>
        [Test]
        public void TestDataFactory_ShouldCreateMultipleProperties()
        {
            // Arrange & Act
            var properties = TestDataFactory.CreateProperties(5);

            // Assert
            Assert.That(properties, Is.Not.Null);
            Assert.That(properties.Count, Is.EqualTo(5));
            
            // Проверяем, что все недвижимости имеют разные названия
            var titles = properties.Select(p => p.Title).ToList();
            Assert.That(titles, Is.Unique);
            
            // Проверяем, что цены увеличиваются
            var prices = properties.Select(p => p.Price).ToList();
            Assert.That(prices[1], Is.GreaterThan(prices[0]));
            Assert.That(prices[2], Is.GreaterThan(prices[1]));
        }

        /// <summary>
        /// Тест 8: Проверяем валидацию данных (простая логика)
        /// </summary>
        [Test]
        public void PropertyValidation_ShouldWorkCorrectly()
        {
            // Arrange
            var validProperty = TestDataFactory.CreatePropertyModel(
                title: "Valid Property",
                price: 100000
            );

            // Act & Assert
            Assert.That(validProperty.Title, Is.Not.Empty);
            Assert.That(validProperty.Price, Is.GreaterThan(0));
            Assert.That(validProperty.Bedrooms, Is.GreaterThanOrEqualTo(0));
            Assert.That(validProperty.Bathrooms, Is.GreaterThanOrEqualTo(0));
        }

        /// <summary>
        /// Тест 9: Проверяем создание пользователя через фабрику
        /// </summary>
        [Test]
        public void TestDataFactory_ShouldCreateValidUser()
        {
            // Arrange & Act
            var user = TestDataFactory.CreateUser(
                email: "john.doe@example.com",
                firstName: "John",
                lastName: "Doe"
            );

            // Assert
            Assert.That(user, Is.Not.Null);
            Assert.That(user.Email, Is.EqualTo("john.doe@example.com"));
            Assert.That(user.FirstName, Is.EqualTo("John"));
            Assert.That(user.LastName, Is.EqualTo("Doe"));
            Assert.That(user.UserName, Is.EqualTo("john.doe@example.com"));
        }

        /// <summary>
        /// Тест 10: Проверяем создание модели входа через фабрику
        /// </summary>
        [Test]
        public void TestDataFactory_ShouldCreateValidLoginModel()
        {
            // Arrange & Act
            var loginModel = TestDataFactory.CreateLoginModel(
                email: "admin@example.com",
                password: "AdminPass123!"
            );

            // Assert
            Assert.That(loginModel, Is.Not.Null);
            Assert.That(loginModel.Email, Is.EqualTo("admin@example.com"));
            Assert.That(loginModel.Password, Is.EqualTo("AdminPass123!"));
        }
    }
}
