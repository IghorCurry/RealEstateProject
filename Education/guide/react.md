## 4.1 Модель React (компоненти, props, state, контрольований/неконтрольований ввід)

- TL;DR: Компоненти приймають props і керують state. Контрольовані інпути зберігають значення у state; неконтрольовані — у DOM через ref.

- What/Why

  - Чітка модель даних → менше багів і зрозуміла логіка UI.

- Topic

  - Функціональні компоненти — чисті функції від props до UI.
  - State — локальні дані, що змінюються через `setState` (хуки).
  - Контрольовані інпути — значення зберігається у state, onChange оновлює state.
  - Неконтрольовані — значення в DOM, читаємо через `ref`.

- Important details

  - Props — незмінні всередині компонента.
  - Не мутуй state напряму; використовуйте updater-функції.

- Code (з пострічковим поясненням)

```tsx
import React from "react";

function NameForm() {
  // 1
  const [name, setName] = React.useState(""); // 2
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert(name);
      }}
    >
      {" "}
      {/* 3 */}
      <input value={name} onChange={(e) => setName(e.target.value)} /> {/* 4 */}
      <button type="submit">Save</button>
    </form>
  );
}

function FileInput() {
  // 5
  const fileRef = React.useRef<HTMLInputElement>(null); // 6
  const submit = () => {
    const f = fileRef.current?.files?.[0]; // 7
    if (f) alert(f.name);
  };
  return (
    <>
      <input ref={fileRef} type="file" /> {/* 8 */}
      <button onClick={submit}>Upload</button>
    </>
  );
}
```

Пояснення:

1. Компонент-функція. 2) Локальний state.
2. Заборона перезавантаження форми та використання state.
3. Контрольований інпут: value з state, onChange оновлює state.
   5–8) Неконтрольований інпут: дані в DOM, читаємо через ref.

- React tie-in

  - Це і є базова модель React: props зверху вниз, state локально, події піднімають дані.

- When it's used (короткі практичні сценарії)

  - Форми, фільтри, інтерактивні елементи, інпут файлів.

- Interview Q&A

  - Чим відрізняються контрольований і неконтрольований інпут? — Зберігання значення: state vs DOM.
  - Чому не можна мутувати state? — React не відслідкує зміну; слід використовувати setState.

- Mini-glossary

  - Controlled input: інпут, який керується state.
  - Ref: посилання на DOM елемент або імперативний API.

---

## 4.2 JSX і рендеринг (ключі, фрагменти, портали)

- TL;DR: JSX — синтаксис над `React.createElement`. Ключі стабілізують списки. Фрагменти групують без зайвих div. Портали рендерять у інший DOM-вузол.

- What/Why

  - Читабельна розмітка, стабільні списки і flexible розміщення модалок.

- Topic

  - Ключі мають бути стабільними і унікальними; не використовуй індекси масиву.
  - Фрагменти: `<></>` або `<React.Fragment>`.
  - Портали: `createPortal(child, container)`.

- Important details

  - Ключі потрібні лише у списках.
  - Портали зберігають контекст і події компонента.

- Code (з пострічковим поясненням)

```tsx
import React from "react";
import { createPortal } from "react-dom";

function List({ items }: { items: { id: string; title: string }[] }) {
  // 1
  return (
    <ul>
      {items.map((it) => (
        <li key={it.id}>{it.title}</li> // 2
      ))}
    </ul>
  );
}

function Modal({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
}) {
  // 3
  if (!open) return null;
  const root = document.getElementById("modal-root")!; // 4
  return createPortal(<div className="modal">{children}</div>, root); // 5
}
```

Пояснення:

1. Компонент зі списком. 2) Стабільні ключі — id.
2. Портал показує модалку. 4) Вузол призначення. 5) Рендер контенту у портал.

- React tie-in

  - Списки, модалки, тултіпи, випадаючі меню.

- When it's used (короткі практичні сценарії)

  - Будь-які списки, overlay-компоненти поверх розмітки.

