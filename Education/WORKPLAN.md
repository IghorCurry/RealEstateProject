# WORKPLAN — JS/TS/React Study Guide Expansion

## Response Criteria (Quality Bar)

Language - Ukrainian

- Audience: junior-friendly, simple narrative style without analogies.
- Depth: practical, essential concepts only; avoid unnecessary complexity.
- Structure per subtopic:
  - TL;DR
  - What/Why (коротко: що це і навіщо)
  - Topic (повне пояснення в розповідному стилі)
  - Important details (bullet list, concise)
  - Code example(s) with line-by-line explanations
  - React tie-in (де доречно)
  - When it's used (короткі практичні сценарії)
  - Interview Q&A (2–3 питання з короткими відповідями)
  - Mini-glossary (короткі пояснення складних термінів)
- Code rules:
  - Runnable, minimal, focused on teaching one idea at a time
  - Comment only where non-obvious; explain each line below the snippet
  - Prefer modern syntax; show pitfalls when relevant
- Language: Ukrainian; short sentences, readable paragraphs
- Consistency: same section order, same tone, same level of detail
- Cross-links: when a concept depends on another, reference its section id
- Glossary: під кожною темою обов'язковий міні-глосарій складних термінів

## Editing Workflow

1. Read target section(s) fully.
2. Draft content following the structure above.
3. Add at most 1–2 small code snippets per subtopic.
4. Add scenarios and interview Q&A.
5. Self-check against criteria; keep it concise and practical.
6. Save edits; verify formatting stays consistent with the main file.

## Stepwise Expansion Schedule

### Step 1 — JavaScript Basics

- 1.1 Синтаксис і типи даних
- 1.2 Змінні й область видимості
- 1.3 Функції і контекст виконання

### Step 2 — Objects, Prototypes, Iteration

- 1.4 Прототипи та об'єктна модель
- 1.5 Ітерації й колекції
- 1.6 Модулі

### Step 3 — Async, Errors, Utilities

- 1.7 Асинхронність і модель виконання
- 1.8 Робота з помилками
- 1.9 Метапрограмування (огляд)
- 1.10 Числа, дати, регулярні вирази (практично)

### Step 4 — Web Platform I

- 2.1 DOM і події
- 2.2 Рендеринг і продуктивність
- 2.3 Мережа й стріми

### Step 5 — Web Platform II

- 2.4 Сховище
- 2.5 Воркери та PWA (огляд)
- 2.6 Інші Web API
- 2.7 Web Components (огляд)

### Step 6 — TypeScript Basics

- 3.1 Основи типізації
- 3.2 Функції та дженерики
- 3.4 Утиліти та практики

### Step 7 — TypeScript Advanced

- 3.3 Розширені типи
- 3.5 Інтерфейси, тип-аліаси, злиття декларацій
- 3.6 Класи та декоратори (огляд)
- 3.7 Конфігурація та збірка
- 3.8 Інструменти
- 3.9 Типізація React-коду

### Step 8 — React Fundamentals

- 4.1 Модель React
- 4.2 JSX і рендеринг
- 4.3 Fiber і Concurrent Features (огляд)

### Step 9 — Hooks Deep Dive

- 4.4 Хуки — базові й розширені

### Step 10 — State & Data

- 4.5 Управління станом
- 4.6 Дані та кешування
- 4.7 Роутінг і платформи

### Step 11 — Forms, Performance, Errors

- 4.8 Форми та валідація
- 4.9 Продуктивність UI
- 4.10 Помилки та межі помилок

### Step 12 — A11y, Styling, Animations, Testing

- 4.11 Доступність та інтернаціоналізація
- 4.12 Стилізація та темізація
- 4.13 Анімації
- 4.14 Тестування React
- 4.15 Антипатерни
- 4.16 Мікрофронтенди (огляд)

### Step 13 — Tooling & Ecosystem

- 5.1 Пакетні менеджери (акцент на pnpm)
- 5.2 Бандлери та дев-сервери
- 5.3 Транспіляція і поліфіли
- 5.4 Якість коду
- 5.5 Тестування та покриття
- 5.6 Документація компонентів
- 5.7 CI/CD
- 5.8 Монорепо

