## 1.0 Strict mode і базова модель виконання

У строгому режимі JavaScript поводиться передбачуваніше: забороняє «тихі» помилки, фіксить дивні місця з `this`, не дозволяє неявні глобальні змінні. Вмикається директивою 'use strict' на початку файлу чи функції. Рекомендується завжди мислити у strict-парадигмі (сучасні бандлери/ESM фактично дають подібну строгость автоматично).

```js
"use strict";
function f() {
  x = 10; // ReferenceError у strict, раніше створило б неявну глобальну змінну
}
try {
  f();
} catch (e) {
  console.log(e.name);
}

function g() {
  console.log(this); // undefined у strict (раніше було global об'єкт)
}
g();
```

Що запам’ятати: не покладайся на неявні глобальні змінні; у функціях без контексту `this` у strict — `undefined`. Краще завжди явно передавати контекст або використовувати стрілкові функції для лексичного `this`.

---

## 1.1 Синтаксис і типи даних

- TL;DR: У JS є примітиви і об'єкти. Використовуй строге порівняння `===` і явне приведення типів.

- What/Why (коротко: що це і навіщо)

  - Розуміння типів і порівняння зменшує кількість неочікуваних багів у логіці умов, форм і роботи з API.

- Topic (повне пояснення)

  - Примітиви: string, number, boolean, null, undefined, symbol, bigint. Усе інше — об'єкти (включно з масивами та функціями).
  - `===` не приводить типи; `==` може таємно їх міняти (coercion). Краще завжди `===`.
  - Явне приведення: `Number('42')`, `String(5)`, `Boolean(value)` — передбачувано і зрозуміло при рев'ю.
  - Перевірка типів: `typeof`, `Array.isArray`, для `null` — окремо перевіряти, бо `typeof null === 'object'` (історична особливість).

  Копіювання і рівність:

  - Примітиви порівнюються за значенням; об'єкти — за посиланням. Два однакові об'єкти `{} === {}` → false.
  - Неглибока копія: об'єкти/масиви через `...` (spread) або `Array.slice()`. Глибока копія: `structuredClone(obj)` (де підтримується) або бібліотеки.
  - JSON.parse/stringify для глибокої копії має обмеження (дата/функції/Map/Set втрачаються).

- Important details

  - `NaN` — «не число», але тип number; перевіряй через `Number.isNaN()`.
  - Falsy: `0, '', false, null, undefined, NaN`.
  - `Object.is(a, b)` корисний для відмінностей `-0` vs `0` і `NaN` порівнянь.

- Code (з пострічковим поясненням)

```js
const a = 0;
const b = false;
console.log(a == b); // 1
console.log(a === b); // 2

const s = "42";
console.log(Number(s)); // 3
console.log(+s); // 4
console.log(String(5)); // 5
console.log(Boolean("")); // 6

console.log(typeof null); // 7
console.log(Array.isArray([])); // 8
console.log(Number.isNaN(NaN)); // 9

// Рівність об'єктів і копіювання
const o1 = { n: 1 };
const o2 = { n: 1 };
console.log(o1 === o2); // 10 → false (різні посилання)
const o3 = { ...o1 }; // 11 неглибока копія
console.log(structuredClone(o1)); // 12 глибока копія (де підтримується)
```

Пояснення:

1. `==` приводить типи: `0` → `false` → true. 2) `===` порівнює тип і значення → false.
2. Явне перетворення рядка в число → 42. 4) Унарний плюс теж перетворює → 42.
3. Число в рядок → `'5'`. 6) Порожній рядок falsy → `false`.
4. Історичний баг: `typeof null` дає `'object'`. 8) Перевірка масиву → true.
5. Перевірка «не числа» → true. 10) Об'єкти рівні лише за посиланням. 11–12) Приклади копіювання.

- React tie-in (де доречно; коротко)

  - Робота з пропсами/формами: конвертуй значення явно перед обчисленнями.
  - Умовний рендер: уникай `||` там, де `0` або `''` валідні; краще `??`.

