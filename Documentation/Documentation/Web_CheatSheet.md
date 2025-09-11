# Web Технології Шпаргалка

## 1. Webpack - Збірник модулів для веб-розробки

### Базова конфігурація - Налаштування процесу збірки

Webpack - це модульний збірник, який аналізує залежності між файлами та створює оптимізовані бандли для браузера. Він може обробляти різні типи файлів (JavaScript, CSS, зображення) та застосовувати різні трансформації.

Webpack працює за принципом входу та виходу: він бере вхідні файли, обробляє їх через лоадери та плагіни, і створює вихідні файли, готові для розгортання.

```javascript
// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  devServer: {
    static: "./dist",
    hot: true,
    port: 3000,
  },
};
```

`entry` визначає точку входу, з якої Webpack починає аналіз залежностей. Це головний файл, який імпортує всі інші модулі.

`output` визначає, куди і як зберігати готові файли. `[name].[contenthash].js` створює унікальні імена файлів для ефективного кешування.

`module.rules` містить правила обробки різних типів файлів. Кожне правило використовує регулярний вираз для визначення типів файлів та лоадери для їх обробки.

`plugins` - це додаткові інструменти, які виконують різні завдання: створення HTML файлів, витягування CSS, оптимізація тощо.

### Розширена конфігурація - Налаштування для різних середовищ

Webpack може налаштовуватися по-різному для різних середовищ розробки. Це дозволяє оптимізувати процес збірки для розробки та продакшену.

```javascript
// webpack.config.js з різними середовищами
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    // ... базова конфігурація

    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: isProduction,
            },
          },
        }),
      ],
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    },

    plugins: [
      // ... інші плагіни
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(argv.mode),
      }),
    ],
  };
};
```

`optimization.minimize` включає мініфікацію коду тільки в продакшен режимі. Мініфікація видаляє зайві символи, коментарі та оптимізує код для зменшення розміру.

`splitChunks` розділяє код на окремі файли для покращення кешування. `vendor` групує код з `node_modules` в окремий файл.

`DefinePlugin` замінює змінні в коді на їх значення під час збірки. Це дозволяє використовувати різні налаштування для різних середовищ.

### Кастомні лоадери - Розширення функціональності

Лоадери - це функції, які перетворюють файли в модулі, які Webpack може обробляти. Кожен лоадер виконує специфічну трансформацію файлів.

```javascript
// Кастомний лоадер для обробки .txt файлів
module.exports = function (source) {
  return `module.exports = ${JSON.stringify(source)}`;
};

// Використання в конфігурації
module.exports = {
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: "./loaders/text-loader.js",
      },
    ],
  },
};
```

Лоадери виконуються в зворотному порядку: останній лоадер виконується першим. Це дозволяє створювати ланцюжки обробки файлів.

## 2. WebSocket - Двосторонній зв'язок в реальному часі

### Основні принципи - Протокол двостороннього зв'язку

WebSocket - це протокол, який забезпечує двосторонній зв'язок між клієнтом та сервером через одне TCP з'єднання. На відміну від HTTP, WebSocket дозволяє серверу ініціювати передачу даних до клієнта.

WebSocket з'єднання починається з HTTP handshake, після чого протокол переключається на WebSocket. Це дозволяє WebSocket працювати через проксі та файрволи, які підтримують HTTP.

```javascript
// Клієнтська сторона
const socket = new WebSocket("ws://localhost:8080");

socket.onopen = function (event) {
  console.log("З'єднання встановлено");
  socket.send("Привіт, сервер!");
};

socket.onmessage = function (event) {
  console.log("Отримано повідомлення:", event.data);
};

socket.onclose = function (event) {
  console.log("З'єднання закрито");
};

socket.onerror = function (error) {
  console.error("Помилка WebSocket:", error);
};
```

`onopen` викликається, коли з'єднання встановлено. `onmessage` викликається при отриманні повідомлення від сервера.

`onclose` викликається при закритті з'єднання. `onerror` викликається при виникненні помилки.

### Серверна сторона - Обробка WebSocket з'єднань

```javascript
// Node.js з ws бібліотекою
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", function connection(ws) {
  console.log("Нове з'єднання встановлено");

  ws.on("message", function incoming(message) {
    console.log("Отримано:", message);

    // Відправка відповіді
    ws.send("Сервер отримав ваше повідомлення");
  });

  ws.on("close", function close() {
    console.log("З'єднання закрито");
  });
});
```

`connection` подія викликається при встановленні нового з'єднання. `message` подія викликається при отриманні повідомлення від клієнта.

### React Hook для WebSocket - Інтеграція з React

```javascript
import { useEffect, useRef, useState } from "react";

function useWebSocket(url) {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const wsRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    return () => {
      ws.close();
    };
  }, [url]);

  const sendMessage = (message) => {
    if (wsRef.current && isConnected) {
      wsRef.current.send(message);
    }
  };

  return { isConnected, messages, sendMessage };
}
```

Цей хук інкапсулює логіку роботи з WebSocket та надає зручний API для React компонентів.

## 3. Babel - Трансформація JavaScript коду

