## 2.1 DOM і події (делегування, capturing/bubbling)

- TL;DR: Події йдуть зверху вниз (capturing) і знизу вгору (bubbling). Делегування — вішай один обробник на спільного предка замість багатьох на дітей.

- What/Why

  - Менше обробників — менше пам'яті та краща продуктивність; простіше керувати динамічними елементами.

- Topic

  - Фази події: capturing → target → bubbling. За замовчуванням більшість слухачів працює на фазі bubbling.
  - Делегування: слухай подію на контейнері, перевіряй `event.target`/`closest()` для визначення елемента.
  - CustomEvent: власні події з даними.
  - Опції слухачів: `{ capture, once, passive }` — керуй фазою, одноразовістю та скрол-перформансом.

- Important details

  - `addEventListener(type, handler, { capture: true })` — слухати на фазі capturing.
  - `event.stopPropagation()` зупиняє подальше спливання; використовуй обережно.
  - Пасивні слухачі `{ passive: true }` для scroll/touch — покращують скрол.

- Code (з пострічковим поясненням)

```js
const list = document.querySelector("#list"); // 1
list.addEventListener(
  "click",
  (e) => {
    // 2
    const item = e.target.closest("li"); // 3
    if (!item || !list.contains(item)) return; // 4
    console.log("clicked", item.dataset.id); // 5
  },
  { passive: true }
);
```

Пояснення:

1. Контейнер списку. 2) Один слухач на контейнері.
2. Знаходимо найближчий `li` навіть якщо клік по дочірньому елементу.
3. Перевірка безпеки. 5) Працюємо з даними елемента.

- React tie-in

  - У React не додаємо "ручні" слухачі до DOM — використовуємо onClick/onChange. Принцип делегування вже реалізовано самим React.

- When it's used (короткі практичні сценарії)

  - Списки з динамічними елементами, таблиці, меню.

- Interview Q&A

  - Що таке bubbling/capturing? — Фази розповсюдження подій у DOM.
  - Що таке делегування подій? — Один обробник на предку для багатьох дітей.

- Mini-glossary

  - Capturing/Bubbling: напрямки розповсюдження подій.
  - Passive listener: слухач, що не блокує скрол.

---

## 2.2 Рендеринг і продуктивність (reflow/repaint, вимірювання)

- TL;DR: Зміна layout викликає reflow, зміна стилів/фарбування — repaint. Зменшуй кількість вимірювань/перемальовувань і групуй стилі.

- What/Why

  - Часті reflow/repaint уповільнюють UI; важливо мінімізувати синхронні вимірювання.

- Topic

  - Layout → Paint → Composite: основні етапи рендер-пайплайну.
  - Вимірювання (`getBoundingClientRect`, `offsetHeight`) форсують layout — виконуй їх рідко.

- Important details

  - Групуй стилі: змінюй класи/стилі пакетно, використовуй `requestAnimationFrame` для плавності.
  - Анімуй властивості, що не тригерять layout: `transform`, `opacity`.

- Code (з пострічковим поясненням)

```js
const box = document.querySelector("#box"); // 1
requestAnimationFrame(() => {
  // 2
  box.style.transform = "translateX(100px)"; // 3 (без layout)
  box.style.opacity = "0.9"; // 4
});

const h = box.getBoundingClientRect().height; // 5 (layout)
console.log(h);
```

Пояснення:

1. Цільовий елемент. 2) Кадруємо зміни для плавності.
   3–4) Анімуємо без reflow. 5) Вимірювання форсує layout — робимо свідомо.

- React tie-in

  - Мемоізація компонентів/обчислень, уникнення непотрібних ререндерів, віртуалізація списків.

- When it's used (короткі практичні сценарії)

  - Анімації, великі списки, графіки, складні макети.

- Interview Q&A

  - Що таке reflow vs repaint? — Layout проти перефарбовування.
  - Як уникати reflow? — Пакетні стилі, `transform/opacity`, rAF.

- Mini-glossary

  - Reflow: перевирахунок розмітки. Repaint: перефарбовування пікселів.
  - rAF: `requestAnimationFrame` — колбек перед кадром.

---

## 2.3 Мережа й стріми (fetch, CORS, кешування)

- TL;DR: `fetch` — універсальний HTTP API. CORS контролює доступ між доменами. Кешуй відповіді заголовками або через Service Worker.

- What/Why

  - Безпечні запити і правильне кешування зменшують навантаження і прискорюють UI.

