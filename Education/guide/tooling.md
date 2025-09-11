## 5.1 Пакетні менеджери (npm/yarn/pnpm)

- TL;DR: Використовуй pnpm — швидкий і економний дискового місця. Lockfile фіксує версії. Workspaces — багатопакетні проєкти.

- What/Why

  - Керування залежностями, скриптами та версіями для стабільних збірок.

- Topic

  - `pnpm` зберігає залежності в глобальному сховищі з жорсткими посиланнями.
  - Lockfiles: `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`.
  - Workspaces: керування кількома пакетами в монорепо.

- Important details

  - Узгодь інструмент у команді; не мішай менеджери.

- Code (з пострічковим поясненням)

```bash
pnpm install         # 1
pnpm run build       # 2
pnpm dlx create-vite # 3
```

Пояснення:

1. Встановлення залежностей. 2) Запуск скрипту. 3) Швидкий scaffold.

- React tie-in

  - Скрипти для dev/build/test/lint.

- When it's used (короткі практичні сценарії)

  - Ініціалізація проєкту, додавання/оновлення залежностей.

- Interview Q&A

  - Чому pnpm? — Швидкість і економія місця.

- Mini-glossary

  - Lockfile: фіксує точні версії залежностей.

---

## 5.2 Бандлери та дев-сервери (Vite, Webpack)

- TL;DR: Для React-проєктів найчастіше Vite — швидкий dev, прості налаштування. Webpack — гнучкий, але важчий.

- What/Why

  - Збірка, HMR, code splitting, оптимізації.

- Topic

  - Vite: esbuild/SWC для dev, Rollup для build.
  - Webpack: loaders/plugins, Module Federation.

- Important details

  - Правильні sourcemaps і таргети.

- Code (з пострічковим поясненням)

```bash
pnpm create vite myapp --template react-ts # 1
cd myapp && pnpm i && pnpm dev            # 2
```

Пояснення:

1–2) Створення й запуск проєкту з Vite.

- React tie-in

  - Готові шаблони TS/React, швидкий HMR.

- When it's used (короткі практичні сценарії)

  - Налаштування дев-середовища і production збірки.

- Interview Q&A

  - Коли потрібен Webpack? — Коли Vite не покриває специфічні вимоги/плагіни.

- Mini-glossary

  - HMR: гаряча заміна модулів без повного перезавантаження.

---

## 5.3 Транспіляція і поліфіли (Babel/SWC, browserslist)

- TL;DR: Визнач `browserslist`, додай поліфіли за потреби. SWC/Babel перетворюють сучасний JS у сумісний.

- What/Why

  - Підтримка старіших браузерів без переписування коду.

- Topic

  - SWC/Babel, preset-env, core-js.
  - `browserslist` у package.json або .browserslistrc.

- Code (з пострічковим поясненням)

```json
{
  "browserslist": [">0.5%", "last 2 versions", "not dead"]
}
```

Пояснення:

- Цільові браузери керують транспіляцією/поліфілами.

- Mini-glossary

  - Поліфіл: реалізація відсутнього API у браузері.

---

## 5.4 Якість коду (ESLint, Prettier, Husky)

- TL;DR: ESLint — правила якості, Prettier — форматування, Husky/lint-staged — перевірки на коміті.

- What/Why

  - Єдиний стиль і раннє виявлення помилок.

- Topic

  - ESLint конфіг з плагінами для TS/React.
  - Prettier інтеграція, уникати конфліктів (eslint-config-prettier).
  - Husky + lint-staged для pre-commit.

- Code (з пострічковим поясненням)

```bash
pnpm dlx eslint --init          # 1
pnpm i -D husky lint-staged     # 2
npx husky add .husky/pre-commit "pnpm lint-staged" # 3
```

Пояснення:

1. Базовий ESLint. 2) Встановлення хуків. 3) Додав pre-commit.

- Interview Q&A

  - Як уникнути конфліктів ESLint і Prettier? — Вимкнути стилістичні правила ESLint через config-prettier.

---

## 5.5 Тестування та покриття (Jest/Vitest, E2E)

- TL;DR: Unit — Vitest/Jest, інтеграційні — RTL, E2E — Playwright/Cypress. Coverage — CI пороги.

- What/Why

  - Баланс між швидкістю і впевненістю.

- Topic

  - Vitest для Vite-проєктів; налаштування TS, mocks.
  - E2E стабільність: селектори за ролями/текстом.

- Code (з пострічковим поясненням)

```bash
pnpm i -D vitest @testing-library/react jsdom # 1
pnpm vitest                                   # 2
```

Пояснення:

1–2) Установка і запуск Vitest.

---

## 5.6 Документація компонентів (Storybook, MDX)

- TL;DR: Storybook для візуальної розробки/регресу. MDX — документація поруч із прикладами.

- Topic

  - Створення історій, controls, інтеграція з тестами.

- Code (з пострічковим поясненням)

```bash
npx storybook@latest init # 1
```

Пояснення:

1. Швидкий старт Storybook.

---

## 5.7 CI/CD (базово)

- TL;DR: У CI перевірка типів, лінт, тести, білд. CD — автодеплой по гілці/тегу.

- What/Why

  - Захист від регресій і швидкий реліз.

- Code (з пострічковим поясненням)

```yaml
name: ci
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 8 }
      - run: pnpm i
      - run: pnpm lint && pnpm test && pnpm build # 1
```

Пояснення:

1. Типова послідовність перевірок у CI.

---

## 5.8 Монорепо (Turborepo/Nx)

- TL;DR: Монорепо — кілька пакетів в одному репо зі спільними інструментами. Turborepo/Nx прискорюють білди/кешують кроки.

- Topic

  - Таск-раннери, кешування, граф залежностей.

- Code (з пострічковим поясненням)

```bash
pnpm dlx create-turbo@latest # 1
```

Пояснення:

1. Стартовий шаблон монорепо.
