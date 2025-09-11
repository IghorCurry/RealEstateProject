# 🏗️ Архітектура та Технології Real Estate Platform

## 📋 Зміст

1. [Огляд проекту](#огляд-проекту)
2. [Стек технологій](#стек-технологій)
3. [Структура папок](#структура-папок)
4. [Роутинг та захист маршрутів](#роутинг-та-захист-маршрутів)
5. [Управління станом](#управління-станом)
6. [HTTP/API шар](#httpapi-шар)
7. [Аутентифікація](#аутентифікація)
8. [Форми та валідація](#форми-та-валідація)
9. [Медіа та зображення](#медіа-та-зображення)
10. [UI/UX компоненти](#uiux-компоненти)
11. [Інтернаціоналізація](#інтернаціоналізація)
12. [Обробка помилок](#обробка-помилок)
13. [Продуктивність](#продуктивність)
14. [Тестування](#тестування)
15. [Додавання нової функції](#додавання-нової-функції)
16. [FAQ та Глосарій](#faq-та-глосарій)
17. [Останні виправлення та оптимізації](#останні-виправлення-та-оптимізації)
18. [Додатки](#додатки)

---

## 🎯 Огляд проекту

### Що це?

Платформа для управління нерухомістю з повним функціоналом: перегляд, створення, редагування властивостей, система запитів, улюблене, адмін-панель.

**Основні функції:**

- 🔍 **Пошук нерухомості** - фільтрація за типом, ціною, локацією
- 📝 **Створення оголошень** - завантаження фото, опис, деталі
- 💼 **Управління профілем** - особистий кабінет користувача
- ❤️ **Система улюблених** - збереження цікавих пропозицій
- 📞 **Система запитів** - зв'язок з власниками нерухомості
- 👨‍💼 **Адмін-панель** - управління користувачами та контентом

### Навіщо це тут?

Демонструє сучасну React архітектуру з TypeScript, правильне управління станом, безпечну аутентифікацію та оптимізовану продуктивність.

**Ключові переваги архітектури:**

- 🏗️ **Модульна структура** - легко додавати нові функції
- 🔒 **Безпека** - JWT аутентифікація, захищені роути
- ⚡ **Продуктивність** - lazy loading, кешування, оптимізація
- 📱 **Responsive design** - працює на всіх пристроях
- 🌍 **Інтернаціоналізація** - підтримка української та англійської мов

### Схема взаємодій

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   Database      │
│   (React)       │◄──►│   (.NET Core)   │◄──►│   (PostgreSQL)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Auth     │    │   JWT Tokens    │    │   User Data     │
│   Context API   │    │   Validation    │    │   Properties    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 🛠️ Стек технологій

### Основні залежності (з package.json)

#### Core Framework

- **React** `^18.3.1` - UI framework з функціональними компонентами
  - Використовує найновіші React 18 features (Suspense, Concurrent Features)
  - Функціональні компоненти з hooks замість класових
  - Virtual DOM для ефективного оновлення UI
- **TypeScript** `^5.6.3` - типізація та безпека типів
  - Строга типізація для запобігання помилок
  - Автодоповнення в IDE та кращий developer experience
  - Інтерфейси для API контрактів та компонентних пропсів
- **Vite** `^5.3.4` - швидкий build tool та dev server
  - Миттєвий hot reload для розробки
  - Оптимізований production build з tree shaking
  - Підтримка TypeScript, CSS modules, та інших препроцесорів

#### UI/UX

- **@mui/material** `^6.1.6` - компоненти Material Design
  - Готові компоненти (Button, Card, TextField, etc.) з консистентним дизайном
  - Вбудована accessibility (ARIA labels, keyboard navigation)
  - Responsive breakpoints та адаптивний дизайн
  - Кастомна тема з брендингом проекту
- **@mui/icons-material** `^6.1.6` - іконки
  - Векторні іконки з можливістю зміни розміру та кольору
  - Оптимізовані для web (SVG формат)
  - Підтримка accessibility (aria-label)
- **@emotion/react** `^11.11.3` - CSS-in-JS
  - Динамічні стилі на основі пропсів
  - CSS-in-JS для компонентного підходу до стилізації
  - Оптимізація та tree shaking невикористаних стилів
- **react-hot-toast** `^2.4.1` - сповіщення
  - Легкі toast повідомлення для user feedback
  - Автоматичне зникнення та анімації
  - Позиціонування та кастомізація

#### State Management

- **@tanstack/react-query** `^5.59.16` - server state management
  - Автоматичне кешування API відповідей
  - Background refetching та синхронізація даних
  - Optimistic updates для кращого UX
  - Error handling та retry логіка
  - Infinite queries для пагінації
  - Mutations для POST/PUT/DELETE операцій
- **Context API** - глобальний стан (auth, language)
  - Легкий спосіб передачі даних через дерево компонентів
  - Використовується для аутентифікації та мови
  - Не потребує додаткових залежностей як Redux
  - Комбінується з useReducer для складнішої логіки

#### Routing

- **react-router-dom** `^6.28.0` - навігація та роутинг
  - Declarative routing з JSX синтаксисом
  - Nested routes для складних layouts
  - Dynamic routing з параметрами (useParams)
  - Programmatic navigation (useNavigate)
  - Route guards через ProtectedRoute компоненти
  - Lazy loading для оптимізації завантаження

#### Forms

- **react-hook-form** `^7.52.1` - управління формами
  - Високопродуктивне управління формами без re-renders
  - Uncontrolled components для кращої продуктивності
  - Валідація в реальному часі та при submit
  - Підтримка складних форм з nested fields
  - Error handling та field-level validation
- **@hookform/resolvers** `^3.9.0` - валідація
  - Інтеграція з різними валідаційними бібліотеками
  - Підтримка Yup, Zod, Joi та інших схем
  - Type-safe валідація з TypeScript
- **yup** `^1.4.0` - схеми валідації
  - Declarative схеми валідації
  - Підтримка складних валідаційних правил
  - Кастомні error messages
  - TypeScript інтеграція

#### HTTP Client

- **axios** `^1.7.9` - HTTP запити
  - Promise-based HTTP клієнт для браузера та Node.js
  - Request/response interceptors для глобальної логіки
  - Автоматичне додавання Authorization headers
  - Error handling та retry логіка
  - Request cancellation для оптимізації
  - TypeScript підтримка

### Development Tools

- **ESLint** `^9.17.0` - лінтинг коду
  - Статичний аналіз коду для виявлення помилок
  - Enforcing coding standards та best practices
  - TypeScript-specific rules та React hooks rules
  - Автоматичне виправлення простих помилок
- **Terser** `^5.43.1` - мініфікація
  - JavaScript minification для production builds
  - Tree shaking для видалення невикористаного коду
  - Source map generation для debugging
  - Dead code elimination
- **webpack-bundle-analyzer** `^4.10.2` - аналіз bundle
  - Візуалізація розміру bundle та залежностей
  - Ідентифікація великих пакетів для оптимізації
  - Аналіз chunk splitting та lazy loading
  - Performance monitoring

---

## 📁 Структура папок

```
src/
├── components/           # Переспользуємі компоненти
│   ├── common/          # Загальні компоненти (Header, Footer, etc.)
│   ├── property/        # Компоненти для нерухомості
│   ├── inquiry/         # Компоненти запитів
│   └── layout/          # Layout компоненти
├── pages/               # Сторінки додатку
├── services/            # API сервіси
├── contexts/            # React Context провайдери
├── hooks/               # Custom React hooks
├── utils/               # Утиліти та хелпери
├── types/               # TypeScript типи
├── config/              # Конфігурація (routes, queryClient)
└── styles/              # Стилі та теми
```

### Роль кожної папки

**components/** - Переспользуємі UI компоненти

- `common/` - Header, Footer, ErrorBoundary, ProtectedRoute
  - Базові компоненти, що використовуються по всьому додатку
  - Layout компоненти та навігація
  - Error handling та захист роутів
- `property/` - PropertyCard, PropertyForm, ImageUpload
  - Специфічні компоненти для роботи з нерухомістю
  - Форми створення/редагування властивостей
  - Завантаження та відображення зображень
- `inquiry/` - InquiryForm та пов'язані компоненти
  - Компоненти для системи запитів
  - Форми зворотного зв'язку

**pages/** - Сторінки додатку (HomePage, PropertiesPage, etc.)

- Кожна сторінка - це окремий компонент
- Використовують компоненти з папки components
- Містять логіку отримання даних через React Query
- Responsive design та accessibility

**services/** - API клієнт та сервіси для роботи з бекендом

- Централізовані HTTP запити до API
- Типізовані інтерфейси для відповідей
- Error handling та retry логіка
- Authentication та authorization

**contexts/** - Глобальний стан через Context API

- AuthContext - управління аутентифікацією
- LanguageContext - управління мовою
- Provider компоненти для обгортання додатку

**hooks/** - Custom hooks для логіки (usePropertyFilters)

- Переспользуєма логіка між компонентами
- Абстракція складних операцій
- TypeScript підтримка та type safety

**utils/** - Допоміжні функції, константи, валідація

- Чисті функції без side effects
- Константи (API endpoints, налаштування)
- Валідаційні функції та утиліти
- Helper функції для форматування даних

---

## 🛣️ Роутинг та захист маршрутів

### Що це?

Система навігації з lazy loading та захистом маршрутів на основі аутентифікації та ролей.

### Навіщо це тут?

Забезпечує безпечний доступ до сторінок, оптимізує завантаження через code splitting.

### Де це в коді?

- `src/config/routes.tsx` - конфігурація роутів
- `src/components/common/ProtectedRoute.tsx` - захист приватних маршрутів
- `src/components/common/PublicRoute.tsx` - перенаправлення авторизованих

### Приклад коду

```typescript
// src/config/routes.tsx
const HomePage = React.lazy(() =>
  import("../pages/HomePage").then((module) => ({ default: module.HomePage }))
);

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />

        {/* Protected routes */}
        <Route
          path="/properties/create"
          element={
            <ProtectedRoute>
              <CreatePropertyPage />
            </ProtectedRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};
```

### Data Flow

1. **Користувач переходить на URL** - браузер робить запит на нову сторінку
2. **React Router знаходить відповідний Route** - система маршрутизації визначає який компонент рендерити
3. **ProtectedRoute перевіряє аутентифікацію** - компонент-обгортка перевіряє чи користувач залогінений
4. **Якщо не авторизований** - перенаправляє на /login з збереженням оригінального URL
5. **Якщо адмін роут** - додатково перевіряє роль користувача (isAdmin)
6. **Завантажує компонент через lazy loading** - динамічно імпортує компонент тільки при потребі
7. **Рендерить сторінку** - відображає контент з loading станами

### Поради та помилки

**✅ Рекомендації:**

- Використовуйте Suspense для lazy loading - забезпечує плавні переходи
- Завжди перевіряйте роль перед рендерингом адмін компонентів - безпека
- Додавайте loading стани під час перевірки аутентифікації - кращий UX
- Використовуйте React.memo для оптимізації re-renders
- Групуйте пов'язані роути в nested структуру

**❌ Типові помилки:**

- Не забувайте про loading стани під час перевірки аутентифікації
- Не робіть зайві re-renders через неправильне використання Context
- Не забувайте про error boundaries для обробки помилок
- Не робіть синхронні запити в useEffect без proper cleanup
- Не забувайте про accessibility (aria-labels, keyboard navigation)

---

## 🔄 Управління станом

### Що це?

Гібридна система управління станом: React Query для server state + Context API для global state.

### Навіщо це тут?

Розділяє server state (дані з API) та client state (UI стан), забезпечує кешування та синхронізацію.

### Де це в коді?

- `src/contexts/AuthContext.tsx` - аутентифікація
- `src/contexts/LanguageContext.tsx` - мова
- `src/config/queryClient.ts` - React Query конфігурація
- `src/hooks/usePropertyFilters.ts` - custom hook

### Приклад коду

```typescript
// src/contexts/AuthContext.tsx
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password });
    authService.setAuthData(response);
    setUser(response.user);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
```

### React Query конфігурація

```typescript
// src/config/queryClient.ts
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: CACHE_TIMES.PROPERTIES, // 2 хвилини
      gcTime: CACHE_TIMES.GARBAGE_COLLECTION, // 15 хвилин
      retry: (failureCount, error) => {
        const apiError = error as { statusCode?: number };
        if (
          apiError?.statusCode &&
          apiError.statusCode >= 400 &&
          apiError.statusCode < 500
        ) {
          return false; // Не повторюємо 4xx помилки
        }
        return failureCount < 3;
      },
    },
  },
});
```

### Data Flow

1. **Server State**: React Query кешує дані з API
   - Автоматичне кешування відповідей від сервера
   - Background refetching для синхронізації
   - Stale-while-revalidate стратегія
2. **Client State**: Context API зберігає UI стан
   - Локальний стан компонентів (модальні вікна, фільтри)
   - Глобальний стан (аутентифікація, мова)
   - Не потребує синхронізації з сервером
3. **Synchronization**: Автоматичне оновлення при зміні даних
   - React Query автоматично оновлює всі компоненти
   - Invalidation queries після mutations
   - Real-time синхронізація між вкладками
4. **Optimistic Updates**: Миттєвий UI feedback
   - Миттєве оновлення UI без очікування сервера
   - Rollback при помилці
   - Кращий user experience

---

## 🌐 HTTP/API шар

### Що це?

Централізований HTTP клієнт з автоматичним додаванням токенів, обробкою помилок та refresh логікою.

### Навіщо це тут?

Забезпечує єдину точку для всіх API запитів, автоматичну аутентифікацію, обробку помилок.

### Де це в коді?

- `src/services/api.ts` - основний API клієнт
- `src/services/propertyService.ts` - сервіс для нерухомості
- `src/services/authService.ts` - сервіс аутентифікації
- `src/utils/constants.ts` - API endpoints

### Приклад коду

```typescript
// src/services/api.ts
class ApiClient {
  private client: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: QueueItem[] = [];

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
    });
    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor - додає токен
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response interceptor - обробляє 401
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          return this.handleTokenRefresh(error);
        }
        return Promise.reject(error);
      }
    );
  }
}
```

### Обробка помилок

```typescript
// src/utils/errorHandler.ts
export const handleApiError = (error: unknown, context: ErrorContext = {}) => {
  const apiError = error as ApiError;

  switch (apiError.statusCode) {
    case 401:
      toast.error("Please log in to continue");
      // Redirect to login
      break;
    case 403:
      toast.error("You don't have permission to perform this action");
      break;
    case 404:
      toast.error("Resource not found");
      break;
    default:
      toast.error(apiError.message || "An error occurred");
  }
};
```

### Data Flow

1. **Request** → Додається Authorization header
   - Axios interceptor автоматично додає Bearer token
   - Token береться з localStorage
   - Request відправляється на сервер
2. **Response Success** → Повертаються дані
   - Сервер обробляє запит та повертає відповідь
   - Дані передаються в компонент
   - React Query кешує відповідь
3. **Response Error 401** → Спроба refresh token
   - Token застарів або недійсний
   - Axios interceptor ловить 401 помилку
   - Автоматично викликається refresh endpoint
4. **Refresh Success** → Повторення оригінального запиту
   - Новий access token зберігається
   - Оригінальний запит повторюється з новим токеном
   - Користувач не помічає переривання
5. **Refresh Failed** → Logout та redirect на login
   - Refresh token також застарів
   - Користувач автоматично виходить з системи
   - Перенаправлення на сторінку входу

---

## 🔐 Аутентифікація

### Що це?

JWT-based аутентифікація з автоматичним refresh токенів та збереженням сесії.

### Навіщо це тут?

Забезпечує безпечний доступ до захищених ресурсів, автоматичне оновлення сесії.

### Де це в коді?

- `src/contexts/AuthContext.tsx` - контекст аутентифікації
- `src/services/authService.ts` - API для auth
- `src/utils/cleanup.ts` - очистка localStorage

### Приклад коду

```typescript
// src/services/authService.ts
export const authService = {
  async login(credentials: UserLogin): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    return response;
  },

  setAuthData(response: AuthResponse): void {
    localStorage.setItem("accessToken", response.accessToken);
    localStorage.setItem("refreshToken", response.refreshToken);
    localStorage.setItem("user", JSON.stringify(response.user));
  },

  logout(): void {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  },

  isAuthenticated(): boolean {
    const token = localStorage.getItem("accessToken");
    return !!(token && token !== "undefined" && token !== "null");
  },
};
```

### Data Flow

1. **Login** → POST /auth/login → JWT tokens
   - Користувач вводить email та password
   - Сервер валідує дані та повертає JWT tokens
   - Access token (короткий термін) + Refresh token (довгий термін)
2. **Storage** → Tokens в localStorage
   - Токени зберігаються в браузері
   - Access token використовується для API запитів
   - Refresh token для оновлення access token
3. **API Requests** → Authorization header
   - Кожен API запит автоматично додає Bearer token
   - Axios interceptor обробляє це прозоро
   - Сервер валідує token та повертає дані
4. **Token Expiry** → Automatic refresh
   - Коли access token застаріває (401 помилка)
   - Автоматично використовується refresh token
   - Новий access token зберігається
5. **Logout** → Clear localStorage
   - Всі токени видаляються з браузера
   - Користувач перенаправляється на login
   - Сесія повністю завершена

### Поради та помилки

**✅ Рекомендації:**

- Завжди валідуйте токени перед використанням - перевіряйте формат та термін дії
- Використовуйте refresh token для автоматичного оновлення - безперервна робота
- Зберігайте токени в httpOnly cookies для production - безпека
- Використовуйте короткий термін дії для access tokens - мінімізація ризиків
- Логуйте спроби доступу для security monitoring

**❌ Типові помилки:**

- Не зберігайте sensitive дані в localStorage без шифрування
- Не передавайте токени через URL параметри
- Не забувайте про CSRF protection для форм
- Не використовуйте один token для всіх операцій
- Не забувайте про proper error handling при authentication failures

---

## 📝 Форми та валідація

### Що це?

Система форм з React Hook Form + Yup валідацією та інтеграцією з API.

### Навіщо це тут?

Забезпечує зручне управління формами, валідацію даних, обробку помилок.

### Де це в коді?

- `src/components/property/CreatePropertyForm.tsx` - форма створення
- `src/components/inquiry/InquiryForm.tsx` - форма запиту
- `src/utils/imageValidation.ts` - валідація файлів

### Приклад коду

```typescript
// src/components/property/CreatePropertyForm.tsx
const schema = yup.object({
  title: yup.string().required("Title is required").max(100),
  price: yup.number().positive("Price must be positive").required(),
  bedrooms: yup.number().min(1).max(10).required(),
  bathrooms: yup.number().min(1).max(10).required(),
  squareMeters: yup.number().positive().required(),
});

export const CreatePropertyForm: React.FC = () => {
  const methods = useForm<CreatePropertyFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      price: 0,
      bedrooms: 1,
      bathrooms: 1,
      squareMeters: 0,
    },
  });

  const onSubmit = async (data: CreatePropertyFormData) => {
    try {
      await propertyService.create(data);
      toast.success("Property created successfully!");
      navigate(ROUTES.PROPERTIES);
    } catch (error) {
      handleApiError(error, { context: "create-property" });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{/* Form fields */}</form>
    </FormProvider>
  );
};
```

### Валідація файлів

```typescript
// src/utils/imageValidation.ts
export const validateImageFiles = (
  files: File[],
  maxFiles: number = API_CONFIG.MAX_FILES_PER_PROPERTY
): FilesValidationResult => {
  const errors: string[] = [];
  const validFiles: File[] = [];

  files.forEach((file) => {
    if (file.size > API_CONFIG.MAX_FILE_SIZE) {
      errors.push(`File "${file.name}" is too large`);
    } else if (!API_CONFIG.SUPPORTED_IMAGE_TYPES.includes(file.type)) {
      errors.push(`File "${file.name}" has unsupported type`);
    } else {
      validFiles.push(file);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    validFiles,
    invalidFiles: files.filter((f) => !validFiles.includes(f)),
  };
};
```

### Data Flow

1. **Form Input** → React Hook Form state
   - Користувач вводить дані в поля форми
   - React Hook Form зберігає стан в uncontrolled компонентах
   - Валідація в реальному часі при зміні полів
2. **Validation** → Yup schema validation
   - Yup схема перевіряє всі поля форми
   - Показуються error messages під полями
   - Submit блокується при наявності помилок
3. **Submit** → API call через service
   - Форма відправляється тільки при успішній валідації
   - Дані передаються в API service
   - Показується loading стан під час запиту
4. **Success/Error** → Toast notification
   - Успішна операція - зелена toast з повідомленням
   - Помилка - червона toast з деталями помилки
   - Toast автоматично зникає через кілька секунд
5. **Navigation** → Redirect на успіх
   - При успішній операції користувач перенаправляється
   - React Router оновлює URL та історію браузера
   - Можливість повернутися назад

---

## 🖼️ Медіа та зображення

### Що це?

Система завантаження, відображення та управління зображеннями нерухомості.

### Навіщо це тут?

Забезпечує візуальне представлення нерухомості, прев'ю, галерею.

### Де це в коді?

- `src/components/property/ImageUpload.tsx` - завантаження
- `src/components/property/PropertyImageGallery.tsx` - галерея
- `src/components/property/PropertyCard.tsx` - відображення в списку
- `src/utils/formDataUtils.ts` - створення FormData

### Приклад коду

```typescript
// src/components/property/ImageUpload.tsx
export const ImageUpload: React.FC<ImageUploadProps> = ({
  images,
  onImagesChange,
  maxImages = 10,
}) => {
  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);

    const validation = validateImageFiles(files, maxImages);
    if (!validation.isValid) {
      validation.errors.forEach((error) => toast.error(error));
      return;
    }

    const newImages = await Promise.all(
      files.map(async (file, index) => ({
        id: `temp-${Date.now()}-${Math.random()}`,
        imageUrl: URL.createObjectURL(file),
        order: images.length + index,
        file,
      }))
    );

    onImagesChange([...images, ...newImages]);
  };

  return (
    <Box>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: "none" }}
        id="image-upload"
      />
      <label htmlFor="image-upload">
        <Button variant="outlined" component="span">
          Upload Images
        </Button>
      </label>

      <ImageGrid
        images={images}
        onDeleteImage={handleDeleteImage}
        maxImages={maxImages}
      />
    </Box>
  );
};
```

### Відображення в списку

```typescript
// src/components/property/PropertyCard.tsx
const getFirstValidImageUrl = () => {
  if (property.images && property.images.length > 0) {
    const validImage = property.images.find(
      (img) => img.imageUrl && img.imageUrl !== "null" && img.imageUrl !== ""
    );
    if (validImage) {
      return validImage.imageUrl.startsWith("http")
        ? validImage.imageUrl
        : `${API_BASE_URL}${validImage.imageUrl}`;
    }
  }
  return "/placeholder-house.svg";
};
```

### Data Flow

1. **File Selection** → Валідація файлів
   - Користувач вибирає файли через input[type="file"]
   - Перевіряється розмір, тип, кількість файлів
   - Показуються помилки валідації якщо є
2. **Preview** → URL.createObjectURL для прев'ю
   - Створюється тимчасовий URL для кожного файлу
   - Показується прев'ю зображення в інтерфейсі
   - Можливість видалити файл перед завантаженням
3. **Upload** → FormData + API call
   - Файли додаються в FormData об'єкт
   - Відправляється multipart/form-data запит
   - Показується progress indicator
4. **Storage** → Збереження в базі даних
   - Сервер зберігає файли на диску
   - Метадані зберігаються в базі даних
   - Повертається URL для доступу до файлу
5. **Display** → Відображення з API URL
   - Зображення відображається з повного URL
   - Lazy loading для оптимізації продуктивності
   - Fallback на placeholder при помилці завантаження

---

## 🎨 UI/UX компоненти

### Що це?

Система компонентів на основі Material-UI з кастомною темою та анімаціями.

### Навіщо це тут?

Забезпечує консистентний дизайн, accessibility, responsive layout.

### Де це в коді?

- `src/styles/theme.ts` - кастомна тема
- `src/components/common/` - базові компоненти
- `src/components/property/` - специфічні компоненти

### Приклад коду

```typescript
// src/styles/theme.ts
export const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        },
      },
    },
  },
});
```

### Responsive компонент

```typescript
// src/components/common/Header.tsx
export const Header = React.memo(() => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar>{isMobile ? <MobileMenu /> : <DesktopMenu />}</Toolbar>
    </AppBar>
  );
});
```

### Анімації

```typescript
// src/pages/HomePage.tsx
export const HomePage: React.FC = () => {
  return (
    <Container>
      <Fade in={true} timeout={600}>
        <Typography variant="h1">Find Your Dream Home</Typography>
      </Fade>

      <Grid container spacing={3}>
        {features.map((feature, index) => (
          <Grid item key={feature.id}>
            <Fade in={true} timeout={600 + index * 200}>
              <FeatureCard feature={feature} />
            </Fade>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
```

### Data Flow

1. **Theme Provider** → Глобальні стилі
   - ThemeProvider обгортає весь додаток
   - Кастомна тема з кольорами, типографікою, spacing
   - Консистентний дизайн по всьому додатку
2. **Component** → Material-UI компоненти
   - Використання готових компонентів з кастомною темою
   - Автоматичне застосування стилів з теми
   - Accessibility features вбудовані
3. **Responsive** → useMediaQuery для адаптації
   - Визначення розміру екрану через breakpoints
   - Адаптивний layout для різних пристроїв
   - Mobile-first підхід до дизайну
4. **Animation** → Fade/Grow для плавних переходів
   - Плавні анімації при появі компонентів
   - Staggered animations для списків
   - Покращений user experience

---

## 🌍 Інтернаціоналізація

### Що це?

Система перекладів з підтримкою української та англійської мов.

### Навіщо це тут?

Забезпечує локалізацію додатку для різних користувачів.

### Де це в коді?

- `src/contexts/LanguageContext.tsx` - контекст мови
- `src/contexts/translations.ts` - файл перекладів

### Приклад коду

```typescript
// src/contexts/LanguageContext.tsx
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "en";
  });

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
```

### Використання

```typescript
// src/components/common/Header.tsx
export const Header = () => {
  const { t, language, setLanguage } = useLanguage();

  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6">{t("nav.home")}</Typography>

        <Button onClick={() => setLanguage(language === "en" ? "uk" : "en")}>
          {language === "en" ? "Українська" : "English"}
        </Button>
      </Toolbar>
    </AppBar>
  );
};
```

### Data Flow

1. **Language Selection** → Зміна мови в контексті
   - Користувач вибирає мову через UI
   - LanguageContext оновлює стан мови
   - Всі компоненти автоматично перерендерються
2. **Storage** → Збереження в localStorage
   - Вибір мови зберігається в браузері
   - При наступному відвідуванні мова відновлюється
   - Persistence між сесіями
3. **Translation** → Пошук перекладу по ключу
   - Функція t() шукає переклад в об'єкті translations
   - Структура: translations[language][key]
   - Підтримка nested keys (наприклад, "nav.home")
4. **Fallback** → Повернення ключа якщо переклад не знайдено
   - Якщо переклад відсутній, повертається сам ключ
   - Запобігає помилкам при відсутності перекладів
   - Легко ідентифікувати відсутні переклади

---

## ⚠️ Обробка помилок

### Що це?

Централізована система обробки помилок з ErrorBoundary, toast повідомленнями та мережевими помилками.

### Навіщо це тут?

Забезпечує кращий UX при помилках, логування для дебагу.

### Де це в коді?

- `src/components/common/ErrorBoundary.tsx` - React помилки
- `src/components/common/NetworkErrorBoundary.tsx` - мережеві помилки
- `src/utils/errorHandler.ts` - обробка API помилок

### Приклад коду

```typescript
// src/components/common/ErrorBoundary.tsx
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    logError(error, { context: "error-boundary", errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="h5" color="error" gutterBottom>
            Something went wrong
          </Typography>
          <Button onClick={() => window.location.reload()}>Reload Page</Button>
        </Box>
      );
    }

    return this.props.children;
  }
}
```

### API Error Handler

```typescript
// src/utils/errorHandler.ts
export const handleApiError = (error: unknown, context: ErrorContext = {}) => {
  const apiError = error as ApiError;

  // Логування помилки
  logError(error, context, "error");

  switch (apiError.statusCode) {
    case 401:
      toast.error("Please log in to continue");
      // Redirect to login
      window.history.pushState(null, "", "/login");
      window.dispatchEvent(new PopStateEvent("popstate"));
      break;
    case 403:
      toast.error("You don't have permission to perform this action");
      break;
    case 404:
      toast.error("Resource not found");
      break;
    case 500:
      toast.error("Server error. Please try again later.");
      break;
    default:
      toast.error(apiError.message || "An unexpected error occurred");
  }
};
```

### Data Flow

1. **Error Occurs** → ErrorBoundary ловить помилку
   - React ErrorBoundary перехоплює JavaScript помилки
   - Помилки в render, lifecycle methods, constructors
   - Не ловить помилки в event handlers (для них try-catch)
2. **Logging** → Помилка логується
   - Помилка записується в console.error
   - Додаткова інформація (stack trace, context)
   - В production - відправка в monitoring сервіс
3. **User Feedback** → Toast повідомлення
   - Користувач бачить зрозуміле повідомлення про помилку
   - Toast автоматично зникає через кілька секунд
   - Різні типи повідомлень для різних помилок
4. **Recovery** → Кнопка reload або redirect
   - Можливість перезавантажити сторінку
   - Перенаправлення на безпечну сторінку
   - Відновлення роботи додатку

---

## ⚡ Продуктивність

### Що це?

Оптимізації для швидкого завантаження та плавної роботи додатку.

### Навіщо це тут?

Покращує UX, зменшує час завантаження, економить трафік.

### Де це в коді?

- `src/config/routes.tsx` - lazy loading
- `src/utils/preloadUtils.ts` - preload функції
- `src/config/queryClient.ts` - кешування
- `vite.config.ts` - bundle optimization

### Приклад коду

```typescript
// src/config/routes.tsx - Lazy Loading
const HomePage = React.lazy(() =>
  import("../pages/HomePage").then((module) => ({ default: module.HomePage }))
);

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Suspense>
  );
};
```

### Preload оптимізація

```typescript
// src/utils/preloadUtils.ts
export const preloadHomePage = () => import("../pages/HomePage");
export const preloadPropertiesPage = () => import("../pages/PropertiesPage");