### Основні принципи - Компіляція в сучасний JavaScript

Babel - це JavaScript компілятор, який перетворює код, написаний на сучасному JavaScript (ES6+), в код, який можуть виконувати старі браузери. Babel також підтримує трансформацію JSX та інших синтаксичних розширень.

Babel працює в три етапи: парсинг (parse), трансформація (transform) та генерація (generate). Під час парсингу код перетворюється в абстрактне синтаксичне дерево (AST), яке потім модифікується плагінами та генерується назад в код.

```javascript
// babel.config.js
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: ["> 1%", "last 2 versions"],
        },
        useBuiltIns: "usage",
        corejs: 3,
      },
    ],
    "@babel/preset-react",
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
  ],
};
```

`presets` - це набори плагінів для конкретних завдань. `@babel/preset-env` автоматично визначає, які трансформації потрібні для підтримуваних браузерів.

`plugins` - це окремі трансформації, які можна комбінувати для створення потрібної конфігурації.

### Кастомні плагіни - Розширення функціональності

```javascript
// Кастомний плагін для додавання console.log
module.exports = function () {
  return {
    visitor: {
      FunctionDeclaration(path) {
        const functionName = path.node.id.name;
        const consoleLog = `console.log("Викликано функцію: ${functionName}");`;

        const body = path.node.body;
        const firstStatement = body.body[0];

        body.body.unshift(
          require("@babel/parser").parse(consoleLog).program.body[0]
        );
      },
    },
  };
};
```

Плагіни Babel працюють з AST (абстрактним синтаксичним деревом). Вони можуть додавати, видаляти або модифікувати вузли дерева.

### Інтеграція з Webpack - Налаштування для збірки

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
    ],
  },
};
```

`babel-loader` інтегрує Babel в процес збірки Webpack. Він автоматично трансформує JavaScript файли перед їх включенням в бандл.

## 4. CORS (Cross-Origin Resource Sharing)

### Серверна конфігурація (Node.js/Express)

```javascript
// server.js
const express = require("express");
const cors = require("cors");

const app = express();

// Базова CORS конфігурація
app.use(cors());

// Розширена CORS конфігурація
const corsOptions = {
  origin: function (origin, callback) {
    // Дозволяємо запити без origin (наприклад, з Postman)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      "http://localhost:3000",
      "https://myapp.com",
      "https://www.myapp.com",
    ];

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Не дозволено CORS"));
    }
  },
  credentials: true, // Дозволяємо cookies
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  maxAge: 86400, // Кешування preflight запитів на 24 години
};

app.use(cors(corsOptions));

// Специфічна CORS для конкретного маршруту
app.get(
  "/api/data",
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
  (req, res) => {
    res.json({ message: "Дані з сервера" });
  }
);

// Обробка preflight запитів
app.options("/api/data", cors(corsOptions));

app.listen(3001, () => {
  console.log("Сервер запущено на порту 3001");
});
```

### Клієнтська частина

```javascript
// fetch з CORS
async function fetchWithCORS() {
  try {
    const response = await fetch("http://localhost:3001/api/data", {
      method: "GET",
      credentials: "include", // Включаємо cookies
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer token123",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Отримані дані:", data);
  } catch (error) {
    console.error("Помилка запиту:", error);
  }
}

// XMLHttpRequest з CORS
function xhrWithCORS() {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "http://localhost:3001/api/data", true);
  xhr.withCredentials = true; // Включаємо cookies
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", "Bearer token123");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        console.log("Отримані дані:", data);
      } else {
        console.error("Помилка:", xhr.status);
      }
    }
  };

  xhr.send();
}
```

### CORS з Axios

```javascript
// axios конфігурація
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true, // Включаємо cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Інтерцептор для додавання токену
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Використання
async function fetchData() {
  try {
    const response = await api.get("/data");
    console.log("Дані:", response.data);
  } catch (error) {
    console.error("Помилка:", error);
  }
}
```

## 5. npm, yarn, pnpm

### npm (Node Package Manager)

```bash
# Ініціалізація проекту
npm init
npm init -y

# Встановлення пакетів
npm install lodash
npm install --save-dev webpack
npm install -g typescript

# Встановлення з package.json
npm install

# Оновлення пакетів
npm update
npm update lodash

# Видалення пакетів
npm uninstall lodash
npm uninstall --save-dev webpack

# Запуск скриптів
npm run build
npm run dev
npm start

# Публікація пакету
npm login
npm publish

# Версіонування
npm version patch
npm version minor
npm version major
```

### package.json приклади

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "Опис проекту",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "build": "webpack --mode production",
    "test": "jest",
    "lint": "eslint src/",
    "format": "prettier --write src/"
  },
  "dependencies": {
    "express": "^4.18.2",
    "react": "^18.2.0",
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "webpack": "^5.88.0",
    "jest": "^29.5.0",
    "eslint": "^8.45.0"
  },
  "engines": {
    "node": ">=14.0.0",
    "npm": ">=6.0.0"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/user/repo.git"
  },
  "keywords": ["node", "express", "api"],
  "author": "Ваше ім'я",
  "license": "MIT"
}
```

