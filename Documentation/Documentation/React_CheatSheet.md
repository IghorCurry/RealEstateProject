# React Шпаргалка

## 1. Життєвий цикл компонентів - Як компоненти "живуть" в React

### Class Components Lifecycle - Життєвий цикл класових компонентів

Життєвий цикл компонента - це серія методів, які викликаються в певному порядку протягом існування компонента. Ці методи дозволяють виконувати різні дії на різних етапах життя компонента: ініціалізація, монтування, оновлення та розмонтування.

Кожен етап життєвого циклу має своє призначення та використовується для різних завдань. Розуміння життєвого циклу критично для правильної роботи з компонентами та уникнення помилок.

```jsx
class MyComponent extends React.Component {
  // Конструктор (ініціалізація)
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  // Монтування
  componentDidMount() {
    console.log("Компонент змонтовано");
    // API запити, підписки
  }

  // Оновлення
  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      console.log("Count змінився");
    }
  }

  // Розмонтування
  componentWillUnmount() {
    console.log("Компонент розмонтовано");
    // Очищення підписок, таймерів
  }

  // Рендер
  render() {
    return <div>{this.state.count}</div>;
  }
}
```

`constructor` викликається першим при створенні компонента. Тут ініціалізується стан та прив'язуються методи до контексту.

`componentDidMount` викликається після того, як компонент був доданий до DOM. Це ідеальне місце для виконання API запитів, підписок на події та інших побічних ефектів.

`componentDidUpdate` викликається кожного разу, коли компонент оновлюється - змінюються props або state. Цей метод отримує попередні значення props та state для порівняння.

`componentWillUnmount` викликається перед видаленням компонента з DOM. Тут необхідно очистити ресурси: скасувати підписки, зупинити таймери, закрити з'єднання.

### Functional Components Lifecycle (useEffect) - Життєвий цикл функціональних компонентів

`useEffect` - це хук, який дозволяє виконувати побічні ефекти в функціональних компонентах. Він може імітувати всі методи життєвого циклу класових компонентів через різні конфігурації.

`useEffect` приймає два аргументи: функцію ефекту та масив залежностей. Функція ефекту виконується після кожного рендера, а масив залежностей контролює, коли ефект повинен виконуватися.

```jsx
import React, { useEffect, useState } from "react";

function MyComponent() {
  const [count, setCount] = useState(0);

  // componentDidMount
  useEffect(() => {
    console.log("Компонент змонтовано");
    return () => {
      console.log("Компонент розмонтовано");
    };
  }, []); // Порожній масив залежностей

  // componentDidUpdate
  useEffect(() => {
    console.log("Count змінився:", count);
  }, [count]); // Залежність від count

  // componentDidMount + componentDidUpdate
  useEffect(() => {
    console.log("Компонент оновлено");
  }); // Без масиву залежностей

  return <div>{count}</div>;
}
```

Перший `useEffect` з порожнім масивом залежностей `[]` викликається тільки один раз після монтування компонента. Функція, яка повертається з `useEffect`, виконується при розмонтуванні компонента.

Другий `useEffect` з масивом залежностей `[count]` викликається кожного разу, коли змінюється значення `count`. Це дозволяє реагувати на зміни конкретних змінних.

Третій `useEffect` без масиву залежностей викликається після кожного рендера компонента. Це еквівалентно `componentDidMount` + `componentDidUpdate`.

## 2. Context API - Передача даних через дерево компонентів

### Створення Context - Механізм глобального стану

Context API - це спосіб передачі даних через дерево компонентів без необхідності передавати props вручну на кожному рівні. Це рішення проблеми "prop drilling" - передачі props через багато рівнів компонентів.

Context дозволяє створювати глобальний стан, доступний для будь-якого компонента в дереві. Це корисно для даних, які потрібні багатьом компонентам: тема, мова, користувач, налаштування тощо.

```jsx
import React, { createContext, useContext, useState } from "react";

// Створення контексту
const ThemeContext = createContext();

// Provider компонент
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom Hook для використання контексту
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
```

`createContext()` створює новий контекст з початковим значенням. Контекст містить два компоненти: `Provider` та `Consumer`.

`Provider` компонент обгортає частину дерева компонентів і надає значення контексту всім компонентам всередині. Коли значення контексту змінюється, всі компоненти, які використовують цей контекст, автоматично перерендеруються.

`useContext()` дозволяє компонентам "підписатися" на зміни в контексті. Цей хук приймає контекст як аргумент і повертає поточне значення контексту.

Custom hook `useTheme` робить використання контексту більш зручним та додає перевірку помилок. Це дозволяє уникнути використання контексту поза межами Provider.

## 3. Virtual DOM - Віртуальна копія реального DOM

### Принцип роботи - Алгоритм порівняння та оновлення

Virtual DOM - це легковісна копія реального DOM, яка зберігається в пам'яті. Коли стан компонента змінюється, React створює новий Virtual DOM, порівнює його з попереднім і визначає, які частини реального DOM потрібно оновити.

Virtual DOM - це JavaScript об'єкт, який представляє структуру реального DOM. Він набагато легший і швидший для обробки, ніж реальний DOM. React використовує алгоритм порівняння (diffing algorithm), щоб знайти різниці між старим і новим Virtual DOM.

```jsx
// React створює Virtual DOM
const virtualDOM = {
  type: "div",
  props: {
    className: "container",
    children: [
      {
        type: "h1",
        props: {
          children: "Hello World",
        },
      },
    ],
  },
};

// Порівняння з реальним DOM
function updateDOM(virtualDOM, realDOM) {
  // React порівнює Virtual DOM з попереднім станом
  // і оновлює тільки змінені частини реального DOM
}
```

Virtual DOM дозволяє React оптимізувати оновлення DOM. Замість оновлення всього DOM при кожній зміні, React оновлює тільки ті частини, які дійсно змінилися.

### Приклад оптимізації - Порівняння підходів

Без Virtual DOM кожна зміна призводить до прямого оновлення DOM, що може бути повільним і неефективним. З Virtual DOM React може групувати зміни та оновлювати DOM одним пакетом, що значно підвищує продуктивність.

