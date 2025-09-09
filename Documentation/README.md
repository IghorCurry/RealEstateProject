# 🏠 Real Estate Platform - Документація

## 📋 Зміст

### 🚀 **Основна документація**

- [**Backend API Documentation**](../Backend/RealEstate/README.md) - Документація Backend API
- [**Main Project README**](../README.md) - Головна документація проекту

### 📚 **Локальна документація** (не включена в Git)

Ця папка містить детальну технічну документацію, яка зберігається локально для розробників:

- **API_DOCUMENTATION.md** - Повна документація API
- **DEVELOPER_GUIDE.md** - Гід для розробників
- **PROJECT_OVERVIEW_PLAN.md** - Загальний огляд проекту
- **AZURE_DEPLOYMENT_GUIDE.md** - Детальний гід деплою на Azure
- **deployment-\*.md** - Інструкції та чек-листи деплою
- **FAVORITES_FEATURE.md** - Система улюблених
- **IMAGES_DOCUMENTATION.md** - Управління зображеннями
- **AUTH_MIGRATION.md** - Система аутентифікації

---

## 🎯 **Що це за проект?**

**RealEstate Platform** - це повноцінна веб-платформа для управління нерухомістю, розроблена з використанням сучасних технологій:

- **Frontend:** React 18 + TypeScript + Material-UI
- **Backend:** ASP.NET Core 8 + Entity Framework Core
- **База даних:** PostgreSQL
- **Хмара:** Azure (App Service, Static Web Apps, PostgreSQL)

---

## 🚀 **Швидкий старт**

### Запуск проекту локально:

```bash
# Backend
cd Backend/RealEstate
dotnet restore
dotnet ef database update
dotnet run --project RealEstate.WebApi

# Frontend
cd Frontend/real-estate-front
pnpm install
pnpm dev
```

### Деплой на Azure:

```bash
# Використовуйте скрипт деплою
./import-to-azure.ps1
```

---

## 📖 **Як користуватися документацією?**

1. **Почати з** `PROJECT_OVERVIEW_PLAN.md` для загального розуміння
2. **Використовувати** `DEVELOPER_GUIDE.md` для розробки
3. **Звертатися до** `API_DOCUMENTATION.md` для роботи з API
4. **Консультуватися** з `API_FIXES_LOG.md` для виправлень

---

## 🔄 **Останні оновлення**

- ✅ Видалено застарілу документацію
- ✅ Оновлено структуру файлів
- ✅ Додано актуальну інформацію про проект
- ✅ Створено зручну навігацію по документації

---

## 📞 **Підтримка**

Якщо у вас є питання або потрібна допомога:

1. Перевірте відповідну документацію
2. Зверніться до `API_FIXES_LOG.md` для поточних проблем
3. Використовуйте `CHANGES_SUMMARY.md` для розуміння змін