### yarn

```bash
# Ініціалізація
yarn init
yarn init -y

# Встановлення пакетів
yarn add lodash
yarn add --dev webpack
yarn global add typescript

# Встановлення з yarn.lock
yarn install

# Оновлення
yarn upgrade
yarn upgrade lodash

# Видалення
yarn remove lodash

# Запуск скриптів
yarn build
yarn dev
yarn start

# Публікація
yarn login
yarn publish

# Версіонування
yarn version --patch
yarn version --minor
yarn version --major
```

### pnpm

```bash
# Ініціалізація
pnpm init
pnpm init -y

# Встановлення пакетів
pnpm add lodash
pnpm add -D webpack
pnpm add -g typescript

# Встановлення з pnpm-lock.yaml
pnpm install

# Оновлення
pnpm update
pnpm update lodash

# Видалення
pnpm remove lodash

# Запуск скриптів
pnpm run build
pnpm run dev
pnpm start

# Публікація
pnpm login
pnpm publish

# Версіонування
pnpm version patch
pnpm version minor
pnpm version major
```

### Порівняння менеджерів пакетів

| Функція         | npm               | yarn      | pnpm           |
| --------------- | ----------------- | --------- | -------------- |
| Швидкість       | Середня           | Швидка    | Дуже швидка    |
| Дискове простір | Велике            | Середнє   | Мінімальне     |
| Безпека         | Базова            | Покращена | Висока         |
| Локфайл         | package-lock.json | yarn.lock | pnpm-lock.yaml |
| Workspaces      | Так               | Так       | Так            |
| Монорепозиторії | Обмежено          | Хорошо    | Відмінно       |

### pnpm-workspace.yaml

```yaml
# pnpm-workspace.yaml для монорепозиторію
packages:
  - "packages/*"
  - "apps/*"
  - "libs/*"
  - "!**/test/**"
  - "!**/tests/**"
  - "!**/__tests__/**"
```

### package.json для монорепозиторію

```json
{
  "name": "my-monorepo",
  "private": true,
  "workspaces": ["packages/*", "apps/*"],
  "scripts": {
    "build": "pnpm -r build",
    "test": "pnpm -r test",
    "lint": "pnpm -r lint",
    "dev": "pnpm --parallel -r dev"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "eslint": "^8.45.0",
    "prettier": "^3.0.0"
  }
}
```

## Додаткові теми

### 6. Module Bundlers

```javascript
// Rollup конфігурація
// rollup.config.js
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/bundle.js",
      format: "cjs",
    },
    {
      file: "dist/bundle.esm.js",
      format: "esm",
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: "node_modules/**",
    }),
  ],
  external: ["lodash"],
};
```

### 7. Task Runners

```javascript
// Gulp конфігурація
// gulpfile.js
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");

gulp.task("sass", () => {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest("dist/css"));
});

gulp.task("js", () => {
  return gulp
    .src("src/js/**/*.js")
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/js"));
});

gulp.task("watch", () => {
  gulp.watch("src/scss/**/*.scss", gulp.series("sass"));
  gulp.watch("src/js/**/*.js", gulp.series("js"));
});

gulp.task("default", gulp.parallel("sass", "js"));
```

### 8. HTTP/2 та HTTP/3

```javascript
// HTTP/2 Server Push
const http2 = require("http2");
const fs = require("fs");

const server = http2.createSecureServer({
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
});

server.on("stream", (stream, headers) => {
  if (headers[":path"] === "/") {
    // Push CSS файл
    stream.pushStream({ ":path": "/styles.css" }, (err, pushStream) => {
      pushStream.respondWithFile("./styles.css");
    });

    // Push JS файл
    stream.pushStream({ ":path": "/script.js" }, (err, pushStream) => {
      pushStream.respondWithFile("./script.js");
    });

    stream.respondWithFile("./index.html");
  }
});

server.listen(443);
```

### 9. Service Workers

```javascript
// service-worker.js
const CACHE_NAME = "my-app-v1";
const urlsToCache = [
  "/",
  "/styles/main.css",
  "/scripts/main.js",
  "/images/logo.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
```

### 10. Progressive Web Apps (PWA)

```json
// manifest.json
{
  "name": "Моя PWA",
  "short_name": "PWA",
  "description": "Прогресивна веб-додаток",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="uk">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PWA Додаток</title>
    <link rel="manifest" href="/manifest.json" />
    <meta name="theme-color" content="#000000" />
  </head>
  <body>
    <div id="app"></div>

    <script>
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((registration) => {
            console.log("SW зареєстровано:", registration);
          })
          .catch((error) => {
            console.log("SW помилка реєстрації:", error);
          });
      }
    </script>
  </body>
</html>
```

## Додаткові теми

### 11. Rollup - Альтернативний збірник модулів

Rollup - це модульний збірник для JavaScript, який спеціалізується на створенні бібліотек та інструментів. Він використовує tree-shaking для видалення невикористаного коду та створення оптимізованих бандлів з мінімальним накладним витратами.