```jsx
// Без Virtual DOM (пряме оновлення DOM)
function updateWithoutVDOM() {
  const element = document.getElementById("title");
  element.textContent = "New Title";
  element.style.color = "red";
  element.className = "updated";
}

// З Virtual DOM (React)
function updateWithVDOM() {
  setTitle("New Title");
  setColor("red");
  setClassName("updated");
  // React автоматично оптимізує оновлення DOM
}
```

Virtual DOM також дозволяє React працювати з різними середовищами (браузер, React Native, сервер) через абстракцію DOM.

## 4. Атрибут key при рендері списків - Ідентифікація елементів

### Правильне використання - Стабільні ідентифікатори

Атрибут `key` - це спеціальний атрибут, який React використовує для ідентифікації елементів в списку. Він допомагає React ефективно оновлювати DOM, коли порядок або кількість елементів змінюється.

React використовує ключі для визначення, які елементи змінилися, додалися або видалилися. Без ключів React може неправильно оновити DOM, що призводить до втрати стану компонентів або неправильного відображення.

```jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}

// НЕПРАВИЛЬНО - використання індексу
function WrongTodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

У першому прикладі ми використовуємо `todo.id` як ключ - це унікальний ідентифікатор, який не змінюється при зміні порядку елементів. У другому прикладі ми використовуємо `index` - це неправильно, тому що індекс змінюється при зміні порядку елементів.

### Проблеми з неправильним використанням key

Коли React не може правильно ідентифікувати елементи, він може неправильно оновити DOM, що призводить до втрати стану компонентів або неправильного відображення.

```jsx
// Проблема з індексами
const [todos, setTodos] = useState([
  { id: 1, text: "Task 1", completed: false },
  { id: 2, text: "Task 2", completed: true },
  { id: 3, text: "Task 3", completed: false },
]);

// При видаленні першого елемента
// React може помилково зберегти стан чекбоксів
```

Використання унікальних ID гарантує, що React правильно ідентифікує кожен елемент і збереже його стан при зміні порядку або видаленні елементів.

## 5. Children Props - Передача вмісту між компонентами

### Передача дочірніх елементів - Як створити "контейнер" для контенту

Children props - це спеціальний prop в React, який дозволяє передавати дочірні елементи компоненту. Це робить компоненти більш гнучкими та перевикористовуваними.

```jsx
function Card({ children, title }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-content">{children}</div>
    </div>
  );
}

// Використання
function App() {
  return (
    <Card title="Моя картка">
      <p>Це контент картки</p>
      <button>Кнопка</button>
    </Card>
  );
}
```

У цьому прикладі компонент `Card` приймає `children` як prop і відображає їх всередині `div` з класом `card-content`. Це дозволяє використовувати один і той же компонент `Card` для різного контенту.

### Рендер функції як children - Динамічний контент

Уявіть собі, що у вас є "розумний" контейнер, який не просто показує контент, але й може передавати дані до цього контенту. Це як контейнер з датчиками, який передає інформацію про температуру, вологість тощо до предметів всередині.

Render props - це патерн, при якому компонент приймає функцію як children і викликає її з певними даними. Це дозволяє створювати дуже гнучкі компоненти.

```jsx
function DataFetcher({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  return children({ data, loading });
}

// Використання
function App() {
  return (
    <DataFetcher>
      {({ data, loading }) => {
        if (loading) return <div>Завантаження...</div>;
        return <div>{JSON.stringify(data)}</div>;
      }}
    </DataFetcher>
  );
}
```

У цьому прикладі `DataFetcher` завантажує дані та передає їх до функції `children`. Функція `children` отримує об'єкт з `data` та `loading` і може відобразити контент відповідно до стану завантаження.

Це дозволяє розділити логіку завантаження даних від логіки відображення, що робить код більш модульним та перевикористовуваним.

## 6. Контрольовані та неконтрольовані компоненти - Два способи керування формою

### Контрольовані компоненти - Повний контроль над формою

Контрольовані компоненти - це компоненти, значення яких контролюється React через state. Кожна зміна значення обробляється через обробники подій та оновлює state.

```jsx
function ControlledForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Name:", name, "Email:", email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ім'я"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button type="submit">Відправити</button>
    </form>
  );
}
```

У цьому прикладі значення полів `name` та `email` зберігаються в state компонента. Кожна зміна в полі викликає `onChange`, який оновлює відповідний state. React має повний контроль над значеннями полів.

### Неконтрольовані компоненти - Використання DOM API

Неконтрольовані компоненти - це компоненти, значення яких зберігається в DOM. React отримує значення тільки коли це необхідно (наприклад, при відправці форми).

```jsx
function UncontrolledForm() {
  const nameRef = useRef();
  const emailRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Name:", nameRef.current.value);
    console.log("Email:", emailRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef} type="text" placeholder="Ім'я" />
      <input ref={emailRef} type="email" placeholder="Email" />
      <button type="submit">Відправити</button>
    </form>
  );
}
```

У цьому прикладі ми використовуємо `useRef` для створення посилань на DOM елементи. Значення полів зберігаються в DOM, і ми отримуємо їх тільки при відправці форми через `ref.current.value`.

Неконтрольовані компоненти можуть бути більш продуктивними для простих форм, але контрольовані компоненти надають більше можливостей для валідації та обробки даних.

## 7. Material-UI (MUI) - Готові компоненти для швидкої розробки

### Основні компоненти - Будівельні блоки інтерфейсу

Material-UI - це популярна бібліотека React компонентів, яка реалізує Material Design від Google. Вона надає готові компоненти з вбудованими стилями та функціональністю.

```jsx
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";

function MUIExample() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Моя програма</Typography>
        </Toolbar>
      </AppBar>

      <Card sx={{ maxWidth: 345, margin: 2 }}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Заголовок картки
          </Typography>
          <TextField
            label="Введіть текст"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary">
            Кнопка
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
```

У цьому прикладі ми використовуємо різні компоненти MUI: `AppBar` для заголовка, `Card` для контейнера, `TextField` для поля введення, `Button` для кнопки. Всі ці компоненти мають вбудовані стилі та функціональність.

### Темування - Налаштування зовнішнього вигляду

Уявіть собі, що у вас є будинок, який можна перефарбувати в різні кольори, змінити меблі, освітлення. Темування в MUI працює так само - ви можете налаштувати кольори, шрифти, відступи для всіх компонентів одразу.

```jsx
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MUIExample />
    </ThemeProvider>
  );
}
```

`createTheme` дозволяє створити власну тему з налаштуваннями кольорів, шрифтів, відступів. `ThemeProvider` застосовує цю тему до всіх компонентів всередині.

### Styled API - Створення власних стилів

Уявіть собі, що у вас є базовий компонент, але ви хочете додати до нього власні стилі. Styled API дозволяє створювати нові компоненти на основі існуючих з додатковими стилями.

```jsx
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 48,
  padding: "0 30px",
}));