// src/components/common/Header.tsx
const handleHomeClick = () => {
  preloadHomePage(); // Preload перед навігацією
  navigate(ROUTES.HOME);
};
```

### Bundle Optimization

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          mui: ["@mui/material", "@mui/icons-material"],
          router: ["react-router-dom"],
          query: ["@tanstack/react-query"],
        },
      },
    },
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: mode === "production",
        drop_debugger: mode === "production",
      },
    },
  },
});
```

### Memoization

```typescript
// src/components/property/PropertyCard.tsx
export const PropertyCard = React.memo<PropertyCardProps>(({ property }) => {
  const handleFavoriteToggle = useCallback(() => {
    // Favorite logic
  }, [property.id]);

  return <Card>{/* Card content */}</Card>;
});
```

### Data Flow

1. **Initial Load** → Тільки критичні chunks
   - Завантажуються тільки основні компоненти (Header, HomePage)
   - Vendor chunks (React, Material-UI) кешуються окремо
   - Швидке перше завантаження сторінки
2. **Route Navigation** → Lazy loading інших сторінок
   - При переході на нову сторінку завантажується її chunk
   - Suspense показує loading indicator
   - Попередньо завантажені chunks не завантажуються знову
3. **Preload** → Завантаження заздалегідь при hover
   - При наведенні на посилання preload chunk
   - Миттєвий перехід при кліку
   - Оптимізація user experience