- When it's used (короткі практичні сценарії)

  - Нормалізація даних форми перед валідацією/відправкою.
  - Перевірки від API: відрізняти відсутність значення (`null/undefined`) від «порожнього» (0/``).

- Interview Q&A

  - Чим відрізняється `==` від `===`? — `===` без приведення типів, безпечніше за замовчуванням.
  - Як перевірити, що значення — масив? — `Array.isArray(value)`.
  - Як перевірити `NaN`? — `Number.isNaN(value)`.

- Mini-glossary
  - Coercion: неявне приведення типів.
  - Falsy: значення, що стають `false` у булевому контексті.
  - `Object.is`: точніше порівняння для `NaN` і знаку нуля.

---

## 1.2 Змінні й область видимості (var/let/const, TDZ)

- TL;DR: Використовуй `const` за замовчуванням, `let` коли треба переназначити, уникай `var`. TDZ — не звертайся до `let/const` до оголошення.

- What/Why

  - Правильний вибір оголошення зменшує баги й робить код передбачуваним.

- Topic

  - `var` має функціональну область видимості і hoisting; часто створює неочевидні помилки.
  - `let/const` — блочна область видимості. `const` не дозволяє переназначення змінної (але об'єкти можна мутувати).
  - TDZ (Temporal Dead Zone): звернення до `let/const` до фактичного оголошення викликає помилку.

- Important details

  - Ініціалізуй змінні ближче до місця використання.
  - Уникай повторних оголошень і змінних з надто широкою областю видимості.

- Code (з пострічковим поясненням)

```js
{
  console.log(x); // 1
  let x = 10; // 2
}

function demo() {
  // 3
  for (var i = 0; i < 2; i++) {}
  console.log(i); // 4
}
demo();

const cfg = { apiUrl: "/api" }; // 5
cfg.apiUrl = "/v2"; // 6
// cfg = {}                     // 7
```

Пояснення:

1. TDZ: звернення до `x` до оголошення кидає ReferenceError.
2. `let` має блочну область — існує лише всередині `{}`.
3. `var` — функціональна область. 4) `i` доступна поза циклом (після for).
4. `const` фіксує посилання на об'єкт. 6) Властивості можна міняти.
5. Переприсвоєння змінній `const` заборонено (помилка).

- React tie-in

  - Стан/props не переназначай напряму; працюй через `setState`/`setX`.
  - Уникай `var` в компонентах/хуках для передбачуваної області видимості.

- When it's used (короткі практичні сценарії)

  - Оголошення локальних змінних у межах ефектів/обробників подій.
  - Налаштування конфігів через `const` і лічильників через `let`.

- Interview Q&A

  - Що таке TDZ? — Період між початком області та оголошенням `let/const`, де звернення заборонене.
  - Чому не варто використовувати `var`? — Має hoisting і функціональну область, легше зробити помилку.
  - Чи можна міняти об'єкт, оголошений через `const`? — Так, але не саме посилання.

- Mini-glossary
  - Hoisting: підняття оголошень на верхівку області видимості (логічне).
  - TDZ: «мертва зона», де змінна існує логічно, але не ініціалізована.
  - Блочна область: видимість в межах `{}`.

---

## 1.3 Функції і контекст виконання (this, call/apply/bind, замикання, IIFE)

- TL;DR: `this` залежить від способу виклику. У стрілкових функцій немає свого `this`. Замикання зберігає доступ до змінних. IIFE — миттєве виконання для локальної області.

- What/Why

  - Розуміння контексту `this` і замикань допомагає писати передбачувані обробники і чисті утиліти.

- Topic

  - `this` визначається під час виклику: як метод об'єкта, як звичайна функція, через `call/apply/bind` або у конструкторі з `new`.
  - Стрілкові функції не мають власного `this`; беруть його з оточення (lexical this).
  - Замикання: функція, що «пам'ятає» змінні з зовнішньої області.
  - IIFE: функція, яка викликається одразу після оголошення для створення локальної області.