function StyledExample() {
  return <CustomButton>Кастомна кнопка</CustomButton>;
}
```

`styled` дозволяє створювати компоненти з власними стилями на основі існуючих компонентів MUI. Це дозволяє зберігати функціональність базового компонента, додаючи власний дизайн.

## 8. PureComponent

### Оптимізація рендерингу

```jsx
import React, { PureComponent } from "react";

class OptimizedComponent extends PureComponent {
  render() {
    console.log("Рендер OptimizedComponent");
    return <div>{this.props.value}</div>;
  }
}

// Еквівалент для функціональних компонентів
import React, { memo } from "react";

const OptimizedFunctionalComponent = memo(function OptimizedComponent({
  value,
}) {
  console.log("Рендер OptimizedFunctionalComponent");
  return <div>{value}</div>;
});

// Використання
function ParentComponent() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState("");

  return (
    <div>
      <OptimizedComponent value={count} />
      <button onClick={() => setCount(count + 1)}>Збільшити count</button>
      <button onClick={() => setOtherState("new value")}>
        Змінити інший стан
      </button>
    </div>
  );
}
```

## 9. HOC (Higher-Order Components)

### Створення HOC

```jsx
// HOC для логування
function withLogging(WrappedComponent) {
  return function LoggedComponent(props) {
    console.log(`Рендер ${WrappedComponent.name} з пропсами:`, props);

    return <WrappedComponent {...props} />;
  };
}

// HOC для авторизації
function withAuth(WrappedComponent) {
  return function AuthenticatedComponent(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      // Перевірка авторизації
      checkAuth().then(setIsAuthenticated);
    }, []);

    if (!isAuthenticated) {
      return <div>Будь ласка, увійдіть в систему</div>;
    }

    return <WrappedComponent {...props} />;
  };
}

// Використання
const LoggedUserProfile = withLogging(withAuth(UserProfile));
```

### HOC з додатковими пропсами

```jsx
function withData(WrappedComponent, dataSource) {
  return function DataComponent(props) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      dataSource()
        .then(setData)
        .finally(() => setLoading(false));
    }, []);

    return <WrappedComponent {...props} data={data} loading={loading} />;
  };
}

// Використання
const UserListWithData = withData(UserList, () =>
  fetch("/api/users").then((res) => res.json())
);
```

## 10. Hooks (власні)

### Створення кастомних хуків

```jsx
// Хук для локального сховища
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// Хук для API запитів
function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

// Хук для дебаунсу
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Використання
function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data, loading } = useApi(`/api/search?q=${debouncedSearchTerm}`);

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Пошук..."
      />
      {loading && <div>Завантаження...</div>}
      {data && <div>{JSON.stringify(data)}</div>}
    </div>
  );
}
```

## 11. Portals

### Рендеринг поза DOM ієрархією

```jsx
import { createPortal } from "react-dom";

function Modal({ children, isOpen, onClose }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body // Рендеримо в body
  );
}

// Tooltip з порталом
function Tooltip({ children, content }) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e) => {
    const rect = e.target.getBoundingClientRect();
    setPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
    setIsVisible(true);
  };

  return (
    <>
      <span
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </span>
      {isVisible &&
        createPortal(
          <div
            style={{
              position: "fixed",
              left: position.x,
              top: position.y,
              transform: "translateX(-50%)",
              zIndex: 1000,
            }}
            className="tooltip"
          >
            {content}
          </div>,
          document.body
        )}
    </>
  );
}
```

## 12. useState/альтернативи

### useState

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: "", email: "" });

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);

  const updateUser = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>

      <input
        value={user.name}
        onChange={(e) => updateUser("name", e.target.value)}
        placeholder="Ім'я"
      />
    </div>
  );
}
```

### useReducer для складного стану

```jsx
function todoReducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        { id: Date.now(), text: action.text, completed: false },
      ];
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.id);
    default:
      return state;
  }
}

function TodoList() {
  const [todos, dispatch] = useReducer(todoReducer, []);

  const addTodo = (text) => {
    dispatch({ type: "ADD_TODO", text });
  };

  const toggleTodo = (id) => {
    dispatch({ type: "TOGGLE_TODO", id });
  };

  return (
    <div>
      <button onClick={() => addTodo("Нова задача")}>Додати задачу</button>
      {todos.map((todo) => (
        <div key={todo.id}>
          <span
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.text}
          </span>
        </div>
      ))}
    </div>
  );
}
```

## 13. useEffect

### Різні варіанти використання

```jsx
function EffectExamples() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);

  // componentDidMount
  useEffect(() => {
    console.log("Компонент змонтовано");
    document.title = "Новий заголовок";
  }, []);

  // componentDidUpdate для count
  useEffect(() => {
    console.log("Count змінився:", count);
    document.title = `Count: ${count}`;
  }, [count]);

  // componentDidMount + componentDidUpdate
  useEffect(() => {
    console.log("Компонент оновлено");
  });

  // componentWillUnmount
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      console.log("Інтервал очищено");
    };
  }, []);

  // Залежності з об'єктами
  useEffect(() => {
    if (user) {
      fetchUserData(user.id);
    }
  }, [user?.id]); // Тільки при зміні user.id

  return <div>Count: {count}</div>;
}
```

## 14. React Reconciliation

### Алгоритм порівняння