- Interview Q&A

  - Навіщо ключ у списку? — Для стабільного зіставлення елементів між рендерами.
  - Що таке портал? — Рендер React-елемента в інший DOM-вузол із збереженням контексту.

- Mini-glossary

  - Portal: вивід компонента в альтернативний контейнер DOM.
  - Fragment: обгортка без додаткового DOM.

---

## 4.3 Fiber і Concurrent Features (огляд)

- TL;DR: Fiber — новий рушій координації, що дозволяє переривати рендер. Concurrent Features покращують відгук UI (startTransition, Suspense).

- What/Why

  - Краще керування пріоритетами і плавність інтерфейсу.

- Topic

  - Пріоритезація робіт, розбиття рендеру на частини, відкладене оновлення через `startTransition`.
  - Suspense — межі очікування для асинхронних даних/ленивого коду.

- Important details

  - Concurrent режим вмикається опосередковано (через `startTransition`, `Suspense`, бібліотеки даних).

- Code (з пострічковим поясненням)

```tsx
import React from "react";

function Search() {
  const [text, setText] = React.useState(""); // 1
  const [results, setResults] = React.useState<string[]>([]);
  const [isPending, startTransition] = React.useTransition(); // 2

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value; // 3
    setText(v); // 4 (терміново)
    startTransition(() => {
      // 5 (низький пріоритет)
      // імітація важкого фільтру
      const next = Array.from({ length: 5000 }, (_, i) => `Item ${i}`).filter(
        (x) => x.includes(v)
      );
      setResults(next);
    });
  }

  return (
    <div>
      <input value={text} onChange={onChange} />
      {isPending && <span>Loading…</span>} {/* 6 */}
      <ul>
        {results.slice(0, 20).map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
    </div>
  );
}
```

Пояснення:

1. Керування введенням. 2) Розділяємо пріоритети.
   3–4) Оновлення поля — високий пріоритет. 5) Важкий фільтр — низький пріоритет у transition.
2. Індикатор очікування під час обчислень.

- React tie-in

  - Плавні пошуки/фільтри/сортування без блокування вводу.

- When it's used (короткі практичні сценарії)

  - Великі списки, інтенсивні обчислення при введенні.

- Interview Q&A

  - Навіщо `startTransition`? — Віддати важку роботу у низький пріоритет.
  - Для чого Suspense? — Межі очікування для асинхронних ресурсів.

- Mini-glossary

  - Transition: низькопріоритетне оновлення стану для плавності UI.
  - Suspense: механізм показу fallback під час очікування даних/коду.

---

## 4.4 Хуки — базові й розширені (useState, useEffect, useMemo, useCallback, useRef, useContext)

- TL;DR: Хуки додають стан і життєвий цикл у функціональні компоненти. Тримай залежності актуальними, мемоізуй важкі обчислення і стабілізуй колбеки, коли це виправдано.

- What/Why

  - Контроль за станом, побічними ефектами та продуктивністю без класів.

- Topic

  - `useState` — локальний стан. `useReducer` — складні стани.
  - `useEffect` — синхронізація ззовнішніми системами (запити, підписки). Очищення в return.
  - `useMemo` — кешує результат важкого обчислення. `useCallback` — кешує функцію.
  - `useRef` — зберігає мутоване значення між рендерами; доступ до DOM.
  - `useContext` — доступ до значення з контексту без проп-дрилінгу.

- Important details

  - Масив залежностей визначає, коли перераховувати ефекти/мемо/колбеки.
  - Уникай зайвої мемоізації — вона теж коштує ресурсів.
  - В ефектах аборт запитів/відписка у cleanup.

- Code (з пострічковим поясненням)