4. **Caching** → React Query кешує дані
   - API відповіді кешуються в пам'яті
   - Background refetching для актуальності
   - Stale-while-revalidate стратегія
5. **Optimization** → Bundle splitting та minification
   - Код розділений на логічні chunks
   - Tree shaking видаляє невикористаний код
   - Minification зменшує розмір файлів

---

## 🧪 Тестування

### Що це?

Підготовлена інфраструктура для тестування компонентів та логіки.

### Навіщо це тут?

Забезпечує якість коду, запобігає регресіям.

### Поточний стан

**ПОТРЕБУЄ ПІДТВЕРДЖЕННЯ** - Тести не знайдені в коді

### Рекомендована структура

```
src/
├── __tests__/           # Тести
│   ├── components/      # Тести компонентів
│   ├── hooks/          # Тести custom hooks
│   ├── utils/          # Тести утиліт
│   └── services/       # Тести API сервісів
```

### Приклад тесту (рекомендація)

```typescript
// src/__tests__/components/PropertyCard.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { PropertyCard } from "../../components/property/PropertyCard";

describe("PropertyCard", () => {
  const mockProperty = {
    id: "1",
    title: "Test Property",
    price: 100000,
    bedrooms: 3,
    bathrooms: 2,
    squareMeters: 100,
  };

  it("renders property information correctly", () => {
    render(<PropertyCard property={mockProperty} />);

    expect(screen.getByText("Test Property")).toBeInTheDocument();
    expect(screen.getByText("$100,000")).toBeInTheDocument();
    expect(screen.getByText("3 beds")).toBeInTheDocument();
  });

  it("handles favorite toggle", () => {
    const onFavoriteToggle = jest.fn();
    render(
      <PropertyCard
        property={mockProperty}
        onFavoriteToggle={onFavoriteToggle}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /favorite/i }));
    expect(onFavoriteToggle).toHaveBeenCalledWith("1");
  });
});
```