```jsx
// React порівнює елементи за типом
function ReconciliationExample() {
  const [showDiv, setShowDiv] = useState(true);

  return (
    <div>
      {showDiv ? <div key="div">Це div</div> : <span key="span">Це span</span>}
      <button onClick={() => setShowDiv(!showDiv)}>Перемкнути</button>
    </div>
  );
}

// React буде перестворювати DOM елемент при зміні типу
// Але збереже стан при зміні тільки пропсів
function OptimizedExample() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div key="same-type">Count: {count}</div>
      <button onClick={() => setCount(count + 1)}>Збільшити</button>
    </div>
  );
}
```

## 15. Flux Architecture

### Базова реалізація Flux

```jsx
// Store
class TodoStore {
  constructor() {
    this.todos = [];
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  dispatch(action) {
    switch (action.type) {
      case "ADD_TODO":
        this.todos.push(action.todo);
        break;
      case "DELETE_TODO":
        this.todos = this.todos.filter((t) => t.id !== action.id);
        break;
    }
    this.listeners.forEach((listener) => listener(this.todos));
  }

  getState() {
    return this.todos;
  }
}

// Action Creator
const TodoActions = {
  addTodo: (text) => ({
    type: "ADD_TODO",
    todo: { id: Date.now(), text, completed: false },
  }),
  deleteTodo: (id) => ({
    type: "DELETE_TODO",
    id,
  }),
};

// Component
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const store = useMemo(() => new TodoStore(), []);

  useEffect(() => {
    const unsubscribe = store.subscribe(setTodos);
    return unsubscribe;
  }, [store]);

  const handleAdd = (text) => {
    store.dispatch(TodoActions.addTodo(text));
  };

  const handleDelete = (id) => {
    store.dispatch(TodoActions.deleteTodo(id));
  };

  return (
    <div>
      <AddTodoForm onAdd={handleAdd} />
      <TodoList todos={todos} onDelete={handleDelete} />
    </div>
  );
}
```

## 16. Функціональне програмування

### Принципи в React

```jsx
// Чисті функції
function pureFunction(a, b) {
  return a + b; // Немає побічних ефектів
}

// Композиція функцій
const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((acc, fn) => fn(acc), x);
const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((acc, fn) => fn(acc), x);

const addOne = (x) => x + 1;
const multiplyByTwo = (x) => x * 2;
const square = (x) => x * x;

const composed = compose(square, multiplyByTwo, addOne);
console.log(composed(3)); // ((3 + 1) * 2)² = 64

// Використання в React
function FunctionalComponent({ data }) {
  const processedData = useMemo(() => {
    return pipe(filterValid, sortByDate, takeFirst(10))(data);
  }, [data]);

  return <div>{JSON.stringify(processedData)}</div>;
}

// Функції вищого порядку
function withLoading(WrappedComponent) {
  return function LoadingComponent({ loading, ...props }) {
    if (loading) return <div>Завантаження...</div>;
    return <WrappedComponent {...props} />;
  };
}
```

## 17. Різниця між функціональними та класовими компонентами

### Класові компоненти

```jsx
class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    console.log("Змонтовано");
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      console.log("Count змінився");
    }
  }

  componentWillUnmount() {
    console.log("Розмонтовано");
  }

  handleClick() {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.handleClick}>Збільшити</button>
      </div>
    );
  }
}
```

### Функціональні компоненти

```jsx
function FunctionalComponent({ initialCount = 0 }) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    console.log("Змонтовано");
    return () => console.log("Розмонтовано");
  }, []);

  useEffect(() => {
    console.log("Count змінився:", count);
  }, [count]);

  const handleClick = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Збільшити</button>
    </div>
  );
}
```

### Порівняння

| Аспект        | Класові                | Функціональні |
| ------------- | ---------------------- | ------------- |
| Синтаксис     | Більш багатослівний    | Коротший      |
| this          | Потрібен bind          | Не потрібен   |
| Життєвий цикл | Методи життєвого циклу | useEffect     |
| Стан          | this.state             | useState      |
| Контекст      | this.context           | useContext    |
| Рефси         | createRef              | useRef        |
| Оптимізація   | shouldComponentUpdate  | React.memo    |

## 18. React Fiber

### Принципи роботи

```jsx
// React Fiber дозволяє призупиняти та відновлювати роботу
function ExpensiveComponent() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Тяжкі обчислення
    const heavyComputation = () => {
      const result = [];
      for (let i = 0; i < 10000; i++) {
        result.push({ id: i, value: Math.random() });
      }
      setItems(result);
    };

    // React Fiber може призупинити цей процес
    // для обробки більш важливих завдань
    heavyComputation();
  }, []);

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>{item.value}</div>
      ))}
    </div>
  );
}
```

## 19. Redux

### Базова структура

```jsx
import { createStore } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";

// Reducer
function todoReducer(state = { todos: [] }, action) {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.todo],
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== action.id),
      };
    default:
      return state;
  }
}

// Store
const store = createStore(todoReducer);

// Actions
const addTodo = (text) => ({
  type: "ADD_TODO",
  todo: { id: Date.now(), text, completed: false },
});

const deleteTodo = (id) => ({
  type: "DELETE_TODO",
  id,
});

// Component
function TodoApp() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleAdd = (text) => {
    dispatch(addTodo(text));
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div>
      <AddTodoForm onAdd={handleAdd} />
      <TodoList todos={todos} onDelete={handleDelete} />
    </div>
  );
}

// Provider
function App() {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  );
}
```

## 20. MUI styled

### Styled Components підхід

```jsx
import { styled } from "@mui/material/styles";
import { Button, TextField } from "@mui/material";

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: "25px",
  padding: "10px 20px",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.grey[300],
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

function StyledComponents() {
  return (
    <div>
      <StyledTextField label="Стилізоване поле" variant="outlined" />
      <StyledButton variant="contained">Стилізована кнопка</StyledButton>
    </div>
  );
}
```

## 21. useMemo

### Оптимізація обчислень

```jsx
function ExpensiveComponent({ items, filter }) {
  // Тяжкі обчислення кешуються
  const filteredItems = useMemo(() => {
    console.log("Фільтрація виконана");
    return items.filter((item) =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]); // Перераховується тільки при зміні items або filter

  // Складні обчислення
  const expensiveValue = useMemo(() => {
    console.log("Важке обчислення");
    return filteredItems.reduce((acc, item) => {
      return acc + item.value * Math.sqrt(item.id);
    }, 0);
  }, [filteredItems]);

  return (
    <div>
      <p>Результат: {expensiveValue}</p>
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

// Використання з об'єктами
function ObjectMemo() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: "John", age: 30 });

  // Кешування об'єкта
  const userConfig = useMemo(
    () => ({
      name: user.name,
      age: user.age,
      isAdult: user.age >= 18,
    }),
    [user.name, user.age]
  );

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Збільшити count</button>
      <UserProfile config={userConfig} />
    </div>
  );
}
```

