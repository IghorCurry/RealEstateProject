# 🏠 RealEstate API Documentation

## 📋 Зміст

1. [Загальна інформація](#загальна-інформація)
2. [Аутентифікація](#аутентифікація)
3. [Нерухомість (Properties)](#нерухомість-properties)
4. [Користувачі (Users)](#користувачі-users)
5. [Запити (Inquiries)](#запити-inquiries)
6. [Улюблене (Favorites)](#улюблене-favorites)
7. [Зображення (Images)](#зображення-images)
8. [Enum значення](#enum-значення)
9. [Коди помилок](#коди-помилок)
10. [Приклади запитів](#приклади-запитів)

---

## 🌐 Загальна інформація

### Базовий URL

```
http://localhost:5158/api
```

### Заголовки

```http
Content-Type: application/json
Authorization: Bearer {token}  // Для захищених ендпоінтів
```

### Формат відповіді

```json
{
  "data": [...],           // Дані
  "totalCount": 100,       // Загальна кількість (для пагінації)
  "page": 1,              // Поточна сторінка
  "pageSize": 10,         // Розмір сторінки
  "totalPages": 10        // Загальна кількість сторінок
}
```

---

## 🔐 Аутентифікація

### Реєстрація

```http
POST /api/Auth/register
```

**Тіло запиту:**

```json
{
  "firstName": "Іван",
  "lastName": "Петренко",
  "email": "ivan@example.com",
  "password": "TestPass123!",
  "phoneNumber": "0501234567"
}
```

**Відповідь:**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "refresh_token_here",
  "expiresIn": 3600,
  "user": {
    "id": "guid-here",
    "firstName": "Іван",
    "lastName": "Петренко",
    "email": "ivan@example.com",
    "role": "User"
  }
}
```

### Вхід

```http
POST /api/Auth/login
```

**Тіло запиту:**

```json
{
  "email": "ivan@example.com",
  "password": "TestPass123!"
}
```

### Оновлення токена

```http
POST /api/Auth/refresh
```

**Тіло запиту:**

```json
{
  "refreshToken": "refresh_token_here"
}
```

---

## 🏠 Нерухомість (Properties)

### Отримання всіх нерухомостей

> **Примітка:** Список нерухомостей включає перше зображення для відображення в картці. Повний масив зображень доступний на детальній сторінці нерухомості.

```http
GET /api/Property
```

**Параметри:**

- `page` (int, optional): Номер сторінки (за замовчуванням: 1)
- `pageSize` (int, optional): Розмір сторінки (за замовчуванням: 10, максимум: 100)

**Відповідь:**

```json
{
  "data": [
    {
      "id": "guid-here",
      "title": "Сучасна квартира в центрі",
      "description": "Розкішна 3-кімнатна квартира...",
      "price": 85000.0,
      "bedrooms": 3,
      "bathrooms": 2,
      "squareMeters": 85.5,
      "propertyType": 2,
      "location": 6,
      "status": 1,
      "address": "вул. Хрещатик, 15, Київ",
      "features": ["Меблі", "Техніка", "Балкон"],
      "createdAt": "2025-08-15T19:28:24.048Z",
      "userId": "guid-here",
      "userName": "Іван Петренко",
      "images": [
        {
          "id": "guid-here",
          "imageUrl": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
          "order": 0
        }
      ]
    }
  ],
  "totalCount": 100,
  "page": 1,
  "pageSize": 10,
  "totalPages": 10
}
```

### Отримання нерухомості за ID

```http
GET /api/Property/{id}
```

**Відповідь:**

```json
{
  "id": "guid-here",
  "title": "Сучасна квартира в центрі",
  "description": "Розкішна 3-кімнатна квартира...",
  "price": 85000.0,
  "bedrooms": 3,
  "bathrooms": 2,
  "squareMeters": 85.5,
  "propertyType": 2,
  "location": 6,
  "status": 1,
  "address": "вул. Хрещатик, 15, Київ",
  "features": ["Меблі", "Техніка", "Балкон"],
  "createdAt": "2025-08-15T19:28:24.048Z",
  "userName": "Іван Петренко",
  "user": {
    "id": "guid-here",
    "firstName": "Іван",
    "lastName": "Петренко",
    "email": "ivan@example.com",
    "phoneNumber": "0501234567",
    "role": "User"
  },
  "images": [
    {
      "id": "guid-here",
      "imageUrl": "/uploads/properties/image1.jpg",
      "order": 0
    }
  ],
  "inquiries": [
    {
      "id": "guid-here",
      "message": "Доброго дня! Цікавлюся цією квартирою...",
      "name": "Олена Петренко",
      "email": "elena@example.com",
      "phone": "0501234567",
      "createdAt": "2025-08-15T19:28:24.048Z"
    }
  ],
  "isFavoritedByCurrentUser": false
}
```

### Пошук нерухомості

```http
GET /api/Property/search
```

**Параметри:**

- `propertyType` (int, optional): Тип нерухомості
- `location` (int, optional): Розташування
- `status` (int, optional): Статус
- `minPrice` (decimal, optional): Мінімальна ціна
- `maxPrice` (decimal, optional): Максимальна ціна
- `minBedrooms` (int, optional): Мінімальна кількість спалень
- `maxBedrooms` (int, optional): Максимальна кількість спалень
- `minBathrooms` (int, optional): Мінімальна кількість ванних
- `maxBathrooms` (int, optional): Максимальна кількість ванних
- `minSquareMeters` (double, optional): Мінімальна площа
- `maxSquareMeters` (double, optional): Максимальна площа
- `features` (string[], optional): Особливості
- `page` (int, optional): Номер сторінки
- `pageSize` (int, optional): Розмір сторінки

### Створення нерухомості

```http
POST /api/Property
Authorization: Bearer {token}
```

**Тіло запиту:**

```json
{
  "title": "Нова квартира",
  "description": "Опис квартири...",
  "price": 75000.0,
  "bedrooms": 2,
  "bathrooms": 1,
  "squareMeters": 65.0,
  "propertyType": 2,
  "location": 6,
  "status": 1,
  "address": "вул. Шевченка, 10, Київ",
  "features": ["Меблі", "Балкон"],
  "images": [], // Файли зображень
  "imageUrls": ["https://example.com/image1.jpg"] // URL зображень
}
```

### Оновлення нерухомості

```http
PUT /api/Property
Authorization: Bearer {token}
```

**Тіло запиту:**

```json
{
  "id": "guid-here",
  "title": "Оновлена назва",
  "description": "Оновлений опис...",
  "price": 80000.0,
  "bedrooms": 3,
  "bathrooms": 2,
  "squareMeters": 70.0,
  "propertyType": 2,
  "location": 6,
  "status": 1,
  "address": "вул. Шевченка, 10, Київ",
  "features": ["Меблі", "Балкон", "Парковка"],
  "images": [], // Нові файли
  "imageUrls": ["https://example.com/image2.jpg"], // Нові URL
  "imagesToDelete": ["guid-here"] // ID зображень для видалення
}
```

### Видалення нерухомості

```http
DELETE /api/Property/{id}
Authorization: Bearer {token}
```

---

## 👥 Користувачі (Users)

### Отримання поточного користувача

```http
GET /api/User/current
Authorization: Bearer {token}
```

### Отримання всіх користувачів (Admin)

```http
GET /api/User
Authorization: Bearer {token}
```

### Отримання користувача за ID (Admin)

```http
GET /api/User/{id}
Authorization: Bearer {token}
```

---

## 📝 Запити (Inquiries)

### Створення запиту

```http
POST /api/Inquiry
Authorization: Bearer {token}
```

**Тіло запиту:**

```json
{
  "propertyId": "guid-here",
  "message": "Доброго дня! Цікавлюся цією квартирою...",
  "name": "Олена Петренко", // Для анонімних користувачів
  "email": "elena@example.com", // Для анонімних користувачів
  "phone": "0501234567" // Для анонімних користувачів
}
```

### Отримання запитів користувача

```http
GET /api/Inquiry/user
Authorization: Bearer {token}
```

### Отримання всіх запитів (Admin)

```http
GET /api/Inquiry
Authorization: Bearer {token}
```

---

## ❤️ Улюблене (Favorites)

### Додавання до улюбленого

```http
POST /api/Favorite
Authorization: Bearer {token}
```

**Тіло запиту:**

```json
{
  "propertyId": "guid-here"
}
```

### Видалення з улюбленого

```http
DELETE /api/Favorite/{propertyId}
Authorization: Bearer {token}
```

### Отримання улюбленого

```http
GET /api/Favorite
Authorization: Bearer {token}
```

### Перевірка чи в улюбленому

```http
GET /api/Favorite/check/{propertyId}
Authorization: Bearer {token}
```

---

## 🖼️ Зображення (Images)

### Завантаження зображень

```http
POST /api/Properties/{propertyId}/images
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Параметри:**

- `files`: Файли зображень (максимум 20 зображень на property, кожен до 10MB)
- **Дозволені формати:** jpg, jpeg, png, gif, webp
- **MIME типи:** image/jpeg, image/jpg, image/png, image/gif, image/webp

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

### Отримання зображень нерухомості

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

### Видалення зображення

```http
DELETE /api/Properties/{propertyId}/images/{imageId}
Authorization: Bearer {token}
```

### Зміна порядку зображень

```http
PUT /api/Properties/{propertyId}/images/reorder
Authorization: Bearer {token}
Content-Type: application/json
```

**Тіло запиту:**

```json
["guid1", "guid2", "guid3"]
```

**Примітки:**

- **URL зображень:** `http://localhost:5158/uploads/properties/{propertyId}/{fileName}`
- **MainImageUrl:** перше зображення за Order (використовується в PropertyViewModel)
- **Права доступу:** тільки власник property або Admin може модифікувати
- **Обмеження:** максимум 20 зображень на одну нерухомість

---

## 📊 Enum значення

### PropertyType (Тип нерухомості)

```json
{
  "House": 1, // Будинок
  "Apartment": 2, // Квартира
  "Condo": 3, // Кондо
  "Townhouse": 4, // Таунхаус
  "Villa": 5, // Вілла
  "Land": 6, // Земельна ділянка
  "Commercial": 7 // Комерційна нерухомість
}
```

### Location (Розташування)

```json
{
  "Downtown": 1, // Центр міста
  "Suburban": 2, // Передмістя
  "Rural": 3, // Сільська місцевість
  "Beachfront": 4, // Біля моря
  "Mountain": 5, // Гірська місцевість
  "Urban": 6 // Міська місцевість
}
```

### PropertyStatus (Статус нерухомості)

```json
{
  "Available": 1, // Доступна
  "Sold": 2, // Продана
  "Rented": 3, // Здана в оренду
  "UnderContract": 4 // Під договором
}
```

---

## ❌ Коди помилок

### HTTP статуси

- `200` - Успішно
- `201` - Створено
- `400` - Помилка валідації
- `401` - Не авторизований
- `403` - Доступ заборонений
- `404` - Не знайдено
- `409` - Уже існує
- `500` - Внутрішня помилка сервера

### Формат помилки

```json
{
  "errors": {
    "title": ["Назва є обов'язковим полем"],
    "price": ["Ціна повинна бути більше 0"]
  },
  "message": "Validation failed"
}
```

---

## 📝 Приклади запитів

### JavaScript (Fetch)

```javascript
// Отримання всіх нерухомостей
const response = await fetch(
  "http://localhost:5158/api/Property?page=1&pageSize=10"
);
const data = await response.json();

// Створення нерухомості
const formData = new FormData();
formData.append("title", "Нова квартира");
formData.append("price", "75000");
// ... інші поля

const response = await fetch("http://localhost:5158/api/Property", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
  },
  body: formData,
});
```

### cURL

```bash
# Отримання всіх нерухомостей
curl -X GET "http://localhost:5158/api/Property?page=1&pageSize=10"

# Створення нерухомості
curl -X POST "http://localhost:5158/api/Property" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Нова квартира",
    "price": 75000,
    "bedrooms": 2
  }'
```

---

## 🔧 Технічні деталі

### Обмеження

- **Розмір файлу**: максимум 10MB
- **Кількість зображень**: максимум 10 на нерухомість
- **Розмір сторінки**: максимум 100 елементів
- **Довжина опису**: максимум 1000 символів
- **Довжина назви**: максимум 100 символів

### Підтримувані формати зображень

- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)

### Кешування

- Список нерухомостей кешується на 5 хвилин
- Детальна інформація не кешується

### Пагінація

Всі ендпоінти, що повертають списки, підтримують пагінацію:

- `page`: номер сторінки (починається з 1)
- `pageSize`: розмір сторінки (1-100)

---

## 📞 Підтримка

Для технічних питань звертайтеся до команди розробки.

**Версія API**: 1.0  
**Останнє оновлення**: 15.08.2025