### Step 14 — Web Performance & Security

- 6.1 Вітальні метрики
- 6.2 Оптимізація коду
- 6.3 Мережа й кеш
- 6.4 Медіа й шрифти
- 6.5 Пам'ять і витоки
- 7.1–7.6 Безпека фронтенду

### Step 15 — Architecture, Debugging, Adjacent Topics

- 8.1–8.6 Архітектура та патерни
- 9.1–9.4 Налагодження та профілювання
- 10.1 HTML/CSS essentials
- 10.2 REST/GraphQL/WebSocket базові інтеграції
- 10.3 Design Systems основи

## Progress Tracking

- After each step: check criteria, keep scope small, update TODOs.
- If user requests reordering or deeper coverage, update this plan first.

## File Organization (Single files per technology)

- Root folder for content: `Education/guide/`
- Files (кожен містить усі відповідні підрозділи з головного списку):

  - `js.md` — 1.1–1.12
  - `ts.md` — 3.1–3.9
  - `react.md` — 4.1–4.16
  - `web.md` — 2.1–2.7
  - `tooling.md` — 5.1–5.8
  - `performance.md` — 6.1–6.5
  - `security.md` — 7.1–7.6
  - `architecture.md` — 8.1–8.6
  - `debugging.md` — 9.1–9.4
  - `adjacent.md` — 10.1–10.3

- В кожному файлі використовувати однаковий шаблон секції: TL;DR → What/Why → Topic → Important details → Code (з пострічковим поясненням) → React tie-in (де доречно) → When it’s used → Interview Q&A → Mini-glossary.

Rationale: одна технологія — один файл спрощує пошук і підтримку; перехресні теми (performance/security/architecture/debugging/adjacent) залишаються окремо, щоб на них посилатися з `js.md`, `ts.md`, `react.md`, `web.md`.

## Junior Scope Adjustments

Cover as brief overview now (deep dive later when needed):

- 1.9 Метапрограмування (Proxy/Reflect) — огляд і 1–2 приклади
- 1.10 Числа/дати/RegExp — лише практичні основи (Intl згадати)
- 1.11 Продуктивність/пам'ять — базові принципи, без V8 деталей
- 3.6 Декоратори — огляд, без деталізації
- 4.3 Fiber/Concurrent — концептуально, без внутрішньої механіки
- 4.16 Мікрофронтенди — що це і коли, без імплементації
- 5.8 Монорепо — огляд інструментів
- 6.5 Пам'ять і витоки — мінімум, приклади витоків у React
- 7.x Безпека — сфокусуватися на XSS/CSRF/CORS практично

Optional for later (можна пропустити на старті):

- 2.7 Web Components — якщо не потрібно на проекті
- 3.5 Злиття декларацій / module augmentation — поки не критично
- 3.7/3.8 Глибокі збірки і інструменти — лише базовий мінімум зараз

Keep as core deep coverage now:

- 1.1–1.7 (JS основи + async/await)
- 2.1–2.3 (DOM/події/мережа)
- 3.1–3.4 (TS основи, generics, утиліти)
- 4.1–4.4 (React фундамент + базові хуки)
- 4.8–4.10 (форми, продуктивність UI, межі помилок)
- 5.1–5.4 (менеджери пакетів, бандлери, якість коду)

## Suggested Additions (Junior Value)

- Git базово: коміти, гілки, pull requests, resolving conflicts
- HTTP базово: методи, статус-коди, заголовки, JSON, кешування на рівні HTTP
- Node/npm/pnpm базово: `package.json` скрипти, семантичні версії
- Chrome DevTools базово: Elements, Network, Performance, Sources
- CSS essentials для React: Flexbox vs Grid, responsive підхід

Placement:

- Додати короткі файли у `13-tooling-ecosystem/` та `15-architecture-debugging-adjacent/`:
  - `13-tooling-ecosystem/git-basics.md`
  - `13-tooling-ecosystem/http-basics.md`
  - `13-tooling-ecosystem/node-and-scripts.md`
  - `15-architecture-debugging-adjacent/chrome-devtools-basics.md`
  - `15-architecture-debugging-adjacent/css-essentials-for-react.md`
