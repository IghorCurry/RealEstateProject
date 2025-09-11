## 3.0 Strict setup і базові правила

TypeScript розкривається повністю лише зі строгими прапорцями. Увімкни їх у tsconfig і звикай до безпечних практик.

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "useDefineForClassFields": true
  }
}
```

Коротко: уникай `any`, звужуй типи (narrowing), поважай `null/undefined`, роби опційні властивості «точними», не звертайся до індексів без перевірки.

---

## 3.1 Основи типізації (примітиви, об'єктні типи, union/intersection, any/unknown/never)

- TL;DR: Типи роблять код передбачуваним. Уникай `any`; використовуй `unknown` для безпечних значень і `never` для неможливих випадків.

- What/Why

  - Типи ловлять помилки до виконання, полегшують автодоповнення та рефакторинг.

- Topic

  - Примітиви: `string`, `number`, `boolean`, `bigint`, `symbol`, `null`, `undefined`.
  - Об'єктні типи: літерали об'єктів/масивів, функції, інтерфейси, type alias.
  - Union `A | B`: одне з кількох. Intersection `A & B`: поєднання властивостей.
  - `any`: відключає перевірку — небезпечно. `unknown`: потрібно звузити перед використанням. `never`: недосяжні гілки/функції, що ніколи не повертають.

- Important details

  - Точні опційні властивості: `exactOptionalPropertyTypes` корисний у конфігу.
  - Використовуй вузькі типи (литеральні, union) замість широких.

- Code (з пострічковим поясненням)

```ts
// Union / narrowing
function formatId(id: string | number) {
  // 1
  if (typeof id === "number") return `#${id}`; // 2
  return id.toUpperCase(); // 3
}

// unknown vs any
function parseJson(json: string): unknown {
  // 4
  return JSON.parse(json);
}

function useData(x: unknown) {
  // 5
  if (typeof x === "object" && x && "id" in x) {
    return (x as { id: number }).id; // 6 (звуження)
  }
  return null;
}

function fail(msg: string): never {
  // 7
  throw new Error(msg);
}
```

Пояснення:

1. Union параметр. 2–3) Звужуємо тип і безпечно працюємо.
2. Повертаємо `unknown`, щоб не довіряти JSON сліпо.
   5–6) Звужуємо через перевірки, потім приводимо тип.
3. `never` — функція не повертає.

- React tie-in

  - Типізація пропсів/стану; уникати `any` у хендлерах і контексті.

- When it's used (короткі практичні сценарії)

  - Безпечний парсинг JSON, API DTO, перевірка форм.

- Interview Q&A

  - `any` vs `unknown`? — `any` вимикає перевірки, `unknown` вимагає звуження.
  - Навіщо `never`? — Для недосяжних гілок/throw.

- Mini-glossary

  - Narrowing: звуження типу через перевірки.
  - DTO: тип об'єкта для передачі даних.

---

3.1 (доповнення) — narrowing, satisfies, as const

```ts
// satisfies: перевірити форму без зміни виведеного типу
const cfg = { mode: "dark", retries: 3 } satisfies {
  mode: "dark" | "light";
  retries: number;
};

// as const: літеральні типи
const ROLES = ["admin", "user"] as const; // readonly ["admin","user"]
function hasRole(r: (typeof ROLES)[number]) {}
hasRole("admin");

// Допоміжний type guard
function isNonEmpty(s: string | null): s is string {
  return !!s && s.length > 0;
}
```

---

## 3.2 Функції та дженерики (параметри, перевантаження, constraints)

- TL;DR: Дженерики дозволяють писати перевикористовувані функції з типобезпекою. Обмеження (`extends`) звужують параметри.

- What/Why

  - Уникаємо дублів і зберігаємо перевірки типів для різних вхідних даних.

- Topic

  - Узагальнені параметри `<T>`, обмеження `T extends ...`, значення за замовчуванням `<T = Default>`.
  - Перевантаження декларацій для різних сигнатур.

- Important details

  - Віддавай перевагу параметрам-дженерикам перед `any`.
  - Уникай надмірних перевантажень — інколи достатньо union-типів.

- Code (з пострічковим поясненням)

```ts
// Generic function with constraint
function prop<T extends object, K extends keyof T>(obj: T, key: K): T[K] {
  // 1
  return obj[key]; // 2
}
const user = { id: 1, name: "Ann" };
const id = prop(user, "id"); // 3: number
// const nope = prop(user, 'age'); // 4: помилка — ключа немає