Rollup відрізняється від Webpack тим, що він створює "плоскі" бандли, які зберігають структуру ES модулів. Це робить його ідеальним для створення бібліотек, які будуть використовуватися в інших проектах, оскільки tree-shaking працює ефективніше з такими бандлами.

Rollup підтримує різні формати виводу (ES modules, CommonJS, UMD, IIFE), що дозволяє створювати бібліотеки, сумісні з різними системами модулів. Він також має багату екосистему плагінів для обробки різних типів файлів та оптимізації.

```javascript
// rollup.config.js
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/bundle.js",
      format: "umd",
      name: "MyLibrary",
    },
    {
      file: "dist/bundle.esm.js",
      format: "esm",
    },
    {
      file: "dist/bundle.min.js",
      format: "umd",
      name: "MyLibrary",
      plugins: [terser()],
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled",
    }),
  ],
  external: ["react", "react-dom"],
};
```

Rollup особливо ефективний для створення бібліотек, оскільки генерує чисті бандли з мінімальним накладним витратами.

### 12. Gulp - Task Runner

Gulp - це інструмент автоматизації для веб-розробки, який використовує Node.js streams для ефективної обробки файлів. Він дозволяє створювати складні пайплайни для збірки проекту та автоматизації рутинних завдань розробки.

Gulp працює за принципом "code over configuration" - завдання визначаються через JavaScript код, що робить їх більш гнучкими та зрозумілими. Streams забезпечують ефективну обробку файлів без необхідності створення тимчасових файлів.

Gulp особливо корисний для компіляції препроцесорів (Sass, Less), мініфікації ресурсів, оптимізації зображень, запуску тестів та налаштування серверів розробки. Він також підтримує паралельне виконання завдань та спостереження за змінами файлів.

```javascript
// gulpfile.js
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();

// Компіляція SCSS
function styles() {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
}

// Мініфікація JavaScript
function scripts() {
  return gulp
    .src("src/js/**/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream());
}

// Оптимізація зображень
function images() {
  return gulp
    .src("src/images/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/images"));
}

// Сервер розробки
function serve() {
  browserSync.init({
    server: "./dist",
  });

  gulp.watch("src/scss/**/*.scss", styles);
  gulp.watch("src/js/**/*.js", scripts);
  gulp.watch("dist/**/*.html").on("change", browserSync.reload);
}

// Експорт завдань
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.serve = serve;
exports.default = gulp.series(styles, scripts, images, serve);
```

Gulp надає гнучку систему для автоматизації різних завдань розробки, таких як компіляція препроцесорів, мініфікація та оптимізація ресурсів.

### 13. HTTP/2 та HTTP/3 - Сучасні протоколи

HTTP/2 та HTTP/3 - це нові версії HTTP протоколу, які покращують продуктивність веб-додатків через мультиплексування, стиснення заголовків та інші оптимізації. Ці протоколи значно зменшують затримки та покращують ефективність передачі даних.

HTTP/2 вводить мультиплексування запитів через одне TCP з'єднання, що дозволяє одночасно обробляти кілька запитів без блокування. Server Push дозволяє серверу проактивно відправляти ресурси клієнту, зменшуючи кількість round-trip запитів.

HTTP/3 базується на QUIC протоколі та використовує UDP замість TCP, що забезпечує кращу продуктивність при втраті пакетів та зменшує затримки. Він також підтримує незалежні потоки, що робить його більш стійким до проблем з мережею.

```javascript
// Налаштування HTTP/2 Server Push
const express = require("express");
const http2 = require("http2");
const fs = require("fs");

const app = express();

// Middleware для HTTP/2 Server Push
app.use((req, res, next) => {
  if (res.push) {
    // Push критичних ресурсів
    if (req.path === "/") {
      res.push(
        "/css/main.css",
        {
          req: { accept: "text/css" },
          res: { "content-type": "text/css" },
        },
        (err, stream) => {
          if (err) return;
          stream.end(fs.readFileSync("public/css/main.css"));
        }
      );
    }
  }
  next();
});

// Налаштування HTTP/2 сервера
const options = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.crt"),
  allowHTTP1: true,
};

const server = http2.createSecureServer(options, app);

server.listen(443, () => {
  console.log("HTTP/2 сервер запущено на порту 443");
});
```

HTTP/2 Server Push дозволяє серверу проактивно відправляти ресурси клієнту, що зменшує затримки завантаження.

### 14. Service Workers - Кешування та офлайн функціональність

Service Workers - це скрипти, які працюють у фоновому режимі та надають можливості для кешування, push-повідомлень та офлайн функціональності. Вони діють як проксі між веб-додатком, браузером та мережею, дозволяючи контролювати обробку мережевих запитів.

Service Workers працюють в окремому потоці від основного JavaScript коду, що означає, що вони не блокують UI та можуть працювати навіть коли додаток не активний. Вони мають доступ до Cache API, що дозволяє зберігати та керувати кешем ресурсів.

Service Workers підтримують різні стратегії кешування (Cache First, Network First, Stale While Revalidate), що дозволяє оптимізувати продуктивність та забезпечити роботу додатку в офлайн режимі. Вони також підтримують push-повідомлення та background sync для оновлення даних у фоновому режимі.

