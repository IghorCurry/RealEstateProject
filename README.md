# 🏠 RealEstate Project - Full Stack Application

Сучасна платформа нерухомості з повним стеком технологій: **React + TypeScript** фронтенд та **ASP.NET Core 8** бекенд.

## 🚀 Live Demo

- **Frontend**: [https://real-estate-front-ig25.azurestaticapps.net](https://real-estate-front-ig25.azurestaticapps.net)
- **Backend API**: [https://real-estate-api-ig25.azurewebsites.net/api](https://real-estate-api-ig25.azurewebsites.net/api)
- **API Documentation**: [https://real-estate-api-ig25.azurewebsites.net/swagger](https://real-estate-api-ig25.azurewebsites.net/swagger)

## 📋 Основні функції

### 🏠 Нерухомість

- ✅ Перегляд каталогу нерухомості
- ✅ Детальна інформація про об'єкти
- ✅ Пошук та фільтрація
- ✅ Завантаження зображень
- ✅ Створення та редагування об'єктів

### 👤 Користувачі

- ✅ Реєстрація та авторизація
- ✅ Управління профілем
- ✅ Система ролей (Admin/User)

### ❤️ Улюблене

- ✅ Додавання об'єктів в улюблене
- ✅ Перегляд улюбленого
- ✅ Управління списком

### 📝 Запити

- ✅ Створення запитів про нерухомість
- ✅ Анонімні запити
- ✅ Управління запитами

## 🛠️ Технології

### Frontend

- **React 18** - UI бібліотека
- **TypeScript** - Типізація
- **Vite** - Збірник
- **React Router** - Навігація
- **Axios** - HTTP клієнт
- **Tailwind CSS** - Стилізація

### Backend

- **ASP.NET Core 8** - Web API
- **Entity Framework Core** - ORM
- **PostgreSQL** - База даних
- **JWT** - Аутентифікація
- **FluentValidation** - Валідація
- **Mapster** - Object mapping

### DevOps

- **Azure** - Хмарна платформа
- **GitHub Actions** - CI/CD
- **Docker** - Контейнеризація

## 🏗️ Архітектура

```
RealEstateProject/
├── Frontend/real-estate-front/     # React + TypeScript
│   ├── src/
│   │   ├── components/            # React компоненти
│   │   ├── pages/                 # Сторінки
│   │   ├── services/              # API сервіси
│   │   ├── types/                 # TypeScript типи
│   │   └── utils/                 # Утиліти
│   └── public/                    # Статичні файли
├── Backend/RealEstate/            # ASP.NET Core
│   ├── RealEstate.DAL/           # Data Access Layer
│   ├── RealEstate.BLL/           # Business Logic Layer
│   └── RealEstate.WebApi/        # Presentation Layer
└── Documentation/                 # Документація
```

## 🚀 Швидкий старт

### Необхідні вимоги

- **Node.js 18+** та **pnpm**
- **.NET 8.0 SDK**
- **PostgreSQL 14+**
- **Docker** (опціонально)

### Локальний запуск

1. **Клонування репозиторію**

```bash
git clone https://github.com/IghorCurry/RealEstateProject.git
cd RealEstateProject
```

2. **Запуск через Docker Compose**

```bash
docker-compose up -d
```

3. **Або ручний запуск**

**Backend:**

```bash
cd Backend/RealEstate/RealEstate.WebApi
dotnet restore
dotnet run
```

**Frontend:**

```bash
cd Frontend/real-estate-front
pnpm install
pnpm dev
```

## 📊 База даних

### Основні таблиці

- `AspNetUsers` - Користувачі
- `Properties` - Нерухомість
- `PropertyImages` - Зображення
- `Inquiries` - Запити
- `Favorites` - Улюблене

### Міграції

```bash
cd Backend/RealEstate/RealEstate.DAL
dotnet ef database update
```

## 🧪 Тестування

```bash
# Backend тести
cd Backend/RealEstate
dotnet test

# Frontend тести
cd Frontend/real-estate-front
pnpm test
```

## 🚀 Deployment

### Azure Deployment

Проект автоматично деплоїться в Azure через GitHub Actions:

1. **Backend**: Azure App Service
2. **Frontend**: Azure Static Web App
3. **Database**: Azure Database for PostgreSQL
4. **Storage**: Azure Blob Storage (для зображень)

### Environment Variables

**Backend:**

```bash
ConnectionStrings__REDatabase="your_connection_string"
AccessTokenSettings__SigningKey="your_secret_key"
AzureStorageConnectionString="your_storage_connection"
```

**Frontend:**

```bash
VITE_API_URL="https://real-estate-api-ig25.azurewebsites.net/api"
```

## 📚 Документація

- [API Documentation](./Documentation/API_DOCUMENTATION.md)
- [Developer Guide](./Documentation/DEVELOPER_GUIDE.md)
- [Deployment Guide](./Documentation/deployment-instructions.md)
- [Azure Storage Setup](./Documentation/azure-storage-setup.md)

## 🔐 Безпека

- JWT токени для аутентифікації
- Ролі для авторизації
- Валідація всіх вхідних даних
- Безпечна обробка файлів
- HTTPS в продакшені

## 📈 Статистика проекту

- **Frontend**: 50+ React компонентів
- **Backend**: 15+ API endpoints
- **Database**: 5 основних таблиць
- **Tests**: Unit та integration тести
- **Documentation**: Повна технічна документація

## 🤝 Внесок

1. Fork репозиторію
2. Створіть feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit зміни (`git commit -m 'Add some AmazingFeature'`)
4. Push в branch (`git push origin feature/AmazingFeature`)
5. Відкрийте Pull Request

## 📞 Підтримка

- **Email**: igor.yushkov.02@gmail.com
- **GitHub Issues**: [Створити issue](https://github.com/IghorCurry/RealEstateProject/issues)

## 📄 Ліцензія

Цей проект розповсюджується під ліцензією MIT. Дивіться файл [LICENSE](LICENSE) для деталей.

---

**Версія**: 1.0  
**Останнє оновлення**: 15.08.2025  
**Автор**: IghorCurry

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FIghorCurry%2FRealEstateProject%2Fmain%2Fazure-deploy.json)
