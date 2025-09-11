# Авторизація та обмеження доступу

## Загальна інформація

Система використовує JWT токени для авторизації та політики доступу для обмеження функціональності.

## Політики доступу

### RequireAdmin

- Доступ тільки для користувачів з роллю "Admin"
- Використовується для адміністративних функцій

### RequireUser

- Доступ для користувачів з роллю "User"
- Використовується для звичайних користувачів

## Обмеження по контролерам

### PropertyController

#### Методи, доступні тільки для адміністраторів:

- `GET /api/property/by-status/{status}` - Перегляд об'єктів за статусом
- `POST /api/property` - Створення нового об'єкта нерухомості
- `PUT /api/property/{id}` - Оновлення об'єкта нерухомості
- `DELETE /api/property/{id}` - Видалення об'єкта нерухомості

#### Методи, доступні для всіх авторизованих користувачів:

- `GET /api/property/get-all` - Перегляд всіх об'єктів
- `GET /api/property/{id}` - Перегляд конкретного об'єкта
- `GET /api/property/search` - Пошук об'єктів
- `GET /api/property/by-type/{propertyType}` - Фільтрація за типом
- `GET /api/property/by-location/{location}` - Фільтрація за локацією
- `GET /api/property/user/{userId}` - Перегляд об'єктів користувача

### UserController

#### Методи, доступні тільки для адміністраторів:

- `GET /api/user/get-all` - Перегляд всіх користувачів
- `GET /api/user/{id}` - Перегляд інформації про користувача
- `GET /api/user/by-email/{email}` - Пошук користувача за email
- `GET /api/user/by-username/{username}` - Пошук користувача за username
- `POST /api/user` - Створення нового користувача
- `PUT /api/user/{id}` - Оновлення інформації про користувача
- `DELETE /api/user/{id}` - Видалення користувача

### InquiryController

#### Методи, доступні тільки для адміністраторів:

- `GET /api/inquiry/get-all` - Перегляд всіх запитів
- `GET /api/inquiry/{id}` - Перегляд конкретного запиту
- `GET /api/inquiry/by-property/{propertyId}` - Перегляд запитів по об'єкту
- `GET /api/inquiry/by-user/{userId}` - Перегляд запитів користувача
- `PUT /api/inquiry/{id}` - Оновлення статусу запиту
- `DELETE /api/inquiry/{id}` - Видалення запиту

#### Методи, доступні для всіх авторизованих користувачів:

- `POST /api/inquiry` - Створення нового запиту

### FavoriteController

#### Методи, доступні тільки для адміністраторів:

- `GET /api/favorite/count/{propertyId}` - Статистика по улюбленим

#### Методи, доступні для всіх авторизованих користувачів:

- `POST /api/favorite` - Додавання до улюблених
- `DELETE /api/favorite/{userId}/{propertyId}` - Видалення з улюблених
- `GET /api/favorite/user/{userId}` - Перегляд улюблених користувача
- `GET /api/favorite/check/{userId}/{propertyId}` - Перевірка чи є улюбленим

### AuthController

#### Методи, доступні для всіх користувачів (без авторизації):

- `POST /api/auth/login` - Вхід в систему
- `POST /api/auth/register` - Реєстрація
- `POST /api/auth/refresh-token` - Оновлення токена
- `POST /api/auth/logout` - Вихід з системи
- `POST /api/auth/validate-token` - Валідація токена

## Налаштування авторизації

Політики доступу налаштовуються в `Program.cs`:

```csharp
builder.Services.AddAuthorization(option =>
{
    option.AddPolicy("RequireAdmin", policy =>
        policy.RequireRole("Admin"));
    option.AddPolicy("RequireUser", policy =>
        policy.RequireRole("User"));
});
```

## Використання атрибутів

### Для обмеження доступу тільки для адміністраторів:

```csharp
[Authorize(Policy = "RequireAdmin")]
```

### Для обмеження доступу тільки для авторизованих користувачів:

```csharp
[Authorize]
```

### Для обмеження доступу тільки для звичайних користувачів:

```csharp
[Authorize(Policy = "RequireUser")]
```

## Безпека

1. Всі адміністративні функції захищені політикою "RequireAdmin"
2. Користувацькі функції захищені атрибутом `[Authorize]`
3. Методи аутентифікації доступні для всіх користувачів
4. JWT токени використовуються для авторизації
5. Ролі користувачів перевіряються на рівні політик доступу