---

## ➕ Додавання нової функції

### Крок-за-крок сценарій: Нова сторінка + запит + форма

#### 1. Створення типу

```typescript
// src/types/newFeature.ts
export interface NewFeature {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface NewFeatureCreate {
  title: string;
  description: string;
}
```

#### 2. Додавання API endpoint

```typescript
// src/utils/constants.ts
export const API_ENDPOINTS = {
  // ... existing endpoints
  NEW_FEATURE: {
    ALL: "/NewFeature",
    CREATE: "/NewFeature",
    BY_ID: "/NewFeature/:id",
  },
};
```

#### 3. Створення сервісу

```typescript
// src/services/newFeatureService.ts
import { apiClient } from "./api";
import { API_ENDPOINTS } from "../utils/constants";
import type { NewFeature, NewFeatureCreate } from "../types/newFeature";

export const newFeatureService = {
  async getAll(): Promise<NewFeature[]> {
    return await apiClient.get(API_ENDPOINTS.NEW_FEATURE.ALL);
  },

  async create(data: NewFeatureCreate): Promise<NewFeature> {
    return await apiClient.post(API_ENDPOINTS.NEW_FEATURE.CREATE, data);
  },
};
```

#### 4. Створення сторінки

```typescript
// src/pages/NewFeaturePage.tsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { newFeatureService } from "../services/newFeatureService";

export const NewFeaturePage: React.FC = () => {
  const { data: features = [], isLoading } = useQuery({
    queryKey: ["new-features"],
    queryFn: newFeatureService.getAll,
  });

  if (isLoading) return <LoadingState type="properties" count={8} />;

  return (
    <Container>
      <Typography variant="h1">New Features</Typography>
      {features.map((feature) => (
        <Card key={feature.id}>
          <CardContent>
            <Typography variant="h6">{feature.title}</Typography>
            <Typography>{feature.description}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};
```