- Important details

  - `call` передає аргументи по одному; `apply` — масивом; `bind` повертає нову «прив'язану» функцію.
  - У стрілкових функцій немає `arguments` та `prototype`.

- Code (з пострічковим поясненням)

```js
const user = {
  name: "Ann",
  greet() {
    console.log("Hi, " + this.name);
  }, // 1
};

const fn = user.greet; // 2
fn(); // 3
fn.call({ name: "Joe" }); // 4

const bound = fn.bind({ name: "Kim" }); // 5
bound(); // 6

const obj = {
  name: "Sam",
  arrow: () => console.log(this && this.name), // 7
  method() {
    const arrow = () => console.log(this.name);
    arrow();
  }, // 8
};
obj.arrow();
obj.method();
```

Пояснення:

1. Метод використовує `this` з об'єкта `user`.
2. Витягли посилання на метод. 3) Звичайний виклик — `this` = `undefined` (або global у non-strict) → `undefined` ім'я.
3. Примусово задали `this` через `call` → `Joe`.
4. `bind` створює нову функцію з фіксованим `this`. 6) Виведе `Kim`.
5. Стрілка бере `this` з лексичного оточення (не з `obj`), тут це не `obj`.
6. Усередині методу стрілка успадковує `this` методу → `Sam`.

- Code (замикання та IIFE)

```js
function createCounter() {
  let count = 0; // 1
  return () => ++count; // 2
}
const inc = createCounter(); // 3
console.log(inc()); // 4
console.log(inc()); // 5

(function () {
  // 6
  const secret = "local";
  console.log(secret);
})();
```

Пояснення:

1. Локальна змінна недоступна ззовні.
2. Повертаємо стрілку, яка «пам'ятає» `count` — це замикання.
3. Створили окремий лічильник. 4–5) `1`, потім `2` — стан зберігається.
4. IIFE: власна локальна область, змінні не засмічують глобальну.

- React tie-in

  - Обробники подій часто потребують правильного `this` — у функціональних компонентах це прості функції, але у класових — `this` треба біндити.
  - Замикання важливі в хуках: колбеки «бачать» значення на момент створення; слідкуй за залежностями.

- When it's used (короткі практичні сценарії)

  - Прив'язка контексту для колбеків у класових компонентах або в утилітах.
  - Інкапсуляція стану в фабричних функціях через замикання (лічильники, кеші).

- Interview Q&A

  - Чим `call` відрізняється від `apply`? — Формою передачі аргументів (по одному vs масив).
  - Що таке замикання? — Функція, що має доступ до змінних зовнішньої області після завершення цієї області.
  - У чому особливість `this` у стрілкових функцій? — Вони не мають власного `this`, беруть його з оточення.

- Mini-glossary
  - Lexical this: `this`, взятий із зовнішнього контексту під час створення функції.
  - Замикання (closure): збережений доступ до змінних зовнішньої області.
  - IIFE: Immediately Invoked Function Expression — функція, що викликається одразу.

---

## 1.4 Прототипи та об'єктна модель (класи, getter/setter)

- TL;DR: У JS об'єкти наслідують через прототипний ланцюжок. Класи — синтаксичний цукор над прототипами. Getters/setters керують доступом до властивостей.

- What/Why (коротко: що це і навіщо)

  - Розуміння прототипів пояснює, як працює наслідування та методи об'єктів.

- Topic (повне пояснення)

  - Кожен об'єкт має прихований `[[Prototype]]` (доступ через `Object.getPrototypeOf`), з якого «успадковує» властивості.
  - Функції-конструктори та `class` створюють прототипний зв'язок між екземплярами і `ClassName.prototype`.
  - Getters/setters дозволяють обчислюваний доступ і валідацію при читанні/записі.

  Дескриптори властивостей (коротко):

  - `enumerable`, `configurable`, `writable` керують переліком/зміною/записом.

```js
const o = {};
Object.defineProperty(o, "x", { value: 1, writable: false, enumerable: false });
console.log(Object.getOwnPropertyDescriptor(o, "x")); // { value:1, writable:false, enumerable:false, configurable:false }
```

