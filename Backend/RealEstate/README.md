# 🏠 RealEstate Backend API

Сучасний REST API для платформи нерухомості, побудований на ASP.NET Core 8.0 з використанням Entity Framework Core та PostgreSQL.

## 🚀 Швидкий старт

### Необхідні вимоги

- .NET 8.0 SDK
- PostgreSQL 14+
- Visual Studio 2022 або VS Code

### Встановлення та запуск

1. **Клонування репозиторію**

```bash
git clone <repository-url>
cd RealEstate
```

2. **Відновлення пакетів**

```bash
dotnet restore
```

3. **Налаштування бази даних**

```bash
cd RealEstate.DAL
dotnet ef database update
```

4. **Запуск API**

```bash
cd ../RealEstate.WebApi
dotnet run
```

API буде доступний за адресою: `http://localhost:5158`

## 📚 Документація

- [API Documentation](./API_DOCUMENTATION.md) - Повна документація API для фронтенд розробників
- [Developer Guide](./DEVELOPER_GUIDE.md) - Технічна документація для розробників
- [Swagger UI](http://localhost:5158/swagger) - Інтерактивна документація API

## 🏗️ Архітектура

Проект побудований за принципами **3-шарової архітектури**:

```
RealEstate/
├── RealEstate.DAL/          # Data Access Layer
│   ├── Entities/           # Entity models
│   ├── Persistance/        # DbContext & Configurations
│   └── Migrations/         # Database migrations
├── RealEstate.BLL/          # Business Logic Layer
│   ├── Managers/           # Business logic managers
│   ├── Models/             # DTOs & ViewModels
│   └── MapsterConfig.cs    # Object mapping
└── RealEstate.WebApi/       # Presentation Layer
    ├── Controllers/        # API controllers
    ├── Validators/         # FluentValidation
    └── Program.cs          # Application startup
```

## 🔧 Основні функції

### 🏠 Нерухомість

- ✅ CRUD операції з нерухомістю
- ✅ Пошук та фільтрація
- ✅ Пагінація
- ✅ Завантаження зображень
- ✅ Управління порядком зображень

### 👥 Користувачі

- ✅ Реєстрація та авторизація
- ✅ JWT токени
- ✅ Ролі (Admin/User)
- ✅ Управління профілем

### 📝 Запити

- ✅ Створення запитів про нерухомість
- ✅ Анонімні запити
- ✅ Управління запитами

### ❤️ Улюблене

- ✅ Додавання/видалення з улюбленого
- ✅ Перегляд улюбленого
- ✅ Перевірка статусу

## 🛠️ Технології

- **.NET 8.0** - Основний фреймворк
- **Entity Framework Core** - ORM для роботи з базою даних
- **PostgreSQL** - База даних
- **JWT** - Аутентифікація
- **FluentValidation** - Валідація даних
- **Mapster** - Object mapping
- **Serilog** - Логування
- **Swagger** - API документація

## 🔐 Безпека

- JWT токени для аутентифікації
- Ролі для авторизації
- Валідація всіх вхідних даних
- Безпечна обробка файлів
- Захист від SQL ін'єкцій

## 📊 База даних

### Основні таблиці

- `AspNetUsers` - Користувачі
- `Properties` - Нерухомість
- `PropertyImages` - Зображення нерухомості
- `Inquiries` - Запити
- `Favorites` - Улюблене

### Міграції

```bash
# Створення міграції
dotnet ef migrations add MigrationName

# Застосування міграцій
dotnet ef database update
```

## 🧪 Тестування

```bash
# Запуск всіх тестів
dotnet test

# Запуск з детальним виводом
dotnet test --logger "console;verbosity=detailed"
```

## 🚀 Deployment

### Docker

```bash
# Збірка образу
docker build -t realestate-api .

# Запуск контейнера
docker run -p 8080:8080 realestate-api
```

### Змінні середовища

```bash
ASPNETCORE_ENVIRONMENT=Production
REDatabase__ConnectionString="your_connection_string"
AccessTokenSettings__SigningKey="your_secret_key"
```

## 📝 Приклади використання

### Реєстрація користувача

```bash
curl -X POST "http://localhost:5158/api/Auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Іван",
    "lastName": "Петренко",
    "email": "ivan@example.com",
    "password": "TestPass123!",
    "phoneNumber": "0501234567"
  }'
```

### Отримання нерухомості

```bash
curl -X GET "http://localhost:5158/api/Property?page=1&pageSize=10"
```

### Створення нерухомості

```bash
curl -X POST "http://localhost:5158/api/Property" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Нова квартира",
    "description": "Опис квартири...",
    "price": 75000,
    "bedrooms": 2,
    "bathrooms": 1,
    "squareMeters": 65.0,
    "propertyType": 2,
    "location": 6,
    "address": "вул. Шевченка, 10, Київ"
  }'
```

## 🔧 Налаштування

### appsettings.Development.json

```json
{
  "ConnectionStrings": {
    "REDatabase": "Server=localhost;Port=5432;Database=real_estate;User Id=postgres;Password=your_password;"
  },
  "AccessTokenSettings": {
    "Issuer": "RealEstateAPI",
    "Audience": "RealEstateClient",
    "SigningKey": "your_secret_key_here"
  }
}
```

## 📞 Підтримка

Для технічних питань звертайтеся до команди розробки.

## 📄 Ліцензія

Цей проект розповсюджується під ліцензією MIT.

---

**Версія**: 1.0  
**Останнє оновлення**: 15.08.2025