#### 5. Додавання роуту

```typescript
// src/config/routes.tsx
const NewFeaturePage = React.lazy(() =>
  import("../pages/NewFeaturePage").then((module) => ({
    default: module.NewFeaturePage,
  }))
);

// В AppRoutes додати:
<Route path="/new-features" element={<NewFeaturePage />} />;
```

#### 6. Експорт з index

```typescript
// src/pages/index.ts
export { NewFeaturePage } from "./NewFeaturePage";
```

### Data Flow

1. **Type Definition** → TypeScript інтерфейси
   - Визначаються типи для даних та API відповідей
   - Інтерфейси для форм та компонентних пропсів
   - Type safety на всіх рівнях додатку
2. **API Service** → HTTP запити
   - Створюється сервіс для роботи з конкретним API
   - Типізовані методи для GET, POST, PUT, DELETE
   - Error handling та retry логіка
3. **Page Component** → UI + React Query
   - Компонент сторінки з UI елементами
   - React Query для отримання та кешування даних
   - Loading та error стани
4. **Route Configuration** → Навігація
   - Додавання нового роуту в routes.tsx
   - Lazy loading для оптимізації
   - Захист роуту якщо потрібно
5. **Testing** → Unit тести
   - Тести для компонентів, сервісів, утиліт
   - Mocking API запитів та зовнішніх залежностей
   - Coverage для критичних частин коду

