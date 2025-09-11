# 🚀 Azure Deployment Guide - RealEstate Project

## 🎯 Швидкий поетапний гайд

**Ось як виглядає повний процес деплою RealEstate проекту на Azure в розповідному стилі:**

Спочатку вам потрібно **підготувати проект до деплою** - переконатися, що все працює локально, написати тести та підготувати конфігураційні файли. Потім **створюємо Dockerfile'и** для Backend (.NET 8) та Frontend (React + Nginx) - це забезпечить консистентність середовищ та спростить деплой. Додаємо **Docker Compose** для локальної розробки з PostgreSQL базою даних.

Далі **налаштовуємо CI/CD pipeline** - це може бути GitHub Actions, GitLab CI або Azure DevOps. Pipeline автоматично збирає проект, запускає тести, створює Docker образи та пушить їх в Azure Container Registry. **Спочатку деплоїмо на development середовище** - створюємо окрему підписку або resource group для dev, налаштовуємо всі сервіси та перевіряємо працездатність.

Коли впевнені, що все працює на dev, **створюємо production середовище на Azure**. Починаємо з **створення Resource Group** в Azure Portal, потім **App Service Plan** для Backend API та **Azure Database for PostgreSQL** для бази даних. Налаштовуємо **Azure Blob Storage** для зображень нерухомості з правильними CORS налаштуваннями.

**Деплоїмо Backend API** на Azure App Service - публікуємо проект, завантажуємо через Azure CLI або GitHub Actions, налаштовуємо connection strings та environment variables. **Деплоїмо Frontend** на Azure Static Web Apps - збираємо React проект, налаштовуємо змінні середовища та автоматизуємо деплой через GitHub Actions.

**Налаштовуємо додаткові Azure сервіси** - Azure Key Vault для безпечного зберігання секретів, Application Insights для моніторингу, CDN для швидкості завантаження зображень. **Конфігуруємо безпеку** - SSL сертифікати, Network Security Groups, Azure Security Center, backup стратегію та disaster recovery.

**Тестуємо повну функціональність** - перевіряємо API через Swagger, тестуємо завантаження зображень, перевіряємо авторизацію та роботу фронтенду. **Налаштовуємо моніторинг** - Azure Monitor, алерти, логування та performance tracking.

**Оптимізуємо витрати** - налаштовуємо budget алерти, resource tagging, cost analysis та автоматичне зупинення dev ресурсів. **Налаштовуємо production monitoring** - Application Insights, Azure Monitor, security alerts та performance metrics.

В результаті ви отримуєте **повністю функціональну RealEstate платформу в Azure** з автоматизованим CI/CD, безпекою, моніторингом та можливістю масштабування. Весь процес займає від кількох годин до кількох днів залежно від досвіду та складності налаштувань.

## ⚠️ Важливі моменти та типові помилки

### 🐳 **Docker етап:**

- **Важливо:** Переконайтеся, що `Dockerfile` має правильний `WORKDIR` та `COPY` команди
- **Помилка:** Зображення не збираються - перевірте шляхи до файлів у Dockerfile
- **Рішення:** Використовуйте `.dockerignore` для виключення непотрібних файлів

### 🔄 **CI/CD етап:**

- **Важливо:** Secrets мають бути правильно налаштовані в GitHub/GitLab/Azure DevOps
- **Помилка:** Pipeline падає на build - перевірте версії .NET та Node.js
- **Рішення:** Використовуйте `--frozen-lockfile` для pnpm та `--no-restore` для dotnet

### 🗄️ **Database етап:**

- **Важливо:** Connection string має містити `SSL Mode=Require;Trust Server Certificate=true;`
- **Помилка:** "Connection refused" - перевірте firewall rules в Azure Database
- **Рішення:** Додайте ваш IP до firewall rules або увімкніть "Allow access to Azure services"

### 🖼️ **Blob Storage етап:**

- **КРИТИЧНО:** Container access level має бути `Blob (anonymous read access for blobs only)`
- **Важливо:** CORS має бути налаштований з `Allowed origins: *`
- **Помилка:** Зображення не відображаються - перевірте CORS та access level
- **Рішення:** В Azure Portal → Storage Account → CORS → додайте правило для GET

### 🌐 **CORS налаштування:**

- **КРИТИЧНО:** App Service CORS має включати URL вашого фронтенду
- **Важливо:** Додайте `http://localhost:5173` для локальної розробки
- **Помилка:** "CORS policy" помилки - перевірте всі origins в App Service CORS
- **Рішення:** Azure Portal → App Service → CORS → додайте всі необхідні URLs

### 🔐 **Environment Variables:**

- **Важливо:** `VITE_API_BASE_URL` має закінчуватися на `/api`
- **Помилка:** API запити йдуть на неправильний URL
- **Рішення:** Перевірте, що URL не має подвійних слешів та закінчується правильно

### 🔑 **Key Vault інтеграція:**

- **Важливо:** Managed Identity має бути увімкнена для App Service
- **Помилка:** "Access denied" при зверненні до Key Vault
- **Рішення:** Перевірте permissions в Key Vault для Managed Identity

### 📊 **Application Insights:**

- **Важливо:** Instrumentation Key має бути правильно доданий до App Settings
- **Помилка:** Телеметрія не надходить - перевірте connection string
- **Рішення:** Використовуйте connection string замість instrumentation key

### 🚀 **Deployment етап:**

- **Важливо:** App Service Plan має бути створений перед App Service
- **Помилка:** "App Service Plan not found" - створіть план спочатку
- **Рішення:** Завжди створюйте ресурси в правильному порядку

### 🔍 **Тестування етап:**

- **Важливо:** Перевірте Swagger UI за URL `https://your-api.azurewebsites.net/swagger`
- **Помилка:** API не відповідає - перевірте логи в App Service
- **Рішення:** Azure Portal → App Service → Logs → Log stream

### 💰 **Cost Management:**

- **Важливо:** Налаштуйте budget alerts одразу після створення ресурсів
- **Помилка:** Неочікувані витрати - перевірте, чи не залишилися dev ресурси
- **Рішення:** Використовуйте resource tagging для відстеження витрат

### 🛡️ **Security етап:**

- **КРИТИЧНО:** HTTPS має бути увімкнено для всіх сервісів
- **Важливо:** SSL сертифікат має бути правильно прив'язаний
- **Помилка:** "Mixed content" помилки - переконайтеся, що всі URLs використовують HTTPS

### 📈 **Моніторинг етап:**

- **Важливо:** Налаштуйте алерти для CPU, Memory та Response Time
- **Помилка:** Проблеми не виявляються - перевірте, чи працюють алерти
- **Рішення:** Тестуйте алерти, створюючи штучне навантаження

### 🔧 **Troubleshooting загальні принципи:**

1. **Завжди дивіться логи спочатку** - App Service Logs, Application Insights
2. **Перевіряйте connection strings** - вони найчастіше є причиною проблем
3. **Тестуйте локально** - якщо не працює локально, не працюватиме і в Azure
4. **Використовуйте Azure Portal** - там найбільше інформації про помилки
5. **Перевіряйте CORS** - це найпоширеніша проблема з фронтендом

---

## 📋 Зміст