- Important details

  - `for..in` іде по власних + успадкованих перераховуваних ключах; `Object.keys` — тільки власні.
  - У класів є `super` для виклику батьківських методів.
  - Приватні поля класів починаються з `#` (доступні лише всередині класу).

- Code (з пострічковим поясненням)

```js
// Прототипний ланцюжок
const base = {
  kind: "base",
  hello() {
    return "hi";
  },
}; // 1
const child = Object.create(base); // 2
child.name = "child"; // 3
console.log(child.kind, child.hello()); // 4

// Класи, getter/setter, приватне поле
class Person {
  // 5
  #age = 0; // 6
  constructor(name, age) {
    // 7
    this.name = name;
    this.age = age; // 8 (йде через setter)
  }
  get age() {
    return this.#age;
  } // 9
  set age(v) {
    // 10
    if (v < 0) throw new Error("age<0");
    this.#age = v;
  }
  get info() {
    return `${this.name} (${this.#age})`;
  } // 11
}

class Employee extends Person {
  // 12
  constructor(name, age, role) {
    super(name, age); // 13
    this.role = role;
  }
  get info() {
    // 14
    return super.info + " — " + this.role;
  }
}

const e = new Employee("Ann", 25, "Dev"); // 15
console.log(e.info); // 16
```

Пояснення:

1. Об'єкт із методом у прототипі. 2) `child` наслідує від `base`.
2. Власна властивість `name`. 4) Доступ до успадкованого поля і методу.
3. Оголошення класу. 6) Приватне поле доступне лише всередині класу.
4. Конструктор ініціалізує ім'я та вік. 8) Виклик сеттера `age`.
5. Getter повертає приватне поле. 10) Setter валідує вік.
6. Обчислюваний getter. 12) Наслідування класу.
7. `super` викликає конструктор батька. 14) Перевизначення getter з `super`.
   15–16. Створення екземпляра і виклик обчислюваного getter.

- React tie-in (де доречно)

  - У React зазвичай не використовують класи моделей; достатньо plain-об'єктів/типів. Getters корисні для похідних значень у позакомпонентній логіці.

- When it's used (короткі практичні сценарії)

  - Створення простих доменних сутностей поза React-компонентами.
  - Інкапсуляція валідації через setters.

- Interview Q&A

  - Що таке прототипний ланцюжок? — Механізм пошуку властивостей у `[[Prototype]]`.
  - Чим `class` відрізняється від функції-конструктора? — Це синтаксичний цукор над прототипами.
  - Для чого getters/setters? — Контроль читання/запису і обчислювані властивості.

- Mini-glossary

  - `[[Prototype]]`: внутрішнє посилання на «батька» об'єкта.
  - Getter/Setter: методи-доступори для поля.
  - `super`: доступ до батьківських методів у класі.

---

## 1.5 Ітерації й колекції (iterable, for..of vs for..in, Map/Set)

- TL;DR: `for..of` ітерує значення ітерабельних структур, `for..in` — ключі об'єкта (в т.ч. успадковані). Для ключ-значення краще `Map`, для унікальних значень — `Set`.

- What/Why

  - Правильний вибір циклу і структури даних робить код простішим і швидшим.

- Topic

  - Ітерабельні об'єкти мають метод `Symbol.iterator` і працюють з `for..of`, spread `...`, `Array.from`.
  - `for..in` обходить перераховувані ключі (включно з успадкованими) — не підходить для масивів.
  - `Map` зберігає пари ключ-значення (будь-які типи ключів), `Set` — унікальні значення.
  - WeakMap/WeakSet: ключі тільки об'єкти, не заважають GC — зручно для кешів/метаданих.
  - Async ітерація: `for await...of` для асинхронних джерел (стріми, курсори).

- Important details

  - Для масивів використовуйте `for..of` або методи масивів (`map/filter/reduce`).
  - Порядок в `Map`/`Set` зберігає порядок вставки.

- Code (з пострічковим поясненням)

```js
// WeakMap кеш без витоків
const cache = new WeakMap();
function compute(obj) {
  if (cache.has(obj)) return cache.get(obj);
  const v = heavy(obj);
  cache.set(obj, v);
  return v;
}