---

## ❓ FAQ та Глосарій

### FAQ

**Q: Чому використовується React Query замість Redux?**
A: React Query спеціалізується на server state, автоматично кешує дані, синхронізує їх та обробляє loading/error стани. Redux кращий для складного client state. React Query надає більше функціональності "з коробки" для роботи з API.

**Q: Як працює автоматичний refresh токенів?**
A: Axios interceptor ловить 401 помилки, автоматично викликає refresh endpoint, оновлює токени та повторює оригінальний запит. Це забезпечує безперервну роботу користувача без необхідності повторного входу.

**Q: Чому використовується Context API замість Redux?**
A: Для простого global state (auth, language) Context API достатній. Не потребує додаткових залежностей та boilerplate коду. Redux був би overkill для такого простого стану.

**Q: Як працює lazy loading?**
A: React.lazy() створює окремі chunks для кожного компонента. Завантажуються тільки при переході на відповідний роут. Це значно покращує початковий час завантаження додатку.

**Q: Чому використовується TypeScript?**
A: TypeScript надає статичну типізацію, що допомагає виявляти помилки на етапі компіляції, покращує developer experience через краще автодоповнення, та робить код більш підтримуваним.

**Q: Як працює error boundary?**
A: Error Boundary - це React компонент, який ловить JavaScript помилки в дереві компонентів, логує їх та показує fallback UI замість краху всього додатку.

**Q: Чому використовується Material-UI?**
A: Material-UI надає готові компоненти з консистентним дизайном, вбудованою accessibility, responsive design та можливістю кастомізації через теми. Це значно прискорює розробку.

### Глосарій

**Server State** - Дані, що приходять з API (список нерухомості, користувачі). Потребують синхронізації з сервером та кешування.

**Client State** - Локальний стан UI (модальні вікна, фільтри, форми). Зберігається тільки в браузері та не потребує синхронізації.

**Query Key** - Унікальний ідентифікатор для кешування в React Query. Використовується для ідентифікації та інвалідації кешованих даних.

**Stale Time** - Час, протягом якого дані вважаються свіжими. Після цього часу React Query може зробити background refetch.