## 22. useCallback

### Оптимізація функцій

```jsx
function OptimizedParent() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);

  // Функція кешується і не перестворюється при кожному рендері
  const handleAddItem = useCallback((newItem) => {
    setItems((prev) => [...prev, newItem]);
  }, []); // Порожній масив - функція створюється один раз

  const handleDeleteItem = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Функція з залежностями
  const handleUpdateItem = useCallback((id, updates) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  }, []); // Залежності відсутні, тому функція стабільна

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Збільшити count</button>
      <ItemList
        items={items}
        onAdd={handleAddItem}
        onDelete={handleDeleteItem}
        onUpdate={handleUpdateItem}
      />
    </div>
  );
}

// Мемоізований компонент
const ItemList = memo(function ItemList({ items, onAdd, onDelete, onUpdate }) {
  console.log("ItemList рендериться");

  return (
    <div>
      {items.map((item) => (
        <Item
          key={item.id}
          item={item}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
});

// Без useCallback компонент перерендерювався б при кожній зміні count
```

## Додаткові теми

### 23. React.memo

```jsx
const MemoizedComponent = React.memo(
  function MyComponent({ data, onAction }) {
    console.log("Компонент рендериться");

    return (
      <div>
        <p>{data.name}</p>
        <button onClick={onAction}>Дія</button>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Кастомна функція порівняння
    return prevProps.data.id === nextProps.data.id;
  }
);
```

### 24. useRef

```jsx
function RefExample() {
  const inputRef = useRef();
  const countRef = useRef(0);

  const focusInput = () => {
    inputRef.current.focus();
  };

  const incrementCount = () => {
    countRef.current += 1;
    console.log("Count:", countRef.current);
  };

  return (
    <div>
      <input ref={inputRef} placeholder="Фокус" />
      <button onClick={focusInput}>Фокус на input</button>
      <button onClick={incrementCount}>Збільшити лічильник</button>
    </div>
  );
}
```

### 25. useLayoutEffect

```jsx
function LayoutEffectExample() {
  const [width, setWidth] = useState(0);
  const elementRef = useRef();

  // Виконується синхронно після DOM мутацій
  useLayoutEffect(() => {
    const element = elementRef.current;
    if (element) {
      const rect = element.getBoundingClientRect();
      setWidth(rect.width);
    }
  }, []);

  return <div ref={elementRef}>Ширина елемента: {width}px</div>;
}
```

### 26. Error Boundaries

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Щось пішло не так.</h1>
          <button onClick={() => this.setState({ hasError: false })}>
            Спробувати знову
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Використання
function App() {
  return (
    <ErrorBoundary>
      <BuggyComponent />
    </ErrorBoundary>
  );
}
```

### 27. React.lazy та Suspense

```jsx
const LazyComponent = React.lazy(() => import("./HeavyComponent"));

function App() {
  const [showLazy, setShowLazy] = useState(false);

  return (
    <div>
      <button onClick={() => setShowLazy(true)}>
        Завантажити важкий компонент
      </button>

      {showLazy && (
        <Suspense fallback={<div>Завантаження...</div>}>
          <LazyComponent />
        </Suspense>
      )}
    </div>
  );
}
```

### 28. React.forwardRef

```jsx
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="fancy-button" {...props}>
    {props.children}
  </button>
));

function ParentComponent() {
  const buttonRef = useRef();

  const focusButton = () => {
    buttonRef.current.focus();
  };

  return (
    <div>
      <FancyButton ref={buttonRef}>Натисни мене</FancyButton>
      <button onClick={focusButton}>Фокус на кнопку</button>
    </div>
  );
}
```

### 8. PureComponent - Оптимізація рендерингу

PureComponent - це базовий клас React, який автоматично реалізує метод `shouldComponentUpdate` з поверхневим порівнянням props та state. Це дозволяє уникнути зайвих рендерів компонента.

```jsx
import React, { PureComponent } from "react";

class UserList extends PureComponent {
  render() {
    const { users } = this.props;

    return (
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    );
  }
}

// Еквівалент з shouldComponentUpdate
class UserListManual extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.users !== nextProps.users || this.state !== nextState;
  }

  render() {
    const { users } = this.props;

    return (
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    );
  }
}
```

PureComponent виконує поверхневе порівняння (shallow comparison) props та state. Якщо об'єкти мають однакові посилання, компонент не перерендерується.

### 9. Higher-Order Components (HOC) - Компоненти вищого порядку

HOC - це функція, яка приймає компонент та повертає новий компонент з додатковою функціональністю. Це патерн для перевикористання логіки компонентів.

```jsx
// HOC для додавання логіки аутентифікації
function withAuth(WrappedComponent) {
  return function AuthenticatedComponent(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
      // Перевірка аутентифікації
      checkAuth().then((user) => {
        setIsAuthenticated(true);
        setUser(user);
      });
    }, []);

    if (!isAuthenticated) {
      return <div>Завантаження...</div>;
    }

    return <WrappedComponent {...props} user={user} />;
  };
}

// Використання HOC
const ProtectedProfile = withAuth(Profile);

