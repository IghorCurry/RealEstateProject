# Master Topic Outline — JavaScript · TypeScript · React (Повний гід)

> **PROMPT TO EXPAND LATER (copy/paste into an LLM when ready):**  
> _"Act as a senior front-end interviewer and curriculum designer. Using the outline below, expand **every** bullet without skipping into an exhaustive study guide in Ukrainian. For each subtopic provide: (1) ключові тези «Що знати», (2) **10–20 інтерв'ю-питань** різної складності з короткими відповідями, (3) **2–5 кодових вправ** із очікуваним результатом, (4) типові **антипатерни/пастки**, (5) 3–5 **реальних кейсів** із продакшену, (6) міні-чекліст із best practices. Додай посилання на офіційну документацію. Форматуй чітко, з підзаголовками. Не пропускай жодного пункту."_

---

## 1. JavaScript — Language Core

### 1.1 Синтаксис і типи даних

- Примітиви (string, number, bigint, boolean, null, undefined, symbol)
- Об'єкти та структуровані дані (Object, Array, Date, RegExp, Map/Set, WeakMap/WeakSet)
- Перетворення типів: явне/неявне, valueOf/toString, абстрактні операції
- Порівняння: == vs ===, Object.is, SameValueZero
- Деструктуризація, спред/рест, обчислювані властивості

**🔍 Детальні питання:**