```tsx
import React from "react";

type Ctx = { theme: "light" | "dark"; toggle: () => void };
const ThemeCtx = React.createContext<Ctx | null>(null); // 1

function FilteredList({ items }: { items: string[] }) {
  const [q, setQ] = React.useState(""); // 2
  const filtered = React.useMemo(() => {
    // 3
    const lower = q.toLowerCase();
    return items.filter((x) => x.toLowerCase().includes(lower));
  }, [items, q]);

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQ(e.target.value);
    },
    []
  ); // 4

  const inputRef = React.useRef<HTMLInputElement>(null); // 5

  React.useEffect(() => {
    inputRef.current?.focus(); // 6
  }, []);

  return (
    <div>
      <input ref={inputRef} value={q} onChange={onChange} />
      <ul>
        {filtered.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </div>
  );
}

function ThemeButton() {
  const ctx = React.useContext(ThemeCtx); // 7
  if (!ctx) return null;
  return <button onClick={ctx.toggle}>Theme: {ctx.theme}</button>;
}
```

Пояснення:

1. Контекст для теми. 2) Локальний стан запиту.
2. Кешуємо фільтрацію для продуктивності залежно від `items` і `q`.
3. Стабілізуємо обробник зміни, щоб не створювати нову функцію на кожен рендер.
4. Ref для доступу до DOM-інпуту. 6) Фокусуємо інпут після монтування.
5. Споживаємо контекст без проп-дрилінгу.

- React tie-in

  - Типовий патерн пошуку/фільтрації; контекст для глобальних налаштувань UI.

- When it's used (короткі практичні сценарії)

  - Пошук по списку, кешування обчислень, доступ до DOM, глобальні теми/локалі.

- Interview Q&A

  - Коли застосовувати `useMemo`? — Для важких обчислень або стабільності залежностей.
  - Чим відрізняються `useRef` і `useState`? — `useRef` не тригерить ререндер при зміні `.current`.
  - Навіщо масив залежностей в `useEffect`? — Контролює, коли запускати/очищати ефект.

- Mini-glossary

  - Dependency array: список змінних, від яких залежить ефект/мемо/колбек.
  - Prop drilling: передача даних через багато рівнів компонентів.

---

## 4.5 Управління станом (локальний стан, підйом стану, контекст; коли Redux)

- TL;DR: Почни з локального стану і підйому стану. Контекст — для глобальних налаштувань/легких даних. Redux Toolkit/Zustand — коли є складні крос-компонентні дані/ефекти.

- What/Why

  - Не ускладнюй завчасно. Обери найпростіший інструмент, який покриває вимоги проєкту.

- Topic

  - Локальний стан — у компоненті, коли він впливає лише на нього.
  - Підйом стану — перемістити state у спільного предка, якщо його ділять декілька дітей.
  - Контекст — для теми, локалі, користувача; обережно з продуктивністю.
  - Зовнішні стореджі (Redux Toolkit/Zustand) — для складних флоу, кешу, серверних синхронізацій.

- Important details

  - Мемоізуй селектори/контекст-значення, щоб уникати зайвих ререндерів.

- Code (з пострічковим поясненням)

```tsx
import React from "react";

type Ctx = { user: { id: string } | null };
const UserCtx = React.createContext<Ctx>({ user: null }); // 1

function Parent() {
  const [user, setUser] = React.useState<Ctx["user"]>(null); // 2
  const value = React.useMemo(() => ({ user }), [user]); // 3
  return (
    <UserCtx.Provider value={value}>
      {" "}
      {/* 4 */}
      <Profile />
    </UserCtx.Provider>
  );
}

function Profile() {
  const { user } = React.useContext(UserCtx); // 5
  return <div>{user ? user.id : "guest"}</div>;
}
```

Пояснення:

1. Контекст користувача. 2) Локальний стан у предка.
2. Стабілізуємо value, щоб не тригерити ререндери зайвих дітей.
3. Провайдер поширює дані вниз. 5) Споживач отримує user.

- React tie-in

  - Базовий шаблон для глобальних налаштувань без важкої бібліотеки.

- When it's used (короткі практичні сценарії)

  - Поточний користувач, тема, локаль; підйом стану для синхронізації діток.

- Interview Q&A

  - Коли брати Redux Toolkit? — Коли локальний/контекст вже не тягне: складні ефекти, кеш, велика командна робота.

- Mini-glossary

  - Lift state up: перенесення стану у предка для спільного використання.