// Async iterator приклад (умовний)
async function* gen() {
  yield 1;
  yield 2;
}
(async () => {
  for await (const x of gen()) console.log(x);
})();
```

Пояснення:

1–2. `for..in` — індекси, `for..of` — значення. 3–5) `Map` для будь-яких ключів.
6–7) `Set` прибирає дублікати. 8–11) Об'єкт із власним ітератором працює зі spread.

- React tie-in

  - Рендер списків через `map`; ключі елементів мають бути стабільними (не індекси).

- When it's used (короткі практичні сценарії)

  - Кеш (Map) за складним ключем (наприклад, об'єкт параметрів).
  - Унікалізація значень (Set), побудова списків без дублікатів.

- Interview Q&A

  - Коли використовувати `for..of` vs `for..in`? — `for..of` для значень ітерабельних, `for..in` для ключів об'єкта.
  - Навіщо `Map`/`Set`? — Зручні колекції: пари ключ-значення і унікальні значення.
  - Що таке ітерабельний об'єкт? — Має `Symbol.iterator` і працює з `for..of`.

- Mini-glossary

  - Ітерабельність: контракт `Symbol.iterator` для обходу значень.
  - `Map`: асоціативна колекція ключ-значення.
  - `Set`: колекція унікальних значень.

---

## 1.6 Модулі (ESM: import/export, dynamic import)

- TL;DR: Використовуй ESM (`import`/`export`). Експортуй те, що треба ззовні, імпортуй лише потрібне. Динамічний імпорт для лінивого завантаження.

- Topic

  - ESM підтримує іменовані експорти та `default`. Експорти — «живі зв'язки» (live bindings).
  - Динамічний імпорт `import()` повертає проміс і дозволяє code-splitting.
  - Кругові імпорти: уникай взаємних залежностей (винеси спільні типи/утиліти окремо).
  - Top‑level await (огляд): дозволяє `await` у модулі без функції (враховуй порядок ініціалізації).

- Important details

  - Іменовані імпорти мають збігатися за назвами: `import { sum } from './math.js'`.
  - У файлі може бути лише один `export default`.
  - Tree‑shaking: віддавай перевагу ESM імпортам і уникай побічних ефектів у модулях.
  - `package.json` → `"sideEffects": false` (якщо модуль без сайд-ефектів) покращує видалення мертвого коду. Поля `module`/`main` впливають на вибір ESM/CJS бандлером.

- Code (з пострічковим поясненням)

```js
// file: math.js
export function sum(a, b) {
  return a + b;
} // 1
export const PI = 3.14; // 2
export default function square(x) {
  return x * x;
} // 3

// file: main.js
import square, { sum, PI } from "./math.js"; // 4
console.log(sum(2, 3), PI); // 5
console.log(square(4)); // 6

