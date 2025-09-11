# 🔄 Міграція з authService на useAuth

## 📋 Огляд змін

Цей документ описує повну міграцію з `authService` на `useAuth` підхід для централізованого управління авторизацією в додатку.

## 🎯 Причини міграції

### **Проблеми з authService:**
- ❌ **Не реактивний** - зміни не відображаються автоматично
- ❌ **Немає централізованого стану** - кожен компонент читає localStorage окремо
- ❌ **Можливі race conditions** - різні компоненти можуть мати різний стан
- ❌ **Складність синхронізації** - потрібно вручну оновлювати всі компоненти

### **Переваги useAuth:**
- ✅ **Реактивний** - автоматичне оновлення всіх компонентів
- ✅ **Централізований стан** - один джерело істини
- ✅ **Автоматична синхронізація** - зміни відразу відображаються
- ✅ **Типобезпека** - TypeScript підтримка
- ✅ **Легше тестування** - можна мокати контекст

## 🔧 Як працює useAuth

### **Архітектура:**
```typescript
// AuthContext створює централізований стан
const AuthContext = createContext<AuthContextType>();

// AuthProvider обгортає додаток і надає стан
<AuthProvider>
  <App />
</AuthProvider>

// useAuth хук надає доступ до стану
const { user, isAuthenticated, isAdmin, login, logout } = useAuth();
```

### **Послідовність ініціалізації:**
1. **AuthProvider** ініціалізується при завантаженні додатку
2. **useEffect** читає дані з localStorage через authService
3. **setState** оновлює React state
4. **Всі компоненти** автоматично перерендерються з новими даними

## 📝 Приклади використання

### **Отримання даних користувача:**
```typescript
// Старий підхід (authService):
const currentUser = authService.getStoredUser();
const isAuthenticated = authService.isAuthenticated();
const isAdmin = authService.isAdmin();

// Новий підхід (useAuth):
const { user, isAuthenticated, isAdmin } = useAuth();
```

### **Перевірка авторизації:**
```typescript
// Умовний рендеринг
{isAuthenticated ? (
  <UserDashboard />
) : (
  <LoginPrompt />
)}

// Захист роутів
{isAuthenticated && <ProtectedComponent />}
```

### **Умовний рендеринг кнопок:**
```typescript
{/* Кнопка доступна всім */}
<Button onClick={handleShare}>Share</Button>

{/* Кнопка тільки для авторизованих */}
{isAuthenticated && (
  <Button onClick={handleFavorite}>Add to Favorites</Button>
)}

{/* Кнопка тільки для власника або адміна */}
{(isOwner || isAdmin) && (
  <Button onClick={handleEdit}>Edit</Button>
)}
```

### **Використання login/logout:**
```typescript
// Отримуємо функції з useAuth
const { login, logout } = useAuth();

// Login
const handleLogin = async (credentials) => {
  const response = await authService.login(credentials);
  login(response); // Оновлює контекст
};

// Logout
const handleLogout = () => {
  logout(); // Очищає контекст та localStorage
};
```

## 🔄 Змінені файли

### **Повністю мігровані:**
- ✅ `PropertyDetailPage.tsx` - перевірка авторизації та умовний рендеринг
- ✅ `PropertyCard.tsx` - перевірка авторизації для іконок
- ✅ `Header.tsx` - відображення меню користувача
- ✅ `ProtectedRoute.tsx` - захист роутів
- ✅ `PublicRoute.tsx` - перенаправлення авторизованих користувачів
- ✅ `EditPropertyPage.tsx` - перевірка прав доступу
- ✅ `CreatePropertyPage.tsx` - перевірка авторизації
- ✅ `PropertiesPage.tsx` - перевірка авторизації
- ✅ `ProfilePage.tsx` - управління профілем та logout

### **Частково мігровані (API виклики залишаються в authService):**
- ✅ `LoginPage.tsx` - використовує useAuth для login, authService для API
- ✅ `RegisterPage.tsx` - використовує useAuth для login, authService для API

## 🏗️ Фінальна архітектура

### **Розділення відповідальності:**

```typescript
// AuthContext - централізований стан
const { user, isAuthenticated, isAdmin, login, logout } = useAuth();

// authService - тільки API операції
const response = await authService.login(credentials);
login(response); // оновлює контекст
```

### **Переваги нової архітектури:**
- ✅ **Чітке розділення відповідальності**
- ✅ **Реактивний UI**
- ✅ **Легше тестування**
- ✅ **Кращий developer experience**

## 🚀 Використання в нових компонентах

### **Шаблон для нових компонентів:**
```typescript
import { useAuth } from "../contexts/AuthContext";

export const MyComponent: React.FC = () => {
  // Отримуємо дані авторизації
  const { user, isAuthenticated, isAdmin } = useAuth();
  
  // Умовний рендеринг
  if (!isAuthenticated) {
    return <LoginPrompt />;
  }
  
  return (
    <div>
      <h1>Welcome, {user?.fullName}!</h1>
      {isAdmin && <AdminPanel />}
    </div>
  );
};
```

## ⚠️ Важливі зауваження

1. **authService залишається** для API викликів (login, register, refreshToken)
2. **useAuth використовується** для доступу до стану авторизації
3. **Всі компоненти** тепер автоматично оновлюються при зміні авторизації
4. **Типобезпека** забезпечується TypeScript інтерфейсами

## 🔍 Тестування

Для тестування компонентів з useAuth:
```typescript
// Мокаємо AuthContext
const mockAuthContext = {
  user: mockUser,
  isAuthenticated: true,
  isAdmin: false,
  login: jest.fn(),
  logout: jest.fn(),
  updateUser: jest.fn(),
  loading: false,
};

// Обгортаємо компонент в AuthProvider з мокованими даними
<AuthProvider value={mockAuthContext}>
  <MyComponent />
</AuthProvider>
```
