## 7.1 XSS: типи та захист

- TL;DR: Ніколи не вставляй довірений HTML. Екрануй дані у шаблонах. CSP/Trusted Types — додатковий рівень захисту.

- What/Why

  - XSS дозволяє виконувати чужий JS у контексті сайту.

- Topic

  - Reflected/Stored/DOM-based XSS.
  - Захист: автоматичне ескейпінг у React, уникай `dangerouslySetInnerHTML`.

- Important details

  - Валідатор/санітайзер для контенту, який приходить як HTML.

- Code (з пострічковим поясненням)

```tsx
// Погано
<div dangerouslySetInnerHTML={{ __html: userContent }} /> // 1

// Добре
<div>{userText}</div>                                     // 2
```

Пояснення:

1. Може виконати небезпечний код. 2) React екранує текст автоматично.

- Mini-glossary

  - CSP: Content Security Policy.

---

## 7.2 CSRF і SameSite cookies (огляд)

- TL;DR: Використовуй `SameSite=Lax/Strict` для cookies. Для state-changing запитів — токени/заголовки, подвійні куки.

- Topic

  - CSRF: небажаний запит від імені користувача.
  - Захист: SameSite, CSRF-токени.

---

## 7.3 Clickjacking, frame-ancestors, sandbox

- TL;DR: Захист через `X-Frame-Options`/`Content-Security-Policy: frame-ancestors`.

- Topic

  - Заборона вбудовування у фрейми на інші домени.

---

## 7.4 CORS/SOP і безпечні інтеграції

- TL;DR: Дозволяй тільки необхідні origin/методи/заголовки. Передавай credentials лише за потреби.

- Topic

  - SOP/CORS, preflight, server-side налаштування.

---

## 7.5 Ланцюг постачання: аудит залежностей, SCA

- TL;DR: Регулярний аудит, оновлення, блокування вразливих версій.

- Topic

  - `pnpm audit`, Dependabot, підписані релізи.

---

## 7.6 Обіг секретів на фронті (принципи)

- TL;DR: Не зберігай секрети на фронті. Використовуй бекенд-проксі, публічні ключі — ок; приватні — ні.

- Topic

  - ENV для білду не приховують значення в бандлі; секрети лише на сервері.