// HOC для додавання логіки
function withLogger(WrappedComponent) {
  return function LoggedComponent(props) {
    useEffect(() => {
      console.log(`Component ${WrappedComponent.name} mounted`);
      return () => {
        console.log(`Component ${WrappedComponent.name} unmounted`);
      };
    }, []);

    return <WrappedComponent {...props} />;
  };
}
```

HOC дозволяють розділяти логіку між компонентами та створювати перевикористовувані абстракції.

### 10. Custom Hooks - Власні хуки

Custom Hooks - це функції, які починаються з "use" та можуть викликати інші хуки. Вони дозволяють витягувати логіку компонентів у перевикористовувані функції.

```jsx
// Хук для роботи з localStorage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// Хук для API запитів
function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Хук для debounce
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Використання custom hooks
function UserProfile() {
  const [user, setUser] = useLocalStorage("user", null);
  const { data: posts, loading, error } = useApi("/api/posts");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Пошук..."
      />
      {loading && <div>Завантаження...</div>}
      {error && <div>Помилка завантаження</div>}
      {data && <PostList posts={data} searchTerm={debouncedSearchTerm} />}
    </div>
  );
}
```

Custom Hooks дозволяють інкапсулювати логіку та перевикористовувати її між компонентами.

### 11. Portals - Рендеринг за межами DOM дерева

Portals дозволяють рендерити дочірні елементи в DOM вузол, який знаходиться поза DOM ієрархією батьківського компонента. Це корисно для модальних вікон, сповіщень та інших UI елементів.

```jsx
import { createPortal } from "react-dom";

function Modal({ children, isOpen, onClose }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
}

// Використання
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>
        Відкрити модальне вікно
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Модальне вікно</h2>
        <p>Цей контент рендериться в body</p>
      </Modal>
    </div>
  );
}
```

Portals корисні для створення UI елементів, які повинні відображатися поверх всього інтерфейсу.

### 12. useReducer - Складне управління станом

useReducer - це хук для управління складним станом компонента. Він приймає reducer функцію та початковий стан, повертаючи поточний стан та dispatch функцію.

```jsx
// Reducer функція
function todoReducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };

    default:
      return state;
  }
}

// Використання useReducer
function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: "all",
  });

  const addTodo = (text) => {
    dispatch({
      type: "ADD_TODO",
      payload: { id: Date.now(), text, completed: false },
    });
  };

  const toggleTodo = (id) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };

  const deleteTodo = (id) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const setFilter = (filter) => {
    dispatch({ type: "SET_FILTER", payload: filter });
  };

  return (
    <div>
      <TodoForm onAdd={addTodo} />
      <TodoList
        todos={state.todos}
        filter={state.filter}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
      <FilterButtons currentFilter={state.filter} onFilter={setFilter} />
    </div>
  );
}
```

useReducer корисний для компонентів зі складним станом, який включає багато підзначень або складну логіку оновлення.

### 13. useMemo та useCallback - Оптимізація продуктивності

useMemo та useCallback - це хуки для оптимізації продуктивності React компонентів. Вони дозволяють мемоізувати значення та функції відповідно, уникнути зайвих перерендерів та покращити загальну продуктивність додатку.

useMemo використовується для мемоізації обчислюваних значень, які потребують значних ресурсів для обчислення. Він перераховує значення тільки коли змінюються залежності, що дозволяє уникнути повторних обчислень при кожному рендері.

useCallback мемоізує функції, що критично важливо при передачі функцій як пропсів до дочірніх компонентів. Без useCallback нова функція створюється при кожному рендері батьківського компонента, що призводить до зайвих перерендерів дочірніх компонентів, навіть якщо вони обгорнуті в React.memo.

```jsx
function ExpensiveComponent({ items, filter }) {
  // Мемоізація обчислюваного значення
  const filteredItems = useMemo(() => {
    console.log("Фільтрація елементів...");
    return items.filter((item) => item.name.includes(filter));
  }, [items, filter]);

  // Мемоізація функції
  const handleItemClick = useCallback((itemId) => {
    console.log("Клік по елементу:", itemId);
  }, []);

  return (
    <div>
      {filteredItems.map((item) => (
        <Item key={item.id} item={item} onClick={handleItemClick} />
      ))}
    </div>
  );
}

// Оптимізований дочірній компонент
const Item = React.memo(function Item({ item, onClick }) {
  return <div onClick={() => onClick(item.id)}>{item.name}</div>;
});
```

useMemo використовується для мемоізації обчислюваних значень, а useCallback - для мемоізації функцій. Це допомагає уникнути зайвих перерендерів дочірніх компонентів.

### 14. Error Boundaries - Обробка помилок

Error Boundaries - це компоненти, які перехоплюють помилки JavaScript в дочірніх компонентах, логують їх та відображають fallback UI замість зламаного дерева компонентів. Це механізм React для елегантної обробки помилок та запобігання краху всього додатку.

Error Boundaries працюють як try-catch блок для React компонентів. Вони перехоплюють помилки в дочірніх компонентах, включаючи помилки в методах життєвого циклу та конструкторах, але не перехоплюють помилки в обробниках подій, асинхронному коді або серверному рендерингу.

Error Boundaries дозволяють ізолювати помилки в певних частинах додатку, забезпечуючи стабільність решти інтерфейсу. Вони також надають можливість логування помилок, відправки їх в системи моніторингу та надання користувачам зрозумілих повідомлень про помилки.

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    // Відправка помилки в сервіс логування
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Щось пішло не так</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Спробувати знову
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Використання
function App() {
  return (
    <ErrorBoundary>
      <UserProfile />
    </ErrorBoundary>
  );
}

// Хук для функціональних компонентів
function useErrorHandler() {
  const [error, setError] = useState(null);

  if (error) {
    throw error;
  }

  return setError;
}

function ComponentWithErrorHandling() {
  const handleError = useErrorHandler();

  const riskyOperation = () => {
    try {
      // Ризикована операція
      throw new Error("Щось пішло не так");
    } catch (err) {
      handleError(err);
    }
  };

  return <button onClick={riskyOperation}>Виконати ризикову операцію</button>;
}
```

Error Boundaries забезпечують гнучку обробку помилок та покращують користувацький досвід.

### 15. React.lazy та Suspense - Ліниве завантаження

React.lazy та Suspense дозволяють розділяти код та завантажувати компоненти тільки коли вони потрібні. Це потужний механізм для оптимізації продуктивності додатку, який дозволяє зменшити початковий розмір бандла та прискорити завантаження.

React.lazy створює компонент, який динамічно імпортує інший компонент. Це дозволяє розділити код на менші частини, які завантажуються тільки при необхідності. Кожен lazy компонент створює окремий chunk файл, що покращує кешування та завантаження.

Suspense - це компонент, який відображає fallback UI під час завантаження lazy компонентів. Він також підтримує вкладений Suspense, що дозволяє створювати гранульоване завантаження для різних частин додатку. Suspense також підтримує інші асинхронні операції, такі як завантаження даних.

