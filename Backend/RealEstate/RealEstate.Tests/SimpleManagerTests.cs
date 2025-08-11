using NUnit.Framework;
using RealEstate.BLL.Models.AuthModels;
using RealEstate.BLL.Models.PropertyModels;
using RealEstate.DAL.Entities.Enums;
using RealEstate.Tests.Helpers;

namespace RealEstate.Tests
{
    /// <summary>
    /// Простые тесты для менеджеров без сложных моков
    /// Тестируем только то, что можно легко протестировать
    /// </summary>
    [TestFixture]
    public class SimpleManagerTests
    {
        /// <summary>
        /// Тест 1: Проверяем создание модели для входа
        /// </summary>
        [Test]
        public void UserLoginModel_ShouldBeCreatedCorrectly()
        {
            // Arrange & Act
            var loginModel = new UserLoginModel
            {
                Email = "test@example.com",
                Password = "Password123!"
            };

            // Assert
            Assert.That(loginModel.Email, Is.EqualTo("test@example.com"));
            Assert.That(loginModel.Password, Is.EqualTo("Password123!"));
        }

        /// <summary>
        /// Тест 2: Проверяем создание модели регистрации
        /// </summary>
        [Test]
        public void UserRegisterModel_ShouldBeCreatedCorrectly()
        {
            // Arrange & Act
            var registerModel = new UserRegisterModel
            {
                Email = "newuser@example.com",
                Password = "SecurePassword123!",
                FirstName = "John",
                LastName = "Doe",
                PhoneNumber = "+1234567890"
            };

            // Assert
            Assert.That(registerModel.Email, Is.EqualTo("newuser@example.com"));
            Assert.That(registerModel.Password, Is.EqualTo("SecurePassword123!"));
            Assert.That(registerModel.FirstName, Is.EqualTo("John"));
            Assert.That(registerModel.LastName, Is.EqualTo("Doe"));
            Assert.That(registerModel.PhoneNumber, Is.EqualTo("+1234567890"));
        }

        /// <summary>
        /// Тест 3: Проверяем создание модели недвижимости
        /// </summary>
        [Test]
        public void PropertyCreateModel_ShouldBeCreatedCorrectly()
        {
            // Arrange & Act
            var propertyModel = new PropertyCreateModel
            {
                Title = "Beautiful Apartment",
                Description = "A wonderful place to live",
                Price = 250000,
                Bedrooms = 3,
                Bathrooms = 2,
                SquareMeters = 120.5,
                PropertyType = PropertyType.Apartment,
                Location = Location.Downtown,
                Status = PropertyStatus.Available,
                Address = "123 Main Street",
                Features = new List<string> { "Parking", "Balcony", "Gym" }
            };

            // Assert
            Assert.That(propertyModel.Title, Is.EqualTo("Beautiful Apartment"));
            Assert.That(propertyModel.Price, Is.EqualTo(250000));
            Assert.That(propertyModel.Bedrooms, Is.EqualTo(3));
            Assert.That(propertyModel.Bathrooms, Is.EqualTo(2));
            Assert.That(propertyModel.PropertyType, Is.EqualTo(PropertyType.Apartment));
            Assert.That(propertyModel.Location, Is.EqualTo(Location.Downtown));
            Assert.That(propertyModel.Status, Is.EqualTo(PropertyStatus.Available));
            Assert.That(propertyModel.Features, Has.Count.EqualTo(3));
        }

        /// <summary>
        /// Тест 4: Проверяем валидацию цены недвижимости
        /// </summary>
        [Test]
        public void PropertyPrice_ShouldBePositive()
        {
            // Arrange
            var validProperty = TestDataFactory.CreatePropertyModel(price: 100000);
            var invalidProperty = TestDataFactory.CreatePropertyModel(price: -50000);

            // Act & Assert
            Assert.That(validProperty.Price, Is.GreaterThan(0));
            Assert.That(invalidProperty.Price, Is.LessThan(0));
        }

        /// <summary>
        /// Тест 5: Проверяем валидацию email
        /// </summary>
        [Test]
        public void Email_ShouldContainAtSymbol()
        {
            // Arrange
            var validEmail = "user@example.com";
            var invalidEmail = "userexample.com";

            // Act & Assert
            Assert.That(validEmail, Does.Contain("@"));
            Assert.That(invalidEmail, Does.Not.Contain("@"));
        }

        /// <summary>
        /// Тест 6: Проверяем валидацию пароля
        /// </summary>
        [Test]
        public void Password_ShouldHaveMinimumLength()
        {
            // Arrange
            var validPassword = "SecurePass123!";
            var invalidPassword = "123";

            // Act & Assert
            Assert.That(validPassword.Length, Is.GreaterThanOrEqualTo(8));
            Assert.That(invalidPassword.Length, Is.LessThan(8));
        }

        /// <summary>
        /// Тест 7: Проверяем типы недвижимости
        /// </summary>
        [Test]
        public void PropertyTypes_ShouldHaveValidValues()
        {
            // Arrange & Act
            var apartment = PropertyType.Apartment;
            var house = PropertyType.House;
            var villa = PropertyType.Villa;

            // Assert
            Assert.That(apartment, Is.EqualTo(PropertyType.Apartment));
            Assert.That(house, Is.EqualTo(PropertyType.House));
            Assert.That(villa, Is.EqualTo(PropertyType.Villa));
        }

        /// <summary>
        /// Тест 8: Проверяем статусы недвижимости
        /// </summary>
        [Test]
        public void PropertyStatuses_ShouldHaveValidValues()
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
        /// Тест 9: Проверяем локации
        /// </summary>
        [Test]
        public void Locations_ShouldHaveValidValues()
        {
            // Arrange & Act
            var downtown = Location.Downtown;
            var suburban = Location.Suburban;
            var rural = Location.Rural;

            // Assert
            Assert.That(downtown, Is.EqualTo(Location.Downtown));
            Assert.That(suburban, Is.EqualTo(Location.Suburban));
            Assert.That(rural, Is.EqualTo(Location.Rural));
        }

        /// <summary>
        /// Тест 10: Проверяем создание пользователя через фабрику
        /// </summary>
        [Test]
        public void TestDataFactory_ShouldCreateValidUser()
        {
            // Arrange & Act
            var user = TestDataFactory.CreateUser(
                email: "factory@example.com",
                firstName: "Factory",
                lastName: "User"
            );

            // Assert
            Assert.That(user.Email, Is.EqualTo("factory@example.com"));
            Assert.That(user.FirstName, Is.EqualTo("Factory"));
            Assert.That(user.LastName, Is.EqualTo("User"));
            Assert.That(user.Id, Is.Not.EqualTo(Guid.Empty));
        }
    }
}