```javascript
// service-worker.js
const CACHE_NAME = "my-app-v1";
const urlsToCache = ["/", "/css/main.css", "/js/app.js", "/images/logo.png"];

// Встановлення Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Кеш відкрито");
      return cache.addAll(urlsToCache);
    })
  );
});

// Активація Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Видалення старого кешу:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Перехоплення запитів
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Повертаємо кешовану відповідь, якщо вона є
      if (response) {
        return response;
      }

      // Інакше робимо мережевий запит
      return fetch(event.request).then((response) => {
        // Перевіряємо, чи валідна відповідь
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        // Клонуємо відповідь
        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});

// Реєстрація Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker зареєстровано:", registration);
      })
      .catch((error) => {
        console.log("Помилка реєстрації Service Worker:", error);
      });
  });
}
```

Service Workers забезпечують надійну офлайн функціональність та покращують продуктивність додатків через ефективне кешування.

### 15. Progressive Web Apps (PWA) - Прогресивні веб-додатки

PWA - це веб-додатки, які використовують сучасні веб-технології для надання нативного досвіду користувача. Вони включають Service Workers, Web App Manifest та інші функції, що дозволяють створювати додатки, які працюють як нативні.

PWA забезпечують офлайн функціональність через Service Workers, можливість встановлення на пристрій через Web App Manifest, push-повідомлення та швидке завантаження. Вони працюють на всіх платформах та не потребують розповсюдження через app stores.