// dynamic import (lazy)
async function loadHeavy() {
  // 7
  const mod = await import("./heavy.js"); // 8
  return mod.run(); // 9
}
```

Пояснення:

1–2. Іменовані експорти. 3) Експорт за замовчуванням. 4. Імпорт: `default` + іменовані. 5–6) Використання імпортів.
7–9) Динамічний імпорт для лінивого завантаження коду.

- React tie-in

  - Ледаче завантаження компонентів через `React.lazy(() => import('./Cmp'))` і `Suspense`.

- When it's used (короткі практичні сценарії)

  - Виділення спільних утиліт у модулі; повторне використання між екранaми.
  - Ледаче завантаження рідко використовуваних сторінок/виджетів.

- Interview Q&A

  - Різниця між іменованим і `default` експортом? — Іменованих може бути багато, `default` один.
  - Для чого `import()`? — Динамічне, ліниве завантаження модулів.
  - Що таке live bindings? — Імпорт відображає актуальне значення експорту без копії.

- Mini-glossary

  - ESM: стандартна система модулів у JS (ECMAScript Modules).
  - `export default`: основний експорт модуля (один на файл).
  - Dynamic import: імпорт під час виконання, повертає проміс.

---

## 1.7 Асинхронність і модель виконання (event loop, promises, async/await)

- TL;DR: Події виконуються чергами. Microtasks (Promises) виконуються раніше за macrotasks (setTimeout). `async/await` — зручний синтаксис над Promises.

- What/Why

  - Розуміння порядку виконання допомагає уникати «дивних» логів і гонок даних.

- Topic

  - Event loop керує виконанням: call stack → microtask queue (Promises) → macrotask queue (таймери, I/O).
  - Promise має стани: pending → fulfilled/rejected. `then/catch/finally` обробляють результат.
  - `async/await` чекає Promise без вкладених колбеків; помилки ловимо через `try/catch`.

- Important details

  - Порядок: sync → microtasks → macrotasks.
  - Паралельно виконувати незалежні запити — через `Promise.all`.
  - Скасування запитів: `AbortController`.

- Code (з пострічковим поясненням)

```js
console.log("A"); // 1 (sync)
setTimeout(() => console.log("B"), 0); // 2 (macrotask)
Promise.resolve().then(() => console.log("C")); // 3 (microtask)
console.log("D"); // 4 (sync)
```

Пояснення:

1. Спочатку синхронні A і D. Далі microtasks → C. Потім macrotasks → B. Порядок: A, D, C, B.

- Code (послідовність vs паралельність)

```js
async function sequential(a, b) {
  const x = await a(); // 1 (чекаємо)
  const y = await b(); // 2 (чекаємо після 1)
  return x + y;
}

async function parallel(a, b) {
  const [x, y] = await Promise.all([a(), b()]); // 3 (одночасно)
  return x + y;
}
```

Пояснення:

1–2. Послідовно повільніше. 3) Паралельно швидше для незалежних задач.

- Code (AbortController)

````js
const controller = new AbortController();
const { signal } = controller; // 1

async function load() {
  try {
    const res = await fetch("/api/data", { signal }); // 2
    return await res.json();
  } catch (e) {
    if (e.name === "AbortError") console.log("aborted"); // 3
    else throw e;
  }
}

controller.abort(); // 4 — скасувати

// Code (комбінатори Promises, queueMicrotask)

```js
// Комбінатори
const p1 = Promise.resolve(1);
const p2 = Promise.reject(new Error("fail"));

Promise.all([p1]) // 1 — всі успішні, інакше reject
  .then(([x]) => console.log(x));

Promise.allSettled([p1, p2]) // 2 — завжди resolve зі статусами
  .then((r) => console.log(r));

Promise.race([p1, new Promise((r) => setTimeout(() => r(2), 0))]) // 3 — перший завершений
  .then(console.log);

Promise.any([p2, p1]) // 4 — перший успішний, інакше AggregateError
  .then(console.log)
  .catch((e) => console.log(e.name));

// queueMicrotask: виконати після поточного стека, перед macrotask
console.log("A");
queueMicrotask(() => console.log("micro")); // 5
setTimeout(() => console.log("timeout"), 0); // 6
console.log("B");
````

Пояснення:

1. `all` — відхиляється на першій помилці. 2) `allSettled` повертає масив результатів/причин.
2. `race` — перший settled. 4) `any` — перший fulfilled або `AggregateError`.
   5–6) Порядок: sync → microtask → macrotask (timeout).

- React tie-in

  - У `useEffect` абортуй запити при анмаунті; або використовуй AbortController/бібліотеки з вбудованим скасуванням.

- When it's used (короткі практичні сценарії)

  - Конкурентні запити для швидшого завантаження сторінки.
  - Скасування застарілих запитів при зміні фільтрів/переході між сторінками.

- Interview Q&A

  - Що виконується раніше: microtask чи macrotask? — Microtask.
  - Чим відрізняється `then` від `await`? — Синтаксис; `await` робить код лінійним, під капотом — Promises.
  - Навіщо `Promise.all`? — Виконати незалежні задачі паралельно.

