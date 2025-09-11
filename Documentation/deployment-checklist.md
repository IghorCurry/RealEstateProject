# 📋 Детальний чек-лист деплою Real Estate Project

## 🎯 Загальна картина

**Що ми робимо:** Розгортаємо повноцінний веб-додаток на Azure з:

- ASP.NET Core Backend API
- React Frontend
- PostgreSQL Database
- Автоматичний CI/CD

**Чому це важливо:** Це дозволить вашому додатку працювати в інтернеті 24/7 з професійною інфраструктурою.

---

## 🔧 ПЕРЕД ДЕПЛОЄМ

### ✅ Крок 1: Підготовка проекту

#### 1.1 Перевірка .gitignore

**Що робимо:** Додаємо файли з секретними даними в .gitignore
**Для чого:** Захищаємо паролі та ключі від потрапляння в репозиторій
**Як:** Додати в .gitignore:

```
appsettings.Production.json
.env.production
```

**Критичність:** 🔴 **КРИТИЧНО** - без цього ваші секрети будуть в публічному доступі

#### 1.2 Створення прикладів конфігурації

**Що робимо:** Створюємо файли-приклади без секретних даних
**Для чого:** Документуємо структуру налаштувань для команди
**Як:** Створити:

- `appsettings.Production.json.example`
- `env.production.example`
  **Критичність:** 🟡 **ВАЖЛИВО** - допомагає іншим розробникам

#### 1.3 Оновлення constants.ts

**Що робимо:** Змінюємо API URL на динамічний
**Для чого:** Дозволяємо змінювати URL API без перекомпіляції
**Як:** В `Frontend/real-estate-front/src/utils/constants.ts`:

```typescript
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5158/api";
```

**Критичність:** 🔴 **КРИТИЧНО** - без цього фронтенд не зможе підключитися до продакшен API

---

## 🏗️ СТВОРЕННЯ AZURE РЕСУРСІВ

### ✅ Крок 2: Реєстрація в Azure

#### 2.1 Створення акаунту

**Що робимо:** Реєструємося на portal.azure.com
**Для чого:** Отримуємо доступ до хмарної інфраструктури
**Як:**

1. Перейти на https://portal.azure.com
2. Натиснути "Start free"
3. Ввести email та створити пароль
4. Додати платіжну інформацію
   **Критичність:** 🔴 **КРИТИЧНО** - без цього нічого не працюватиме

#### 2.2 Встановлення Azure CLI

**Що робимо:** Встановлюємо командний інтерфейс Azure
**Для чого:** Автоматизуємо створення ресурсів
**Як:**

```powershell
winget install Microsoft.AzureCLI
```

**Критичність:** 🟡 **ВАЖЛИВО** - спрощує роботу, але можна і через портал

### ✅ Крок 3: Створення Resource Group

#### 3.1 Створення групи ресурсів

**Що робимо:** Створюємо логічну групу для всіх ресурсів
**Для чого:** Організуємо ресурси, спрощуємо управління та видалення
**Як:**

```powershell
az group create --name "real-estate-rg" --location "West Europe"
```

**Критичність:** 🟡 **ВАЖЛИВО** - без цього ресурси будуть розкидані

---

## 🗄️ БАЗА ДАНИХ

### ✅ Крок 4: Створення PostgreSQL

#### 4.1 Створення сервера

**Що робимо:** Створюємо PostgreSQL сервер в Azure
**Для чого:** Зберігаємо дані додатку (користувачі, нерухомість, запити)
**Як:**

```powershell
az postgres flexible-server create `
    --resource-group "real-estate-rg" `
    --name "real-estate-db-yourname" `
    --location "West Europe" `
    --admin-user postgres `
    --admin-password "YourSecurePassword123!" `
    --sku-name Standard_B1ms `
    --version 13 `
    --storage-size 32
```

**Критичність:** 🔴 **КРИТИЧНО** - без бази даних додаток не працюватиме

#### 4.2 Створення бази даних

**Що робимо:** Створюємо конкретну базу даних
**Для чого:** Ізолюємо дані проекту
**Як:**

```powershell
az postgres flexible-server db create `
    --resource-group "real-estate-rg" `
    --server-name "real-estate-db-yourname" `
    --database-name real_estate
```

**Критичність:** 🔴 **КРИТИЧНО** - без цього таблиці не створяться

#### 4.3 Налаштування firewall

**Що робимо:** Дозволяємо підключення з Azure сервісів
**Для чого:** Backend зможе підключитися до бази даних
**Як:**

```powershell
az postgres flexible-server firewall-rule create `
    --resource-group "real-estate-rg" `
    --name "real-estate-db-yourname" `
    --rule-name AllowAzureServices `
    --start-ip-address 0.0.0.0 `
    --end-ip-address 255.255.255.255
```

**Критичність:** 🔴 **КРИТИЧНО** - без цього backend не зможе підключитися

#### 4.4 Застосування міграцій