---

## 4.6 Дані та кешування (fetching, аборт, React Query)

- TL;DR: Витяг даних — у хук; скасовуй застарілі запити; використовуй React Query для кешу, станів завантаження, рефетчу.

- What/Why

  - Менше ручної логіки станів і кешу, більше зосередження на UI.

- Topic

  - Хук для запиту з `AbortController`.
  - React Query: useQuery/useMutation, кешування, рефетч, staleTime.

- Important details

  - Скасовуй запити у cleanup, щоб уникнути race conditions.

- Code (з пострічковим поясненням)

```tsx
import React from "react";

function useUser(id: string) {
  return React.useMemo(
    () => ({
      controller: new AbortController(),
    }),
    [id]
  );
}

async function loadUser(id: string, signal: AbortSignal) {
  const res = await fetch(`/api/users/${id}`, { signal }); // 1
  if (!res.ok) throw new Error("load error");
  return res.json();
}

function UserCard({ id }: { id: string }) {
  const { controller } = useUser(id);
  const [data, setData] = React.useState<any>(null);
  const [err, setErr] = React.useState<string | null>(null);

  React.useEffect(() => {
    loadUser(id, controller.signal)
      .then(setData)
      .catch((e) => setErr(e.message));
    return () => controller.abort(); // 2
  }, [id, controller]);

  if (err) return <div>Error: {err}</div>;
  if (!data) return <div>Loading…</div>;
  return <div>{data.name}</div>;
}
```

Пояснення:

1. Запит з можливістю скасування. 2) Аборт при анмаунті/зміні id.

- React tie-in

  - Заміна на React Query: менше коду, більше фіч (кеш, рефетч, статуси).

- When it's used (короткі практичні сценарії)

  - Детальні сторінки, списки з фільтрами, кешування запитів.

- Interview Q&A

  - Навіщо скасовувати запити? — Щоб уникнути оновлення стану неактуальними даними.

- Mini-glossary

  - Stale time: час, протягом якого кеш вважається свіжим.

---

## 4.7 Роутінг і платформи (React Router v6, Next.js огляд)

- TL;DR: React Router — клієнтський роутінг у SPA. Next.js — фреймворк з SSR/SSG/ISR і App Router.

- What/Why

  - Вибір залежить від продукту: SPA чи змішаний рендер/SEO.

- Topic

  - React Router v6: елементи маршрутизації, вкладені маршрути, `useNavigate`, `Outlet`.
  - Next.js: App Router, серверні/клієнтські компоненти, дані на сервері.

- Important details

  - Для SEO/перформансу контенту — SSR/SSG; для панелей керування — SPA достатньо.

- Code (з пострічковим поясненням)

```tsx
// React Router v6
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  Outlet,
  useNavigate,
} from "react-router-dom";

function Layout() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <Outlet />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <h1>Home</h1> },
      { path: "about", element: <h1>About</h1> },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
```

Пояснення:

- Створили роутер, визначили макет з `Outlet` для вкладених маршрутів.

- React tie-in

  - Це і є основа SPA-навігації; Next.js додає серверні можливості для SEO.

- When it's used (короткі практичні сценарії)

  - SPA-адмінки, документація, маркетинг-сторінки з SSR у Next.js.

- Interview Q&A

  - Коли обрати Next.js замість чистого React Router? — Коли потрібні SSR/SSG/ISR або кращий SEO.

- Mini-glossary

  - SSR/SSG/ISR: server-side, static generation, incremental static regeneration.

---

## 4.8 Форми та валідація (React Hook Form, інтеграція з Zod/Yup)

- TL;DR: React Hook Form мінімізує ререндери і простий у використанні. Схемна валідація (Zod/Yup) тримає правила в одному місці.

- What/Why

  - Менше коду, краща продуктивність і єдине джерело істини для правил.

- Topic

  - `useForm`, `register`, `handleSubmit`, `formState`.
  - Схеми Zod/Yup через resolver.

- Important details

  - Краще використовувати контролери лише коли компонент неконтрольований.