- Mini-glossary

  - Microtask/Macrotask: черги виконання в event loop.
  - AbortController: API для скасування асинхронних операцій.

---

## 1.8 Робота з помилками (try/catch/finally, async помилки, власні помилки)

- TL;DR: Лови помилки там, де можеш їх обробити. Для async — `try/catch` або `.catch`. Створюй власні класи помилок для чіткості.

- What/Why

  - Керовані помилки допомагають показати корисні повідомлення і не «ламати» UI.

- Topic

  - `try/catch/finally` для синхронного і асинхронного коду з `await`.
  - Власні помилки — класи, що наслідують `Error`.

- Important details

  - Не ковтай помилки; логуй або проброшуй далі.
  - У `finally` розчищай ресурси (аборт, таймери, блокування).

- Code (з пострічковим поясненням)

```js
class ValidationError extends Error {
  // 1
  constructor(msg) {
    super(msg);
    this.name = "ValidationError";
  }
}

function mustBePositive(n) {
  // 2
  if (n <= 0) throw new ValidationError("n must be > 0");
  return n;
}

async function loadSafe(api) {
  // 3
  try {
    const data = await api(); // 4
    mustBePositive(data.count); // 5
    return data;
  } catch (e) {
    if (e instanceof ValidationError) return { error: e.message }; // 6
    throw e; // 7
  } finally {
    // cleanup
  }
}
```

Пояснення:

1. Власний тип помилки. 2) Перевірка даних кидає помилку. 3–4) `await` усередині `try`. 5) Валідація. 6) Відомі помилки перетворюємо у дружній результат. 7) Невідомі — проброс.

- React tie-in

  - Лови помилки в async обробниках і показуй дружні повідомлення; на рівні UI — Error Boundary для рендер-помилок.

- When it's used (короткі практичні сценарії)

  - Валідація даних після запиту; перетворення технічної помилки в читабельну для користувача.

- Interview Q&A

  - Де краще ловити помилки? — Там, де можна відновитися або показати користувачу зрозумілий стан.
  - Як обробити помилку з `await`? — Через `try/catch`.
  - Навіщо власні класи помилок? — Типізований контроль і точні гілки обробки.

- Mini-glossary

  - Error Boundary: компонент, що ловить помилки рендерингу у React.
  - Валідація: перевірка даних на відповідність правилам.

---

## 1.9 Метапрограмування (огляд: Proxy, Reflect)

- TL;DR: `Proxy` дозволяє перехоплювати операції над об'єктом, `Reflect` — набір низькорівневих утиліт для роботи з властивостями.

- What/Why

  - Дає контроль над доступом/записом/переліком властивостей — корисно для валідації, логування, кешування.

- Topic

  - `new Proxy(target, handlers)` з «пастками» (`get`, `set`, `has`, `deleteProperty`...).
  - `Reflect.get/set/has` — безпечні базові операції, часто всередині пасток.

- Important details

  - Не зловживати: Proxy може вплинути на продуктивність і ускладнити дебаг.

- Code (з пострічковим поясненням)

```js
const user = { name: "Ann", age: 20 };
const guarded = new Proxy(user, {
  set(target, prop, value) {
    // 1
    if (prop === "age" && value < 0) throw new Error("age<0");
    return Reflect.set(target, prop, value); // 2
  },
  get(target, prop, receiver) {
    // 3
    const val = Reflect.get(target, prop, receiver);
    if (typeof val === "function") return val.bind(target);
    return val;
  },
});

guarded.age = 25; // 4
// guarded.age = -1; // 5 (кине помилку)
```

Пояснення:

1. Пастка `set` валідовує запис. 2) Делегуємо справжній запис через `Reflect.set`. 3) `get` повертає значення; методи біндимо на таргет.
2. Працює штатно. 5) Невалідне значення кидає помилку.

- React tie-in

  - Рідко потрібно у React-компонентах; частіше — у шарі даних або dev-утилітах (логування доступу).

