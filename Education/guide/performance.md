## 6.1 Вітальні метрики (LCP, CLS, INP/TBT, TTI — огляд)

- TL;DR: Оптимізуй LCP (<2.5s), CLS (<0.1), INP/TBT (реактивність). Вимірюй у реальних користувачів (RUM) і в лабораторії (Lighthouse).

- What/Why

  - Метрики відображають реальний UX продуктивності; покращення метрик покращує конверсію.

- Topic

  - LCP: найбільший елемент (герой-імідж/заголовок).
  - CLS: зсув макета — стабільні розміри, резерв місця.
  - INP/TBT: реакція на взаємодії/блокування головного потоку.

- Important details

  - Ініціалізуй Web Vitals у проді для реальних вимірювань.

- Code (з пострічковим поясненням)

```js
import { onLCP, onCLS, onINP } from "web-vitals";

onLCP(console.log); // 1
onCLS(console.log);
onINP(console.log);
```

Пояснення:

1. Збір метрик для аналізу/телеметрії.

- When it's used (короткі практичні сценарії)

  - Моніторинг у продакшені, перформанс-бюджети.

- Mini-glossary

  - RUM: Real User Monitoring.

---

## 6.2 Оптимізація коду (tree-shaking, dynamic import)

- TL;DR: Видаляй мертвий код, імпортуй лише потрібне, діли код на чанки.

- What/Why

  - Менший бандл — швидший старт.

- Topic

  - ESM tree-shaking, `sideEffects` у package.json.
  - Динамічний імпорт для lazy маршрутів/віджетів.

- Code (з пострічковим поясненням)

```ts
// Імпортуй лише потрібне
import { debounce } from "lodash-es"; // 1

// Динамічний імпорт
const { heavy } = await import("./heavy"); // 2
```

Пояснення:

1. ESM варіанти підтримують tree-shaking краще.
2. Відкласти завантаження «важкого» коду.

---

## 6.3 Мережа й кеш (HTTP кеш, SW стратегії, CDN)

- TL;DR: Кешуй статичні ресурси довго, HTML — коротко. SW — для офлайн/стратегій. CDN — ближче до користувача.

- Topic

  - Заголовки Cache-Control/ETag, immutable ресурси.
  - SW Cache API: stale-while-revalidate.

- Code (з пострічковим поясненням)

```js
self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const cached = await caches.match(e.request); // 1
      const network = fetch(e.request).then((r) => {
        // 2
        const copy = r.clone();
        caches.open("v1").then((c) => c.put(e.request, copy));
        return r;
      });
      return cached || network; // 3
    })()
  );
});
```

Пояснення:

1. Спроба віддати з кешу. 2) Паралельно оновлюємо кеш. 3) SWR стратегія.

---

## 6.4 Медіа й шрифти (responsive images, lazy loading)

- TL;DR: Використовуй сучасні формати (WebP/AVIF), `srcset/sizes`, `loading="lazy"`. Для шрифтів — підмножини/дисплей-стратегії.

- Code (з пострічковим поясненням)

```html
<img
  src="hero.webp"
  srcset="hero.webp 1x, hero@2x.webp 2x"
  loading="lazy"
  alt="Hero"
/>
<!-- 1 -->
<link
  rel="preload"
  href="/fonts/Inter.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
<!-- 2 -->
```

Пояснення:

1. Адаптивне зображення з ледачим завантаженням.
2. Попереднє завантаження критичного шрифту.

---

## 6.5 Пам'ять і витоки в React/JS (виявлення та усунення)

- TL;DR: Витоки через підписки/таймери/посилання. Прибирай в cleanup, уникай безмежних структур.

- Topic

  - DevTools Memory профіль, heap snapshots.
  - Очищення в `useEffect`/відписки/abort.

- Code (з пострічковим поясненням)

```tsx
useEffect(() => {
  const id = setInterval(() => {}, 1000); // 1
  return () => clearInterval(id); // 2
}, []);
```

Пояснення:

1. Таймер створює утримання. 2) Прибираємо у cleanup, аби не текло.