- Code (з пострічковим поясненням)

```tsx
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  // 1
  email: z.string().email(),
  age: z.number().int().min(1),
});

type FormData = z.infer<typeof schema>; // 2

export function ProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema), // 3
  });

  const onSubmit = (data: FormData) => {
    // 4
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {" "}
      {/* 5 */}
      <input type="email" {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}
      <input type="number" {...register("age", { valueAsNumber: true })} />
      {errors.age && <span>{errors.age.message}</span>}
      <button disabled={isSubmitting}>Save</button>
    </form>
  );
}
```

Пояснення:

1. Схема Zod описує правила. 2) Виводимо типи з схеми.
2. Підключаємо resolver для валідації. 4) Обробник сабміту отримує валідні дані.
3. `handleSubmit` виконує валідацію і викликає `onSubmit`.

- React tie-in

  - Типізація даних з форми через Zod → TS гарантує структуру.

- When it's used (короткі практичні сценарії)

  - Будь-які форми: логін, профілі, фільтри.

- Interview Q&A

  - Чому React Hook Form швидший? — Мінімізує ререндери і працює з неконтрольованими інпутами.

- Mini-glossary

  - Resolver: адаптер між схемою і RHF.

---

## 4.9 Продуктивність UI (мемоізація, віртуалізація, lazy/Suspense)

- TL;DR: Мемоізуй лише важке. Віртуалізуй довгі списки. Використовуй `React.lazy` + `Suspense` для код-спліттингу.

- What/Why

  - Менше непотрібних ререндерів і кращий TTI.

- Topic

  - `React.memo`, `useMemo`, `useCallback` — коли доцільно.
  - Віртуалізація: `react-window`/`react-virtual`.
  - Ледаче завантаження: `React.lazy(() => import('./Page'))`.

- Important details

  - Не мемоізуй все підряд — у цього є вартість.

- Code (з пострічковим поясненням)

```tsx
import React from "react";
const Page = React.lazy(() => import("./Page")); // 1

function BigList({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((x) => (
        <li key={x}>{x}</li>
      ))}
    </ul>
  );
}

export function App() {
  return (
    <React.Suspense fallback={<div>Loading…</div>}>
      {" "}
      {/* 2 */}
      <Page /> {/* 3 */}
    </React.Suspense>
  );
}
```

Пояснення:

1. Ледаче підвантаження сторінки. 2) Межа очікування. 3) Компонент завантажується асинхронно.

- React tie-in

  - Віртуалізація списків для продуктивності; lazy — для рідко використовуваних сторінок.

- When it's used (короткі практичні сценарії)

  - Великі таблиці, списки, рідкі маршрути (lazy).

- Interview Q&A

  - Коли доцільна мемоізація? — Коли є реальні повторні важкі обчислення/рендер.

- Mini-glossary

  - Віртуалізація: рендер лише видимої частини списку.

---

## 4.10 Помилки та межі помилок (Error Boundaries)

- TL;DR: Error Boundary ловить помилки рендеру/лайфциклу в піддереві. Використовуй для fallback UI і логування.

- What/Why

  - Стабільність програми: UI не «падає» повністю.

- Topic

  - Класовий компонент із `componentDidCatch` і `getDerivedStateFromError`.
  - Винятки в обробниках подій не ловляться Error Boundary — їх лови локально.

- Important details

  - Розміщуй межі навколо ризикових зон: асинхронні віджети, динамічні портали.

- Code (з пострічковим поясненням)

```tsx
import React from "react";

class Boundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  } // 1
  componentDidCatch(error: any, info: any) {
    console.error(error, info);
  } // 2
  render() {
    if (this.state.hasError) return <div>Something went wrong</div>; // 3
    return this.props.children;
  }
}

function Buggy() {
  throw new Error("boom");
}

export function App() {
  return (
    <Boundary>
      <Buggy />
    </Boundary>
  );
}
```

Пояснення:

1. Перемикаємося у fallback-стан. 2) Логування для діагностики. 3) Показ резервного UI.