1. [Теорія хмарних обчислень та Azure](#теорія-хмарних-обчислень-та-azure)
2. [Глобальний огляд архітектури](#глобальний-огляд-архітектури)
3. [Підготовка до деплою](#підготовка-до-деплою)
4. [Docker контейнеризація](#docker-контейнеризація)
5. [Детальний деплой Backend API](#детальний-деплой-backend-api)
6. [Детальний деплой Frontend](#детальний-деплой-frontend)
7. [Налаштування Azure Services](#налаштування-azure-services)
8. [CI/CD та DevOps](#cicd-та-devops)
9. [Управління підписками та Cost Management](#управління-підписками-та-cost-management)
10. [Додаткові Azure сервіси](#додаткові-azure-сервіси)
11. [Безпека та Compliance](#безпека-та-compliance)
12. [Конфігурація та тестування](#конфігурація-та-тестування)
13. [Діагностика та вирішення проблем](#діагностика-та-вирішення-проблем)
14. [Моніторинг та підтримка](#моніторинг-та-підтримка)
15. [Найкращі практики](#найкращі-практики)

---

## ☁️ Теорія хмарних обчислень та Azure

### Що таке хмарні обчислення?

**Хмарні обчислення** - це модель доставки обчислювальних ресурсів через інтернет за принципом "плати за те, що використовуєш".

#### Основні моделі хмарних обчислень:

1. **IaaS (Infrastructure as a Service)**

   - Віртуальні машини, мережі, зберігання
   - Приклад: Azure Virtual Machines

2. **PaaS (Platform as a Service)**

   - Платформа для розробки та розгортання
   - Приклад: Azure App Service

3. **SaaS (Software as a Service)**
   - Готове програмне забезпечення
   - Приклад: Microsoft 365

### Чому Azure?

**Microsoft Azure** - це хмарна платформа, яка надає:

- ✅ **Глобальну мережу** дата-центрів
- ✅ **Безпеку** та відповідність стандартам
- ✅ **Масштабованість** та еластичність
- ✅ **Інтеграцію** з інструментами Microsoft
- ✅ **Гнучкість** ціноутворення

### Основні концепції Azure:

#### 1. Resource Groups

**Resource Group** - це контейнер для ресурсів Azure зі спільною життєвою циклом.

**Чому важливо:**

- Організація ресурсів за проектами
- Спрощення управління та видалення
- Контроль доступу та витрат

#### 2. Regions (Регіони)

**Region** - це географічне розташування дата-центрів Azure.

**Чому важливо вибирати регіон:**

- **Latency** - ближче до користувачів = швидше
- **Compliance** - відповідність законодавству
- **Cost** - різні регіони мають різні ціни
- **Availability** - резервування між регіонами

#### 3. App Service Plan

**App Service Plan** - це план хостингу для веб-додатків.

**Чому потрібен App Service Plan:**

- **Визначає регіон** де працюватиме додаток
- **Визначає розмір** віртуальних машин
- **Визначає кількість** екземплярів
- **Визначає ціну** за хостинг

**Типи планів:**

- **Free** - для тестування (обмежені ресурси)
- **Shared** - для невеликих проектів
- **Basic** - для продакшену
- **Standard** - для масштабованих додатків
- **Premium** - для високонавантажених систем

---

## 🏗️ Глобальний огляд архітектури

### Компоненти системи

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   Database      │
│   (React)       │◄──►│   (.NET Core)   │◄──►│   (PostgreSQL)  │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Azure Static    │    │ Azure App       │    │ Azure Database  │
│ Web Apps        │    │ Service         │    │ for PostgreSQL  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Azure Blob      │    │ Azure Key Vault │    │ Azure Monitor   │
│ Storage         │    │ (Secrets)       │    │ (Logs)          │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Технологічний стек

- **Frontend:** React + TypeScript + Vite
- **Backend:** .NET 8 + Entity Framework + PostgreSQL
- **Storage:** Azure Blob Storage для зображень
- **Authentication:** JWT Tokens
- **Deployment:** Azure App Service + Azure Static Web Apps

### Як працює система:

1. **Користувач** відкриває фронтенд (Azure Static Web Apps)
2. **Frontend** робить запити до API (Azure App Service)
3. **API** звертається до бази даних (Azure PostgreSQL)
4. **API** зберігає зображення в Azure Blob Storage
5. **Frontend** відображає зображення з Azure Blob Storage

---

## 🔧 Підготовка до деплою

### Необхідні інструменти

1. **Azure CLI** - для роботи з Azure ресурсами
2. **Git** - для версійного контролю
3. **Visual Studio Code** - для редагування коду
4. **Postman** або **Swagger** - для тестування API

### Попередні вимоги

1. **Azure Account** з активною підпискою
2. **Доступ до Azure Portal**
3. **Локально працюючий проект**

### Підготовка проекту

```bash
# Перевірка структури проекту
├── Backend/
│   └── RealEstate/
│       ├── RealEstate.WebApi/
│       ├── RealEstate.BLL/
│       └── RealEstate.DAL/
├── Frontend/
│   └── real-estate-front/
└── Documentation/
```

---

## 🐳 Docker контейнеризація

### Чому Docker?

**Docker** забезпечує:

- ✅ **Консистентність** середовищ (dev/staging/prod)
- ✅ **Портабельність** додатків
- ✅ **Масштабованість** та еластичність
- ✅ **Спрощення** деплою та CI/CD
- ✅ **Ізоляцію** залежностей

### Dockerfile для Backend API

**Створення Dockerfile в `Backend/RealEstate/RealEstate.WebApi/`:**

```dockerfile
# Використовуємо офіційний .NET 8 runtime образ
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Використовуємо SDK образ для збірки
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Копіюємо файли проекту
COPY ["RealEstate.WebApi/RealEstate.WebApi.csproj", "RealEstate.WebApi/"]
COPY ["RealEstate.BLL/RealEstate.BLL.csproj", "RealEstate.BLL/"]
COPY ["RealEstate.DAL/RealEstate.DAL.csproj", "RealEstate.DAL/"]

# Відновлюємо залежності
RUN dotnet restore "RealEstate.WebApi/RealEstate.WebApi.csproj"

# Копіюємо весь код
COPY . .

# Збираємо проект
WORKDIR "/src/RealEstate.WebApi"
RUN dotnet build "RealEstate.WebApi.csproj" -c Release -o /app/build

# Публікуємо проект
FROM build AS publish
RUN dotnet publish "RealEstate.WebApi.csproj" -c Release -o /app/publish

# Фінальний образ
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Створюємо користувача для безпеки
RUN adduser --disabled-password --gecos '' appuser && chown -R appuser /app
USER appuser

ENTRYPOINT ["dotnet", "RealEstate.WebApi.dll"]
```

### Dockerfile для Frontend

**Створення Dockerfile в `Frontend/real-estate-front/`:**

```dockerfile
# Multi-stage build для оптимізації розміру
FROM node:18-alpine AS build

# Встановлюємо pnpm
RUN npm install -g pnpm

WORKDIR /app

# Копіюємо package files
COPY package*.json pnpm-lock.yaml ./

# Встановлюємо залежності
RUN pnpm install --frozen-lockfile

# Копіюємо код
COPY . .

# Збираємо проект
RUN pnpm build

# Production образ з nginx
FROM nginx:alpine AS production

# Копіюємо зібраний проект
COPY --from=build /app/dist /usr/share/nginx/html

# Копіюємо конфігурацію nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Відкриваємо порт
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Nginx конфігурація

**Створення `nginx.conf` в `Frontend/real-estate-front/`:**

```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    # Логування
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    # Gzip стиснення
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        # Обробка SPA routing
        location / {
            try_files $uri $uri/ /index.html;
        }

        # Кешування статичних файлів
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # Безпека
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
    }
}
```

### Docker Compose для локальної розробки

**Створення `docker-compose.yml` в корені проекту:**

```yaml
version: "3.8"

services:
  # PostgreSQL база даних
  postgres:
    image: postgres:15-alpine
    container_name: real-estate-db
    environment:
      POSTGRES_DB: real_estate
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: AyA(U8=Fs8h7
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - real-estate-network

  # Backend API
  api:
    build:
      context: ./Backend/RealEstate
      dockerfile: RealEstate.WebApi/Dockerfile
    container_name: real-estate-api
    environment:
      - ASPNETCORE_ENVIRONMENT=Development
      - ConnectionStrings__REDatabase=Host=postgres;Database=real_estate;Username=postgres;Password=AyA(U8=Fs8h7
      - AccessTokenSettings__SigningKey=4U4YteiP7RN86bVL8mrJpm47zUG3n29d
    ports:
      - "5000:80"
    depends_on:
      - postgres
    networks:
      - real-estate-network

  # Frontend
  frontend:
    build:
      context: ./Frontend/real-estate-front
      dockerfile: Dockerfile
    container_name: real-estate-frontend
    environment:
      - VITE_API_BASE_URL=http://localhost:5000/api
    ports:
      - "3000:80"
    depends_on:
      - api
    networks:
      - real-estate-network

volumes:
  postgres_data:

networks:
  real-estate-network:
    driver: bridge
```

### Docker Compose для продакшену

**Створення `docker-compose.prod.yml`:**

```yaml
version: "3.8"

services:
  # Backend API
  api:
    build:
      context: ./Backend/RealEstate
      dockerfile: RealEstate.WebApi/Dockerfile
    container_name: real-estate-api-prod
    environment:
      - ASPNETCORE_ENVIRONMENT=Production
      - ConnectionStrings__REDatabase=${DATABASE_CONNECTION_STRING}
      - AccessTokenSettings__SigningKey=${JWT_SIGNING_KEY}
      - AzureStorageConnectionString=${AZURE_STORAGE_CONNECTION_STRING}
    ports:
      - "80:80"
      - "443:443"
    restart: unless-stopped
    networks:
      - real-estate-network

  # Frontend
  frontend:
    build:
      context: ./Frontend/real-estate-front
      dockerfile: Dockerfile
    container_name: real-estate-frontend-prod
    environment:
      - VITE_API_BASE_URL=${API_BASE_URL}
    ports:
      - "80:80"
    restart: unless-stopped
    networks:
      - real-estate-network

networks:
  real-estate-network:
    driver: bridge
```

### Команди для роботи з Docker

**Локальна розробка:**

```bash
# Збірка та запуск всіх сервісів
docker-compose up --build

# Запуск в фоновому режимі
docker-compose up -d

# Перегляд логів
docker-compose logs -f

# Зупинка сервісів
docker-compose down

# Видалення volumes (очищення БД)
docker-compose down -v
```

**Продакшн:**

```bash
# Збірка та запуск продакшн версії
docker-compose -f docker-compose.prod.yml up --build -d

# Оновлення сервісів
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d
```

### Azure Container Registry

**Створення Azure Container Registry:**

```bash
# Створення ACR
az acr create --resource-group real-estate-rg --name realestateacr --sku Basic

# Логін в ACR
az acr login --name realestateacr

# Збірка та push образів
docker build -t realestateacr.azurecr.io/real-estate-api:latest ./Backend/RealEstate
docker push realestateacr.azurecr.io/real-estate-api:latest

docker build -t realestateacr.azurecr.io/real-estate-frontend:latest ./Frontend/real-estate-front
docker push realestateacr.azurecr.io/real-estate-frontend:latest
```

---

## 🚀 Детальний деплой Backend API

### Крок 1: Створення Resource Group

**В Azure Portal:**

1. **Відкрийте** [portal.azure.com](https://portal.azure.com)
2. **Натисніть** кнопку "Create a resource" (Створити ресурс)
3. **У пошуку** введіть "Resource group"
4. **Натисніть** "Resource group" в результатах
5. **Натисніть** "Create" (Створити)

**Налаштування Resource Group:**

- **Subscription:** Виберіть вашу підписку
- **Resource group name:** `real-estate-rg`
- **Region:** `North Europe`
- **Натисніть** "Review + create"
- **Натисніть** "Create"

### Крок 2: Створення App Service Plan

**Чому потрібен App Service Plan:**

- Визначає фізичну інфраструктуру для вашого додатку
- Визначає регіон, розмір машин, кількість екземплярів
- Впливає на продуктивність та вартість

**Створення:**

1. **Натисніть** "Create a resource"
2. **У пошуку** введіть "App Service Plan"
3. **Натисніть** "App Service Plan"
4. **Натисніть** "Create"

**Налаштування:**

- **Subscription:** Виберіть вашу підписку
- **Resource group:** `real-estate-rg` (створений на попередньому кроці)
- **Name:** `real-estate-asp`
- **Operating system:** `Windows`
- **Region:** `North Europe`
- **Pricing plan:** `Basic B1` (для продакшену)
- **Натисніть** "Review + create"
- **Натисніть** "Create"

### Крок 3: Створення Azure App Service

**В Azure Portal:**

1. **Натисніть** "Create a resource"
2. **У пошуку** введіть "Web App"
3. **Натисніть** "Web App"
4. **Натисніть** "Create"

**Basic Settings:**

- **Subscription:** Виберіть вашу підписку
- **Resource group:** `real-estate-rg`
- **Name:** `real-estate-api-ig25` (унікальна назва)
- **Publish:** `Code`
- **Runtime stack:** `.NET 8 (LTS)`
- **Operating system:** `Windows`
- **Region:** `North Europe`
- **App Service Plan:** `real-estate-asp` (створений на попередньому кроці)
- **Sku and size:** `Basic B1`
- **Натисніть** "Next: Deployment"

**Deployment Settings:**

- **Continuous deployment:** `Disable` (для початку)
- **Натисніть** "Next: Monitoring"

**Monitoring Settings:**

- **Enable Application Insights:** `No` (можна додати пізніше)
- **Натисніть** "Review + create"
- **Натисніть** "Create"

### Крок 4: Налаштування бази даних

**Створення Azure Database for PostgreSQL:**

1. **Натисніть** "Create a resource"
2. **У пошуку** введіть "Azure Database for PostgreSQL"
3. **Натисніть** "Azure Database for PostgreSQL"
4. **Натисніть** "Create"

**Basic Settings:**

- **Subscription:** Виберіть вашу підписку
- **Resource group:** `real-estate-rg`
- **Database name:** `real-estate-db-realest`
- **Admin username:** `postgres`
- **Password:** `AyA(U8=Fs8h7` (складний пароль)
- **Confirm password:** `AyA(U8=Fs8h7`
- **Location:** `North Europe`
- **PostgreSQL version:** `15`
- **Compute + storage:** `Basic` (для початку)
- **Натисніть** "Review + create"
- **Натисніть** "Create"

### Крок 5: Налаштування Azure Blob Storage

**Створення Storage Account:**

1. **Натисніть** "Create a resource"
2. **У пошуку** введіть "Storage account"
3. **Натисніть** "Storage account"
4. **Натисніть** "Create"

**Basic Settings:**

- **Subscription:** Виберіть вашу підписку
- **Resource group:** `real-estate-rg`
- **Storage account name:** `realestateimages2025` (унікальна назва)
- **Location:** `North Europe`
- **Performance:** `Standard`
- **Redundancy:** `Locally-redundant storage (LRS)`
- **Натисніть** "Next: Advanced"
- **Натисніть** "Next: Networking"
- **Натисніть** "Next: Data protection"
- **Натисніть** "Next: Encryption"
- **Натисніть** "Next: Tags"
- **Натисніть** "Review + create"
- **Натисніть** "Create"

**Створення контейнера:**

1. **Перейдіть** до створеного Storage Account
2. **У лівому меню** натисніть "Containers"
3. **Натисніть** "+ Container"
4. **Name:** `property-images`
5. **Public access level:** `Blob` (для публічного доступу до зображень)
6. **Натисніть** "Create"

### Крок 6: Конфігурація appsettings.Production.json

**Отримання Connection String для Azure Storage:**

1. **Перейдіть** до Storage Account
2. **У лівому меню** натисніть "Access keys"
3. **Натисніть** "Show" біля key1
4. **Скопіюйте** Connection string

**Створення файлу конфігурації:**

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "ConnectionStrings": {
    "REDatabase": "Host=real-estate-db-realest.postgres.database.azure.com;Database=real_estate;Username=postgres;Password=AyA(U8=Fs8h7;SSL Mode=Require;Trust Server Certificate=true;",
    "AzureStorage": "DefaultEndpointsProtocol=https;AccountName=realestateimages2025;AccountKey=YOUR_ACCOUNT_KEY;EndpointSuffix=core.windows.net"
  },
  "DefaultAdminSettings": {
    "Username": "RealEstateAdmin",
    "Email": "admin@gmail.com",
    "PhoneNumber": "0501234567",
    "Password": "AyA(U8=Fs8h7"
  },
  "AccessTokenSettings": {
    "Issuer": "RealEstateAPI",
    "Audience": "RealEstateClient",
    "SigningKey": "4U4YteiP7RN86bVL8mrJpm47zUG3n29d"
  },
  "AllowedHosts": "*",
  "Environment": "Production"
}
```

### Крок 7: Деплой через Azure CLI

**Встановлення Azure CLI:**

1. **Завантажте** Azure CLI з [docs.microsoft.com](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
2. **Встановіть** та запустіть
3. **Виконайте** `az login`

**Публікація проекту:**

```bash
# Перейдіть до папки з Backend проектом
cd Backend/RealEstate/RealEstate.WebApi

# Публікація проекту
dotnet publish -c Release -o ./publish

# Створення ZIP файлу
Compress-Archive -Path ./publish/* -DestinationPath ./publish.zip

# Деплой в Azure
az webapp deployment source config-zip --resource-group real-estate-rg --name real-estate-api-ig25 --src ./publish.zip
```

**Альтернативний спосіб через Azure Portal:**

1. **Перейдіть** до App Service
2. **У лівому меню** натисніть "Deployment Center"
3. **Натисніть** "Local Git/FTPS credentials"
4. **Встановіть** username та password
5. **Натисніть** "Save"
6. **Скопіюйте** Git clone URL
7. **Виконайте** команди:

```bash
cd Backend/RealEstate/RealEstate.WebApi
git init
git add .
git commit -m "Initial commit"
git remote add azure YOUR_GIT_CLONE_URL
git push azure main
```

---

## 🎨 Детальний деплой Frontend

### Крок 1: Створення Azure Static Web Apps

**В Azure Portal:**

1. **Натисніть** "Create a resource"
2. **У пошуку** введіть "Static Web App"
3. **Натисніть** "Static Web App"
4. **Натисніть** "Create"

**Basic Settings:**

- **Subscription:** Виберіть вашу підписку
- **Resource group:** `real-estate-rg`
- **Name:** `real-estate-front-ig25`
- **Region:** `North Europe`
- **Build Details:** `React`
- **Натисніть** "Next: Build Details"

**Build Details:**

- **Build Preset:** `React`
- **App location:** `/Frontend/real-estate-front`
- **Api location:** ` ` (порожнє)
- **Output location:** `dist`
- **Натисніть** "Review + create"
- **Натисніть** "Create"

### Крок 2: Налаштування змінних середовища

**В Azure Portal:**

1. **Перейдіть** до Static Web App
2. **У лівому меню** натисніть "Configuration"
3. **Натисніть** "Environment variables"
4. **Натисніть** "+ Add"
5. **Name:** `VITE_API_BASE_URL`
6. **Value:** `https://real-estate-api-ig25-eahbg3dwgwemfjej.northeurope-01.azurewebsites.net`
7. **Натисніть** "Add"

### Крок 3: Деплой через GitHub Actions

**Підготовка GitHub репозиторію:**

1. **Створіть** репозиторій на GitHub
2. **Завантажте** код в репозиторій:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

**Підключення до Azure:**

1. **В Azure Portal** перейдіть до Static Web App
2. **У лівому меню** натисніть "Deployment"
3. **Натисніть** "Manage deployment token"
4. **Скопіюйте** токен
5. **В GitHub** перейдіть до Settings → Secrets and variables → Actions
6. **Натисніть** "New repository secret"
7. **Name:** `AZURE_STATIC_WEB_APPS_API_TOKEN`
8. **Value:** вставте скопійований токен
9. **Натисніть** "Add secret"

**Створення GitHub Actions workflow:**

Створіть файл `.github/workflows/azure-static-web-apps.yml`:

```yaml
name: Deploy to Azure Static Web Apps

on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches:
      - main

jobs:
  build_and_deploy_job:
    if: github.event_name == 'push' || (github.event_name == 'pull_request' && github.event.action != 'closed')
    runs-on: ubuntu-latest
    name: Build and Deploy Job
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true
      - name: Build And Deploy
        id: builddeploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: "upload"
          app_location: "/Frontend/real-estate-front"
          api_location: ""
          output_location: "dist"

  close_pull_request_job:
    if: github.event_name == 'pull_request' && github.event.action == 'closed'
    runs-on: ubuntu-latest
    name: Close Pull Request Job
    steps:
      - name: Close Pull Request
        id: closepullrequest
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          action: "close"
```

**Запуск деплою:**

```bash
git add .
git commit -m "Add Azure deployment workflow"
git push origin main
```

---

## 🔄 CI/CD та DevOps

### Що таке CI/CD?

**CI/CD (Continuous Integration/Continuous Deployment)** - це практика автоматизації розробки:

- ✅ **CI (Continuous Integration)** - автоматична збірка та тестування
- ✅ **CD (Continuous Deployment)** - автоматичний деплой в різні середовища
- ✅ **Автоматизація** рутинних процесів
- ✅ **Швидкість** доставки функцій
- ✅ **Якість** коду та стабільність

### GitHub Actions

**Створення `.github/workflows/ci-cd.yml`:**

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  AZURE_WEBAPP_NAME: real-estate-api-ig25
  AZURE_WEBAPP_PACKAGE_PATH: "./Backend/RealEstate/RealEstate.WebApi"
  NODE_VERSION: "18"
  DOTNET_VERSION: "8.0.x"

jobs:
  # Backend CI/CD
  backend:
    runs-on: ubuntu-latest
    environment: production

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup .NET
        uses: actions/setup-dotnet@v3
        with:
          dotnet-version: ${{ env.DOTNET_VERSION }}

      - name: Restore dependencies
        run: dotnet restore ${{ env.AZURE_WEBAPP_PACKAGE_PATH }}

      - name: Build
        run: dotnet build ${{ env.AZURE_WEBAPP_PACKAGE_PATH }} --no-restore

      - name: Test
        run: dotnet test ${{ env.AZURE_WEBAPP_PACKAGE_PATH }} --no-build --verbosity normal

      - name: Publish
        run: dotnet publish ${{ env.AZURE_WEBAPP_PACKAGE_PATH }} -c Release -o ${{ env.AZURE_WEBAPP_PACKAGE_PATH }}/publish

      - name: Deploy to Azure Web App
        uses: azure/webapps-deploy@v2
        with:
          app-name: ${{ env.AZURE_WEBAPP_NAME }}
          publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
          package: ${{ env.AZURE_WEBAPP_PACKAGE_PATH }}/publish

  # Frontend CI/CD
  frontend:
    runs-on: ubuntu-latest
    environment: production

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        working-directory: ./Frontend/real-estate-front

      - name: Build
        run: pnpm build
        working-directory: ./Frontend/real-estate-front
        env:
          VITE_API_BASE_URL: ${{ secrets.VITE_API_BASE_URL }}

      - name: Deploy to Azure Static Web Apps
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: "upload"
          app_location: "/Frontend/real-estate-front"
          api_location: ""
          output_location: "dist"

  # Docker Build and Push
  docker:
    runs-on: ubuntu-latest
    needs: [backend, frontend]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Login to Azure Container Registry
        uses: azure/docker-login@v1
        with:
          login-server: realestateacr.azurecr.io
          username: ${{ secrets.ACR_USERNAME }}
          password: ${{ secrets.ACR_PASSWORD }}

      - name: Build and push Backend image
        run: |
          docker build -t realestateacr.azurecr.io/real-estate-api:${{ github.sha }} ./Backend/RealEstate
          docker push realestateacr.azurecr.io/real-estate-api:${{ github.sha }}

      - name: Build and push Frontend image
        run: |
          docker build -t realestateacr.azurecr.io/real-estate-frontend:${{ github.sha }} ./Frontend/real-estate-front
          docker push realestateacr.azurecr.io/real-estate-frontend:${{ github.sha }}
```

### GitLab CI/CD

**Створення `.gitlab-ci.yml`:**

```yaml
stages:
  - build
  - test
  - deploy

variables:
  DOCKER_DRIVER: overlay2
  DOCKER_TLS_CERTDIR: "/certs"
  AZURE_WEBAPP_NAME: real-estate-api-ig25
  NODE_VERSION: "18"
  DOTNET_VERSION: "8.0.x"

# Backend build and test
backend:build:
  stage: build
  image: mcr.microsoft.com/dotnet/sdk:8.0
  script:
    - cd Backend/RealEstate
    - dotnet restore
    - dotnet build --configuration Release
    - dotnet test --configuration Release --no-build --verbosity normal
  artifacts:
    paths:
      - Backend/RealEstate/RealEstate.WebApi/bin/Release/net8.0/publish/
    expire_in: 1 hour

# Frontend build
frontend:build:
  stage: build
  image: node:18-alpine
  before_script:
    - npm install -g pnpm
  script:
    - cd Frontend/real-estate-front
    - pnpm install --frozen-lockfile
    - pnpm build
  artifacts:
    paths:
      - Frontend/real-estate-front/dist/
    expire_in: 1 hour

# Deploy to Azure
deploy:backend:
  stage: deploy
  image: mcr.microsoft.com/azure-cli:latest
  script:
    - az webapp deployment source config-zip --resource-group real-estate-rg --name $AZURE_WEBAPP_NAME --src Backend/RealEstate/RealEstate.WebApi/bin/Release/net8.0/publish.zip
  only:
    - main
  dependencies:
    - backend:build

# Docker build and push
docker:build:
  stage: deploy
  image: docker:latest
  services:
    - docker:dind
  before_script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
  script:
    - docker build -t $CI_REGISTRY_IMAGE/real-estate-api:$CI_COMMIT_SHA ./Backend/RealEstate
    - docker build -t $CI_REGISTRY_IMAGE/real-estate-frontend:$CI_COMMIT_SHA ./Frontend/real-estate-front
    - docker push $CI_REGISTRY_IMAGE/real-estate-api:$CI_COMMIT_SHA
    - docker push $CI_REGISTRY_IMAGE/real-estate-frontend:$CI_COMMIT_SHA
  only:
    - main
```

### Azure DevOps Pipelines

**Створення `azure-pipelines.yml`:**

```yaml
trigger:
  - main
  - develop

pool:
  vmImage: "ubuntu-latest"

variables:
  buildConfiguration: "Release"
  azureSubscription: "Azure Service Connection"
  appName: "real-estate-api-ig25"
  resourceGroupName: "real-estate-rg"

stages:
  - stage: Build
    displayName: Build stage
    jobs:
      - job: BuildBackend
        displayName: Build Backend
        steps:
          - task: UseDotNet@2
            displayName: "Use .NET 8.0"
            inputs:
              packageType: "sdk"
              version: "8.0.x"

          - task: DotNetCoreCLI@2
            displayName: "Restore packages"
            inputs:
              command: "restore"
              projects: "**/*.csproj"

          - task: DotNetCoreCLI@2
            displayName: "Build"
            inputs:
              command: "build"
              projects: "**/*.csproj"
              arguments: "--configuration $(buildConfiguration)"

          - task: DotNetCoreCLI@2
            displayName: "Test"
            inputs:
              command: "test"
              projects: "**/*Tests/*.csproj"
              arguments: '--configuration $(buildConfiguration) --collect "Code coverage"'

          - task: DotNetCoreCLI@2
            displayName: "Publish"
            inputs:
              command: "publish"
              publishWebProjects: true
              arguments: "--configuration $(buildConfiguration) --output $(Build.ArtifactStagingDirectory)"

          - task: PublishBuildArtifacts@1
            displayName: "Publish artifacts"
            inputs:
              PathtoPublish: "$(Build.ArtifactStagingDirectory)"
              ArtifactName: "drop"

      - job: BuildFrontend
        displayName: Build Frontend
        steps:
          - task: NodeTool@0
            displayName: "Install Node.js"
            inputs:
              versionSpec: "18.x"

          - task: Npm@1
            displayName: "Install pnpm"
            inputs:
              command: "custom"
              customCommand: "install -g pnpm"

          - task: Npm@1
            displayName: "Install dependencies"
            inputs:
              command: "custom"
              customCommand: "run install"
              workingDir: "Frontend/real-estate-front"

          - task: Npm@1
            displayName: "Build"
            inputs:
              command: "custom"
              customCommand: "run build"
              workingDir: "Frontend/real-estate-front"

          - task: PublishBuildArtifacts@1
            displayName: "Publish artifacts"
            inputs:
              PathtoPublish: "Frontend/real-estate-front/dist"
              ArtifactName: "frontend"

  - stage: Deploy
    displayName: Deploy stage
    dependsOn: Build
    condition: succeeded()
    jobs:
      - deployment: DeployBackend
        displayName: Deploy Backend
        environment: "production"
        strategy:
          runOnce:
            deploy:
              steps:
                - task: AzureWebApp@1
                  displayName: "Deploy to Azure Web App"
                  inputs:
                    azureSubscription: "$(azureSubscription)"
                    appName: "$(appName)"
                    package: "$(Pipeline.Workspace)/drop/**/*.zip"

      - deployment: DeployFrontend
        displayName: Deploy Frontend
        environment: "production"
        strategy:
          runOnce:
            deploy:
              steps:
                - task: AzureStaticWebApp@0
                  displayName: "Deploy to Azure Static Web Apps"
                  inputs:
                    app_location: "Frontend/real-estate-front"
                    output_location: "dist"
                    azure_static_web_apps_api_token: "$(AZURE_STATIC_WEB_APPS_API_TOKEN)"
```

### Multi-Environment Deployment

**Створення environment-specific конфігурацій:**

**Development Environment:**

```yaml
# .github/workflows/deploy-dev.yml
name: Deploy to Development

on:
  push:
    branches: [develop]

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: development
    steps:
      - name: Deploy to Dev
        run: |
          echo "Deploying to development environment"
          # Dev-specific deployment steps
```

**Staging Environment:**

```yaml
# .github/workflows/deploy-staging.yml
name: Deploy to Staging

on:
  push:
    branches: [staging]

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - name: Deploy to Staging
        run: |
          echo "Deploying to staging environment"
          # Staging-specific deployment steps
```

**Production Environment:**

```yaml
# .github/workflows/deploy-prod.yml
name: Deploy to Production

on:
  push:
    tags:
      - "v*"

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: Deploy to Production
        run: |
          echo "Deploying to production environment"
          # Production-specific deployment steps
```

### Blue-Green Deployment

**Створення Blue-Green deployment стратегії:**

```yaml
# Blue-Green deployment для Azure App Service
name: Blue-Green Deployment

on:
  push:
    branches: [main]

jobs:
  blue-green-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Deploy to Blue slot
        run: |
          az webapp deployment slot create --name real-estate-api-ig25 --resource-group real-estate-rg --slot blue
          az webapp deployment source config-zip --name real-estate-api-ig25 --resource-group real-estate-rg --slot blue --src ./publish.zip

      - name: Test Blue slot
        run: |
          # Run health checks on blue slot
          curl -f https://real-estate-api-ig25-blue.azurewebsites.net/health || exit 1

      - name: Swap slots
        run: |
          az webapp deployment slot swap --name real-estate-api-ig25 --resource-group real-estate-rg --slot blue --target-slot production

      - name: Cleanup old slot
        run: |
          az webapp deployment slot delete --name real-estate-api-ig25 --resource-group real-estate-rg --slot blue
```

### Secrets Management

**GitHub Secrets:**

```bash
# Необхідні secrets для GitHub Actions
AZURE_WEBAPP_PUBLISH_PROFILE
AZURE_STATIC_WEB_APPS_API_TOKEN
VITE_API_BASE_URL
ACR_USERNAME
ACR_PASSWORD
```

**GitLab Variables:**

```bash
# Необхідні variables для GitLab CI
AZURE_WEBAPP_PUBLISH_PROFILE
AZURE_STATIC_WEB_APPS_API_TOKEN
VITE_API_BASE_URL
CI_REGISTRY_USER
CI_REGISTRY_PASSWORD
```

**Azure DevOps Variables:**

```bash
# Необхідні variables для Azure DevOps
AZURE_STATIC_WEB_APPS_API_TOKEN
VITE_API_BASE_URL
```

---

## ⚙️ Налаштування Azure Services

### CORS Configuration

**В Azure Blob Storage:**

1. **Перейдіть** до Storage Account
2. **У лівому меню** натисніть "Settings" → "Resource sharing (CORS)"
3. **Натисніть** "+ Add"
4. **Заповніть поля:**
   - **Allowed origins:** `*`
   - **Allowed methods:** `GET, POST, PUT, DELETE, HEAD`
   - **Allowed headers:** `*`
   - **Exposed headers:** `*`
   - **Max age:** `86400`
5. **Натисніть** "Add"

### Container Access Levels

**Налаштування контейнера `property-images`:**

1. **Перейдіть** до Storage Account → Containers
2. **Натисніть** на контейнер `property-images`
3. **Натисніть** "Change access level"
4. **Виберіть** "Blob (anonymous read access for blobs only)"
5. **Натисніть** "OK"

### Database Migration

**В Azure SSH Console:**

1. **Перейдіть** до App Service
2. **У лівому меню** натисніть "SSH"
3. **Натисніть** "Go" для відкриття SSH консолі
4. **Виконайте команди:**

```bash
cd /home/site/wwwroot
dotnet ef database update
```

### Налаштування CORS для API

**В Azure Portal:**

1. **Перейдіть** до App Service
2. **У лівому меню** натисніть "CORS"
3. **Додайте дозволені origins:**
   - `https://real-estate-front-ig25-eahbg3dwgwemfjej.northeurope-01.azurewebsites.net`
   - `http://localhost:5173` (для локальної розробки)
4. **Натисніть** "Save"

---

## 💰 Управління підписками та Cost Management

### Створення Azure Subscription

**Типи підписок Azure:**

1. **Free Account** - для тестування та навчання
2. **Pay-As-You-Go** - для малого бізнесу
3. **Enterprise Agreement** - для великих організацій
4. **Student** - для студентів

**Створення підписки:**

1. **Відкрийте** [portal.azure.com](https://portal.azure.com)
2. **Натисніть** "Subscriptions" в лівому меню
3. **Натисніть** "Add" → "Free Trial" або "Pay-As-You-Go"
4. **Заповніть** необхідну інформацію
5. **Підтвердіть** кредитну картку (для Pay-As-You-Go)

### Cost Management та Budget

**Налаштування Budget:**

1. **Перейдіть** до "Cost Management + Billing"
2. **Натисніть** "Budgets"
3. **Натисніть** "Add"
4. **Налаштуйте бюджет:**
   - **Name:** `RealEstate-Monthly-Budget`
   - **Amount:** `$100` (приклад)
   - **Period:** `Monthly`
   - **Start date:** Поточна дата
   - **End date:** `No end date`

**Налаштування алертів:**

```bash
# Створення budget через Azure CLI
az consumption budget create \
  --budget-name "RealEstate-Budget" \
  --amount 100 \
  --time-grain Monthly \
  --start-date 2025-01-01 \
  --end-date 2025-12-31 \
  --category Cost \
  --resource-group real-estate-rg
```

### Resource Tagging Strategy

**Створення тегів для організації:**

```bash
# Додавання тегів до ресурсів
az resource tag \
  --tags Environment=Production Project=RealEstate Owner=DevTeam \
  --resource-group real-estate-rg \
  --name real-estate-api-ig25 \
  --resource-type Microsoft.Web/sites

az resource tag \
  --tags Environment=Production Project=RealEstate Owner=DevTeam \
  --resource-group real-estate-rg \
  --name real-estate-db-realest \
  --resource-type Microsoft.DBforPostgreSQL/servers
```

**Стандартні теги:**

- `Environment`: `Development`, `Staging`, `Production`
- `Project`: `RealEstate`
- `Owner`: `DevTeam`, `DevOpsTeam`
- `CostCenter`: `IT`, `Marketing`
- `CreatedDate`: `2025-01-01`
- `ExpiryDate`: `2025-12-31`

### Cost Optimization

**Аналіз витрат:**

1. **Cost Analysis** в Azure Portal
2. **Resource Cost** по групах ресурсів
3. **Service Cost** по сервісах
4. **Location Cost** по регіонах

**Стратегії оптимізації:**

```bash
# Перевірка невикористовуваних ресурсів
az resource list --query "[?tags.Environment=='Development']" --output table

# Автоматичне зупинення dev ресурсів
az automation account create \
  --resource-group real-estate-rg \
  --name real-estate-automation \
  --location "North Europe"
```

**Reserved Instances:**

```bash
# Створення Reserved Instance для App Service
az reservations reservation-order create \
  --reservation-order-name "RealEstate-Reserved" \
  --billing-scope "/subscriptions/YOUR_SUBSCRIPTION_ID" \
  --term "P1Y" \
  --quantity 1 \
  --applied-scope-type "Shared"
```

### Multi-Subscription Management

**Структура підписок:**

```
┌─────────────────────────────────────┐
│           Organization              │
├─────────────────────────────────────┤
│  Development Subscription           │
│  ├── Dev Environment               │
│  ├── Test Environment              │
│  └── Staging Environment           │
├─────────────────────────────────────┤
│  Production Subscription            │
│  ├── Production Environment        │
│  ├── DR Environment                │
│  └── Monitoring Environment        │
└─────────────────────────────────────┘
```

**Управління доступом:**

```bash
# Створення Management Group
az account management-group create \
  --name "RealEstate-MG" \
  --display-name "Real Estate Management Group"

# Додавання підписок до Management Group
az account management-group subscription add \
  --name "RealEstate-MG" \
  --subscription "YOUR_DEV_SUBSCRIPTION_ID"

az account management-group subscription add \
  --name "RealEstate-MG" \
  --subscription "YOUR_PROD_SUBSCRIPTION_ID"
```

### Billing та Invoicing

**Налаштування billing:**

1. **Billing Account** створення
2. **Payment Methods** додавання
3. **Tax Information** налаштування
4. **Invoice Delivery** налаштування

**Моніторинг витрат:**

```bash
# Отримання поточних витрат
az consumption usage list \
  --start-date 2025-01-01 \
  --end-date 2025-01-31 \
  --output table

# Детальний звіт по ресурсах
az consumption usage list \
  --start-date 2025-01-01 \
  --end-date 2025-01-31 \
  --include-meter-details \
  --output table
```

### Cost Alerts

**Налаштування алертів:**

```bash
# Створення cost alert
az monitor action-group create \
  --resource-group real-estate-rg \
  --name "Cost-Alert-Group" \
  --short-name "CostAlert"

# Додавання email notification
az monitor action-group update \
  --resource-group real-estate-rg \
  --name "Cost-Alert-Group" \
  --add-action email "DevTeam" "devteam@company.com"
```

**Webhook notifications:**

```bash
# Додавання webhook для Slack/Teams
az monitor action-group update \
  --resource-group real-estate-rg \
  --name "Cost-Alert-Group" \
  --add-action webhook "Slack" "https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK"
```

### Resource Governance

**Azure Policy для cost control:**

```json
{
  "if": {
    "allOf": [
      {
        "field": "type",
        "equals": "Microsoft.Compute/virtualMachines"
      },
      {
        "field": "Microsoft.Compute/virtualMachines/sku.name",
        "like": "Standard_D*"
      }
    ]
  },
  "then": {
    "effect": "deny",
    "details": {
      "message": "Only Basic tier VMs are allowed for cost optimization"
    }
  }
}
```

**Застосування Policy:**

```bash
# Створення Policy Definition
az policy definition create \
  --name "cost-optimization-policy" \
  --display-name "Cost Optimization Policy" \
  --description "Policy to control resource costs" \
  --rules policy-rules.json

# Призначення Policy до Resource Group
az policy assignment create \
  --name "cost-policy-assignment" \
  --display-name "Cost Policy Assignment" \
  --policy "cost-optimization-policy" \
  --resource-group real-estate-rg
```

### Cost Reporting

**Автоматичні звіти:**

```bash
# Створення scheduled report
az automation runbook create \
  --resource-group real-estate-rg \
  --automation-account-name real-estate-automation \
  --name "Cost-Report-Generator" \
  --runbook-type PowerShell

# Schedule для щомісячних звітів
az automation schedule create \
  --resource-group real-estate-rg \
  --automation-account-name real-estate-automation \
  --name "Monthly-Cost-Report" \
  --frequency Month \
  --interval 1 \
  --start-time "2025-01-01T09:00:00Z"
```

**Dashboard для cost monitoring:**

```json
{
  "lenses": {
    "0": {
      "order": 0,
      "parts": {
        "0": {
          "position": {
            "x": 0,
            "y": 0,
            "colSpan": 6,
            "rowSpan": 4
          },
          "metadata": {
            "inputs": [],
            "type": "Extension/Microsoft_CostManagement/PartType/CostAnalysisPart",
            "settings": {
              "scope": "/subscriptions/YOUR_SUBSCRIPTION_ID"
            }
          }
        }
      }
    }
  }
}
```

---

## 🔍 Конфігурація та тестування

### Перевірка API

**Swagger UI:**

1. **Відкрийте** браузер
2. **Перейдіть** за URL: `https://real-estate-api-ig25-eahbg3dwgwemfjej.northeurope-01.azurewebsites.net/swagger`
3. **Перевірте** чи відкривається Swagger UI

**Основні endpoints для тестування:**

- `GET /api/Property` - список нерухомості
- `POST /api/Property` - створення нерухомості
- `POST /api/Auth/login` - авторизація

### Тестування завантаження зображень

**Через Swagger:**

1. **Відкрийте** `POST /api/Property` в Swagger
2. **Натисніть** "Try it out"
3. **Заповніть** обов'язкові поля
4. **У полі Images** натисніть "Choose File"
5. **Виберіть** зображення
6. **Натисніть** "Execute"
7. **Перевірте** відповідь

### Перевірка URL зображень

**Приклад URL:**

```
https://realestateimages2025.blob.core.windows.net/property-images/2c3c5e4a-b467-4f5d-9546-4d754d693110_1.jpg
```

**Як перевірити:**

1. **Скопіюйте** URL зображення
2. **Вставте** в нову вкладку браузера
3. **Перевірте** чи відкривається зображення

### Тестування фронтенду

**Відкриття сайту:**

1. **Перейдіть** за URL: `https://real-estate-front-ig25-eahbg3dwgwemfjej.northeurope-01.azurewebsites.net`
2. **Перевірте** чи завантажується сайт
3. **Спробуйте** увійти під адміном
4. **Створіть** нову нерухомість
5. **Завантажте** зображення

---

## 🔧 Додаткові Azure сервіси

### Azure Key Vault

**Чому потрібен Key Vault:**

- ✅ **Безпечне зберігання** секретів та ключів
- ✅ **Централізоване управління** секретами
- ✅ **Аудит доступу** до секретів
- ✅ **Автоматична ротація** ключів
- ✅ **Інтеграція** з Azure сервісами

**Створення Key Vault:**

```bash
# Створення Key Vault
az keyvault create \
  --name real-estate-keyvault \
  --resource-group real-estate-rg \
  --location "North Europe" \
  --sku standard

# Додавання секретів
az keyvault secret set \
  --vault-name real-estate-keyvault \
  --name "DatabaseConnectionString" \
  --value "Host=real-estate-db-realest.postgres.database.azure.com;Database=real_estate;Username=postgres;Password=AyA(U8=Fs8h7;SSL Mode=Require;"

az keyvault secret set \
  --vault-name real-estate-keyvault \
  --name "JwtSigningKey" \
  --value "4U4YteiP7RN86bVL8mrJpm47zUG3n29d"

az keyvault secret set \
  --vault-name real-estate-keyvault \
  --name "AzureStorageConnectionString" \
  --value "DefaultEndpointsProtocol=https;AccountName=realestateimages2025;AccountKey=YOUR_ACCOUNT_KEY;EndpointSuffix=core.windows.net"
```

**Інтеграція з App Service:**

```bash
# Налаштування Managed Identity
az webapp identity assign \
  --name real-estate-api-ig25 \
  --resource-group real-estate-rg

# Додавання доступу до Key Vault
az keyvault set-policy \
  --name real-estate-keyvault \
  --object-id $(az webapp identity show --name real-estate-api-ig25 --resource-group real-estate-rg --query principalId -o tsv) \
  --secret-permissions get list

# Налаштування App Settings для Key Vault
az webapp config appsettings set \
  --name real-estate-api-ig25 \
  --resource-group real-estate-rg \
  --settings \
    "@Microsoft.KeyVault(SecretUri=https://real-estate-keyvault.vault.azure.net/secrets/DatabaseConnectionString/)" \
    "@Microsoft.KeyVault(SecretUri=https://real-estate-keyvault.vault.azure.net/secrets/JwtSigningKey/)" \
    "@Microsoft.KeyVault(SecretUri=https://real-estate-keyvault.vault.azure.net/secrets/AzureStorageConnectionString/)"
```

### Azure Application Insights

**Створення Application Insights:**

```bash
# Створення Application Insights
az monitor app-insights component create \
  --app real-estate-insights \
  --location "North Europe" \
  --resource-group real-estate-rg

# Отримання Instrumentation Key
az monitor app-insights component show \
  --app real-estate-insights \
  --resource-group real-estate-rg \
  --query instrumentationKey -o tsv
```

**Налаштування в .NET Core:**

```csharp
// Program.cs
builder.Services.AddApplicationInsightsTelemetry();

// appsettings.json
{
  "ApplicationInsights": {
    "InstrumentationKey": "YOUR_INSTRUMENTATION_KEY"
  }
}
```

**Налаштування в App Service:**

```bash
# Додавання Application Insights до App Service
az webapp config appsettings set \
  --name real-estate-api-ig25 \
  --resource-group real-estate-rg \
  --settings \
    APPINSIGHTS_INSTRUMENTATIONKEY="YOUR_INSTRUMENTATION_KEY" \
    APPLICATIONINSIGHTS_CONNECTION_STRING="InstrumentationKey=YOUR_INSTRUMENTATION_KEY;IngestionEndpoint=https://northeurope-2.in.applicationinsights.azure.com/"
```

### Azure CDN

**Створення CDN Profile:**

```bash
# Створення CDN Profile
az cdn profile create \
  --name real-estate-cdn \
  --resource-group real-estate-rg \
  --sku Standard_Microsoft

# Створення CDN Endpoint
az cdn endpoint create \
  --name real-estate-cdn-endpoint \
  --profile-name real-estate-cdn \
  --resource-group real-estate-rg \
  --origin realestateimages2025.blob.core.windows.net \
  --origin-host-header realestateimages2025.blob.core.windows.net
```

**Налаштування кешування:**

```bash
# Налаштування правил кешування
az cdn endpoint rule add \
  --name real-estate-cdn-endpoint \
  --profile-name real-estate-cdn \
  --resource-group real-estate-rg \
  --rule-name "ImageCaching" \
  --order 1 \
  --match-variable RequestUri \
  --operator BeginsWith \
  --match-values "/property-images/" \
  --action-name CacheExpiration \
  --cache-behavior Override \
  --cache-duration "365.00:00:00"
```

### Azure Load Balancer

**Створення Load Balancer:**

```bash
# Створення Public IP
az network public-ip create \
  --name real-estate-lb-ip \
  --resource-group real-estate-rg \
  --location "North Europe" \
  --sku Standard

# Створення Load Balancer
az network lb create \
  --name real-estate-lb \
  --resource-group real-estate-rg \
  --location "North Europe" \
  --sku Standard \
  --public-ip-address real-estate-lb-ip

# Створення Backend Pool
az network lb address-pool create \
  --name real-estate-backend-pool \
  --lb-name real-estate-lb \
  --resource-group real-estate-rg

# Створення Health Probe
az network lb probe create \
  --name real-estate-health-probe \
  --lb-name real-estate-lb \
  --resource-group real-estate-rg \
  --protocol Http \
  --port 80 \
  --path "/health"

# Створення Load Balancing Rule
az network lb rule create \
  --name real-estate-lb-rule \
  --lb-name real-estate-lb \
  --resource-group real-estate-rg \
  --protocol Tcp \
  --frontend-port 80 \
  --backend-port 80 \
  --frontend-ip-name LoadBalancerFrontEnd \
  --backend-pool-name real-estate-backend-pool \
  --probe-name real-estate-health-probe
```

### Azure Traffic Manager

**Створення Traffic Manager Profile:**

```bash
# Створення Traffic Manager Profile
az network traffic-manager profile create \
  --name real-estate-traffic-manager \
  --resource-group real-estate-rg \
  --routing-method Performance \
  --unique-dns-name real-estate-tm

# Додавання endpoints
az network traffic-manager endpoint create \
  --name "primary-endpoint" \
  --profile-name real-estate-traffic-manager \
  --resource-group real-estate-rg \
  --type azureEndpoints \
  --target-resource-id $(az webapp show --name real-estate-api-ig25 --resource-group real-estate-rg --query id -o tsv) \
  --endpoint-status Enabled \
  --weight 1
```

### Azure Service Bus

**Створення Service Bus:**

```bash
# Створення Service Bus Namespace
az servicebus namespace create \
  --name real-estate-servicebus \
  --resource-group real-estate-rg \
  --location "North Europe" \
  --sku Standard

# Створення Queue
az servicebus queue create \
  --name property-notifications \
  --namespace-name real-estate-servicebus \
  --resource-group real-estate-rg

# Створення Topic
az servicebus topic create \
  --name property-events \
  --namespace-name real-estate-servicebus \
  --resource-group real-estate-rg
```

### Azure Redis Cache

**Створення Redis Cache:**

```bash
# Створення Redis Cache
az redis create \
  --name real-estate-redis \
  --resource-group real-estate-rg \
  --location "North Europe" \
  --sku Basic \
  --vm-size c0

# Отримання connection string
az redis list-keys \
  --name real-estate-redis \
  --resource-group real-estate-rg
```

**Налаштування в .NET Core:**

```csharp
// Program.cs
builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = "real-estate-redis.redis.cache.windows.net:6380,password=YOUR_PASSWORD,ssl=True,abortConnect=False";
});
```

### Azure Functions

**Створення Function App:**

```bash
# Створення Storage Account для Functions
az storage account create \
  --name realestatefunctions \
  --resource-group real-estate-rg \
  --location "North Europe" \
  --sku Standard_LRS

# Створення Function App
az functionapp create \
  --name real-estate-functions \
  --resource-group real-estate-rg \
  --storage-account realestatefunctions \
  --runtime dotnet \
  --runtime-version 8.0 \
  --consumption-plan-location "North Europe"
```

**Приклад Function для обробки зображень:**

```csharp
// ImageProcessingFunction.cs
[FunctionName("ImageProcessing")]
public static async Task Run(
    [ServiceBusTrigger("property-notifications", Connection = "ServiceBusConnection")] string message,
    [Blob("property-images/{id}", FileAccess.Write)] Stream outputBlob,
    ILogger log)
{
    log.LogInformation($"Processing image: {message}");

    // Image processing logic
    await ProcessImageAsync(message, outputBlob);
}
```

### Azure Logic Apps

**Створення Logic App:**

```bash
# Створення Logic App
az logic workflow create \
  --name real-estate-logic-app \
  --resource-group real-estate-rg \
  --location "North Europe"
```

**Приклад Logic App для email notifications:**

```json
{
  "definition": {
    "$schema": "https://schema.management.azure.com/providers/Microsoft.Logic/schemas/2016-06-01/workflowdefinition.json#",
    "contentVersion": "1.0.0.0",
    "parameters": {},
    "triggers": {
      "When_a_HTTP_request_is_received": {
        "type": "Request",
        "kind": "Http",
        "inputs": {
          "schema": {
            "type": "object",
            "properties": {
              "propertyId": {
                "type": "string"
              },
              "userEmail": {
                "type": "string"
              }
            }
          }
        }
      }
    },
    "actions": {
      "Send_an_email": {
        "type": "ApiConnection",
        "inputs": {
          "host": {
            "connection": {
              "name": "@parameters('$connections')['office365']['connectionId']"
            }
          },
          "method": "post",
          "path": "/v2/Mail",
          "body": {
            "To": "@triggerBody()['userEmail']",
            "Subject": "New Property Available",
            "Body": "A new property has been added to our platform!"
          }
        }
      }
    }
  }
}
```

### Azure Event Grid

**Створення Event Grid Topic:**

```bash
# Створення Event Grid Topic
az eventgrid topic create \
  --name real-estate-events \
  --resource-group real-estate-rg \
  --location "North Europe"

# Створення Event Subscription
az eventgrid event-subscription create \
  --name property-created-subscription \
  --source-resource-id $(az eventgrid topic show --name real-estate-events --resource-group real-estate-rg --query id -o tsv) \
  --endpoint-type webhook \
  --endpoint https://real-estate-api-ig25.azurewebsites.net/api/events/property-created
```

### Azure API Management

**Створення API Management:**

```bash
# Створення API Management
az apim create \
  --name real-estate-apim \
  --resource-group real-estate-rg \
  --location "North Europe" \
  --publisher-email admin@realestate.com \
  --publisher-name "Real Estate Team" \
  --sku-name Developer
```

**Імпорт API:**

```bash
# Імпорт OpenAPI специфікації
az apim api import \
  --resource-group real-estate-rg \
  --service-name real-estate-apim \
  --api-id real-estate-api \
  --path "real-estate" \
  --specification-format OpenApi \
  --specification-url https://real-estate-api-ig25.azurewebsites.net/swagger/v1/swagger.json
```

---

## 🛠️ Діагностика та вирішення проблем

### Як знаходити проблеми

#### 1. Перевірка логів Azure API

**В Azure SSH Console:**

1. **Перейдіть** до App Service
2. **У лівому меню** натисніть "SSH"
3. **Натисніть** "Go"
4. **Виконайте команди:**

```bash
cd /home/site/wwwroot
tail -f logs/*.log
```

**Основні типи помилок:**

- **Database connection errors** - проблема з підключенням до БД
- **Blob Storage errors** - проблема з завантаженням файлів
- **Authentication errors** - проблема з JWT токенами

#### 2. Перевірка конфігурації

**В Azure SSH Console:**

```bash
cd /home/site/wwwroot
cat appsettings.Production.json
```

**Ключові налаштування для перевірки:**

- ✅ **Connection strings** правильні
- ✅ **Email адміна** правильний (`admin@gmail.com`)
- ✅ **Azure Storage** налаштований

#### 3. Перевірка Azure Services

**В Azure Portal:**

1. **App Service** → **Logs** → **Log stream**
2. **Database** → **Connection security**
3. **Storage Account** → **CORS settings**

### Типові проблеми та рішення

#### Проблема: Фотографії не відображаються

**Діагностика:**

1. **Перевірити CORS налаштування** в Azure Blob Storage
2. **Перевірити рівень доступу** контейнера (`Blob`)
3. **Перевірити URL** фотографії в браузері

**Рішення:**

1. **В Azure Portal** перейдіть до Storage Account
2. **Натисніть** "Settings" → "Resource sharing (CORS)"
3. **Додайте правило:**
   ```
   Allowed origins: *
   Allowed methods: GET, POST, PUT, DELETE, HEAD
   Allowed headers: *
   Exposed headers: *
   Max age: 86400
   ```
4. **Натисніть** "Add"

#### Проблема: Помилка авторизації

**Діагностика:**

1. **Перевірити JWT токен** в браузері (F12 → Application)
2. **Перевірити AccessTokenSettings** в конфігурації
3. **Перевірити час** (може бути проблема з часовими зонами)

**Рішення:**

1. **В Azure SSH Console:**

```bash
cd /home/site/wwwroot
nano appsettings.Production.json
```

2. **Перевірте налаштування:**

```json
"AccessTokenSettings": {
  "Issuer": "RealEstateAPI",
  "Audience": "RealEstateClient",
  "SigningKey": "4U4YteiP7RN86bVL8mrJpm47zUG3n29d"
}
```

#### Проблема: Помилка підключення до бази даних

**Діагностика:**

1. **Перевірити connection string**
2. **Перевірити firewall rules** в Azure Database
3. **Перевірити SSL налаштування**

**Рішення:**

1. **В Azure Portal** перейдіть до Database
2. **Натисніть** "Connection security"
3. **У розділі "Firewall rules"** натисніть "+ Add your client IPv4 address"
4. **Натисніть** "Save"

### Інструменти діагностики

#### 1. Azure Portal

- **App Service** → **Logs** → **Log stream**
- **Database** → **Query editor**
- **Storage Account** → **Container** → **Browse**

#### 2. Azure CLI

```bash
# Перевірка статусу App Service
az webapp show --name real-estate-api-ig25 --resource-group real-estate-rg

# Перевірка логів
az webapp log tail --name real-estate-api-ig25 --resource-group real-estate-rg
```

#### 3. Browser Developer Tools

- **Network tab** - перевірка HTTP запитів
- **Console tab** - помилки JavaScript
- **Application tab** - JWT токени

#### 4. Swagger UI

- **Тестування API endpoints**
- **Перевірка відповідей**
- **Діагностика помилок**

### Як перевіряти, що проблема виправлена

#### 1. Функціональне тестування

- ✅ **Авторизація** працює
- ✅ **Створення property** працює
- ✅ **Завантаження зображень** працює
- ✅ **Відображення зображень** працює

#### 2. Технічне тестування

- ✅ **API endpoints** відповідають
- ✅ **Database queries** виконуються
- ✅ **Blob Storage** доступний
- ✅ **CORS** налаштований

#### 3. Моніторинг

- ✅ **Логи** без помилок
- ✅ **Performance** в нормі
- ✅ **Uptime** 100%

---

## 🔒 Безпека та Compliance

### SSL/TLS сертифікати

**Отримання SSL сертифікату:**

```bash
# Створення App Service Managed Certificate
az webapp config ssl create \
  --name real-estate-api-ig25 \
  --resource-group real-estate-rg \
  --hostname real-estate-api-ig25.azurewebsites.net

# Прив'язка сертифікату
az webapp config ssl bind \
  --name real-estate-api-ig25 \
  --resource-group real-estate-rg \
  --certificate-thumbprint YOUR_CERTIFICATE_THUMBPRINT \
  --ssl-type SNI
```

**Налаштування HTTPS redirect:**

```bash
# Примусове перенаправлення на HTTPS
az webapp config set \
  --name real-estate-api-ig25 \
  --resource-group real-estate-rg \
  --https-only true
```

### Azure Security Center

**Налаштування Security Center:**

```bash
# Увімкнення Security Center
az security pricing create \
  --name "AppService" \
  --tier "Standard"

az security pricing create \
  --name "SqlServers" \
  --tier "Standard"
```

**Security рекомендації:**

1. **Enable MFA** для всіх адміністраторів
2. **Enable Just-In-Time** доступ до VMs
3. **Enable Adaptive Application Controls**
4. **Enable File Integrity Monitoring**

### Network Security

**Network Security Groups:**

```bash
# Створення NSG
az network nsg create \
  --name real-estate-nsg \
  --resource-group real-estate-rg \
  --location "North Europe"

# Додавання правил
az network nsg rule create \
  --name "Allow-HTTPS" \
  --nsg-name real-estate-nsg \
  --resource-group real-estate-rg \
  --priority 100 \
  --source-address-prefixes "*" \
  --source-port-ranges "*" \
  --destination-address-prefixes "*" \
  --destination-port-ranges 443 \
  --access Allow \
  --protocol Tcp

az network nsg rule create \
  --name "Allow-HTTP" \
  --nsg-name real-estate-nsg \
  --resource-group real-estate-rg \
  --priority 110 \
  --source-address-prefixes "*" \
  --source-port-ranges "*" \
  --destination-address-prefixes "*" \
  --destination-port-ranges 80 \
  --access Allow \
  --protocol Tcp
```

**Azure Firewall:**

```bash
# Створення Firewall
az network firewall create \
  --name real-estate-firewall \
  --resource-group real-estate-rg \
  --location "North Europe"

# Додавання правил
az network firewall network-rule create \
  --firewall-name real-estate-firewall \
  --resource-group real-estate-rg \
  --collection-name "Allow-Web" \
  --priority 100 \
  --action Allow \
  --source-addresses "*" \
  --protocols TCP \
  --destination-ports 80 443
```

### Identity та Access Management

**Azure Active Directory B2C:**

```bash
# Створення B2C Tenant
az ad b2c tenant create \
  --display-name "Real Estate B2C" \
  --domain-name "realestateb2c" \
  --location "North Europe"
```

**Multi-Factor Authentication:**

```bash
# Налаштування MFA для користувачів
az ad user update \
  --id "user@domain.com" \
  --force-change-password-next-sign-in true
```

### Data Protection

**Azure Information Protection:**

```bash
# Створення Information Protection Policy
az information-protection policy create \
  --name "Real Estate Data Policy" \
  --description "Policy for real estate data protection"
```

**Encryption at Rest:**

```bash
# Увімкнення encryption для Storage Account
az storage account update \
  --name realestateimages2025 \
  --resource-group real-estate-rg \
  --encryption-services blob file

# Увімкнення encryption для Database
az postgres server update \
  --name real-estate-db-realest \
  --resource-group real-estate-rg \
  --infrastructure-encryption Enabled
```

### Backup Strategy

**Azure Backup для App Service:**

```bash
# Створення Backup Vault
az backup vault create \
  --name real-estate-backup-vault \
  --resource-group real-estate-rg \
  --location "North Europe"

# Налаштування backup policy
az backup policy create \
  --name "AppService-Backup-Policy" \
  --vault-name real-estate-backup-vault \
  --resource-group real-estate-rg \
  --policy-type AzureIaasVM \
  --backup-management-type AzureIaasVM
```

**Database Backup:**

```bash
# Налаштування автоматичного backup для PostgreSQL
az postgres server configuration set \
  --name backup_retention_days \
  --resource-group real-estate-rg \
  --server-name real-estate-db-realest \
  --value 30

az postgres server configuration set \
  --name geo_redundant_backup \
  --resource-group real-estate-rg \
  --server-name real-estate-db-realest \
  --value Enabled
```

**Storage Account Backup:**

```bash
# Налаштування point-in-time restore
az storage account blob-service-properties update \
  --account-name realestateimages2025 \
  --resource-group real-estate-rg \
  --enable-change-feed true \
  --enable-versioning true \
  --enable-delete-retention true \
  --delete-retention-days 30
```

### Disaster Recovery

**Azure Site Recovery:**

```bash
# Створення Recovery Services Vault
az backup vault create \
  --name real-estate-recovery-vault \
  --resource-group real-estate-rg \
  --location "North Europe"

# Налаштування replication policy
az backup policy create \
  --name "Replication-Policy" \
  --vault-name real-estate-recovery-vault \
  --resource-group real-estate-rg \
  --policy-type AzureIaasVM
```

**Cross-Region Backup:**

```bash
# Створення Storage Account в іншому регіоні
az storage account create \
  --name realestatebackup2025 \
  --resource-group real-estate-rg \
  --location "West Europe" \
  --sku Standard_LRS

# Налаштування replication
az storage account update \
  --name realestateimages2025 \
  --resource-group real-estate-rg \
  --replication-type GRS
```

### Compliance та Auditing

**Azure Policy для compliance:**

```json
{
  "if": {
    "allOf": [
      {
        "field": "type",
        "equals": "Microsoft.Storage/storageAccounts"
      },
      {
        "field": "Microsoft.Storage/storageAccounts/supportsHttpsTrafficOnly",
        "equals": "false"
      }
    ]
  },
  "then": {
    "effect": "deny",
    "details": {
      "message": "Storage accounts must use HTTPS only"
    }
  }
}
```

**Activity Log Monitoring:**

```bash
# Створення Log Analytics Workspace
az monitor log-analytics workspace create \
  --name real-estate-logs \
  --resource-group real-estate-rg \
  --location "North Europe"

# Налаштування Activity Log
az monitor activity-log alert create \
  --name "Security-Alerts" \
  --resource-group real-estate-rg \
  --condition category=Security \
  --action-group "Security-Action-Group"
```

### Security Monitoring

**Azure Sentinel:**

```bash
# Увімкнення Sentinel
az sentinel workspace create \
  --name real-estate-sentinel \
  --resource-group real-estate-rg \
  --location "North Europe"
```

**Security Alerts:**

```bash
# Створення Security Alert Rules
az security alert-rule create \
  --name "Suspicious-Login" \
  --resource-group real-estate-rg \
  --location "North Europe" \
  --description "Alert for suspicious login attempts"
```

### Vulnerability Management

**Azure Security Center Recommendations:**

```bash
# Отримання security рекомендацій
az security assessment list \
  --resource-group real-estate-rg \
  --output table

# Застосування security рекомендацій
az security assessment create \
  --name "Security-Assessment" \
  --resource-group real-estate-rg \
  --status "Healthy"
```

**Container Security:**

```bash
# Сканування Docker образів
az acr task create \
  --name "Security-Scan" \
  --registry realestateacr \
  --resource-group real-estate-rg \
  --context https://github.com/YOUR_REPO.git \
  --file Dockerfile \
  --image "real-estate-api:{{.Run.ID}}" \
  --arg BUILD_DATE="{{.Run.ID}}"
```

### Data Privacy

**GDPR Compliance:**

```bash
# Налаштування data retention policies
az storage account management-policy create \
  --account-name realestateimages2025 \
  --resource-group real-estate-rg \
  --policy '{
    "rules": [
      {
        "name": "DeleteOldData",
        "type": "Lifecycle",
        "definition": {
          "filters": {
            "blobTypes": ["blockBlob"],
            "prefixMatch": ["property-images/"]
          },
          "actions": {
            "baseBlob": {
              "delete": {
                "daysAfterModificationGreaterThan": 2555
              }
            }
          }
        }
      }
    ]
  }'
```

**Data Classification:**

```bash
# Налаштування data classification
az information-protection policy create \
  --name "Data-Classification-Policy" \
  --description "Policy for classifying real estate data" \
  --labels '[
    {
      "name": "Public",
      "displayName": "Public Information",
      "description": "Information that can be publicly shared"
    },
    {
      "name": "Internal",
      "displayName": "Internal Information",
      "description": "Information for internal use only"
    },
    {
      "name": "Confidential",
      "displayName": "Confidential Information",
      "description": "Confidential business information"
    }
  ]'
```

---

## 📊 Моніторинг та підтримка

### Azure Monitor

**Налаштування алертів:**

1. **App Service** → **Alerts**
2. **Database** → **Alerts**
3. **Storage Account** → **Alerts**

### Логування

**Структура логів:**

```
logs/
├── app-20250825.log
├── app-20250826.log
└── app-20250827.log
```

**Ключові події для моніторингу:**

- `[INF] User logged in successfully`
- `[INF] Property created successfully`
- `[INF] File uploaded to Azure`
- `[ERR] Database connection failed`
- `[ERR] Blob upload failed`

### Backup Strategy

**База даних:**

- **Automated backups** кожні 24 години
- **Point-in-time recovery** до 35 днів

**Код:**

- **Git repository** з усіма змінами
- **Release tags** для версій

---

## 🎯 Найкращі практики

### Безпека

1. **Secrets Management**

   - Використовувати Azure Key Vault для секретів
   - Не зберігати паролі в коді
   - Ротація ключів регулярно

2. **Network Security**

   - Firewall rules для бази даних
   - HTTPS для всіх з'єднань
   - CORS налаштування

3. **Authentication**
   - JWT токени з коротким терміном дії
   - Refresh token механізм
   - Валідація на сервері

### Performance

1. **Database Optimization**

   - Індекси для часто використовуваних полів
   - Connection pooling
   - Query optimization

2. **Image Optimization**

   - Компресія зображень
   - Кешування в браузері
   - CDN для статичних файлів

3. **API Optimization**
   - Pagination для великих списків
   - Caching headers
   - Async/await для I/O операцій

### Scalability

1. **Horizontal Scaling**

   - App Service Plan з можливістю масштабування
   - Load balancer для декількох екземплярів
   - Database read replicas

2. **Vertical Scaling**
   - Збільшення ресурсів при необхідності
   - Monitoring використання ресурсів
   - Auto-scaling rules

### Maintenance

1. **Regular Updates**

   - .NET runtime updates
   - Security patches
   - Dependency updates

2. **Monitoring**

   - Application performance monitoring
   - Error tracking
   - User analytics

3. **Testing**
   - Unit tests
   - Integration tests
   - End-to-end tests

---

## 📈 Масштабування

### Планування росту

1. **Traffic Analysis**

   - Monitor user activity
   - Identify peak usage times
   - Plan for seasonal spikes

2. **Resource Planning**

   - Database capacity planning
   - Storage growth estimation
   - Compute resource scaling

3. **Cost Optimization**
   - Right-sizing resources
   - Reserved instances
   - Auto-shutdown for dev environments

### Advanced Features

1. **Microservices Architecture**

   - Split monolith into services
   - API Gateway
   - Service mesh

2. **Multi-region Deployment**

   - Global distribution
   - Disaster recovery
   - Geographic routing

3. **Advanced Monitoring**
   - Application Insights
   - Custom metrics
   - Alert automation

---

## 🔗 Корисні посилання

### Azure Documentation

- [Azure App Service](https://docs.microsoft.com/en-us/azure/app-service/)
- [Azure Database for PostgreSQL](https://docs.microsoft.com/en-us/azure/postgresql/)
- [Azure Blob Storage](https://docs.microsoft.com/en-us/azure/storage/blobs/)
- [Azure Static Web Apps](https://docs.microsoft.com/en-us/azure/static-web-apps/)

### Development Tools

- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/)
- [Azure Portal](https://portal.azure.com/)
- [Swagger UI](https://swagger.io/tools/swagger-ui/)

### Monitoring & Debugging

- [Azure Monitor](https://docs.microsoft.com/en-us/azure/azure-monitor/)
- [Application Insights](https://docs.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview/)
- [Azure Log Analytics](https://docs.microsoft.com/en-us/azure/azure-monitor/logs/log-analytics-overview/)

---

## 📝 Висновок

Цей гід покриває повний процес деплою RealEstate проекту на Azure, включаючи:

- ✅ **Теорію хмарних обчислень** та Azure
- ✅ **Повну архітектуру** системи
- ✅ **Детальні інструкції** деплою з пошаговими діями
- ✅ **Діагностику проблем** та їх рішення
- ✅ **Моніторинг** та підтримку
- ✅ **Найкращі практики** для масштабування

**Ключові досягнення:**

- Успішний деплой Backend API на Azure App Service
- Успішний деплой Frontend на Azure Static Web Apps
- Налаштування Azure Database for PostgreSQL
- Інтеграція з Azure Blob Storage для зображень
- Повна функціональність системи в хмарі

**Результат:** Повністю функціональна RealEstate платформа в Azure з можливістю масштабування та підтримки.