```jsx
import React, { Suspense, lazy } from "react";

// Ліниве завантаження компонентів
const LazyComponent = lazy(() => import("./LazyComponent"));
const AnotherLazyComponent = lazy(() => import("./AnotherLazyComponent"));

function App() {
  const [showLazy, setShowLazy] = useState(false);

  return (
    <div>
      <button onClick={() => setShowLazy(!showLazy)}>
        {showLazy ? "Сховати" : "Показати"} лінивий компонент
      </button>

      <Suspense fallback={<div>Завантаження...</div>}>
        {showLazy && <LazyComponent />}
      </Suspense>

      <Suspense fallback={<div>Завантаження іншого компонента...</div>}>
        <AnotherLazyComponent />
      </Suspense>
    </div>
  );
}

// Компонент з лінивим завантаженням
const LazyComponent = () => {
  return <div>Цей компонент завантажений ліниво</div>;
};

export default LazyComponent;
```

React.lazy працює тільки з default exports. Для named exports потрібно використовувати додаткову обгортку.

### 16. React.forwardRef - Передача refs

React.forwardRef дозволяє передавати ref через компонент до дочірнього DOM елемента або класового компонента. Це важливий інструмент для створення перевикористовуваних компонентів, які потребують прямого доступу до DOM елементів або методів дочірніх компонентів.

forwardRef вирішує проблему "ref forwarding" - ситуації, коли батьківський компонент потребує доступу до DOM елемента або методу дочірнього компонента, але між ними знаходиться функціональний компонент, який за замовчуванням не може передавати refs.

Цей механізм особливо корисний при створенні бібліотек компонентів, форм, анімацій та інших сценаріїв, де потрібен прямий доступ до DOM. forwardRef також працює з useImperativeHandle для створення кастомних API для дочірніх компонентів.

```jsx
import React, { forwardRef, useImperativeHandle, useRef } from "react";

// Компонент з forwardRef
const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    blur: () => {
      inputRef.current.blur();
    },
    getValue: () => {
      return inputRef.current.value;
    },
  }));

  return <input ref={inputRef} className="fancy-input" {...props} />;
});

// Використання
function Form() {
  const inputRef = useRef();

  const handleFocus = () => {
    inputRef.current.focus();
  };

  const handleGetValue = () => {
    console.log("Значення:", inputRef.current.getValue());
  };

  return (
    <div>
      <FancyInput ref={inputRef} placeholder="Введіть текст" />
      <button onClick={handleFocus}>Фокус</button>
      <button onClick={handleGetValue}>Отримати значення</button>
    </div>
  );
}
```

forwardRef корисний для створення перевикористовуваних компонентів, які потребують доступу до DOM елементів.

### 17. React.memo - Мемоізація компонентів

React.memo - це higher-order component, який мемоізує функціональний компонент. Він перерендерує компонент тільки якщо його props змінилися, що дозволяє уникнути зайвих перерендерів та покращити продуктивність додатку.

React.memo виконує поверхневе порівняння props за замовчуванням, але також підтримує кастомну функцію порівняння для більш складних сценаріїв. Це дозволяє точно контролювати, коли компонент повинен перерендеритися.

Мемоізація особливо корисна для компонентів, які рендеруються часто або мають складну логіку рендерингу. Вона працює найкраще в поєднанні з useCallback та useMemo для мемоізації функцій та значень, які передаються як props.

```jsx
import React, { memo } from "react";

// Мемоізований компонент
const ExpensiveComponent = memo(function ExpensiveComponent({
  data,
  onUpdate,
}) {
  console.log("ExpensiveComponent рендериться");

  return (
    <div>
      <h3>Дорогий компонент</h3>
      <p>Дані: {JSON.stringify(data)}</p>
      <button onClick={onUpdate}>Оновити</button>
    </div>
  );
});

// Компонент з кастомним порівнянням
const CustomMemoComponent = memo(
  function CustomMemoComponent({ items, filter }) {
    return (
      <ul>
        {items
          .filter((item) => item.name.includes(filter))
          .map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
      </ul>
    );
  },
  (prevProps, nextProps) => {
    // Кастомна логіка порівняння
    return (
      prevProps.items.length === nextProps.items.length &&
      prevProps.filter === nextProps.filter
    );
  }
);

// Використання
function ParentComponent() {
  const [data, setData] = useState({ count: 0 });
  const [otherState, setOtherState] = useState(0);

  const handleUpdate = useCallback(() => {
    setData((prev) => ({ count: prev.count + 1 }));
  }, []);

  return (
    <div>
      <ExpensiveComponent data={data} onUpdate={handleUpdate} />
      <button onClick={() => setOtherState((prev) => prev + 1)}>
        Оновити інший стан: {otherState}
      </button>
    </div>
  );
}
```

React.memo корисний для оптимізації продуктивності компонентів, які рендеруються часто або мають складну логіку рендерингу.

### 18. useLayoutEffect - Синхронні побічні ефекти

useLayoutEffect працює аналогічно до useEffect, але викликається синхронно після всіх DOM мутацій та перед рендерингом браузера. Це критично важливо для операцій, які повинні виконуватися перед тим, як користувач побачить зміни на екрані.

useLayoutEffect блокує рендеринг браузера до завершення виконання, що робить його ідеальним для вимірювання DOM елементів, виконання DOM мутацій або запобігання мерехтінню UI. Це дозволяє виконати необхідні зміни до того, як браузер відобразить результат користувачу.

Важливо використовувати useLayoutEffect тільки коли це дійсно необхідно, оскільки синхронне виконання може вплинути на продуктивність. Для більшості випадків useEffect є кращим вибором, оскільки він не блокує рендеринг.