- Topic

  - `fetch(url, { method, headers, body, credentials, signal })`.
  - CORS: preflight (OPTIONS), `Access-Control-Allow-*` заголовки.
  - Кеш: `Cache-Control`, `ETag`, SW Cache API (огляд).

- Important details

  - Передавай `credentials: 'include'` лише коли потрібно cookies.
  - Поважай `Content-Type` і кодування.

- Code (з пострічковим поясненням)

```js
async function loadJson(url, signal) {
  // 1
  const res = await fetch(url, { signal }); // 2
  if (!res.ok) throw new Error(res.statusText); // 3
  return res.json(); // 4
}
```

Пояснення:

1. Обгортка для запиту. 2) Запит із можливістю скасування. 3) Кидаємо помилку для не-2xx. 4) Парсимо JSON.

- React tie-in

  - Керування даними через хуки/React Query; обов'язково обробляй помилки і стани завантаження.

- When it's used (короткі практичні сценарії)

  - Отримання даних для списків, фільтрів, форм; кешування GET відповідей.

- Interview Q&A

  - Що таке CORS? — Політика доступу між доменами через заголовки.
  - Як обробити помилку у fetch? — Перевірити `res.ok`, зчитати повідомлення.

- Mini-glossary

  - CORS: Cross-Origin Resource Sharing — доступ між доменами.
  - Preflight: попередній запит OPTIONS для небезпечних методів/заголовків.

---

## 2.4 Сховище (cookies, localStorage/sessionStorage, IndexedDB)

- TL;DR: Cookies — для серверних сесій/автентифікації; `localStorage`/`sessionStorage` — прості ключ-значення; IndexedDB — для великих структурованих даних.

- What/Why

  - Збереження стану між сесіями, кеш відповіді, офлайн-режим.

- Topic

  - Cookies: атрибути `Secure`, `HttpOnly`, `SameSite` (Lax/Strict/None).
  - `localStorage` (постійно) vs `sessionStorage` (до закриття вкладки), синхронні API.
  - IndexedDB: асинхронна БД у браузері, транзакції, ключові діапазони.

- Important details

  - Не зберігай секрети в JS-доступних cookies/storage.
  - Обмеження розміру і синхронність `localStorage` — не для гарячих шляхів.

- Code (з пострічковим поясненням)

```js
// localStorage/sessionStorage
localStorage.setItem("theme", "dark"); // 1
console.log(localStorage.getItem("theme")); // 2
sessionStorage.setItem("step", "1"); // 3

// Cookies (спрощено)
document.cookie = "lang=uk; SameSite=Lax; Secure"; // 4
```

Пояснення:

1–3) Простий ключ-значення стореджі. 4) Встановлюємо cookie з атрибутами безпеки.

- React tie-in

  - Зберігати прості налаштування (тема, фільтри). Для великих кешів — краще бібліотеки даних.

- When it's used (короткі практичні сценарії)

  - Запам'ятати мову/тему, кешувати відповіді, офлайн-чергу.

- Interview Q&A

  - Різниця між `localStorage` і `sessionStorage`? — Тривалість зберігання.
  - Для чого IndexedDB? — Великі офлайн-дані, складні структури.

- Mini-glossary

  - SameSite: обмеження відправки cookie між сайтами.
  - HttpOnly: недоступно з JS, лише серверу.

---

## 2.5 Воркери та PWA (огляд)

- TL;DR: Web Workers — фонові потоки для обчислень; Service Worker — проксі для кешу/офлайну; PWA — маніфест + SW для інсталяції.

- What/Why

  - Виносимо важкі обчислення, додаємо офлайн і швидкий старт.

- Topic

  - Web Worker: `new Worker('worker.js')`, повідомлення `postMessage/onmessage`.
  - Service Worker: lifecycle (install/activate), Cache API, перехоплення `fetch`.
  - Manifest: `manifest.json` з іконками і параметрами інсталяції.

- Important details

  - SW працює по HTTPS; обережно з кеш-стратегіями (stale-while-revalidate тощо).

- Code (з пострічковим поясненням)

```js
// main.js
const w = new Worker("worker.js"); // 1
w.postMessage({ n: 1e7 }); // 2
w.onmessage = (e) => console.log(e.data.sum); // 3

// worker.js
self.onmessage = (e) => {
  // 4
  const { n } = e.data;
  let sum = 0;
  for (let i = 0; i < n; i++) sum += i; // 5
  postMessage({ sum }); // 6
};
```

