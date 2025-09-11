## 8.1 Компонувальні патерни (composition, compound components, render props, HOC)

- TL;DR: Віддавай перевагу композиції. Compound — набір пов’язаних підкомпонентів. Render props/HOC — для повторного використання логіки, але обирай простіший підхід.

- Topic

  - Composition > Inheritance у React.
  - Compound: спільний контекст і керовані підкомпоненти.
  - Render props/HOC: інжекція поведінки, але можуть ускладнювати дерево.

- Code

```tsx
function Card({
  header,
  children,
  footer,
}: {
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="card">
      {header}
      <div>{children}</div>
      {footer}
    </div>
  );
}
```

---

## 8.2 Container/Presenter, поділ відповідальності

- TL;DR: Контейнер працює з даними, презентер — з UI. Менше зчеплення, кращі тести.

- Code

```tsx
function UserContainer() {
  const user = useUser(); // дані
  return <UserView user={user} />; // UI
}
```

---

## 8.3 Стан-машини і statecharts (огляд XState)

- TL;DR: Явна модель станів/подій — менше неочікуваних переходів. Використовуй для складних флоу.

---

## 8.4 Feature-Sliced Design / модульні кордони

- TL;DR: Розділяй за фічами/слайсами. Мінімум «загального» шару. Ясні публічні API.

---

## 8.5 Обробка помилок на рівні застосунку

- TL;DR: Централізуй логування/репорти, межі помилок на ризикових фрагментах, fallback-и.

---

## 8.6 Інтернаціоналізація архітектурно

- TL;DR: Винось тексти у словники, уникай конкатенацій, підтримуй plural/formatting через бібліотеки.