Ключові характеристики PWA включають надійність (працюють незалежно від мережі), швидкість (швидко завантажуються та відповідають), залученість (можуть бути встановлені та надсилати push-повідомлення) та безпека (обов'язково використовують HTTPS).

```json
// manifest.json
{
  "name": "Мій PWA Додаток",
  "short_name": "PWA App",
  "description": "Прогресивний веб-додаток з офлайн функціональністю",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="uk">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PWA Додаток</title>
    <link rel="manifest" href="/manifest.json" />
    <meta name="theme-color" content="#000000" />
    <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
  </head>
  <body>
    <div id="app">
      <h1>Мій PWA Додаток</h1>
      <p>Цей додаток працює офлайн!</p>
    </div>

    <script>
      // Реєстрація Service Worker
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/service-worker.js");
      }

      // Встановлення PWA
      let deferredPrompt;
      window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        deferredPrompt = e;

        // Показуємо кнопку встановлення
        const installButton = document.createElement("button");
        installButton.textContent = "Встановити додаток";
        installButton.addEventListener("click", () => {
          deferredPrompt.prompt();
          deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {
              console.log("Користувач встановив додаток");
            }
            deferredPrompt = null;
          });
        });
        document.body.appendChild(installButton);
      });
    </script>
  </body>
</html>
```

PWA забезпечують нативний досвід користувача з можливістю встановлення, офлайн роботи та push-повідомлень.

### 16. WebAssembly (WASM) - Виконання нативного коду в браузері

WebAssembly - це бінарний формат інструкцій для віртуальної машини, який дозволяє виконувати код, написаний на мовах низького рівня (C++, Rust, Go), в браузері з нативною швидкістю. Це революційна технологія, яка розширює можливості веб-платформи.

WebAssembly забезпечує продуктивність, близьку до нативної, що робить його ідеальним для обчислювально інтенсивних завдань, таких як ігри, обробка зображень, наукові обчислення та мультимедійні додатки. Він працює в безпечному середовищі браузера та може взаємодіяти з JavaScript кодом.

WebAssembly модулі можуть бути скомпільовані з різних мов програмування та використовуватися в JavaScript додатках. Він підтримує інтеграцію з веб API, що дозволяє створювати потужні веб-додатки з продуктивністю нативного коду.

```javascript
// Завантаження WebAssembly модуля
async function loadWasmModule() {
  try {
    const response = await fetch("module.wasm");
    const bytes = await response.arrayBuffer();
    const { instance } = await WebAssembly.instantiate(bytes);

    return instance.exports;
  } catch (error) {
    console.error("Помилка завантаження WASM модуля:", error);
  }
}

// Використання WASM функції
loadWasmModule().then(exports => {
  const result = exports.add(5, 3);
  console.log("Результат WASM функції:", result);
});

// Компіляція Rust в WASM
// Cargo.toml
[package]
name = "wasm-example"
version = "0.1.0"
edition = "2021"

[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2"

// src/lib.rs
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn fibonacci(n: u32) -> u32 {
  if n <= 1 {
    return n;
  }
  fibonacci(n - 1) + fibonacci(n - 2)
}

#[wasm_bindgen]
pub fn multiply(a: f64, b: f64) -> f64 {
  a * b
}
```

WebAssembly дозволяє виконувати складні обчислення з високою продуктивністю, що робить його ідеальним для ігор, обробки зображень та наукових обчислень.

### 17. Web Workers - Багатопотоковість в браузері

Web Workers дозволяють виконувати JavaScript код у фоновому потоці, не блокуючи основний потік UI. Це корисно для складних обчислень та обробки даних, що забезпечує плавну роботу інтерфейсу користувача.

Web Workers працюють в окремому потоці від основного JavaScript коду, що означає, що вони не мають прямого доступу до DOM або більшості Web API. Комунікація між основним потоком та Worker відбувається через повідомлення, що забезпечує безпечну взаємодію.

Web Workers підтримують різні типи: Dedicated Workers (для одного контексту), Shared Workers (для кількох контекстів) та Service Workers (для фонової обробки). Вони особливо корисні для обробки великих обсягів даних, складних математичних обчислень, обробки зображень та інших ресурсоємних операцій.

```javascript
// main.js - Основний потік
const worker = new Worker("worker.js");

// Відправка повідомлення в Worker
worker.postMessage({
  type: "CALCULATE",
  data: [1, 2, 3, 4, 5],
});

// Отримання результату від Worker
worker.onmessage = function (event) {
  console.log("Результат від Worker:", event.data);
};

// Обробка помилок
worker.onerror = function (error) {
  console.error("Помилка Worker:", error);
};

// Завершення Worker
function terminateWorker() {
  worker.terminate();
}

// worker.js - Фоновий потік
self.onmessage = function (event) {
  const { type, data } = event.data;

  switch (type) {
    case "CALCULATE":
      const result = performHeavyCalculation(data);
      self.postMessage({
        type: "RESULT",
        data: result,
      });
      break;

    case "PROCESS_IMAGE":
      const processedImage = processImageData(data);
      self.postMessage({
        type: "IMAGE_PROCESSED",
        data: processedImage,
      });
      break;
  }
};

function performHeavyCalculation(numbers) {
  // Складні обчислення
  return numbers.reduce((sum, num) => sum + num * num, 0);
}

function processImageData(imageData) {
  // Обробка зображення
  const processed = new Uint8ClampedArray(imageData.length);

  for (let i = 0; i < imageData.length; i += 4) {
    const r = imageData[i];
    const g = imageData[i + 1];
    const b = imageData[i + 2];

    // Конвертація в чорно-білий
    const gray = 0.299 * r + 0.587 * g + 0.114 * b;

    processed[i] = gray;
    processed[i + 1] = gray;
    processed[i + 2] = gray;
    processed[i + 3] = imageData[i + 3];
  }

  return processed;
}
```

Web Workers забезпечують плавну роботу UI навіть при виконанні складних операцій у фоновому режимі.

### 18. WebRTC - Пряма комунікація між браузерами

WebRTC дозволяє встановлювати прямі з'єднання між браузерами для передачі аудіо, відео та даних без необхідності серверів для ретрансляції медіа. Це революційна технологія для створення peer-to-peer комунікаційних додатків.

WebRTC забезпечує високоякісну передачу медіа з низькою затримкою, що робить його ідеальним для відеодзвінків, відеоконференцій, ігор та інших додатків реального часу. Він підтримує різні кодеки та автоматично адаптується до мережевих умов.

WebRTC використовує ICE (Interactive Connectivity Establishment) для встановлення з'єднань через NAT та файрволи. Він також підтримує DTLS для шифрування та SRTP для безпечної передачі медіа, що забезпечує конфіденційність комунікацій.

```javascript
// Встановлення WebRTC з'єднання
class WebRTCConnection {
  constructor() {
    this.peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    this.localStream = null;
    this.remoteStream = null;
  }

  async startLocalStream() {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      this.localStream.getTracks().forEach((track) => {
        this.peerConnection.addTrack(track, this.localStream);
      });

      return this.localStream;
    } catch (error) {
      console.error("Помилка отримання медіа:", error);
    }
  }

  async createOffer() {
    try {
      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);
      return offer;
    } catch (error) {
      console.error("Помилка створення offer:", error);
    }
  }

  async handleAnswer(answer) {
    try {
      await this.peerConnection.setRemoteDescription(answer);
    } catch (error) {
      console.error("Помилка обробки answer:", error);
    }
  }

  async handleOffer(offer) {
    try {
      await this.peerConnection.setRemoteDescription(offer);
      const answer = await this.peerConnection.createAnswer();
      await this.peerConnection.setLocalDescription(answer);
      return answer;
    } catch (error) {
      console.error("Помилка обробки offer:", error);
    }
  }

  setupEventHandlers() {
    this.peerConnection.ontrack = (event) => {
      this.remoteStream = event.streams[0];
      // Відображення віддаленого потоку
      const remoteVideo = document.getElementById("remoteVideo");
      remoteVideo.srcObject = this.remoteStream;
    };

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        // Відправка ICE candidate іншому peer
        this.sendIceCandidate(event.candidate);
      }
    };
  }
}

// Використання
const connection = new WebRTCConnection();
connection.setupEventHandlers();

// Початок відеодзвінка
async function startCall() {
  const localStream = await connection.startLocalStream();
  const localVideo = document.getElementById("localVideo");
  localVideo.srcObject = localStream;

  const offer = await connection.createOffer();
  // Відправка offer через сигнальний сервер
  sendOffer(offer);
}
```

WebRTC забезпечує безпечну та ефективну передачу медіа між браузерами без необхідності централізованих серверів.

### 19. Web Audio API - Обробка аудіо в браузері

Web Audio API надає низькорівневий JavaScript API для обробки та синтезу аудіо в браузері. Він дозволяє створювати складні аудіо ефекти та музичні додатки з високою точністю та низькою затримкою.

Web Audio API працює через систему аудіо вузлів, які можна підключати один до одного для створення складних аудіо графів. Кожен вузол виконує певну функцію: генерація звуку, фільтрація, ефекти, аналіз або вивід. Це дозволяє створювати складні аудіо обробки в реальному часі.

Web Audio API підтримує різні типи аудіо вузлів: осцилятори, фільтри, підсилювачі, аналізатори, ефекти (реверберація, дисторшн, хорус) та багато інших. Він також забезпечує точний контроль часу та синхронізацію з візуальними елементами, що робить його ідеальним для інтерактивних музичних додатків та ігор.

```javascript
class AudioProcessor {
  constructor() {
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    this.analyser = this.audioContext.createAnalyser();
    this.gainNode = this.audioContext.createGain();
    this.filter = this.audioContext.createBiquadFilter();

    this.setupAudioGraph();
  }

  setupAudioGraph() {
    // Підключення вузлів аудіо графа
    this.analyser.connect(this.gainNode);
    this.gainNode.connect(this.filter);
    this.filter.connect(this.audioContext.destination);

    // Налаштування аналізатора
    this.analyser.fftSize = 256;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
  }

  async loadAudioFile(url) {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);

      return this.playAudioBuffer(audioBuffer);
    } catch (error) {
      console.error("Помилка завантаження аудіо:", error);
    }
  }

  playAudioBuffer(audioBuffer) {
    const source = this.audioContext.createBufferSource();
    source.buffer = audioBuffer;

    source.connect(this.analyser);
    source.start(0);

    return source;
  }

  createOscillator(frequency, type = "sine") {
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.frequency.setValueAtTime(
      frequency,
      this.audioContext.currentTime
    );
    oscillator.type = type;

    oscillator.connect(gainNode);
    gainNode.connect(this.analyser);

    return { oscillator, gainNode };
  }

  applyReverb(delayTime, decay) {
    const delay = this.audioContext.createDelay();
    const feedback = this.audioContext.createGain();

    delay.delayTime.setValueAtTime(delayTime, this.audioContext.currentTime);
    feedback.gain.setValueAtTime(decay, this.audioContext.currentTime);

    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(this.audioContext.destination);

    return delay;
  }

  getFrequencyData() {
    this.analyser.getByteFrequencyData(this.dataArray);
    return this.dataArray;
  }

  setVolume(value) {
    this.gainNode.gain.setValueAtTime(value, this.audioContext.currentTime);
  }

  setFilterFrequency(frequency) {
    this.filter.frequency.setValueAtTime(
      frequency,
      this.audioContext.currentTime
    );
  }
}

// Використання
const audioProcessor = new AudioProcessor();

// Створення синусоїдального тону
const { oscillator, gainNode } = audioProcessor.createOscillator(440, "sine");
gainNode.gain.setValueAtTime(0.1, audioProcessor.audioContext.currentTime);
oscillator.start();

// Застосування реверберації
const reverb = audioProcessor.applyReverb(0.5, 0.3);

// Візуалізація частотного спектру
function visualize() {
  const frequencyData = audioProcessor.getFrequencyData();
  const canvas = document.getElementById("visualizer");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const barWidth = canvas.width / frequencyData.length;

  for (let i = 0; i < frequencyData.length; i++) {
    const barHeight = (frequencyData[i] / 255) * canvas.height;
    ctx.fillStyle = `hsl(${(i * 360) / frequencyData.length}, 70%, 50%)`;
    ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth, barHeight);
  }

  requestAnimationFrame(visualize);
}

visualize();
```

Web Audio API забезпечує потужні можливості для створення інтерактивних аудіо додатків та музичних інструментів.

### 20. WebGL - 3D графіка в браузері

WebGL - це JavaScript API для рендерингу 3D графіки в браузері. Він базується на OpenGL ES та дозволяє створювати складні 3D сцени та візуалізації з апаратним прискоренням через GPU.

WebGL працює через систему шейдерів (vertex та fragment shaders), які виконуються на GPU. Vertex shaders обробляють геометрію та трансформації, а fragment shaders визначають кольори та текстури пікселів. Це дозволяє створювати складні візуальні ефекти та високопродуктивну 3D графіку.

WebGL підтримує різні техніки рендерингу: текстурування, освітлення, тіні, прозорість, пост-обробка ефектів та багато інших. Він також забезпечує прямий доступ до GPU, що робить його ідеальним для 3D ігор, наукових візуалізацій, архітектурних додатків та інших інтерактивних 3D додатків.

```javascript
class WebGLRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    if (!this.gl) {
      throw new Error("WebGL не підтримується");
    }

    this.setupShaders();
    this.setupBuffers();
  }

  setupShaders() {
    // Vertex shader
    const vertexShaderSource = `
      attribute vec3 aPosition;
      attribute vec3 aColor;
      varying vec3 vColor;
      uniform mat4 uModelViewMatrix;
      uniform mat4 uProjectionMatrix;
      
      void main() {
        gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
        vColor = aColor;
      }
    `;

    // Fragment shader
    const fragmentShaderSource = `
      precision mediump float;
      varying vec3 vColor;
      
      void main() {
        gl_FragColor = vec4(vColor, 1.0);
      }
    `;

    this.vertexShader = this.createShader(
      this.gl.VERTEX_SHADER,
      vertexShaderSource
    );
    this.fragmentShader = this.createShader(
      this.gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );

    this.program = this.createProgram(this.vertexShader, this.fragmentShader);
    this.gl.useProgram(this.program);
  }

  createShader(type, source) {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error(
        "Помилка компіляції шейдера:",
        this.gl.getShaderInfoLog(shader)
      );
      this.gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  createProgram(vertexShader, fragmentShader) {
    const program = this.gl.createProgram();
    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);

    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      console.error(
        "Помилка лінкування програми:",
        this.gl.getProgramInfoLog(program)
      );
      return null;
    }

    return program;
  }

  setupBuffers() {
    // Вершини куба
    const vertices = new Float32Array([
      // Передня грань
      -1.0, -1.0, 1.0, 1.0, 0.0, 0.0, 1.0, -1.0, 1.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0,
      0.0, 0.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 0.0,

      // Задня грань
      -1.0, -1.0, -1.0, 1.0, 0.0, 1.0, 1.0, -1.0, -1.0, 0.0, 1.0, 1.0, 1.0, 1.0,
      -1.0, 1.0, 1.0, 1.0, -1.0, 1.0, -1.0, 0.5, 0.5, 0.5,
    ]);

    // Індекси для малювання граней
    const indices = new Uint16Array([
      0,
      1,
      2,
      0,
      2,
      3, // Передня грань
      1,
      5,
      6,
      1,
      6,
      2, // Права грань
      5,
      4,
      7,
      5,
      7,
      6, // Задня грань
      4,
      0,
      3,
      4,
      3,
      7, // Ліва грань
      3,
      2,
      6,
      3,
      6,
      7, // Верхня грань
      4,
      5,
      1,
      4,
      1,
      0, // Нижня грань
    ]);

    // Створення буферів
    this.vertexBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);

    this.indexBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    this.gl.bufferData(
      this.gl.ELEMENT_ARRAY_BUFFER,
      indices,
      this.gl.STATIC_DRAW
    );

    // Налаштування атрибутів
    const positionLocation = this.gl.getAttribLocation(
      this.program,
      "aPosition"
    );
    const colorLocation = this.gl.getAttribLocation(this.program, "aColor");

    this.gl.enableVertexAttribArray(positionLocation);
    this.gl.vertexAttribPointer(
      positionLocation,
      3,
      this.gl.FLOAT,
      false,
      24,
      0
    );

    this.gl.enableVertexAttribArray(colorLocation);
    this.gl.vertexAttribPointer(colorLocation, 3, this.gl.FLOAT, false, 24, 12);
  }

  render() {
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.enable(this.gl.DEPTH_TEST);

    // Матриці трансформації
    const modelViewMatrix = this.createModelViewMatrix();
    const projectionMatrix = this.createProjectionMatrix();

    // Встановлення uniform змінних
    const modelViewLocation = this.gl.getUniformLocation(
      this.program,
      "uModelViewMatrix"
    );
    const projectionLocation = this.gl.getUniformLocation(
      this.program,
      "uProjectionMatrix"
    );

    this.gl.uniformMatrix4fv(modelViewLocation, false, modelViewMatrix);
    this.gl.uniformMatrix4fv(projectionLocation, false, projectionMatrix);

    // Малювання куба
    this.gl.drawElements(this.gl.TRIANGLES, 36, this.gl.UNSIGNED_SHORT, 0);
  }

  createModelViewMatrix() {
    // Проста матриця обертання
    const angle = Date.now() * 0.001;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    return new Float32Array([
      cos,
      0,
      sin,
      0,
      0,
      1,
      0,
      0,
      -sin,
      0,
      cos,
      0,
      0,
      0,
      -5,
      1,
    ]);
  }

  createProjectionMatrix() {
    const fov = (45 * Math.PI) / 180;
    const aspect = this.canvas.width / this.canvas.height;
    const near = 0.1;
    const far = 100.0;

    const f = 1.0 / Math.tan(fov / 2);

    return new Float32Array([
      f / aspect,
      0,
      0,
      0,
      0,
      f,
      0,
      0,
      0,
      0,
      (far + near) / (near - far),
      -1,
      0,
      0,
      (2 * far * near) / (near - far),
      0,
    ]);
  }
}

// Використання
const canvas = document.getElementById("webgl-canvas");
const renderer = new WebGLRenderer(canvas);

function animate() {
  renderer.render();
  requestAnimationFrame(animate);
}

animate();
```

WebGL забезпечує потужні можливості для створення 3D графіки, ігор та візуалізацій прямо в браузері.