```jsx
import React, { useLayoutEffect, useRef, useState } from "react";

function Tooltip({ children, text }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef();
  const triggerRef = useRef();

  useLayoutEffect(() => {
    if (isVisible && tooltipRef.current && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      // Розрахунок позиції tooltip
      const top = triggerRect.bottom + 5;
      const left =
        triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;

      setPosition({ top, left });
    }
  }, [isVisible]);

  return (
    <div>
      <span
        ref={triggerRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </span>

      {isVisible && (
        <div
          ref={tooltipRef}
          style={{
            position: "fixed",
            top: position.top,
            left: position.left,
            backgroundColor: "black",
            color: "white",
            padding: "5px",
            borderRadius: "3px",
            zIndex: 1000,
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
}

// Використання
function App() {
  return (
    <div>
      <Tooltip text="Це підказка">Наведіть на мене</Tooltip>
    </div>
  );
}
```

useLayoutEffect корисний для операцій, які повинні виконуватися синхронно перед рендерингом, таких як вимірювання DOM елементів або запобігання мерехтінню UI.

### 19. React Context з useReducer - Складне управління глобальним станом

Поєднання Context API з useReducer дозволяє створювати потужну систему управління глобальним станом без використання зовнішніх бібліотек. Це елегантне рішення для додатків середнього розміру, які потребують централізованого управління станом.

Цей підхід поєднує переваги Context API для передачі даних через дерево компонентів з передбачуваною логікою оновлення стану через useReducer. Reducer забезпечує централізовану логіку обробки дій, що робить зміни стану передбачуваними та легкими для тестування.

Така архітектура дозволяє створювати складні додатки з множинними діями, асинхронними операціями та складними взаємодіями між компонентами. Вона також забезпечує хорошу продуктивність завдяки можливості оптимізації перерендерів через розділення стану на логічні частини.

```jsx
import React, { createContext, useContext, useReducer } from "react";

// Початковий стан
const initialState = {
  user: null,
  todos: [],
  filter: "all",
  loading: false,
  error: null,
};

// Reducer
function appReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };

    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case "SET_FILTER":
      return { ...state, filter: action.payload };

    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    default:
      return state;
  }
}

// Context
const AppContext = createContext();

// Provider
function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const actions = {
    setUser: (user) => dispatch({ type: "SET_USER", payload: user }),
    addTodo: (todo) => dispatch({ type: "ADD_TODO", payload: todo }),
    toggleTodo: (id) => dispatch({ type: "TOGGLE_TODO", payload: id }),
    setFilter: (filter) => dispatch({ type: "SET_FILTER", payload: filter }),
    setLoading: (loading) =>
      dispatch({ type: "SET_LOADING", payload: loading }),
    setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  };

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook для використання контексту
function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}

// Компоненти, які використовують контекст
function TodoList() {
  const { state, actions } = useAppContext();

  const filteredTodos = state.todos.filter((todo) => {
    if (state.filter === "completed") return todo.completed;
    if (state.filter === "active") return !todo.completed;
    return true;
  });

  return (
    <div>
      {filteredTodos.map((todo) => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => actions.toggleTodo(todo.id)}
          />
          {todo.text}
        </div>
      ))}
    </div>
  );
}

function AddTodo() {
  const { actions } = useAppContext();
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      actions.addTodo({
        id: Date.now(),
        text: text.trim(),
        completed: false,
      });
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Додати завдання"
      />
      <button type="submit">Додати</button>
    </form>
  );
}

// Використання
function App() {
  return (
    <AppProvider>
      <div>
        <AddTodo />
        <TodoList />
      </div>
    </AppProvider>
  );
}
```

Цей підхід дозволяє створювати складну систему управління станом з централізованою логікою та передбачуваними оновленнями.

### 20. React Testing Library - Тестування компонентів

React Testing Library - це бібліотека для тестування React компонентів, яка фокусується на тестуванні поведінки з точки зору користувача. Вона заохочує написання тестів, які перевіряють, як користувач взаємодіє з додатком, а не внутрішню реалізацію компонентів.

React Testing Library надає набір утиліт для рендерингу компонентів, пошуку елементів, симуляції користувацьких дій та перевірки результатів. Вона працює з Jest та іншими тестовими фреймворками, забезпечуючи повний стек для тестування React додатків.

Бібліотека заохочує використання семантичних селекторів (таких як role, label, placeholder) замість CSS класів або ID, що робить тести більш стійкими до змін в реалізації. Вона також підтримує тестування асинхронних операцій, обробки помилок та складних користувацьких взаємодій.

```jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoApp from "./TodoApp";

// Тест компонента
describe("TodoApp", () => {
  test("додає нове завдання", async () => {
    render(<TodoApp />);

    const input = screen.getByPlaceholderText("Додати завдання");
    const addButton = screen.getByText("Додати");

    await userEvent.type(input, "Нове завдання");
    fireEvent.click(addButton);

    expect(screen.getByText("Нове завдання")).toBeInTheDocument();
  });

  test("перемикає статус завдання", async () => {
    render(<TodoApp />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  test("фільтрує завдання", async () => {
    render(<TodoApp />);

    // Додаємо завдання
    const input = screen.getByPlaceholderText("Додати завдання");
    const addButton = screen.getByText("Додати");

    await userEvent.type(input, "Активне завдання");
    fireEvent.click(addButton);

    await userEvent.type(input, "Завершене завдання");
    fireEvent.click(addButton);

    // Позначаємо друге завдання як завершене
    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[1]);

    // Фільтруємо по активним
    const activeFilter = screen.getByText("Активні");
    fireEvent.click(activeFilter);

    expect(screen.getByText("Активне завдання")).toBeInTheDocument();
    expect(screen.queryByText("Завершене завдання")).not.toBeInTheDocument();
  });

  test("обробляє помилки", async () => {
    // Мокаємо fetch для симуляції помилки
    global.fetch = jest.fn(() => Promise.reject(new Error("Network error")));

    render(<TodoApp />);

    await waitFor(() => {
      expect(screen.getByText("Помилка завантаження")).toBeInTheDocument();
    });
  });
});

// Тест custom hook
import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "./useLocalStorage";

test("useLocalStorage зберігає та отримує значення", () => {
  const { result } = renderHook(() => useLocalStorage("test", "initial"));

  expect(result.current[0]).toBe("initial");

  act(() => {
    result.current[1]("new value");
  });

  expect(result.current[0]).toBe("new value");
  expect(localStorage.getItem("test")).toBe('"new value"');
});
```

React Testing Library забезпечує тестування компонентів з точки зору користувача, що робить тести більш надійними та корисними.