- React tie-in

  - Охопи ризикові області, щоб збій не «клацнув» всю сторінку.

- When it's used (короткі практичні сценарії)

  - Інтеграції з зовнішніми віджетами, нестабільні модулі.

- Interview Q&A

  - Що саме ловить Error Boundary? — Помилки рендеру/лайфциклу в піддереві, не події.

- Mini-glossary

  - Fallback UI: запасний інтерфейс при збої.

---

## 4.11 Доступність та інтернаціоналізація (ARIA, фокус, клавіатура)

- TL;DR: Семантичний HTML + ARIA там, де потрібно. Фокус і клавіатурна навігація — обов’язкові. Для i18n — бібліотека + формати дат/чисел.

- What/Why

  - Доступний UI використовують більше людей; це часто і юридична вимога.

- Topic

  - ARIA ролі/атрибути (`role`, `aria-*`), керування фокусом, таб-індекси.
  - i18n: бібліотеки (react-intl, i18next), плейсхолдери, pluralization.

- Important details

  - Не дублюй ARIA, якщо семантика вже є у тега (наприклад, `<button>`).

- Code (з пострічковим поясненням)

```tsx
function AccessibleButton({
  onPress,
  children,
}: {
  onPress: () => void;
  children: React.ReactNode;
}) {
  return (
    <button onClick={onPress} aria-pressed={false}>
      {" "}
      {/* 1 */}
      {children}
    </button>
  );
}
```

Пояснення:

1. Семантична кнопка з ARIA-станом.

- React tie-in

  - Фокус-менеджмент у модалках; оголошення ролей для custom-елементів.

- When it's used (короткі практичні сценарії)

  - Модалки, меню, автодоповнення, мультимова підтримка.

- Interview Q&A

  - Навіщо ARIA? — Допомога технологіям доступності зрозуміти UI.

- Mini-glossary

  - ARIA: набір атрибутів для доступності.

---

## 4.12 Стилізація та темізація (CSS Modules, Tailwind, CSS-in-JS)

- TL;DR: Обери підхід залежно від команди і продукту. Темізація через CSS variables корисна та проста.

- What/Why

  - Контроль над стилями, ізоляція, підтримуваність.

- Topic

  - CSS Modules (локальні класи), Tailwind (утилітарні класи), Emotion/Styled Components (CSS-in-JS).
  - Теми: перемикання через data-атрибути/клас і CSS variables.

- Important details

  - Не змішуй багато підходів одночасно.

- Code (з пострічковим поясненням)

```tsx
// CSS variables приклад
function App() {
  return (
    <div data-theme="dark">
      {" "}
      {/* 1 */}
      <button className="btn">OK</button>
    </div>
  );
}
```

Пояснення:

1. `data-theme` може перемикати набір CSS змінних у :root/селекторі.

- React tie-in

  - Легка зміна теми без перерендеру всіх компонентів.

- When it's used (короткі практичні сценарії)

  - Темний/світлий режими, брендинг.

- Interview Q&A

  - Плюси Tailwind? — Швидкий прототип, консистентність відступів/кольорів.

- Mini-glossary

  - CSS variables: змінні, що наслідуються в DOM-дереві.

---

## 4.13 Анімації (Framer Motion, React Transition Group)

- TL;DR: Анімуй зміни стану/переміщення елементів через бібліотеки; для простих кейсів — CSS transitions.

- What/Why

  - Плавний UX, видимі зв’язки між діями та змінами.

- Topic

  - Framer Motion: декларативні motion-компоненти.
  - RTG: переходи для монтажу/демонтажу елементів.

- Code (з пострічковим поясненням)

```tsx
import { motion } from "framer-motion";

export function FadeIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {" "}
      {/* 1 */}
      {children}
    </motion.div>
  );
}
```

Пояснення:

1. Простий fade-in без вручну прописаних CSS keyframes.

- React tie-in

  - Підсвітка доданих елементів у списку, модалки.