Пояснення:

1–3) Створюємо воркер і спілкуємося повідомленнями. 4–6) Обчислення у фоновому потоці.

- React tie-in

  - Важкі обчислення/парсинг у воркері, щоб не блокувати UI.

- When it's used (короткі практичні сценарії)

  - Офлайн-кеш сторінок/запитів, великі обчислення.

- Interview Q&A

  - Для чого Service Worker? — Кеш, офлайн, push-нотифікації.
  - Чим Worker відрізняється від Service Worker? — Потік обчислень vs мережевий проксі.

- Mini-glossary

  - SW: Service Worker — проксі між додатком і мережею.
  - PWA: прогресивний веб-додаток із офлайн/інсталяцією.

---

## 2.6 Інші Web API (Clipboard, Fullscreen, Notifications, Geolocation, Permissions)

- TL;DR: Корисні API з дозволами користувача. Використовуй перевірку доступів перед викликом.

- What/Why

  - Покращують UX (копіювання, повноекранний режим, нотифікації, гео).

- Topic

  - Clipboard: `navigator.clipboard.writeText`.
  - Fullscreen: `element.requestFullscreen()`/`document.exitFullscreen()`.
  - Notifications: `Notification.requestPermission()`.
  - Geolocation: `navigator.geolocation.getCurrentPosition`.
  - Permissions: `navigator.permissions.query({ name: 'clipboard-write' })`.
  - CSP (огляд): заборона inline-скриптів/стилів, whitelist джерел (`script-src`, `style-src`, `img-src`).

- Important details

  - Деякі API працюють лише по HTTPS і за user gesture.
  - CSP конфігурується заголовком `Content-Security-Policy` або `<meta http-equiv="Content-Security-Policy" ...>`.

- Code (з пострічковим поясненням)

```js
async function copy(text) {
  // 1
  await navigator.clipboard.writeText(text); // 2
}

async function canNotify() {
  // 3
  const p = await Notification.requestPermission();
  return p === "granted"; // 4
}

// Приклад CSP (на стороні сервера/заголовок)
// Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:
```

Пояснення:

1. Обгортка для Clipboard. 2) Копіюємо текст. 3–4) Запитуємо дозвіл на нотифікації.

- React tie-in

  - Кнопки «Copy», показ системних нотифікацій після подій.

- When it's used (короткі практичні сценарії)

  - Копіювання токенів/посилань, перегляд карт/локації, fullscreen-галереї.

- Interview Q&A

  - Як перевірити дозвіл на доступ? — Через Permissions API.

- Mini-glossary

  - User gesture: взаємодія користувача (клік/тап), що дозволяє виклик API.

---

## 2.7 Web Components (огляд)

- TL;DR: Custom Elements + Shadow DOM + шаблони дозволяють створювати інкапсульовані веб-компоненти без фреймворків.

- What/Why

  - Можна повторно використовувати компоненти між проєктами і фреймворками.

- Topic

  - Custom Element: `customElements.define('x-tag', class extends HTMLElement { ... })`.
  - Shadow DOM: інкапсуляція розмітки/стилів.

- Important details

  - Інтеграція з React вимагає коректну роботу з атрибутами/подіями.

- Code (з пострічковим поясненням)

```js
class XHello extends HTMLElement {
  // 1
  connectedCallback() {
    this.innerHTML = "<b>Hello</b>";
  } // 2
}
customElements.define("x-hello", XHello); // 3
```

Пояснення:

1. Клас елемента. 2) Рендер при підключенні в DOM. 3) Реєстрація елемента.

- React tie-in

  - Можна використовувати як DOM-елемент у JSX (`<x-hello />`).

- When it's used (короткі практичні сценарії)

  - Віджет, що працює поза фреймворком (в т.ч. CMS).

- Interview Q&A

  - Що таке Shadow DOM? — Інкапсуляція стилів/розмітки для компонента.

- Mini-glossary

  - Custom Element: користувацький HTML-елемент.
  - Shadow DOM: окрема «тіньова» DOM-дерева з власними стилями.

```js
// IntersectionObserver — спостерігати за видимістю
const io = new IntersectionObserver((entries) => {
  for (const e of entries)
    if (e.isIntersecting) console.log("visible", e.target); // 1
});
document.querySelectorAll(".card").forEach((el) => io.observe(el)); // 2
```