**Що робимо:** Створюємо таблиці в базі даних
**Для чого:** Структура бази даних відповідає коду
**Як:**

```powershell
cd Backend/RealEstate/RealEstate.WebApi
dotnet ef database update
```

**Критичність:** 🔴 **КРИТИЧНО** - без таблиць додаток не працюватиме

---

## 🔧 BACKEND ДЕПЛОЙ

### ✅ Крок 5: Створення App Service

#### 5.1 Створення App Service Plan

**Що робимо:** Створюємо план хостингу для backend
**Для чого:** Визначаємо ресурси (CPU, RAM) та вартість
**Як:**

```powershell
az appservice plan create `
    --name "real-estate-api-plan" `
    --resource-group "real-estate-rg" `
    --location "West Europe" `
    --sku B1 `
    --is-linux
```

**Критичність:** 🔴 **КРИТИЧНО** - без плану не можна створити web app

#### 5.2 Створення Web App

**Що робимо:** Створюємо контейнер для backend коду
**Для чого:** Хостимо ASP.NET Core API
**Як:**

```powershell
az webapp create `
    --name "real-estate-api-yourname" `
    --resource-group "real-estate-rg" `
    --plan "real-estate-api-plan" `
    --runtime "DOTNETCORE:8.0"
```

**Критичність:** 🔴 **КРИТИЧНО** - це сам backend сервіс

#### 5.3 Налаштування змінних середовища

**Що робимо:** Додаємо конфігурацію (connection string, ключі)
**Для чого:** Додаток знає як підключитися до бази та працювати
**Як:**

```powershell
$connectionString = "Host=real-estate-db-yourname.postgres.database.azure.com;Database=real_estate;Username=postgres@real-estate-db-yourname;Password=YourSecurePassword123!;SSL Mode=Require;Trust Server Certificate=true;"

az webapp config appsettings set `
    --resource-group "real-estate-rg" `
    --name "real-estate-api-yourname" `
    --settings `
    "ConnectionStrings__REDatabase=$connectionString" `
    "AccessTokenSettings__SigningKey=your-super-secret-key-at-least-32-characters-long" `
    "AccessTokenSettings__SecretKey=your-super-secret-key-at-least-32-characters-long" `
    "AccessTokenSettings__Issuer=RealEstateAPI" `
    "AccessTokenSettings__Audience=RealEstateClient" `
    "DefaultAdminSettings__Username=RealEstateAdmin" `
    "DefaultAdminSettings__Email=admin@realestate.com" `
    "DefaultAdminSettings__PhoneNumber=0501234567" `
    "DefaultAdminSettings__Password=AyA(U8=Fs8h7"
```

**Критичність:** 🔴 **КРИТИЧНО** - без цього backend не знатиме як працювати

#### 5.4 Деплой коду

**Що робимо:** Завантажуємо код на сервер
**Для чого:** Backend починає працювати
**Як:**

```powershell
cd Backend/RealEstate/RealEstate.WebApi
dotnet publish -c Release -o ./publish
Compress-Archive -Path "./publish/*" -DestinationPath "RealEstate.WebApi.zip" -Force
az webapp deployment source config-zip `
    --resource-group "real-estate-rg" `
    --name "real-estate-api-yourname" `
    --src "RealEstate.WebApi.zip"
```

**Критичність:** 🔴 **КРИТИЧНО** - без коду сервіс порожній

---

## 🌐 FRONTEND ДЕПЛОЙ

### ✅ Крок 6: Створення Static Web App

#### 6.1 Створення Static Web App

**Що робимо:** Створюємо хостинг для React додатку
**Для чого:** Хостимо статичні файли (HTML, CSS, JS)
**Як:**

```powershell
az staticwebapp create `
    --name "real-estate-front-yourname" `
    --resource-group "real-estate-rg" `
    --location "West Europe" `
    --source . `
    --branch main `
    --app-location "Frontend/real-estate-front" `
    --output-location "dist" `
    --build-env VITE_API_URL="https://real-estate-api-yourname.azurewebsites.net/api"
```

**Критичність:** 🔴 **КРИТИЧНО** - це сам frontend

#### 6.2 Налаштування environment variables

**Що робимо:** Вказуємо URL backend API
**Для чого:** Frontend знає куди відправляти запити
**Як:** Створити файл `.env.production`:

```
VITE_API_URL=https://real-estate-api-yourname.azurewebsites.net/api
```

**Критичність:** 🔴 **КРИТИЧНО** - без цього фронтенд не зможе підключитися

---

## 🔗 НАЛАШТУВАННЯ ЗВ'ЯЗКУ

### ✅ Крок 7: CORS налаштування

#### 7.1 Оновлення Program.cs

