## Cosmos DB — Junior-Friendly Guide

- TL;DR: Azure Cosmos DB — глобально розподілена, масштабована NoSQL БД з низькою затримкою. Обирай API (Core/SQL, Mongo, Cassandra тощо) під свій стек. Починай з Core (SQL API).

- What/Why

  - Зберігання документів/ключ-значення з автоскейлом і SLA на затримку/доступність. Підходить для глобальних застосунків, де потрібні низькі затримки і масштаб.

- Topic

  - Моделі/АПІ: Core (SQL), Mongo API, Cassandra, Gremlin, Table.
  - Концепти: акаунт → база → контейнер (колекція) → документи.
  - Розділення (partition key): рівномірний розподіл даних/навантаження.
  - RU/s (Request Units): «вартість» запиту; масштабування через RU/s або автоскейл.
  - Консистентність: Strong, Bounded Staleness, Session (типово), Consistent Prefix, Eventual.
  - Індексація: автоматична, можна налаштовувати політику.

- Important details

  - Обери коректний partition key (висока кардинальність, рівномірний доступ, стабільний ключ).
  - Слідкуй за RU — оптимізуй запити, проєктуй під читання за ключем і вузькі запити.
  - Session консистентність підходить більшості веб-додатків.

- Code (з пострічковим поясненням)

```ts
// pnpm i @azure/cosmos
import { CosmosClient } from "@azure/cosmos";

const client = new CosmosClient({
  endpoint: process.env.COSMOS_ENDPOINT!,
  key: process.env.COSMOS_KEY!,
}); // 1
const db = client.database("app"); // 2
const container = db.container("users"); // 3

// Create
await container.items.create({ id: "u1", pk: "u1", name: "Ann" }); // 4

// Read by id + partition key (дешево по RU)
const { resource } = await container.item("u1", "u1").read(); // 5

// Query (SQL API)
const q = "SELECT c.id, c.name FROM c WHERE c.pk = @pk"; // 6
const { resources } = await container.items
  .query({ query: q, parameters: [{ name: "@pk", value: "u1" }] })
  .fetchAll(); // 7
```

Пояснення:

1. Клієнт Cosmos з endpoint/key. 2–3) Отримали базу і контейнер. 4) Створили документ із `id` та `pk` (partition key).
2. Читання «за ключем» — найефективніше за RU. 6–7) Параметризований SQL-запит до контейнера.

- React tie-in

  - Дані з Cosmos DB через API/SDK бекенду; на фронті — хуки даних, кеш (React Query), пагінація.

- When it's used (короткі практичні сценарії)

  - Профілі користувачів, події/журнали, каталоги з глобальною аудиторією.

- Interview Q&A

  - Що таке RU/s? — Абстракція вартості операцій; контролює пропускну здатність.
  - Для чого partition key? — Розподіл даних/навантаження; ключ шардінгу.
  - Яку консистентність обрати? — Зазвичай Session; Strong — дорожче і повільніше.

- Mini-glossary

  - Partition key: поле для розподілу даних між партиціями.
  - RU/s: одиниці запитів, ліміт пропускної здатності.
  - Autosc ale: автоматичне масштабування RU в діапазоні.

---

### Проєктування схеми та запитів (коротко)

- Обирай документи, які відображають читаючі сценарії (read-optimized design).
- Уникай cross-partition сканів: фільтруй по partition key.
- Налаштовуй індекси для типових запитів; відключай непотрібні шляхи для економії RU.

---

### Імпорт/міграція даних (огляд)

- Data Migration Tool, Change Feed (реакція на зміни, побудова проєкцій).

---

### Безпека і доступ

- Azure AD + RBAC, Cosmos role-based permissions, ключі доступу; зберігай секрети поза фронтендом.