// Overloads (спрощено)
function len(x: string): number; // 5
function len(x: any[]): number; // 6
function len(x: string | any[]) {
  // 7
  return x.length;
}
```

Пояснення:

1. `K` — ключі `T`; повертаємо тип значення за ключем.
2. Безпечний доступ до властивості.
3. Отримуємо коректний тип `number`.
   5–7) Перевантаження для рядка і масиву, реалізація з union.

- React tie-in

  - Дженерик-компоненти (наприклад, списки), універсальні хуки.

- When it's used (короткі практичні сценарії)

  - Утиліти доступу до властивостей, маппінг типів API у компонентах.

- Interview Q&A

  - Навіщо constraints у дженериках? — Обмежити допустимі типи і покращити інференс.
  - Коли варто використовувати перевантаження? — Коли сигнатури суттєво відрізняються.

- Mini-glossary

  - Constraint: обмеження типу параметра дженерика.
  - Inference: виведення типу компілятором.

---

## 3.4 Утиліти та практики (Partial/Omit/Pick/ReturnType)

- TL;DR: Вбудовані утиліти допомагають трансформувати типи без дублювання. Вибирай мінімально потрібні поля.

- What/Why

  - Швидке формування типів для форм, патчів, API-відповідей.

- Topic

  - `Partial<T>`, `Required<T>`, `Readonly<T>`.
  - `Pick<T, K>`, `Omit<T, K>` — вибрати або виключити поля.
  - `ReturnType<F>`, `Parameters<F>` — витягнути типи з функцій.

- Important details

  - Не зловживати широкими типами; краще складати з частин.

- Code (з пострічковим поясненням)

```ts
interface User {
  id: number;
  name: string;
  email?: string;
}

type NewUser = Omit<User, "id">; // 1
const u1: NewUser = { name: "A", email: "a@x.com" };

type UserPatch = Partial<User>; // 2
const p: UserPatch = { id: 1, email: "b@x.com" };

type FetchResult = ReturnType<() => Promise<User>>; // 3 -> Promise<User>
```

Пояснення:

1. Тип без `id` для створення нового користувача.
2. Часткове оновлення з опційними полями.
3. Отримали тип повернення функції.

- React tie-in

  - Типізація форм (Partial), зрізи даних для компонентів (Pick), пропи з функцій-хуків (ReturnType).

- When it's used (короткі практичні сценарії)

  - CRUD-форми, часткові апдейти, витяг типів із сервісів у компоненти.

- Interview Q&A

  - Pick vs Omit? — Pick вибирає поля, Omit — виключає поля.
  - Коли застосувати Partial? — Для патчів/форм із частковими даними.

- Mini-glossary

  - Utility types: готові шаблони перетворення типів у TS.
  - Optional property: поле, яке може бути відсутнім.

---

## 3.3 Розширені типи (conditional, infer, mapped types)

- TL;DR: Умовні та маповані типи дозволяють будувати типи від інших типів. `infer` дістає тип усередині.

- What/Why

  - Дає змогу автоматично виводити нові типи з існуючих API без ручного дублювання.

- Topic

  - Conditional: `T extends U ? X : Y`.
  - `infer`: витягнути тип параметра у conditional контексті.
  - Маповані типи: `{ [K in keyof T]: ... }` з модифікаторами `+?`, `-?`, `readonly`.

- Important details

  - Будь обережним із розподільними умовними типами на union — може відбуватися поелементний розподіл.

- Code (з пострічковим поясненням)

```ts
type ElementType<T> = T extends (infer U)[] ? U : T; // 1

type A = ElementType<string[]>; // 2 -> string
type B = ElementType<number>; // 3 -> number

type ReadonlyOptional<T> = { readonly [K in keyof T]?: T[K] }; // 4
```

Пояснення:

1. Якщо `T` — масив, дістати елемент, інакше повернути `T`.
   2–3) Перевірка роботи типу.
2. Мапований тип: робимо всі поля опційними та readonly.

- React tie-in

  - Виведення типів пропів з HOC/хукiв, формування readonly-представлень стану.

- When it's used (короткі практичні сценарії)

  - Побудова похідних типів для API-відповідей і форм.

- Interview Q&A

  - Навіщо `infer`? — Витягнути тип усередині іншого типу.

- Mini-glossary

  - Мапований тип: конструювання типу ітерацією по ключам іншого типу.

---

3.3 (доповнення) — discriminated unions та вичерпність

```ts
type Shape =
  | { kind: "circle"; r: number }
  | { kind: "rect"; w: number; h: number };
