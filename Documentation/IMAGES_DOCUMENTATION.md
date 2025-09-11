# 🖼️ RealEstate Images Documentation

## 📋 Зміст

1. [Архітектура зображень](#архітектура-зображень)
2. [Структура файлів](#структура-файлів)
3. [API Endpoints](#api-endpoints)
4. [Валідація](#валідація)
5. [Безпека](#безпека)
6. [Приклади використання](#приклади-використання)
7. [Технічні деталі](#технічні-деталі)

---

## 🏗️ Архітектура зображень

### Модель даних

```csharp
// Entity
public class PropertyImage
{
    public Guid Id { get; set; }
    public Guid PropertyId { get; set; }
    public string ImageUrl { get; set; }
    public int Order { get; set; } = 0;
    public Property Property { get; set; }
}

// ViewModel
public class PropertyImageViewModel
{
    public Guid Id { get; init; }
    public string ImageUrl { get; init; }
    public int Order { get; init; }
}
```

### Структура папок

```
wwwroot/
└── uploads/
    └── properties/
        └── {propertyId}/
            ├── {guid1}.jpg
            ├── {guid2}.png
            └── {guid3}.webp
```

### URL структура

- **Збереження в БД:** `/uploads/properties/{propertyId}/{fileName}`
- **Доступ через HTTP:** `http://localhost:5158/uploads/properties/{propertyId}/{fileName}`

---

## 📁 Структура файлів

### Основні файли

- **`PropertyManager.cs`** - логіка роботи з зображеннями
- **`PropertyController.cs`** - API endpoints
- **`PropertyImageCreateValidator.cs`** - валідація завантаження
- **`MapsterConfig.cs`** - мапінг для MainImageUrl

### Ключові методи PropertyManager

```csharp
// Додавання зображення
Task<PropertyImageViewModel> AddImageAsync(Guid propertyId, IFormFile file)

// Видалення зображення
Task<bool> DeleteImageAsync(Guid propertyId, Guid imageId)

// Перестановка зображень
Task<bool> ReorderImagesAsync(Guid propertyId, List<Guid> imageIds)

// Отримання зображень
Task<List<PropertyImageViewModel>> GetPropertyImagesAsync(Guid propertyId)
```

---

## 🌐 API Endpoints

### 1. Завантаження зображень

```http
POST /api/Properties/{propertyId}/images
Content-Type: multipart/form-data
Authorization: Bearer {token}

Body: files[] (максимум 20 зображень на property)
```

**Відповідь:**

```json
[
  {
    "id": "guid",
    "imageUrl": "/uploads/properties/{propertyId}/{fileName}",
    "order": 1
  }
]
```

### 2. Отримання зображень

```http
GET /api/Properties/{propertyId}/images
```

**Відповідь:**

```json
[
  {
    "id": "guid",
    "imageUrl": "/uploads/properties/{propertyId}/{fileName}",
    "order": 0
  }
]
```

### 3. Видалення зображення

```http
DELETE /api/Properties/{propertyId}/images/{imageId}
Authorization: Bearer {token}
```

### 4. Перестановка зображень

```http
PUT /api/Properties/{propertyId}/images/reorder
Authorization: Bearer {token}
Content-Type: application/json

Body: ["guid1", "guid2", "guid3"]
```

---

## ✅ Валідація

### Обмеження файлів

- **Розмір:** максимум 10MB
- **Формати:** jpg, jpeg, png, gif, webp
- **MIME типи:** image/jpeg, image/jpg, image/png, image/gif, image/webp
- **Кількість:** максимум 20 зображень на property

### Валідація в PropertyImageCreateValidator

```csharp
RuleFor(x => x.PropertyId)
    .MustAsync(async (propertyId, cancellation) =>
    {
        var imageCount = await _context.PropertyImages
            .Where(pi => pi.PropertyId == propertyId)
            .CountAsync();
        return imageCount < 20;
    }).WithMessage("Досягнуто максимальну кількість зображень (20)");

RuleFor(x => x.Image)
    .Must(file => file.Length <= 10 * 1024 * 1024)
    .WithMessage("Розмір файлу не може перевищувати 10MB");
```

---

## 🔒 Безпека

### Авторизація

- **Завантаження/Видалення/Перестановка:** тільки власник property або Admin
- **Перегляд:** публічний доступ

### Перевірка прав

```csharp
// В контролері
var currentUserId = GetCurrentUserId();
var isAdmin = User.IsInRole("Admin");

if (!await _manager.CanUserModifyPropertyAsync(propertyId, currentUserId, isAdmin))
{
    return Forbid();
}
```

### Валідація файлів

- Перевірка розширення файлу
- Перевірка MIME типу
- Перевірка розміру файлу
- Генерація унікальних імен файлів

---

## 💡 Приклади використання

### 1. Завантаження зображень через curl

```bash
curl -X POST "http://localhost:5158/api/Properties/{propertyId}/images" \
  -H "Authorization: Bearer {token}" \
  -F "files=@image1.jpg" \
  -F "files=@image2.png"
```

### 2. Отримання зображень

```bash
curl -X GET "http://localhost:5158/api/Properties/{propertyId}/images"
```

### 3. Перестановка зображень

```bash
curl -X PUT "http://localhost:5158/api/Properties/{propertyId}/images/reorder" \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '["guid1", "guid2", "guid3"]'
```

### 4. Видалення зображення

```bash
curl -X DELETE "http://localhost:5158/api/Properties/{propertyId}/images/{imageId}" \
  -H "Authorization: Bearer {token}"
```

---

## 🔧 Технічні деталі

### Логіка Order

- **Початкове значення:** 0
- **Нові зображення:** `Order = max(Order) + 1`
- **Перестановка:** `Order = індекс в масиві (0, 1, 2, ...)`

### Створення папок

```csharp
// Автоматичне створення папки для property
var propertyUploadPath = Path.Combine(_uploadPath, propertyId.ToString());
Directory.CreateDirectory(propertyUploadPath);
```

### MainImageUrl

```csharp
// В MapsterConfig
.Map(dest => dest.MainImageUrl, src =>
    src.Images != null && src.Images.Any() ?
    src.Images.FirstOrDefault().ImageUrl : null);
```

### Статична віддача файлів

```csharp
// В Program.cs
app.UseStaticFiles(); // Включає віддачу wwwroot/uploads/...
```

### Обробка помилок

- **Property not found:** 404
- **Permission denied:** 403
- **Validation failed:** 400
- **File too large:** 400
- **Invalid file type:** 400
- **Max images reached:** 400

---

## 📝 Ключові особливості

### ✅ Що працює правильно

1. **Структура папок:** кожен property має свою папку
2. **Валідація:** повна перевірка файлів
3. **Безпека:** авторизація та права доступу
4. **Order:** правильна логіка нумерації
5. **Статична віддача:** файли доступні через HTTP
6. **Обмеження:** максимум 20 зображень на property

### 🔧 Що було виправлено

1. **Шляхи до файлів:** додано propertyId в URL
2. **Логіка Order:** початок з 0 замість -1
3. **Перевірка кількості:** додано валідацію максимум 20
4. **Створення папок:** автоматичне створення для кожного property
5. **Валідація:** покращено перевірки в PropertyImageCreateValidator

### 🎯 Готово до використання

- ✅ API endpoints працюють
- ✅ Валідація налаштована
- ✅ Безпека реалізована
- ✅ Файли зберігаються правильно
- ✅ Статична віддача працює
- ✅ Order логіка виправлена

---

## 🚀 Готово!

Система роботи з зображеннями повністю налаштована та готова до використання фронтендом.