- When it's used (короткі практичні сценарії)

  - Проксі-валидація конфігів або DTO перед відправкою.

- Interview Q&A

  - Для чого Proxy? — Перехоплення операцій для валідації/логування/кешу.
  - Навіщо Reflect? — Стандартизовані низькорівневі операції з об'єктами.

- Mini-glossary

  - Пастка (trap): перехоплювач операції в Proxy.
  - DTO: об'єкт передачі даних між шарами.

---

## 1.10 Числа, дати, регулярні вирази (практично)

- TL;DR: Обережно з плаваючою точкою. Для форматування чисел/дат — `Intl.*`. Регулярні вирази — для пошуку/перевірки рядків.

- What/Why

  - Правильне форматування та перевірка рядків потрібні в UI і валідації форм.

- Topic

  - Похибка чисел: `0.1 + 0.2 !== 0.3`. Округлення через `toFixed`, математичні обчислення — з урахуванням точності.
  - `Intl.NumberFormat`, `Intl.DateTimeFormat` для локалізованого відображення.
  - RegExp: літерал `/pattern/flags`, методи `test`, `match`, групи.

  Відносний час:

  - `Intl.RelativeTimeFormat`.

```js
const rtf = new Intl.RelativeTimeFormat("uk", { numeric: "auto" });
console.log(rtf.format(-1, "day")); // вчора
```

- Important details

  - Уникай строгої рівності для дійсних чисел; використовуй поріг (epsilon).
  - Дата/час: зберігай у UTC (`toISOString`), відображай локалізовано.

- Code (з пострічковим поясненням)

```js
// Похибка чисел
console.log(0.1 + 0.2); // 1 → 0.30000000000000004
const isEqual = Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON; // 2
console.log(isEqual); // 3 → true

// Форматування числа і дати
const nf = new Intl.NumberFormat("uk-UA", {
  style: "currency",
  currency: "UAH",
}); // 4
console.log(nf.format(1234.56)); // 5 → "1 234,56 ₴"

const df = new Intl.DateTimeFormat("uk-UA", {
  dateStyle: "medium",
  timeStyle: "short",
}); // 6
console.log(df.format(new Date())); // 7

// RegExp перевірка email (спрощено)
const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 8
console.log(re.test("user@example.com")); // 9 → true
console.log("a1b2".match(/\d+/g)); // 10 → ['1','2']
```

Пояснення:

1. Похибка подвійної точності. 2) Поріг порівняння з EPSILON. 3) Коректна перевірка.
   4–5) Локалізоване форматування валюти. 6–7) Форматована дата/час.
   8–10) Проста перевірка email і пошук цифр у рядку.

Додатково (іменовані групи, погляди):

```js
const m = "2025-09-01".match(/(?<y>\d{4})-(?<m>\d{2})-(?<d>\d{2})/); // 11
console.log(m?.groups?.y, m?.groups?.m, m?.groups?.d);

// Позитивний lookahead: має містити цифру
console.log(/^(?=.*\d).{3,}$/.test("a1b")); // 12 → true
```

Пояснення:

11. Іменовані групи `(?<name>...)` зчитуються через `match().groups`. 12) Lookahead перевіряє умову без споживання символів.

---

## 1.12 Безпека (JS-рівень — коротко)

- TL;DR: Не використовуй `eval`/`new Function` для виконання рядків як коду. Екрануй/перевіряй дані, що приходять іззовні.

- Important details

  - `eval`, `Function` відкривають шлях для XSS і ламають оптимізації.
  - Довіряй лише даним, які пройшли валідацію/санітизацію; ніколи не вставляй сирий HTML у DOM.

- Code (з пострічковим поясненням)

```js
// Погано — виконує довільний код
// const fn = new Function("x", "return " + userInput);

// Добре — парсимо без виконання коду
const safe = JSON.parse('{"a":1}'); // 1
document.createTextNode(String(safe.a)); // 2 — вставляємо як текст
```

Пояснення:

1. JSON.parse парсить структуру, а не код. 2) Створюємо текстовий вузол замість небезпечного HTML.