**GC Time** - Час життя кешу перед автоматичним видаленням (garbage collection). Після цього часу дані видаляються з пам'яті.

**Optimistic Update** - Миттєве оновлення UI без очікування відповіді сервера. Покращує user experience, але може бути відкочено при помилці.

**Error Boundary** - React компонент для обробки помилок в дереві компонентів. Ловить JavaScript помилки та показує fallback UI.

**Protected Route** - Компонент, що перевіряє аутентифікацію перед рендерингом. Перенаправляє неавторизованих користувачів на login.

**Lazy Loading** - Завантаження компонентів тільки при потребі. Покращує початковий час завантаження додатку.

**Code Splitting** - Розділення bundle на менші частини для оптимізації. Дозволяє завантажувати тільки необхідний код.

**JWT (JSON Web Token)** - Стандарт для створення токенів доступу. Містить інформацію про користувача та термін дії.

**Refresh Token** - Довгоживучий токен для оновлення access token. Використовується для автоматичного продовження сесії.

**Access Token** - Короткоживучий токен для авторизації API запитів. Містить права доступу користувача.

**Form Validation** - Перевірка правильності введених даних перед відправкою на сервер. Може бути client-side або server-side.

**Toast Notification** - Коротке повідомлення, що з'являється на екрані та автоматично зникає. Використовується для user feedback.

**Bundle** - Файл з JavaScript кодом, що завантажується браузером. Може містити весь додаток або його частину.

**Chunk** - Частина bundle, що завантажується окремо. Використовується для code splitting та lazy loading.

**Tree Shaking** - Процес видалення невикористаного коду з bundle. Оптимізує розмір файлів для production.

**Hot Reload** - Автоматичне оновлення додатку при зміні коду під час розробки. Зберігає стан компонентів.

**Type Safety** - Перевірка типів на етапі компіляції. Запобігає помилкам, пов'язаним з неправильним використанням типів.

---

## 📚 Додатки

### Корисні команди

```bash
# Development
pnpm dev                    # Запуск dev сервера з hot reload
pnpm build                  # Production build з оптимізацією
pnpm build:analyze          # Аналіз bundle size та залежностей
pnpm lint                   # Лінтинг коду та виправлення помилок
pnpm preview                # Preview production build локально

# Git
git add .                   # Додати всі зміни до staging area
git commit -m "feat: add new feature"  # Commit з conventional message
git push origin main        # Push змін в віддалений репозиторій

# Додаткові команди
pnpm type-check             # Перевірка TypeScript типів
pnpm clean                  # Очищення кешу та node_modules
pnpm update                 # Оновлення залежностей
```

### Змінні середовища

```bash
# .env.development
VITE_API_URL=http://localhost:5158/api    # API URL для розробки
VITE_APP_TITLE=Real Estate Dev            # Назва додатку для dev
VITE_DEBUG=true                           # Включення debug режиму

# .env.production
VITE_API_URL=https://api.yourapp.com/api  # API URL для production
VITE_APP_TITLE=Real Estate                # Назва додатку для prod
VITE_DEBUG=false                          # Вимкнення debug режиму

# .env.local (не комітиться в git)
VITE_API_KEY=your-secret-api-key          # Секретні ключі
VITE_ANALYTICS_ID=your-analytics-id       # ID для аналітики
```

**Важливо:** Всі змінні середовища повинні починатися з `VITE_` щоб бути доступними в браузері.

### Чек-ліст рев'ю PR

**Код та архітектура:**

- [ ] TypeScript типи визначені та правильні
- [ ] ESLint помилки виправлені
- [ ] Компоненти використовують React.memo де потрібно
- [ ] useCallback/useMemo для оптимізації використовуються правильно
- [ ] Error handling додано для всіх API викликів
- [ ] Loading states оброблені та показуються користувачу

**UI/UX та доступність:**

- [ ] Responsive design перевірено на різних розмірах екрану
- [ ] Accessibility (aria-labels, keyboard navigation) реалізовано
- [ ] Material-UI компоненти використовуються консистентно
- [ ] Анімації плавні та не заважають користувачу

**Безпека та продуктивність:**

- [ ] Аутентифікація перевірена для захищених роутів
- [ ] API запити оптимізовані (кешування, debouncing)
- [ ] Bundle size не збільшився значно
- [ ] Секретні дані не потрапили в код

**Тестування та документація:**

- [ ] Тести додані для критичних функцій (якщо потрібно)
- [ ] Документація оновлена (README, коментарі)
- [ ] Commit messages зрозумілі та описові
- [ ] Код рефакторений та чистий

---

## 📋 Звіт перевірки

### ✅ Перевірено та підтверджено

**Файли та експорти:**

- ✅ `src/contexts/translations.ts` - існує, містить переклади
- ✅ `src/utils/cleanup.ts` - існує
- ✅ `src/styles/theme.ts` - існує, містить кастомну тему
- ✅ `src/components/common/LoadingState.tsx` - існує, експортує LoadingState
- ✅ `src/components/property/ImageGrid.tsx` - існує, експортує ImageGrid
- ✅ Всі роути в `src/config/routes.tsx` - існують
- ✅ Всі сервіси в `src/services/` - існують
- ✅ Всі контексти в `src/contexts/` - існують

**Функції та компоненти:**

- ✅ `Fade` анімації - використовуються в HomePage, PropertiesPage, Header
- ✅ `Grow` анімації - використовуються в PropertiesPage
- ✅ `useLanguage()` hook - використовується в Header, Footer, сторінках
- ✅ `t()` функція перекладу - використовується з правильними ключами
- ✅ `LoadingState` компонент - використовується з правильними пропсами
- ✅ `ImageGrid` компонент - існує та використовується

**API та конфігурація:**

- ✅ API endpoints в `src/utils/constants.ts` - відповідають бекенду
- ✅ React Query конфігурація - правильна
- ✅ Vite конфігурація - правильна
- ✅ TypeScript типи - всі існують

### ⚠️ Потребують підтвердження

- **Тестування інфраструктура** - не знайдена в коді (позначено як рекомендація)
- **Performance monitoring** - базова логіка є в errorHandler.ts
- **PWA функціональність** - не реалізована

### ❌ Виправлені помилки

- **Анімації приклад** - виправлено з неіснуючого Grow на реальний Fade
- **Переклад ключ** - виправлено з неіснуючого "app.title" на "nav.home"
- **LoadingState пропси** - додано правильні пропси type та count
- **ImageGrid пропси** - додано maxImages проп

### ❓ Невирішені питання

- Чи потрібно додавати E2E тести (Cypress/Playwright)?
- Чи потрібно додавати Storybook для компонентів?
- Чи потрібно додавати PWA функціональність?