**Що робимо:** Додаємо Azure URL в CORS налаштування
**Для чого:** Дозволяємо фронтенду звертатися до backend
**Як:** В `Backend/RealEstate/RealEstate.WebApi/Program.cs`:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
            "http://localhost:5173",
            "http://localhost:5174",
            "http://localhost:3000",
            "https://real-estate-front-yourname.azurestaticapps.net" // Додати цей URL
        )
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
    });
});
```

**Критичність:** 🔴 **КРИТИЧНО** - без цього браузер заблокує запити

---

## 🧪 ТЕСТУВАННЯ

### ✅ Крок 8: Перевірка роботи

#### 8.1 Тестування Backend

**Що робимо:** Перевіряємо чи backend працює
**Для чого:** Переконуємося що API доступний
**Як:** Відкрити в браузері:

```
https://real-estate-api-yourname.azurewebsites.net/swagger
```

**Критичність:** 🟡 **ВАЖЛИВО** - перевірка функціональності

#### 8.2 Тестування Frontend

**Що робимо:** Перевіряємо чи frontend працює
**Для чого:** Переконуємося що UI доступний
**Як:** Відкрити в браузері:

```
https://real-estate-front-yourname.azurestaticapps.net
```

**Критичність:** 🟡 **ВАЖЛИВО** - перевірка функціональності

#### 8.3 Тестування функціональності

**Що робимо:** Перевіряємо основні функції
**Для чого:** Переконуємося що все працює разом
**Як:** Протестувати:

1. Реєстрація користувача
2. Логін
3. Створення property
4. Перегляд списку properties
5. Тестування фільтрів
   **Критичність:** 🟡 **ВАЖЛИВО** - перевірка функціональності

---

## 📊 МОНІТОРИНГ

### ✅ Крок 9: Налаштування моніторингу

#### 9.1 Application Insights

**Що робимо:** Додаємо моніторинг додатку
**Для чого:** Бачимо помилки, продуктивність, використання
**Як:**

```powershell
az monitor app-insights component create `
    --app "real-estate-insights" `
    --location "West Europe" `
    --resource-group "real-estate-rg" `
    --application-type web
```

**Критичність:** 🟢 **ДОБРЕ** - покращує підтримку

#### 9.2 Алерти

**Що робимо:** Налаштовуємо сповіщення про проблеми
**Для чого:** Дізнаємося про проблеми швидко
**Як:**

```powershell
az monitor metrics alert create `
    --name "HighCPUAlert" `
    --resource-group "real-estate-rg" `
    --scopes "/subscriptions/your-subscription-id/resourceGroups/real-estate-rg/providers/Microsoft.Web/sites/real-estate-api-yourname" `
    --condition "avg Percentage CPU > 80" `
    --description "Alert when CPU usage is high"
```

**Критичність:** 🟢 **ДОБРЕ** - покращує підтримку

---

## 🔒 БЕЗПЕКА

### ✅ Крок 10: Додаткові заходи безпеки

#### 10.1 SSL сертифікати

**Що робимо:** Налаштовуємо HTTPS
**Для чого:** Шифруємо трафік між користувачем та сервером
**Критичність:** 🟡 **ВАЖЛИВО** - захист даних

#### 10.2 Key Vault (опціонально)

**Що робимо:** Зберігаємо секрети в безпечному місці
**Для чого:** Захищаємо паролі та ключі
**Критичність:** 🟢 **ДОБРЕ** - покращує безпеку

---

## 💰 ВАРТІСТЬ

### 📊 Очікувані витрати:

| Ресурс               | План          | Вартість/місяць | Критичність |
| -------------------- | ------------- | --------------- | ----------- |
| App Service Plan     | Basic (B1)    | ~$13            | 🔴 КРИТИЧНО |
| PostgreSQL           | Standard_B1ms | ~$25            | 🔴 КРИТИЧНО |
| Static Web App       | Free          | $0              | 🔴 КРИТИЧНО |
| Application Insights | Free (5GB)    | $0              | 🟢 ДОБРЕ    |
| **Загалом**          |               | **~$38**        |             |

---

## 🚨 КРИТИЧНІ МОМЕНТИ

### 🔴 Що потрібно зробити ОБОВ'ЯЗКОВО:

1. Налаштувати .gitignore
2. Створити базу даних
3. Налаштувати connection string
4. Деплоїти backend
5. Деплоїти frontend
6. Налаштувати CORS

### 🟡 Що важливо, але не критично:

1. Моніторинг
2. SSL сертифікати
3. Алерти

### 🟢 Що можна додати пізніше:

1. Key Vault
2. CDN
3. Auto-scaling

---

## ✅ ФІНАЛЬНА ПЕРЕВІРКА

Після виконання всіх кроків перевірте:

- [ ] Backend доступний: `https://real-estate-api-yourname.azurewebsites.net/swagger`
- [ ] Frontend доступний: `https://real-estate-front-yourname.azurestaticapps.net`
- [ ] Можна зареєструватися
- [ ] Можна увійти
- [ ] Можна створити property
- [ ] Можна переглянути список properties

**🎉 Якщо все працює - ваш проект успішно розгорнутий на Azure!**
