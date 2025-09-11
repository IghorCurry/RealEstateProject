# 🛠️ RealEstate Developer Guide

## 📋 Зміст
1. [Архітектура проекту](#архітектура-проекту)
2. [Налаштування середовища](#налаштування-середовища)
3. [Структура бази даних](#структура-бази-даних)
4. [API Endpoints](#api-endpoints)
5. [Валідація](#валідація)
6. [Авторизація](#авторизація)
7. [Обробка файлів](#обробка-файлів)
8. [Логування](#логування)
9. [Тестування](#тестування)
10. [Deployment](#deployment)

---

## 🏗️ Архітектура проекту

### 3-шарова архітектура
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
    ├── Middleware/         # Custom middleware
    └── Program.cs          # Application startup
```

### Dependency Injection
```csharp
// Реєстрація сервісів
builder.Services.AddScoped<IPropertyManager, PropertyManager>();
builder.Services.AddScoped<IUserManager, UserManager>();
builder.Services.AddScoped<IAuthManager, AuthManager>();
builder.Services.AddScoped<IInquiryManager, InquiryManager>();
builder.Services.AddScoped<IFavoriteManager, FavoriteManager>();
```

---

## ⚙️ Налаштування середовища

### Необхідні інструменти
- .NET 8.0 SDK
- PostgreSQL 14+
- Visual Studio 2022 / VS Code

### Змінні середовища
```bash
# Database
REDatabase__ConnectionString="Server=localhost;Port=5432;Database=real_estate;User Id=postgres;Password=your_password;"

# JWT Settings
AccessTokenSettings__Issuer="RealEstateAPI"
AccessTokenSettings__Audience="RealEstateClient"
AccessTokenSettings__SigningKey="your_secret_key_here"

# Admin Settings
DefaultAdminSettings__Username="RealEstateAdmin"
DefaultAdminSettings__Email="admin@example.com"
DefaultAdminSettings__Password="AdminPass123!"
```

### Перший запуск
```bash
# Відновлення пакетів
dotnet restore

# Створення бази даних
cd RealEstate.DAL
dotnet ef database update

# Запуск проекту
cd ../RealEstate.WebApi
dotnet run
```

---

## 🗄️ Структура бази даних

### Основні таблиці
```sql
-- Користувачі (розширена Identity)
AspNetUsers (
    Id UUID PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(256) UNIQUE,
    CreatedAt TIMESTAMP DEFAULT NOW()
)

-- Нерухомість
Properties (
    Id UUID PRIMARY KEY,
    Title VARCHAR(100) NOT NULL,
    Description VARCHAR(1000) NOT NULL,
    Price DECIMAL(18,2) NOT NULL,
    Bedrooms INT NOT NULL,
    Bathrooms INT NOT NULL,
    SquareMeters DOUBLE PRECISION NOT NULL,
    Address VARCHAR(500) NOT NULL,
    PropertyType INT NOT NULL,
    Location INT NOT NULL,
    Status INT DEFAULT 1,
    Features TEXT NOT NULL,
    CreatedAt TIMESTAMP DEFAULT NOW(),
    UserId UUID REFERENCES AspNetUsers(Id)
)

-- Зображення нерухомості
PropertyImages (
    Id UUID PRIMARY KEY,
    PropertyId UUID REFERENCES Properties(Id),
    ImageUrl VARCHAR(500) NOT NULL,
    Order INT DEFAULT 0,
    INDEX IX_PropertyImages_PropertyId_Order (PropertyId, Order)
)

-- Запити
Inquiries (
    Id UUID PRIMARY KEY,
    PropertyId UUID REFERENCES Properties(Id),
    UserId UUID REFERENCES AspNetUsers(Id) NULL,
    Name VARCHAR(100),
    Email VARCHAR(100),
    Phone VARCHAR(20),
    Message VARCHAR(1000) NOT NULL,
    CreatedAt TIMESTAMP DEFAULT NOW()
)

-- Улюблене
Favorites (
    Id UUID PRIMARY KEY,
    UserId UUID REFERENCES AspNetUsers(Id),
    PropertyId UUID REFERENCES Properties(Id),
    CreatedAt TIMESTAMP DEFAULT NOW(),
    UNIQUE(UserId, PropertyId)
)
```

### Індекси для продуктивності
```sql
-- Properties
CREATE INDEX IX_Properties_PropertyType ON Properties(PropertyType);
CREATE INDEX IX_Properties_Location ON Properties(Location);
CREATE INDEX IX_Properties_Status ON Properties(Status);
CREATE INDEX IX_Properties_Price ON Properties(Price);
CREATE INDEX IX_Properties_CreatedAt ON Properties(CreatedAt);
CREATE INDEX IX_Properties_UserId ON Properties(UserId);

-- Inquiries
CREATE INDEX IX_Inquiries_PropertyId ON Inquiries(PropertyId);
CREATE INDEX IX_Inquiries_CreatedAt ON Inquiries(CreatedAt);
CREATE INDEX IX_Inquiries_UserId ON Inquiries(UserId);

-- Favorites
CREATE INDEX IX_Favorites_UserId ON Favorites(UserId);
CREATE INDEX IX_Favorites_PropertyId ON Favorites(PropertyId);
```

---

## 🔌 API Endpoints

### Структура URL
```
/api/{Controller}/{Action}/{id?}
```

### HTTP методи
- `GET` - Отримання даних
- `POST` - Створення
- `PUT` - Оновлення
- `DELETE` - Видалення

### Стандартні відповіді
```csharp
// Успішна відповідь
return Ok(data);

// Помилка валідації
return BadRequest(ModelState);

// Не знайдено
return NotFound();

// Не авторизований
return Unauthorized();

// Доступ заборонений
return Forbid();
```

### Пагінація
```csharp
// Валідація параметрів
if (page < 1) page = 1;
if (pageSize < 1) pageSize = 10;
if (pageSize > 100) pageSize = 100;

// Запит з пагінацією
var result = query
    .Skip((page - 1) * pageSize)
    .Take(pageSize);
```

---

## ✅ Валідація

### FluentValidation правила
```csharp
public class PropertyCreateValidator : AbstractValidator<PropertyCreateModel>
{
    public PropertyCreateValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("Назва є обов'язковим полем")
            .MinimumLength(4).WithMessage("Назва повинна містити мінімум 4 символів")
            .MaximumLength(100).WithMessage("Назва не може перевищувати 100 символів");

        RuleFor(x => x.Price)
            .GreaterThan(0).WithMessage("Ціна повинна бути більше 0")
            .LessThanOrEqualTo(100000000).WithMessage("Ціна не може перевищувати 100,000,000");
    }
}
```

### Автоматична валідація
```csharp
// Program.cs
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<PropertyCreateValidator>();
```

---

## 🔐 Авторизація

### JWT налаштування
```csharp
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["AccessTokenSettings:Issuer"],
            ValidAudience = builder.Configuration["AccessTokenSettings:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["AccessTokenSettings:SigningKey"]))
        };
    });
```

### Політики авторизації
```csharp
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("RequireAdmin", policy =>
        policy.RequireRole("Admin"));
    options.AddPolicy("RequireUser", policy =>
        policy.RequireRole("User"));
});
```

### Використання в контролерах
```csharp
[Authorize] // Потребує авторизації
[Authorize(Policy = "RequireAdmin")] // Тільки адміністратори
[Authorize(Roles = "Admin,User")] // Адміністратори або користувачі
```

---

## 📁 Обробка файлів

### Налаштування
```csharp
// Шлях для завантаження
private readonly string _uploadPath = "wwwroot/uploads/properties";

// Створення директорії
Directory.CreateDirectory(_uploadPath);
```

### Валідація файлів
```csharp
private bool IsValidImageFile(IFormFile file)
{
    if (file == null || file.Length == 0) return false;
    
    var allowedMimeTypes = new[] 
    { 
        "image/jpeg", "image/jpg", "image/png", 
        "image/gif", "image/webp" 
    };
    
    var allowedExtensions = new[] 
    { 
        ".jpg", ".jpeg", ".png", ".gif", ".webp" 
    };
    
    var mimeType = file.ContentType.ToLowerInvariant();
    var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
    
    return allowedMimeTypes.Contains(mimeType) && 
           allowedExtensions.Contains(extension);
}
```

### Обмеження
- **Розмір файлу**: максимум 10MB
- **Кількість файлів**: максимум 10 на нерухомість
- **Формати**: JPEG, PNG, GIF, WebP

---

## 📝 Логування

### Serilog налаштування
```json
{
  "Serilog": {
    "MinimumLevel": {
      "Default": "Information",
      "Override": {
        "Microsoft": "Warning",
        "System": "Warning"
      }
    },
    "WriteTo": [
      {
        "Name": "Console"
      },
      {
        "Name": "File",
        "Args": {
          "path": "logs/log-.txt",
          "rollingInterval": "Day",
          "retainedFileCountLimit": 7
        }
      }
    ]
  }
}
```

### Структуровані логи
```csharp
_logger.LogInformation("Getting property by ID: {PropertyId}", id);
_logger.LogWarning("Property not found with ID: {PropertyId}", id);
_logger.LogError(ex, "Failed to get property: {PropertyId}", id);
```

---

## 🧪 Тестування

### Unit тести
```csharp
[Test]
public async Task GetAll_ShouldReturnProperties()
{
    // Arrange
    var mockContext = new Mock<RealEstateDbContext>();
    var manager = new PropertyManager(mockContext.Object);
    
    // Act
    var result = await manager.GetAll();
    
    // Assert
    Assert.IsNotNull(result);
}
```

### Інтеграційні тести
```csharp
[Test]
public async Task GetProperties_ShouldReturnOk()
{
    // Arrange
    var client = _factory.CreateClient();
    
    // Act
    var response = await client.GetAsync("/api/Property");
    
    // Assert
    response.EnsureSuccessStatusCode();
}
```

### Запуск тестів
```bash
dotnet test
dotnet test --filter "Category=Integration"
dotnet test --logger "console;verbosity=detailed"
```

---

## 🚀 Deployment

### Docker
```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["RealEstate.sln", "./"]
COPY ["RealEstate.WebApi/RealEstate.WebApi.csproj", "RealEstate.WebApi/"]
COPY ["RealEstate.DAL/RealEstate.DAL.csproj", "RealEstate.DAL/"]
COPY ["RealEstate.BLL/RealEstate.BLL.csproj", "RealEstate.BLL/"]

RUN dotnet restore "RealEstate.sln"
COPY . .
RUN dotnet build "RealEstate.sln" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "RealEstate.WebApi/RealEstate.WebApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "RealEstate.WebApi.dll"]
```

### Змінні середовища для production
```bash
ASPNETCORE_ENVIRONMENT=Production
REDatabase__ConnectionString="your_production_connection_string"
AccessTokenSettings__SigningKey="your_production_secret_key"
```

### Міграції в production
```bash
# Створення міграції
dotnet ef migrations add MigrationName

# Застосування міграції
dotnet ef database update

# Відкат міграції
dotnet ef database update PreviousMigrationName
```

---

## 🔧 Корисні команди

### Entity Framework
```bash
# Створення міграції
dotnet ef migrations add MigrationName

# Застосування міграцій
dotnet ef database update

# Видалення останньої міграції
dotnet ef migrations remove

# Генерація SQL скрипту
dotnet ef migrations script
```

### Пакети
```bash
# Додавання пакету
dotnet add package PackageName

# Оновлення пакетів
dotnet restore

# Очищення
dotnet clean
```

### Тестування
```bash
# Запуск тестів
dotnet test

# Запуск з покриттям
dotnet test --collect:"XPlat Code Coverage"

# Запуск конкретного тесту
dotnet test --filter "TestName"
```

---

## 📚 Корисні посилання

- [ASP.NET Core Documentation](https://docs.microsoft.com/en-us/aspnet/core/)
- [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)
- [JWT Authentication](https://jwt.io/)
- [FluentValidation](https://fluentvalidation.net/)
- [Serilog](https://serilog.net/)
- [Mapster](https://github.com/MapsterMapper/Mapster)

---

## 🆘 Troubleshooting

### Поширені проблеми

#### Помилка підключення до бази даних
```bash
# Перевірте connection string
# Переконайтеся, що PostgreSQL запущений
# Перевірте мережеві налаштування
```

#### Помилка міграції
```bash
# Видаліть папку Migrations
# Створіть нову міграцію
dotnet ef migrations add InitialCreate
```

#### Проблеми з авторизацією
```bash
# Перевірте JWT налаштування
# Переконайтеся, що токен не застарів
# Перевірте ролі користувача
```

#### Проблеми з завантаженням файлів
```bash
# Перевірте права доступу до папки wwwroot
# Переконайтеся, що папка uploads існує
# Перевірте розмір файлу
```

---

**Версія**: 1.0  
**Останнє оновлення**: 15.08.2025