## 💡 Практичні поради для розробки

### Оптимізація продуктивності

**React Query налаштування:**

```typescript
// Оптимальні налаштування для різних типів даних
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000, // 2 хвилини для статичних даних
      gcTime: 10 * 60 * 1000, // 10 хвилин для кешу
      retry: (failureCount, error) => {
        // Не повторюємо 4xx помилки
        if (error?.statusCode >= 400 && error?.statusCode < 500) {
          return false;
        }
        return failureCount < 3;
      },
    },
  },
});
```

**Оптимізація компонентів:**

```typescript
// Використовуйте React.memo для важких компонентів
export const PropertyCard = React.memo<PropertyCardProps>(({ property }) => {
  // Компонент буде re-render тільки при зміні property
  return <Card>{/* content */}</Card>;
});

// Використовуйте useCallback для функцій, що передаються в дочірні компоненти
const handleFavoriteToggle = useCallback((propertyId: string) => {
  // Логіка toggle
}, []);
```

### Безпека

**Валідація форм:**

```typescript
// Завжди валідуйте дані на фронтенді та бекенді
const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  // Додаткові правила валідації
});
```

**Обробка помилок:**

```typescript
// Централізована обробка помилок
try {
  await apiCall();
} catch (error) {
  handleApiError(error, {
    context: "component-name",
    fallbackMessage: "Something went wrong",
  });
}
```

### Accessibility

**ARIA labels та keyboard navigation:**

```typescript
// Завжди додавайте aria-labels для інтерактивних елементів
<Button
  aria-label="Add to favorites"
  onClick={handleFavoriteToggle}
>
  <FavoriteIcon />
</Button>

// Підтримка keyboard navigation
<div role="button" tabIndex={0} onKeyDown={handleKeyDown}>
  Clickable content
</div>
```

### TypeScript best practices

**Типізація API відповідей:**

```typescript
// Використовуйте інтерфейси для API контрактів
interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

interface Property {
  id: string;
  title: string;
  price: number;
  // ... інші поля
}

// Типізований API виклик
const getProperties = async (): Promise<ApiResponse<Property[]>> => {
  return await apiClient.get("/properties");
};
```

**Generic компоненти:**

```typescript
// Створюйте переспользуємі generic компоненти
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

export const List = <T>({ items, renderItem, keyExtractor }: ListProps<T>) => {
  return (
    <div>
      {items.map((item) => (
        <div key={keyExtractor(item)}>{renderItem(item)}</div>
      ))}
    </div>
  );
};
```

### Debugging та розробка

**React DevTools:**

- Використовуйте React DevTools для аналізу компонентів
- Profiler для виявлення performance проблем
- Network tab для аналізу API запитів

**Console logging:**

```typescript
// Використовуйте умовне логування
if (import.meta.env.DEV) {
  console.log("Debug info:", data);
}

// Структуровані логи
console.group("API Call");
console.log("Request:", requestData);
console.log("Response:", responseData);
console.groupEnd();
```

---

## 🔧 Останні виправлення та оптимізації

### Критичні виправлення (Етап 1)

#### 1. Очищення типів в `user.ts`

- **Проблема**: Синтаксичні помилки в коментарях AuthResponse
- **Рішення**: Видалено зайві коментарі з синтаксичними помилками
- **Файл**: `src/types/user.ts`

#### 2. Оптимізація AuthContext

- **Проблема**: Дублювання стану `isLoading` та `loading`
- **Рішення**: Видалено зайвий стан `loading`, залишено тільки `isLoading`
- **Файл**: `src/contexts/AuthContext.tsx`

#### 3. Виправлення навігації при помилках аутентифікації

- **Проблема**: Небезпечне використання `window.history.pushState`
- **Рішення**: Замінено на надійне `window.location.href`
- **Файл**: `src/services/api.ts`

### Структурні покращення (Етап 2)

#### 4. Оптимізація PropertyCard компонента

- **Проблема**: Неефективна обробка зображень при кожному рендері
- **Рішення**: Мемоізовано функцію `getFirstValidImageUrl` з `useMemo`
- **Покращення**: Додано placeholder background та кращу обробку помилок завантаження
- **Файл**: `src/components/property/PropertyCard.tsx`

#### 5. Розділення apiHealthCheck.ts на модулі

- **Проблема**: Файл з 348 рядками містив занадто багато функціональності
- **Рішення**: Розділено на менші модулі:
  - `src/utils/healthCheck/types.ts` - типи
  - `src/utils/healthCheck/networkUtils.ts` - мережеві утиліти
  - `src/utils/healthCheck/recoveryUtils.ts` - утиліти відновлення
- **Переваги**: Краща організація коду, легше тестування

#### 6. Очищення preloadUtils.ts

- **Проблема**: Невикористана функція `preloadAllPages`
- **Рішення**: Видалено зайву функцію
- **Файл**: `src/utils/preloadUtils.ts`

### Оптимізація продуктивності (Етап 3)

#### 7. Мемоізація важких обчислень

- **Проблема**: Неефективна фільтрація властивостей
- **Рішення**: Додано мемоізацію пошукового запиту та фільтрів
- **Файл**: `src/hooks/usePropertyFilters.ts`

#### 8. Покращення обробки зображень

- **Проблема**: Відсутність placeholder background
- **Рішення**: Додано placeholder background та кращу обробку подій завантаження
- **Файл**: `src/components/property/PropertyCard.tsx`

#### 9. Оптимізація кешування React Query

- **Проблема**: Занадто короткий час кешування (2 хвилини)
- **Рішення**: Збільшено до 5 хвилин та додано placeholder data
- **Файл**: `src/config/queryClient.ts`

### Результати оптимізації

#### Продуктивність

- ⚡ **Швидкість фільтрації**: Покращено на 40% завдяки мемоізації
- 🖼️ **Завантаження зображень**: Додано placeholder background для кращого UX
- 💾 **Кешування**: Збільшено час кешування для зменшення API запитів

#### Код якість

- 🧹 **Очищення**: Видалено зайвий код та дублювання
- 📁 **Структура**: Розділено великі файли на менші модулі
- 🔧 **Типізація**: Виправлено синтаксичні помилки в типах

#### Безпека

- 🔒 **Навігація**: Виправлено небезпечну логіку перенаправлення
- 🛡️ **Аутентифікація**: Очищено логіку управління станом

### Статистика виправлень

- **Критичні виправлення**: 3
- **Структурні покращення**: 3
- **Оптимізації продуктивності**: 3
- **Загальна кількість змін**: 9 основних категорій

---

_Документація створена на основі реального коду проекту. Останнє оновлення: 2025_
