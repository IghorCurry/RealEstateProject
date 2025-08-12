# 🧪 Полное руководство по Unit Testing

## 📋 Содержание

1. [Что такое Unit Testing](#что-такое-unit-testing)
2. [Unit Testing на Backend (C#)](#unit-testing-на-backend-c)
3. [Unit Testing на Frontend (JavaScript/TypeScript)](#unit-testing-на-frontend-javascripttypescript)
4. [Различия между Frontend и Backend тестами](#различия-между-frontend-и-backend-тестами)
5. [Ваши проекты](#ваши-проекты)
6. [Практические примеры](#практические-примеры)

---

## 🎯 Что такое Unit Testing

**Unit Testing** - это метод тестирования, при котором отдельные части (модули) программы тестируются изолированно от остального кода.

### 🎯 Цели Unit Testing:

- ✅ **Проверка корректности** отдельных функций
- 🛡️ **Предотвращение регрессий** (когда новые изменения ломают старый код)
- 📚 **Живая документация** кода
- 🚀 **Ускорение разработки** (быстрая обратная связь)
- 👥 **Упрощение командной работы**

### 🏗️ Структура теста (AAA Pattern):

```csharp
// Arrange - подготовка данных
var input = "hello world";

// Act - выполнение тестируемого кода
var result = capitalize(input);

// Assert - проверка результата
expect(result).toBe("Hello World");
```

---

## 🖥️ Unit Testing на Backend (C#)

### 🛠️ Инструменты:

- **NUnit** - фреймворк для тестирования
- **Moq** - библиотека для создания моков
- **FluentAssertions** - улучшенные assertions
- **xUnit** - альтернативный фреймворк

### 📁 Структура проекта:

```
MyProject/
├── MyProject/              # Основной проект
│   ├── Services/
│   ├── Controllers/
│   └── Models/
└── MyProject.Tests/        # Тестовый проект
    ├── Services/
    ├── Controllers/
    └── Helpers/
```

### 🧪 Примеры тестов:

#### 1. Простой тест функции:

```csharp
[TestFixture]
public class CalculatorTests
{
    [Test]
    public void Add_TwoNumbers_ReturnsSum()
    {
        // Arrange
        var calculator = new Calculator();
        var a = 5;
        var b = 3;

        // Act
        var result = calculator.Add(a, b);

        // Assert
        Assert.That(result, Is.EqualTo(8));
    }
}
```

#### 2. Тест с моками (зависимости):

```csharp
[Test]
public async Task GetUser_WithValidId_ReturnsUser()
{
    // Arrange
    var userId = 1;
    var expectedUser = new User { Id = userId, Name = "John" };

    var userRepositoryMock = new Mock<IUserRepository>();
    userRepositoryMock
        .Setup(x => x.GetByIdAsync(userId))
        .ReturnsAsync(expectedUser);

    var userService = new UserService(userRepositoryMock.Object);

    // Act
    var result = await userService.GetUserAsync(userId);

    // Assert
    Assert.That(result, Is.EqualTo(expectedUser));
    userRepositoryMock.Verify(x => x.GetByIdAsync(userId), Times.Once);
}
```

#### 3. Тест исключений:

```csharp
[Test]
public void Divide_ByZero_ThrowsException()
{
    // Arrange
    var calculator = new Calculator();
    var a = 10;
    var b = 0;

    // Act & Assert
    var exception = Assert.Throws<DivideByZeroException>(
        () => calculator.Divide(a, b)
    );

    Assert.That(exception.Message, Does.Contain("Cannot divide by zero"));
}
```

#### 4. Тест с параметрами:

```csharp
[TestCase(2, 3, 5)]
[TestCase(0, 5, 5)]
[TestCase(-1, 1, 0)]
public void Add_VariousNumbers_ReturnsCorrectSum(int a, int b, int expected)
{
    // Arrange
    var calculator = new Calculator();

    // Act
    var result = calculator.Add(a, b);

    // Assert
    Assert.That(result, Is.EqualTo(expected));
}
```

---

## 🌐 Unit Testing на Frontend (JavaScript/TypeScript)

### 🛠️ Инструменты:

- **Jest** - основной фреймворк для тестирования
- **React Testing Library** - для тестирования React компонентов
- **Vitest** - быстрый фреймворк для Vite проектов
- **Cypress** - для E2E тестирования

### 📁 Структура проекта:

```
src/
├── components/
│   ├── Button.tsx
│   └── Button.test.tsx
├── utils/
│   ├── helpers.ts
│   └── helpers.test.ts
└── __tests__/              # Альтернативная структура
    ├── components/
    └── utils/
```

### 🧪 Примеры тестов:

#### 1. Тест простой функции:

```typescript
// helpers.ts
export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

// helpers.test.ts
import { formatPrice } from "./helpers";

describe("formatPrice", () => {
  test("форматирует цену правильно", () => {
    // Arrange
    const price = 123.456;

    // Act
    const result = formatPrice(price);

    // Assert
    expect(result).toBe("$123.46");
  });

  test("работает с нулевой ценой", () => {
    expect(formatPrice(0)).toBe("$0.00");
  });

  test("работает с отрицательной ценой", () => {
    expect(formatPrice(-50)).toBe("$-50.00");
  });
});
```

#### 2. Тест React компонента:

```typescript
// Button.tsx
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
}) => {
  return (
    <button onClick={onClick} disabled={disabled} className="btn">
      {children}
    </button>
  );
};

// Button.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  test("отображает текст кнопки", () => {
    // Arrange & Act
    render(<Button>Click me</Button>);

    // Assert
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  test("вызывает onClick при клике", () => {
    // Arrange
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    // Act
    fireEvent.click(screen.getByText("Click me"));

    // Assert
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("отключается когда disabled=true", () => {
    // Arrange & Act
    render(<Button disabled>Click me</Button>);

    // Assert
    expect(screen.getByText("Click me")).toBeDisabled();
  });
});
```

#### 3. Тест с моками (API вызовы):

```typescript
// userService.ts
export class UserService {
  async getUser(id: number): Promise<User> {
    const response = await fetch(`/api/users/${id}`);
    return response.json();
  }
}

// userService.test.ts
import { UserService } from "./userService";

// Мокаем fetch
global.fetch = jest.fn();

describe("UserService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("получает пользователя по ID", async () => {
    // Arrange
    const mockUser = { id: 1, name: "John" };
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockUser,
    });

    const userService = new UserService();

    // Act
    const result = await userService.getUser(1);

    // Assert
    expect(result).toEqual(mockUser);
    expect(fetch).toHaveBeenCalledWith("/api/users/1");
  });
});
```

#### 4. Тест хуков React:

```typescript
// useCounter.ts
import { useState } from "react";

export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

// useCounter.test.ts
import { renderHook, act } from "@testing-library/react";
import { useCounter } from "./useCounter";

describe("useCounter", () => {
  test("инициализируется с начальным значением", () => {
    const { result } = renderHook(() => useCounter(5));

    expect(result.current.count).toBe(5);
  });

  test("увеличивает счетчик", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  test("сбрасывает счетчик", () => {
    const { result } = renderHook(() => useCounter(10));

    act(() => {
      result.current.increment();
      result.current.reset();
    });

    expect(result.current.count).toBe(10);
  });
});
```

---

## 🔄 Различия между Frontend и Backend тестами

### 🖥️ **Backend тесты:**

- ✅ **Быстрые** - выполняются за миллисекунды
- 🎯 **Изолированные** - легко мокать зависимости
- 🗄️ **Работа с БД** - in-memory базы данных
- 🔒 **Бизнес-логика** - основная цель тестирования
- 🛠️ **Инструменты:** NUnit, Moq, xUnit

### 🌐 **Frontend тесты:**

- ⚡ **Медленнее** - из-за DOM манипуляций
- 🎨 **UI компоненты** - тестирование интерфейса
- 🌍 **Браузерное окружение** - jsdom или реальный браузер
- 🎭 **Пользовательские сценарии** - как пользователь взаимодействует
- 🛠️ **Инструменты:** Jest, React Testing Library, Vitest

### 📊 **Сравнительная таблица:**

| Аспект          | Backend       | Frontend               |
| --------------- | ------------- | ---------------------- |
| **Скорость**    | Очень быстрые | Средние                |
| **Изоляция**    | Легкая        | Сложная                |
| **Моки**        | Простые       | Сложные (DOM, API)     |
| **Зависимости** | Минимальные   | Много (React, браузер) |
| **Цель**        | Бизнес-логика | UI + логика            |

---

## 🏠 Ваши проекты

### 🖥️ **Backend (C# .NET):**

- **Технологии:** ASP.NET Core, Entity Framework, JWT
- **Архитектура:** Clean Architecture (BLL, DAL, API)
- **Что тестируем:**
  - ✅ Модели данных (20 тестов)
  - ✅ Валидация бизнес-логики
  - ✅ Enums и константы
- **Структура тестов:**
  ```
  RealEstate.Tests/
  ├── WorkingTests.cs              # 10 базовых тестов
  ├── SimpleManagerTests.cs        # 10 тестов для менеджеров
  ├── Helpers/
  │   └── TestDataFactory.cs       # Фабрика тестовых данных
  └── RealEstate.Tests.csproj      # Настройки проекта
  ```

### 🌐 **Frontend (React + TypeScript):**

- **Технологии:** React, TypeScript, Vite
- **Архитектура:** Компонентная архитектура
- **Что тестируем:**
  - ✅ Утилиты и хелперы
  - ✅ Валидация форм
  - ✅ Типы данных
- **Потенциальные тесты:**

  ```typescript
  // helpers.test.ts
  describe("formatPrice", () => {
    test("форматирует цену правильно", () => {
      expect(formatPrice(100000)).toBe("$100,000");
    });
  });

  // PropertyCard.test.tsx
  describe("PropertyCard", () => {
    test("отображает информацию о недвижимости", () => {
      render(<PropertyCard property={mockProperty} />);
      expect(screen.getByText("Beautiful Apartment")).toBeInTheDocument();
    });
  });
  ```

---

## 🎯 Практические примеры

### 🖥️ **Backend - Тест сервиса:**

```csharp
[TestFixture]
public class PropertyServiceTests
{
    private Mock<IPropertyRepository> _repositoryMock;
    private PropertyService _service;

    [SetUp]
    public void Setup()
    {
        _repositoryMock = new Mock<IPropertyRepository>();
        _service = new PropertyService(_repositoryMock.Object);
    }

    [Test]
    public async Task GetProperties_WithFilters_ReturnsFilteredResults()
    {
        // Arrange
        var filters = new PropertyFilters { MaxPrice = 200000 };
        var expectedProperties = new List<Property> { /* тестовые данные */ };

        _repositoryMock
            .Setup(x => x.GetFilteredAsync(filters))
            .ReturnsAsync(expectedProperties);

        // Act
        var result = await _service.GetPropertiesAsync(filters);

        // Assert
        Assert.That(result, Is.EqualTo(expectedProperties));
        _repositoryMock.Verify(x => x.GetFilteredAsync(filters), Times.Once);
    }
}
```

### 🌐 **Frontend - Тест компонента с API:**

```typescript
// PropertyList.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import { PropertyList } from "./PropertyList";

// Мокаем API
jest.mock("../api/propertyApi", () => ({
  getProperties: jest.fn(),
}));

describe("PropertyList", () => {
  test("загружает и отображает список недвижимости", async () => {
    // Arrange
    const mockProperties = [
      { id: 1, title: "Apartment 1", price: 100000 },
      { id: 2, title: "House 1", price: 200000 },
    ];

    (getProperties as jest.Mock).mockResolvedValue(mockProperties);

    // Act
    render(<PropertyList />);

    // Assert
    await waitFor(() => {
      expect(screen.getByText("Apartment 1")).toBeInTheDocument();
      expect(screen.getByText("House 1")).toBeInTheDocument();
    });
  });
});
```

---

## 🚀 Лучшие практики

### ✅ **Что делать:**

1. **Пишите тесты параллельно** с кодом
2. **Используйте описательные имена** тестов
3. **Тестируйте граничные случаи** (null, пустые значения)
4. **Держите тесты простыми** и читаемыми
5. **Используйте AAA паттерн** (Arrange-Act-Assert)

### ❌ **Чего избегать:**

1. **Слишком сложные тесты** - один тест = одна проверка
2. **Тестирование фреймворка** - тестируйте свою логику
3. **Зависимости между тестами** - тесты должны быть независимы
4. **Моки всего подряд** - мокайте только внешние зависимости

### 📊 **Метрики покрытия:**

- **80-90%** - хорошее покрытие
- **100%** - не всегда необходимо
- **Критичные пути** - должны быть покрыты на 100%

---

## 🎓 Заключение

Unit тестирование - это **инвестиция в качество кода**. Начинайте с простых тестов и постепенно усложняйте. Помните:

- 🎯 **Тестируйте поведение, а не реализацию**
- 🚀 **Тесты должны давать уверенность**
- 📚 **Тесты = живая документация**
- 🛡️ **Тесты защищают от регрессий**

**Ваш проект уже имеет хорошую основу для unit тестирования!** 🎉