function area(s: Shape) {
  switch (s.kind) {
    case "circle":
      return Math.PI * s.r ** 2;
    case "rect":
      return s.w * s.h;
    default:
      const _exhaustive: never = s;
      return _exhaustive; // гарантія повноти
  }
}
```

---

## 3.5 Інтерфейси, type-аліаси, злиття декларацій

- TL;DR: `interface` та `type` часто взаємозамінні; інтерфейси підтримують злиття декларацій, а type — потужні композиції (union/conditional).

- What/Why

  - Обираємо інструмент залежно від завдання: розширюваність (`interface`) або виразність (`type`).

- Topic

  - Розширення інтерфейсів `extends`, перетин type через `&`.
  - Declaration merging: багато `interface` з однаковим ім'ям об'єднуються.

- Important details

  - Не зловживати злиттям декларацій у глобальному просторі — складно підтримувати.

- Code (з пострічковим поясненням)

```ts
interface A {
  x: number;
}
interface A {
  y: string;
} // 1 (merge)
const a: A = { x: 1, y: "hi" }; // 2

type B = { x: number } & { y: string }; // 3 (intersection)
```

Пояснення:

1. Декларації одного інтерфейсу поєднуються.
2. Об'єкт повинен містити обидва поля.
3. Те саме через перетин типів.

- React tie-in

  - Опис пропів через `type` або `interface`; обирай за зручністю.

- When it's used (короткі практичні сценарії)

  - Розширення сторонніх типів (module augmentation) або опис складних пропів.

- Interview Q&A

  - Коли інтерфейси кращі за type? — Коли потрібне злиття/розширюваність.

- Mini-glossary

  - Declaration merging: автоматичне об'єднання оголошень одного імені.

---

3.5 (доповнення) — module augmentation (коротко)

```ts
// Додати поле до Window (глобальної області)
declare global {
  interface Window {
    appVersion?: string;
  }
}
window.appVersion = "1.0.0";

// Розширити модуль (приклад)
declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}
```

```ts
// Ambient declaration у .d.ts (приклад)
// types/global.d.ts
declare namespace App {
  interface Config {
    apiUrl: string;
  }
}
```

---

## 3.6 Класи та декоратори (огляд)

- TL;DR: Класи типізуються як у JS з додатковими можливостями TS. Декоратори — експериментальна можливість для анотацій (оглядово).

- What/Why

  - Класи з типовою безпекою; декоратори спрощують повторювані анотації (в майбутніх стандартах).

- Topic

  - Модифікатори доступу `public/protected/private`, параметри конструктора, `abstract`.
  - Декоратори (огляд): @decorator на клас/метод/властивість (залежить від версії і налаштувань).

- Important details

  - Використовуй декоратори лише якщо політика проєкту дозволяє і зрозуміла їхня семантика.

- Code (з пострічковим поясненням)

```ts
abstract class Repo<T> {
  // 1
  abstract findById(id: string): Promise<T | null>; // 2
}