- When it's used (короткі практичні сценарії)

  - Нотифікації, з’явлення карток, перемикання вкладок.

- Interview Q&A

  - Коли обрати CSS vs JS-анімації? — CSS для простих/дешевих ефектів, JS для складних контролів.

- Mini-glossary

  - Motion component: компонент з анімаційними пропами.

---

## 4.14 Тестування React (RTL, моки, асинхронні ефекти)

- TL;DR: Тестуй поведінку через React Testing Library. Мінімум прив’язки до реалізації. Для E2E — Playwright/Cypress.

- What/Why

  - Упевненість у стабільності під час рефакторингу.

- Topic

  - RTL: `render`, `screen`, `userEvent`, `findBy*` для async.
  - Моки мережі; тести хуків через обгортки.

- Important details

  - Тестуй user flows, а не внутрішні стани.

- Code (з пострічковим поясненням)

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "./App";

test("submits form", async () => {
  render(<App />); // 1
  await userEvent.type(screen.getByRole("textbox"), "Ann"); // 2
  await userEvent.click(screen.getByRole("button", { name: /save/i })); // 3
  expect(await screen.findByText(/saved/i)).toBeInTheDocument(); // 4
});
```

Пояснення:

1. Рендеримо компонент. 2–3) Імітуємо дії користувача. 4) Чекаємо асинхронний результат.

- React tie-in

  - Прості API, близькі до реального користувача.

- When it's used (короткі практичні сценарії)

  - Критичні бізнес-флоу: сабміт форм, навігація, умовне відображення.

- Interview Q&A

  - Коли тестувати hooks? — Коли мають нетривіальну логіку/ефекти.

- Mini-glossary

  - RTL: React Testing Library.

---

## 4.15 Антипатерни (надмірний контекст, логіка в ефектах, похідний стан)

- TL;DR: Не клади бізнес-логіку в ефекти; не тримай похідний стан; обмежуй контекст тільки тим, що реально глобальне.

- What/Why

  - Зниження складності, прогнозована поведінка і продуктивність.

- Topic

  - Похідний стан: зберігай джерело істини, інше обчислюй on render/memo.
  - Ефекти для синхронізації, а не для бізнес-логіки.

- Code (з пострічковим поясненням)

```tsx
// Погано: зберігаємо похідний стан
const [a, setA] = useState(0);
const [b, setB] = useState(0);
const [sum, setSum] = useState(0);
useEffect(() => setSum(a + b), [a, b]); // 1

// Краще
const sum2 = a + b; // 2
```

Пояснення:

1. Похідний стан потребує синхронізації і викликає баги.
2. Обчислили значення на рендері — простіше і без розсинхрону.

- React tie-in

  - Тримай джерело істини в одному місці.

- When it's used (короткі практичні сценарії)

  - Суми, лінійні похідні, флаги, що обчислюються з інших прапорів.

- Interview Q&A

  - Чому не зберігати похідний стан? — Ризик розсинхрону і зайві ефекти.

- Mini-glossary

  - Derived state: значення, яке можна розрахувати з іншого стану.

---

## 4.16 Мікрофронтенди (огляд)

- TL;DR: Поділ великої системи на незалежні частини, що розробляються і деплояться окремо. Module Federation — спосіб ділитися кодом під час виконання.

- What/Why

  - Швидші релізи команд, менше зв’язностей.

- Topic

  - Module Federation (Webpack), інші підходи (iframes, build-time federation).

- Important details

  - Встанови чіткі контракти між мікрофронтендами; стеж за версіями спільних бібліотек.

- Code (з пострічковим поясненням)

- (Оглядово, без коду — залежить від білду)

- React tie-in

  - Ділитися спільними компонентами/модулями між SPA.

- When it's used (короткі практичні сценарії)

  - Величезні платформи з багатьма командами і незалежними доменами.

- Interview Q&A

  - Плюси/мінуси мікрофронтендів? — Плюси: незалежність; мінуси: складність складання/навігації.

- Mini-glossary

  - Module Federation: динамічний імпорт модулів між застосунками під час виконання.