- Що таке змінні var, let, const? У чому різниця?
- Типи даних у JavaScript (примітиви vs об'єкти)
- Приведення типів: неявне та явне
- Оператор `==` vs `===`
- Як працює деструктуризація об'єктів і масивів?
- Що таке Spread і Rest оператори?

### 1.2 Змінні й область видимості

- var / let / const, TDZ
- Область видимості: глобальна, функціональна, блокова
- Hoisting та порядок ініціалізації

**🔍 Детальні питання:**

- Hoisting: як працює з var, let, const?
- Scope (глобальна, функціональна, блочна)
- Що таке Temporal Dead Zone (TDZ)?
- Як працює лексична область видимості?

### 1.3 Функції і контекст виконання

- Оголошення vs вираз функції, стрілкові функції
- this: зв'язування, call/apply/bind, lexical this
- Параметри: за замовчуванням, rest, псевдомасив arguments
- Замикання та IIFE
- Функціональні техніки: каррінг, часткове застосування, композиція

**🔍 Детальні питання:**

- Function Declaration vs Function Expression
- Стрілкові функції та їх особливості
- Callback-функції та Higher-order functions
- IIFE (Immediately Invoked Function Expressions)
- Параметри за замовчуванням
- Що таке замикання? Приклади використання
- Як працює this? В яких випадках він змінюється?
- Як використовувати call/apply/bind?

### 1.4 Прототипи та об'єктна модель

- Ланцюжок прототипів, [[Prototype]]
- Класи: extends, super, приватні поля, статичні члени
- Інкапсуляція через замикання/символи/приватні поля
- Описувачі властивостей, getter/setter, Object.defineProperty

**🔍 Детальні питання:**

- Як працює ланцюжок прототипів?
- Що таке [[Prototype]]?
- Як створити приватні поля в класах?
- Як працюють getter/setter?
- Як використовувати Object.defineProperty?

### 1.5 Ітерації й колекції

- Ітератори та ітеровані об'єкти
- Generators і async generators
- for..of vs for..in, entries/keys/values
- Typed Arrays, ArrayBuffer, DataView

**🔍 Детальні питання:**

- Object.keys(), Object.values(), Object.entries()
- Методи масивів: map, filter, reduce, forEach, find, every, some
- for..of vs for..in - у чому різниця?
- Як створити власний ітератор?

### 1.6 Модулі

- ESM vs CJS, import/export, dynamic import()
- Tree-shaking передумови, sideEffects, "module" vs "main"
- Неймспейси імпорту, top-level await (огляд)

**🔍 Детальні питання:**

- Modules (import/export) - як працюють?
- Що таке tree-shaking?
- Як використовувати dynamic import()?
- ESM vs CommonJS - у чому різниця?

### 1.7 Асинхронність і модель виконання

- Event loop: call stack, task/microtask queues
- Promises: стани, then/catch/finally, chaining, combinators (all/race/allSettled/any)
- async/await: помилки, паралелізм, послідовність
- Скасування: AbortController/AbortSignal
- Таймери, requestAnimationFrame, пост повідомлення

**🔍 Детальні питання:**

- Event Loop: як він працює?
- Call Stack, Queue, Microtasks
- Promises: створення, обробка, помилки
- async/await: як працює всередині?
- Promise.all, Promise.race
- Fetch API: як працює, приклади використання
- Axios vs Fetch - що краще?
- Generators та їх зв'язок з асинхронністю
- Як скасувати асинхронну операцію?

### 1.8 Робота з помилками

- try/catch/finally, Error та підкласи (TypeError, RangeError тощо)
- Кидання/перехоплення, стек трасування
- Стратегії обробки помилок у продакшені (огляд)

**🔍 Детальні питання:**

- Що таке strict mode і для чого він потрібен?
- Як створити власний клас помилки?
- Як обробляти помилки в async/await?
- Стратегії логування помилок

### 1.9 Метапрограмування

- Proxy і Reflect, пастки й інваріанти
- Symbols (в т.ч. well-known), описувачі
- freezе/seal/preventExtensions, Object.\* утиліти

**🔍 Детальні питання:**

- Symbol, Set, Map, WeakMap, WeakSet
- Proxy та Reflect API - для чого використовуються?
- Як створити незмінний об'єкт?

### 1.10 Числа, дати, локалізація

- Number, BigInt, точність плаваючої коми
- Intl.\* API (NumberFormat, DateTimeFormat, PluralRules, ListFormat)
- Регулярні вирази: флаги, групи, lookbehind/lookahead

**🔍 Детальні питання:**

- BigInt - коли використовувати?
- Як працюють регулярні вирази?
- Проблеми з точністю плаваючої коми

### 1.11 Продуктивність та пам'ять

- Збірка сміття, витоки пам'яті, утримувальні посилання
- Деоптимізації у V8 (огляд), приховані класи
- Асимптотика та вибір структур даних

**🔍 Детальні питання:**

- Як працює Garbage Collector?
- Як виявити витоки пам'яті?
- Immutable структури: як створювати?
- Як оптимізувати роботу з масивами?

### 1.12 Безпека (JS-рівень)

- Eval, Function конструктор, небезпеки
- Санітизація рядків/HTML (огляд принципів)

**🔍 Детальні питання:**

- Чому eval() небезпечний?
- Як захиститися від XSS?
- Безпечна обробка користувацького вводу

---

## 2. JavaScript у браузері — Web Platform APIs

### 2.1 DOM і події

- Створення/маніпуляції, живі vs статичні колекції
- Делегування подій, захоплення/спливання, пасивні слухачі
- CustomEvent, IntersectionObserver, MutationObserver

**🔍 Детальні питання:**

- Як працює делегування подій?
- Event capturing vs bubbling
- Як створити CustomEvent?
- Як використовувати IntersectionObserver?

### 2.2 Рендеринг і продуктивність

- Каскад стилів, рефлоу/репейнт/композитинг
- Layout/paint/compose цикл, GPU-акселерація (огляд)
- CSSOM, getComputedStyle, вимірювання

**🔍 Детальні питання:**

- Що таке reflow та repaint?
- Як оптимізувати рендеринг?
- Як вимірювати елементи DOM?

### 2.3 Мережа й стріми

- fetch: запити, заголовки, тіло, стрімінг
- CORS: preflight, credentials mode
- HTTP кешування на клієнті, Service Worker Cache API
- WebSockets, SSE, Streams API

**🔍 Детальні питання:**

- Як налаштувати CORS?
- Як працює HTTP кешування?
- WebSockets vs Server-Sent Events
- Як використовувати Service Worker?

### 2.4 Сховище

- Cookies (SameSite/Secure/HttpOnly — огляд), localStorage/sessionStorage
- IndexedDB: транзакції, курсори, ключові діапазони

**🔍 Детальні питання:**

- localStorage vs sessionStorage
- Як працюють cookies?
- Як використовувати IndexedDB?

### 2.5 Воркери та PWA

- Web Workers, SharedWorkers, Worklets
- Service Worker: життєвий цикл, офлайн-стратегії
- Web App Manifest та інсталяція

**🔍 Детальні питання:**

- Як створити Web Worker?
- Як налаштувати PWA?
- Service Worker - життєвий цикл

### 2.6 Інші Web API

- Clipboard, Fullscreen, Notification, Geolocation, Permissions
- postMessage і безпечна взаємодія між вікнами/iframe
- Security: CSP, Trusted Types, ізоляція origin

**🔍 Детальні питання:**

- Як працює Clipboard API?
- Як запитати дозволи користувача?
- postMessage - безпечна комунікація

### 2.7 Web Components (огляд)

- Custom Elements, Shadow DOM, слоти, стилізація тіней

**🔍 Детальні питання:**

- Як створити Custom Element?
- Shadow DOM - для чого використовується?

---

## 3. TypeScript — Type System & Tooling

### 3.1 Основи типізації

- Примітиви, об'єктні типи, літеральні типи
- Об'єднання/перетин (union/intersection), типи кортежів
- any vs unknown vs never

**🔍 Детальні питання:**

- Чому TypeScript? Які його переваги?
- Типи: string, number, boolean, any, unknown, never
- Union та Intersection types
- Literal types
- Type alias vs Interface: у чому різниця?

### 3.2 Функції та дженерики

- Параметри, this-параметр, перевантаження
- Дженерики: обмеження, за замовчуванням, variance (in/out)
- Контекстна типізація, інференс

**🔍 Детальні питання:**

- Що таке generics і навіщо вони потрібні?
- Приклади використання generics у функціях та класах
- Обмеження (constraints) у generics
- Типи функцій та параметрів
- Optional та Default параметри

### 3.3 Розширені типи

- Умовні типи (infer), розподільні умовні типи
- Маповані типи, key remapping, шаблонні літерали
- Discriminated unions, exhaustive checks

**🔍 Детальні питання:**

- Utility types (Partial, Required, Readonly, Pick, Omit)
- Conditional types
- Mapped types
- Infer keyword

### 3.4 Утиліти та практики

- Utility types: Partial/Required/Readonly/Record/Pick/Omit/ReturnType/InstanceType/Parameters/NonNullable/Awaited тощо
- Точні опційні властивості, noUncheckedIndexedAccess

**🔍 Детальні питання:**

- Як використовувати ReturnType?
- Pick vs Omit - коли що краще?
- Як створити власний utility type?

### 3.5 Інтерфейси, тип-аліаси й злиття декларацій

- Declaration merging, module augmentation
- Ambient declarations, .d.ts, DefinitelyTyped

**🔍 Детальні питання:**

- Як працює declaration merging?
- Як створити .d.ts файл?
- DefinitelyTyped - що це?

### 3.6 Класи та декоратори

- Модифікатори доступу, abstract, implements
- ECMAScript decorators vs legacy decorators, reflect-metadata

**🔍 Детальні питання:**

- Як створити абстрактний клас?
- Декоратори - як використовувати?
- Модифікатори доступу в TypeScript

### 3.7 Конфігурація та збірка

- tsconfig: target, module, lib, moduleResolution, paths/baseUrl
- strict family (strictNullChecks, noImplicitAny, exactOptionalPropertyTypes тощо)
- Проєктні референси, composite, інкрементальна збірка

**🔍 Детальні питання:**

- Як налаштувати tsconfig.json?
- strict mode - що включає?
- Path mapping - як налаштувати?

### 3.8 Інструменти

- tsc, ts-node/tsx, SWC/esbuild для TS
- Source maps, перевірка типів у CI
- Інтероперабельність ESM/CJS, import type/export type

**🔍 Детальні питання:**

- Як запустити TypeScript без компіляції?
- Source maps - для чого потрібні?
- import type vs import - різниця?

### 3.9 Типізація React-коду

- Типізація props/children, defaultProps, FC vs функції без FC
- Типізація подій і обробників, Ref/forwardRef, useImperativeHandle
- Дженерик-компоненти, поліморфні компоненти («as» проп), HOC
- Типізація хукiв (useState/useReducer/useMemo/useCallback/useContext)
- Типізація Redux Toolkit, RTK Query, React Hook Form, TanStack Query

**🔍 Детальні питання:**

- Як типізувати React компоненти?
- Типізація хуків - як правильно?
- Як типізувати props з children?

---

## 4. React — Fundamentals to Advanced

### 4.1 Модель React

- Компоненти, props, state, ключі, контрольований vs неконтрольований ввід
- Життєвий цикл через хуки (мислення в ефектах)

**🔍 Детальні питання:**

- Що таке JSX?
- Відмінність функціональних та класових компонентів
- Props та state: відмінності, приклади
- Controlled vs Uncontrolled компоненти

### 4.2 JSX і рендеринг

- Як JSX компілюється, фрагменти, портали
- Ключі та стабільність елементів

**🔍 Детальні питання:**

- Що таке Virtual DOM і як він працює?
- Reconciliation та key у списках
- Як працюють React Fragments?

### 4.3 Fiber і Concurrent Features (огляд)

- Пріоритети, lanes, переривний рендер
- StrictMode та його ефекти

**🔍 Детальні питання:**

- Що таке React Fiber?
- Concurrent Mode - нові можливості React 18
- StrictMode - для чого потрібен?

### 4.4 Хуки — базові й розширені

- useState, useReducer, вибір між ними
- useEffect vs useLayoutEffect, правила залежностей, очистка
- useMemo/useCallback та стабільність посилань
- useRef/useImperativeHandle/forwardRef
- useContext та шаблони контексту
- Кастомні хуки: контракт, залежності, кешування

**🔍 Детальні питання:**

- useState: приклади, коли варто використовувати
- useEffect: для чого? залежності, як уникнути нескінченних викликів?
- useContext: коли використовувати замість Redux?
- useReducer: приклади для складного стану
- useMemo: коли варто використовувати, а коли ні?
- useCallback: оптимізація ререндерів
- useRef: для чого? приклади
- custom hooks: коли створювати?
- Як хук вирішує проблему, яка існувала до його появи?
- Які є проблеми неправильного використання?
- Які оптимізаційні кейси?

### 4.5 Управління станом

- Локальний стан vs підйом стану vs контекст
- Зовнішні бібліотеки: Redux Toolkit, RTK Query, Zustand, Jotai, Recoil, Valtio (порівняння — огляд)
- Архітектурні підходи: колекції й нормалізація, ентiті-стан

**🔍 Детальні питання:**

- Redux Toolkit: сучасний підхід
- Context API vs Redux: коли що краще?
- Zustand, Jotai, Recoil: чи варто знати?
- Як організувати state в великому додатку?

### 4.6 Дані та кешування

- Data fetching у React, аборт запитів, конкурентні запити
- Suspense для даних (огляд), кеш-стратегії, SWR/TanStack Query
- Оптимістичні оновлення, узгодженість кешу

**🔍 Детальні питання:**

- Як організувати data fetching?
- React Query vs SWR - що краще?
- Як реалізувати optimistic updates?

### 4.7 Роутінг і платформи

- React Router v6: маршрути, loaders/actions (огляд)
- Next.js (огляд): App Router, Server Components, серверні дії, потокова рендеринг/гідрація
- SPA vs MPA: компроміси

**🔍 Детальні питання:**

- React Router v6 - нові можливості
- Next.js App Router - що нового?
- SSR vs CSR vs ISR - коли що використовувати?

### 4.8 Форми та валідація

- Контрольовані/неконтрольовані форми
- React Hook Form, інтеграція з Zod/Yup, продуктивність форм

**🔍 Детальні питання:**

- Як організувати валідацію форм?
- React Hook Form - переваги
- Zod vs Yup - що краще?

### 4.9 Продуктивність UI

- Мемоізація, уникнення непотрібних ререндерів
- Віртуалізація списків (react-window/react-virtual)
- Code splitting, React.lazy, Suspense boundaries
- Профайлер React DevTools, полум'яні графіки

**🔍 Детальні питання:**

- Що таке мемоізація у React?
- React.memo, useMemo, useCallback — коли що використовувати?
- Ледаче завантаження (React.lazy, Suspense)
- Code splitting - як реалізувати?
- Як виявити проблеми продуктивності?

### 4.10 Помилки та межі помилок

- Error Boundaries, відновлення після помилок, логування

**🔍 Детальні питання:**

- Error Boundaries - як створити?
- Як обробляти помилки в React?
- Стратегії відновлення після помилок

### 4.11 Доступність та інтернаціоналізація

- ARIA ролі/атрибути, фокус-менеджмент, клавіатурна навігація
- i18n: формати, локалізація динамічного контенту

**🔍 Детальні питання:**

- Як зробити додаток доступним?
- ARIA атрибути - як використовувати?
- Інтернаціоналізація - як реалізувати?

### 4.12 Стилізація та темізація

- CSS Modules, Tailwind, CSS-in-JS (Emotion, styled-components), vanilla-extract
- Темізація, dark mode, CSS variables, ізоляція стилів

**🔍 Детальні питання:**

- CSS Modules vs CSS-in-JS
- Tailwind CSS - переваги та недоліки
- Як реалізувати dark mode?

### 4.13 Анімації

- Framer Motion, React Transition Group, продуктивність анімацій

**🔍 Детальні питання:**

- Framer Motion - як використовувати?
- Як створити плавні анімації?
- Продуктивність анімацій - як оптимізувати?

### 4.14 Тестування React

- React Testing Library: рендер, селектори, fireEvent/userEvent
- Моки залежностей, перевірка асинхронних ефектів
- Component Testing (Cypress/Playwright), інтеграційні підходи

**🔍 Детальні питання:**

- Unit vs Integration vs E2E
- Jest, React Testing Library
- Cypress vs Playwright - що краще?
- Як тестувати хуки?

### 4.15 Антипатерни

- Надмірний контекст, «ефекти як бізнес-логіка», похідний стан, ключі з індексами, важкі обчислення в рендері, глибоке проп-дрилінг

**🔍 Детальні питання:**

- Які типові помилки в React?
- Проп-дрилінг - як уникнути?
- Як організувати архітектуру додатку?

### 4.16 Мікрофронтенди (огляд)

- Module Federation, розподіл відповідальності, загальні бібліотеки

**🔍 Детальні питання:**

- Що таке мікрофронтенди?
- Module Federation - як працює?
- Коли використовувати мікрофронтенди?

---

## 5. Інструменти та екосистема (для JS/TS/React)

### 5.1 Пакетні менеджери

- npm/yarn/pnpm, lockfiles, workspaces

**🔍 Детальні питання:**

- npm vs yarn vs pnpm - що краще?
- Як працюють lockfiles?
- Workspaces - для чого потрібні?

### 5.2 Бандлери та дев-сервери

- Vite, Webpack, esbuild, Rollup — базові налаштування, HMR, code splitting

**🔍 Детальні питання:**

- Що таке bundler?
- Vite vs Webpack - що краще?
- Tree shaking - як працює?
- Code splitting - як реалізувати?

### 5.3 Транспіляція і полiфіли

- Babel/SWC, browserslist, core-js, targets

**🔍 Детальні питання:**

- Babel vs SWC - що швидше?
- Як налаштувати browserslist?
- Поліфіли - коли потрібні?

### 5.4 Якість коду

- ESLint (конфіги, плагіни для TS/React), Prettier, форматування в CI
- Husky, lint-staged, commitlint, Conventional Commits

**🔍 Детальні питання:**

- ESLint - як налаштувати?
- Prettier vs ESLint - конфлікти?
- Git hooks - як налаштувати?

### 5.5 Тестування та покриття

- Jest/Vitest, налаштування TS, mocks, coverage thresholds
- E2E: Playwright/Cypress, стратегія стабільних тестів

**🔍 Детальні питання:**

- Jest vs Vitest - що краще?
- Як налаштувати тестування TypeScript?
- E2E тести - стратегія написання

### 5.6 Документація компонентів

- Storybook, MDX, візуальні регрес-тести (огляд)

**🔍 Детальні питання:**

- Storybook - як налаштувати?
- MDX - для чого використовується?
- Візуальні регрес-тести - як реалізувати?

### 5.7 CI/CD (огляд)

- Базові пайплайни для перевірки типів, лінтингу, тестів, білду

**🔍 Детальні питання:**

- Як налаштувати CI/CD для React проекту?
- GitHub Actions vs GitLab CI
- Автоматизація деплою

### 5.8 Монорепо

- Turborepo/Nx, project references, локальні публікації (Changesets)

**🔍 Детальні питання:**

- Turborepo vs Nx - що краще?
- Як організувати монорепо?
- Project references в TypeScript

---

## 6. Веб-продуктивність

### 6.1 Вітальні метрики

- LCP, CLS, INP/TBT, TTI — вимірювання та цілі (огляд)

**🔍 Детальні питання:**

- Core Web Vitals - що це?
- Як вимірювати LCP, CLS, INP?
- Які цілі ставити для метрик?

### 6.2 Оптимізація коду

- Tree-shaking, видалення мертвого коду, мінімізація залежностей
- Динамічний імпорт, prefetch/preload

**🔍 Детальні питання:**

- Як оптимізувати bundle size?
- Динамічний імпорт - коли використовувати?
- Prefetch vs preload - різниця?

### 6.3 Мережа й кеш

- HTTP кешування (Cache-Control/ETag), SW стратегії, CDN основи

**🔍 Детальні питання:**

- Як налаштувати HTTP кешування?
- Service Worker - стратегії кешування
- CDN - коли використовувати?

### 6.4 Медіа й шрифти

- Responsive images, формати (WebP/AVIF), lazy loading
- Шрифти: дисплей-стратегії, підмножини

**🔍 Детальні питання:**

- Responsive images - як реалізувати?
- WebP vs AVIF - що краще?
- Lazy loading - як налаштувати?

### 6.5 Пам'ять і витоки в React/JS

- Виявлення та усунення

**🔍 Детальні питання:**

- Як виявити витоки пам'яті?
- React DevTools Profiler - як використовувати?
- Оптимізація рендерингу

---

## 7. Безпека фронтенду

### 7.1 XSS: типи та захист

**🔍 Детальні питання:**

- Що таке XSS?
- Як захиститися від XSS?
- Санітизація користувацького вводу

### 7.2 CSRF і SameSite cookies (огляд)

**🔍 Детальні питання:**

- CSRF атаки - як працюють?
- SameSite cookies - як налаштувати?

### 7.3 Clickjacking, frame-ancestors, sandbox

**🔍 Детальні питання:**

- Clickjacking - що це?
- Як захиститися від clickjacking?

### 7.4 CORS/SOP і безпечні інтеграції

**🔍 Детальні питання:**

- CORS - як налаштувати?
- Same-Origin Policy - принципи

### 7.5 Ланцюг постачання: аудит залежностей, SCA

**🔍 Детальні питання:**

- Як аудитувати залежності?
- SCA - що це?

### 7.6 Обіг секретів на фронті (принципи)

**🔍 Детальні питання:**

- Як не зберігати секрети на фронті?
- Безпечне зберігання токенів

---

## 8. Архітектура та патерни

### 8.1 Компонувальні патерни: композиція, compound components, render props, HOC

**🔍 Детальні питання:**

- Component Composition vs Inheritance
- Compound Components - як реалізувати?
- Render Props - для чого використовуються?
- HOC - коли використовувати?

### 8.2 Контейнер/презентер, розділення відповідальності

**🔍 Детальні питання:**

- Container/Presenter pattern
- Smart & Dumb components
- Як розділити відповідальність?

### 8.3 Стан-машини (XState) і statecharts (огляд)

**🔍 Детальні питання:**

- XState - що це?
- Statecharts - коли використовувати?

### 8.4 Feature-Sliced Design / модульні кордони

**🔍 Детальні питання:**

- Feature-Sliced Design - принципи
- Як організувати архітектуру проекту?

### 8.5 Обробка помилок на рівні застосунку

**🔍 Детальні питання:**

- Error boundaries - архітектура
- Логування помилок - стратегії

### 8.6 Інтернаціоналізація архітектурно

**🔍 Детальні питання:**

- i18n - архітектурні рішення
- Локалізація - як організувати?

---

## 9. Налагодження та профілювання

### 9.1 Chrome DevTools: Sources/Network/Performance/Memory/Lighthouse

**🔍 Детальні питання:**

- Chrome DevTools - основні панелі
- Performance tab - як аналізувати?
- Memory tab - виявлення витоків

### 9.2 React DevTools Profiler

**🔍 Детальні питання:**

- React DevTools - як використовувати?
- Profiler - аналіз продуктивності

### 9.3 Source maps, breakpoints, logpoints

**🔍 Детальні питання:**

- Source maps - для чого потрібні?
- Breakpoints vs logpoints - різниця

### 9.4 Аналіз мережі й WebSocket трафіку

**🔍 Детальні питання:**

- Network tab - аналіз запитів
- WebSocket - як дебажити?

---

## 10. Суміжні теми (корисно знати)

### 10.1 HTML/CSS essentials для React-розробника

**🔍 Детальні питання:**

- Семантична HTML - принципи
- CSS Grid vs Flexbox - коли що використовувати?

### 10.2 REST/GraphQL/WebSocket базові концепції інтеграції у фронті

**🔍 Детальні питання:**

- REST vs GraphQL - що краще?
- WebSocket - коли використовувати?

### 10.3 Design Systems основи, доступні компоненти

**🔍 Детальні питання:**

- Design System - як створити?
- Доступність компонентів - принципи

---

## 🔍 **Додаткові питання для кожної теми:**

1. **Яка основна проблема вирішується цією технологією?**
2. **Які типові помилки новачків?**
3. **Які приклади з реальних проєктів?**
4. **Які альтернативи існують і коли вони кращі?**
5. **Як оптимізувати продуктивність?**

---

## 📚 **Ресурси для вивчення:**

- **JavaScript:** [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- **TypeScript:** [Official Handbook](https://www.typescriptlang.org/docs/)
- **React:** [Official Documentation](https://react.dev/)
- **Web APIs:** [MDN Web APIs](https://developer.mozilla.org/en-US/docs/Web/API)

---

**Примітка:** Це **повний гід** з детальними питаннями та поясненнями. Використовуйте «PROMPT TO EXPAND LATER» угорі для автоматичного розгортання кожного пункту у повний посібник із відповідями, вправами та посиланнями.