class UserRepo extends Repo<{ id: string }> {
  // 3
  findById(id: string) {
    return Promise.resolve({ id });
  } // 4
}
```

Пояснення:

1. Абстрактний клас задає контракт. 2) Абстрактний метод.
   3–4) Реалізація з конкретним типом.

- React tie-in

  - Рідко потрібні класи/декоратори у функціональному React; тримай бізнес-логіку поза компонентами.

- When it's used (короткі практичні сценарії)

  - Типізовані репозиторії/сервіси поза React.

- Interview Q&A

  - Навіщо `abstract`? — Визначити контракт і змусити реалізації імплементувати методи.

- Mini-glossary

  - Абстрактний клас: базовий клас з нереалізованими методами.

---

## 3.7 Конфігурація та збірка (tsconfig essentials)

- TL;DR: `tsconfig.json` керує компіляцією. Увімкни strict-параметри та налаштуй `module`, `target`, `paths`.

- What/Why

  - Правильний конфіг — стабільні типи і зручні імпорти.

- Topic

  - `strict`, `noImplicitAny`, `strictNullChecks`, `exactOptionalPropertyTypes`.
  - `module`/`target`/`lib`, `moduleResolution`, `baseUrl`, `paths`.

- Important details

  - Для React/Vite часто: module `ESNext`, target `ES2020+`.

- Code (з пострічковим поясненням)

```json
{
  "compilerOptions": {
    "strict": true, // 1
    "noImplicitAny": true, // 2
    "strictNullChecks": true, // 3
    "module": "ESNext",
    "target": "ES2020",
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] } // 4
  }
}
```

Пояснення:

1–3) Увімкнена сувора перевірка типів. 4) Аліаси імпортів.

- React tie-in

  - Зручні імпорти через алиаси, строгі помилки у пропсах/стані.

- When it's used (короткі практичні сценарії)

  - Налаштування проекту на Vite/CRA/Next.

- Interview Q&A

  - Навіщо `strictNullChecks`? — Контроль `null/undefined` у типах.

- Mini-glossary

  - Paths/Aliases: короткі псевдоніми для шляхів імпорту.

---

3.7 (доповнення) — корисні прапорці конфігу

- exactOptionalPropertyTypes: опційні властивості відрізняються від "може бути undefined".
- noUncheckedIndexedAccess: доступ за індексом повертає `T | undefined` — змушує перевіряти.
- useDefineForClassFields: більш сучасна семантика ініціалізації полів класу.

---

## 3.8 Інструменти (tsc, ts-node/tsx, source maps)

- TL;DR: `tsc` компілює, `ts-node/tsx` запускає TS без попередньої збірки, source maps зв'язують JS і TS для дебагу.

- What/Why

  - Комфортний лайв-цикл розробки і дебагінг.

- Topic

  - `tsc --noEmit` для перевірки типів, `tsx file.ts` для запуску.
  - ESM/CJS інтероп: `type`: module, `module`: ESNext; у CJS — `require`/`module.exports`. Змішування потребує шари/білдера.
  - `import type`/`export type` — імпортує лише тип (не попаде в JS), зменшує «протікання» типів у рантайм.
  - Source maps: налаштування `sourceMap: true` для відладки у DevTools.

- Code (з пострічковим поясненням)

```json
{
  "compilerOptions": {
    "sourceMap": true
  }
}
```

Пояснення:

- Карти джерел дозволяють бачити TS-код у дебагері.

```ts
// import type / export type
import type { User } from "./types"; // 1 — тільки тип, не впливає на JS
export type { User };
```

- React tie-in

  - Краще повідомлення про помилки, зручний дебаг компонентів/хукiв.

- When it's used (короткі практичні сценарії)

  - Налагодження логіки стану/форм, сервісних модулів.

- Interview Q&A

  - Навіщо `tsc --noEmit`? — Швидка перевірка типів без генерування JS.

- Mini-glossary

  - Source map: зв'язок між вихідним і згенерованим кодом.

---

## 3.9 Типізація React-коду (props, події, хуки)

- TL;DR: Типізуй пропси через `type`/`interface`. Події мають власні TS-типи. Для хуків — акуратне виведення типів.

- What/Why

  - Зменшує баги у компонентах, дає автодоповнення і підказки.

- Topic

  - Props/children: `React.ReactNode`, узгодження типів із default/optional полями.
  - Події: `React.MouseEvent<HTMLButtonElement>`, `React.ChangeEvent<HTMLInputElement>`.
  - Хуки: `useState<тип>`, `useReducer`, `useRef`, `useCallback`/`useMemo` типізація.

- Important details

  - Уникай `FC` якщо не потрібен `children` за замовчуванням.

- Code (з пострічковим поясненням)

```tsx
import React from "react";

type ButtonProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
};

export function Button({ onClick, children }: ButtonProps) {
  // 1
  return <button onClick={onClick}>{children}</button>; // 2
}

function useCounter(initial = 0) {
  // 3
  const [count, setCount] = React.useState<number>(initial); // 4
  const inc = React.useCallback(() => setCount((c) => c + 1), []); // 5
  return { count, inc };
}
```

Пояснення:

1. Типізовані пропси з подією і дітьми. 2) Використання у JSX.
   3–4) Тип для стану. 5) Колбек має коректний тип без `any`.

- React tie-in

  - Це і є React-розділ; приклади показують базові патерни типізації.

- When it's used (короткі практичні сценарії)

  - Типізація кнопок, інпутів, власних хуків.

- Interview Q&A

  - Як типізувати подію кліку? — `React.MouseEvent<HTMLButtonElement>`.
  - Коли задавати тип для useState? — Коли інференс не працює (початкове значення не дає достатньо інформації).

- Mini-glossary

  - ReactNode: тип для дітей компонента.
  - Inference у хуках: виведення типів на основі початкових значень.

---

3.9 (доповнення) — події форм, refs, forwardRef

```tsx
import React from "react";

function Form() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    console.log(e.target.value);
  const ref = React.useRef<HTMLInputElement>(null); // ref: HTMLInputElement | null
  return (
    <form onSubmit={onSubmit}>
      <input ref={ref} onChange={onChange} />
    </form>
  );
}

type InputProps = React.ComponentProps<"input">;
const FancyInput = React.forwardRef<HTMLInputElement, InputProps>((p, ref) => (
  <input {...p} ref={ref} />
));
```
