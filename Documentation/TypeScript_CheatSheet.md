# TypeScript Шпаргалка

## 1. Основи TypeScript

### Типи даних - Фундаментальні типи

TypeScript надає статичну типізацію для JavaScript, що дозволяє виявляти помилки на етапі компіляції. Основні типи включають примітиви, об'єкти та спеціальні типи, які забезпечують безпеку типів та покращують читабельність коду.

Примітивні типи в TypeScript включають всі стандартні JavaScript типи (string, number, boolean, symbol, bigint) з додатковими можливостями типізації. TypeScript також вводить нові типи, такі як tuple, enum, any, unknown, void та never, які розширюють можливості типізації.

Статична типізація дозволяє компілятору виявляти помилки до виконання коду, що значно зменшує кількість runtime помилок та покращує якість коду. TypeScript також надає кращі інструменти для рефакторингу та документації коду.

```typescript
// Примітивні типи
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;
let symbol: symbol = Symbol("unique");
let bigInt: bigint = 100n;

// Масиви
let numbers: number[] = [1, 2, 3, 4, 5];
let strings: Array<string> = ["hello", "world"];

// Tuple - кортежі
let tuple: [string, number] = ["age", 25];
let coordinates: [number, number, number] = [10, 20, 30];

// Enum - перерахування
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE",
}

let favoriteColor: Color = Color.Blue;

// Any та Unknown
let anyValue: any = "може бути будь-що";
let unknownValue: unknown = "невідомий тип";

// Void та Never
function logMessage(): void {
  console.log("Повідомлення");
}

function throwError(): never {
  throw new Error("Помилка");
}

// Null та Undefined
let nullValue: null = null;
let undefinedValue: undefined = undefined;
```

TypeScript забезпечує безпеку типів, що допомагає уникнути помилок під час виконання та покращує читабельність коду.

### Інтерфейси - Визначення структури об'єктів

Інтерфейси дозволяють визначати контракти для об'єктів, функцій та класів. Вони забезпечують перевірку типів та документацію коду, що робить код більш передбачуваним та легшим для розуміння.

Інтерфейси в TypeScript надають декларативний спосіб визначення структури об'єктів. Вони підтримують опціональні властивості, readonly властивості, індексні сигнатури та розширення інших інтерфейсів. Це дозволяє створювати гнучкі та перевикористовувані типи.

Інтерфейси також підтримують функціональні сигнатури, що дозволяє типізувати функції та методи. Вони можуть бути використані для створення контрактів між різними частинами коду, що покращує архітектуру додатку та спрощує тестування.

```typescript
// Базовий інтерфейс
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Опціональна властивість
  readonly createdAt: Date; // Тільки для читання
}

// Реалізація інтерфейсу
const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  createdAt: new Date(),
};

// Інтерфейс для функцій
interface SearchFunction {
  (source: string, subString: string): boolean;
}

const search: SearchFunction = (source, subString) => {
  return source.includes(subString);
};

// Інтерфейс для класів
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}

class Clock implements ClockInterface {
  currentTime: Date = new Date();

  setTime(d: Date) {
    this.currentTime = d;
  }
}

// Розширення інтерфейсів
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}

const square: Square = {
  color: "red",
  sideLength: 10,
};

// Інтерфейси з індексними сигнатурами
interface StringArray {
  [index: number]: string;
}

const myArray: StringArray = ["apple", "banana", "orange"];
```

Інтерфейси забезпечують контракти між компонентами та сприяють створенню перевикористовуваного коду.

### Типи - Альтернатива інтерфейсам

Типи надають більш гнучкі можливості для створення типів, включаючи union типи, intersection типи та mapped types. Вони забезпечують потужні інструменти для створення складних типових систем та маніпуляції існуючими типами.

Union типи дозволяють створювати типи, які можуть бути одним з кількох значень, що робить їх ідеальними для обробки різних сценаріїв. Intersection типи поєднують кілька типів в один, що дозволяє створювати складні типи з множинними характеристиками.

Mapped типи дозволяють створювати нові типи на основі існуючих, трансформуючи їх властивості. Це особливо корисно для створення варіацій існуючих типів, таких як Readonly, Partial, Required та інші utility типи.

```typescript
// Базові типи
type Point = {
  x: number;
  y: number;
};

type ID = string | number;

// Union типи
type Status = "loading" | "success" | "error";

type Result = {
  data?: any;
  error?: string;
  status: Status;
};

// Intersection типи
type Person = {
  name: string;
  age: number;
};

type Employee = {
  id: number;
  department: string;
};

type EmployeePerson = Person & Employee;

const employee: EmployeePerson = {
  name: "John",
  age: 30,
  id: 123,
  department: "IT",
};

// Mapped типи
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};

type User = {
  id: number;
  name: string;
  email: string;
};

type ReadonlyUser = Readonly<User>;
type PartialUser = Partial<User>;

// Conditional типи
type NonNullable<T> = T extends null | undefined ? never : T;

type StringOrNumber = string | number | null;
type ValidValue = NonNullable<StringOrNumber>; // string | number
```

Типи надають потужні інструменти для створення складних типових систем.

## 2. Функції та класи

### Типізація функцій - Безпечні функції

TypeScript забезпечує повну типізацію функцій, включаючи параметри, повертані значення та перевантаження. Це дозволяє створювати безпечні та передбачувані функції з чітко визначеними контрактами.

Типізація функцій в TypeScript включає типізацію параметрів, повертаних значень, опціональних параметрів, параметрів за замовчуванням та rest параметрів. Це забезпечує, що функції викликаються з правильними аргументами та повертають очікувані значення.

Перевантаження функцій дозволяє створювати функції, які можуть працювати з різними типами параметрів та повертати різні типи значень залежно від вхідних даних. Генерічні функції дозволяють створювати універсальні функції, які працюють з різними типами, зберігаючи при цьому типізацію.

```typescript
// Базова типізація функцій
function add(a: number, b: number): number {
  return a + b;
}

const multiply = (a: number, b: number): number => a * b;

// Функції з опціональними параметрами
function greet(name: string, greeting?: string): string {
  return greeting ? `${greeting}, ${name}!` : `Hello, ${name}!`;
}

// Функції з параметрами за замовчуванням
function createUser(name: string, age: number = 18): User {
  return { id: Date.now(), name, age, email: "", createdAt: new Date() };
}

// Функції з rest параметрами
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

// Перевантаження функцій
function process(value: string): string;
function process(value: number): number;
function process(value: string | number): string | number {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else {
    return value * 2;
  }
}

// Генерічні функції
function identity<T>(arg: T): T {
  return arg;
}

function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

// Функції з обмеженнями типів
function merge<T extends object, U extends object>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}
```

Типізація функцій забезпечує безпеку типів та покращує документацію API.

### Класи - Об'єктно-орієнтоване програмування

TypeScript надає повну підтримку класів з модифікаторами доступу, абстрактними класами та інтерфейсами. Це дозволяє створювати об'єктно-орієнтовані програми з повною типізацією та безпекою типів.

Класи в TypeScript підтримують всі основні концепції ООП: інкапсуляцію, наслідування та поліморфізм. Модифікатори доступу (public, private, protected) дозволяють контролювати видимість властивостей та методів, що забезпечує інкапсуляцію та захист даних.

Абстрактні класи дозволяють створювати базові класи з абстрактними методами, які повинні бути реалізовані в дочірніх класах. Генерічні класи дозволяють створювати універсальні класи, які працюють з різними типами, зберігаючи при цьому типізацію.

```typescript
// Базовий клас
class Animal {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  move(distance: number = 0): void {
    console.log(`${this.name} moved ${distance}m.`);
  }
}

// Наслідування
class Dog extends Animal {
  bark(): void {
    console.log("Woof! Woof!");
  }

  move(distance: number = 5): void {
    console.log("Running...");
    super.move(distance);
  }
}

// Модифікатори доступу
class BankAccount {
  private balance: number = 0;
  public readonly accountNumber: string;

  constructor(accountNumber: string) {
    this.accountNumber = accountNumber;
  }

  public deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
    }
  }

  public getBalance(): number {
    return this.balance;
  }
}

// Абстрактні класи
abstract class Shape {
  abstract getArea(): number;

  getPerimeter(): number {
    return 0;
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  getArea(): number {
    return Math.PI * this.radius ** 2;
  }

  getPerimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

// Генерічні класи
class Container<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    this.value = value;
  }
}

// Імплементація інтерфейсів
interface Drawable {
  draw(): void;
}

class Rectangle implements Drawable {
  constructor(private width: number, private height: number) {}

  draw(): void {
    console.log(`Drawing rectangle ${this.width}x${this.height}`);
  }
}
```

Класи в TypeScript забезпечують інкапсуляцію, наслідування та поліморфізм з повною типізацією.

## 3. Продвинуті типи

### Utility Types - Корисні типи

TypeScript надає набір вбудованих utility типів для маніпуляції існуючими типами. Ці типи дозволяють створювати нові типи на основі існуючих, що значно спрощує роботу з типами та зменшує дублювання коду.

Utility типи надають потужні інструменти для трансформації типів. Вони дозволяють робити властивості опціональними (Partial), обов'язковими (Required), вибирати конкретні властивості (Pick), виключати властивості (Omit) та створювати нові типи на основі існуючих.

Ці типи особливо корисні при роботі з API, формами, станом додатку та іншими сценаріями, де потрібно створювати варіації існуючих типів. Вони забезпечують типізацію без необхідності дублювання коду та покращують читабельність типових визначень.

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
}

// Partial - робить всі властивості опціональними
type PartialUser = Partial<User>;

// Required - робить всі властивості обов'язковими
type RequiredUser = Required<User>;

// Pick - вибирає конкретні властивості
type UserCredentials = Pick<User, "email" | "name">;

// Omit - виключає конкретні властивості
type PublicUser = Omit<User, "email" | "isActive">;

// Record - створює об'єкт з вказаними ключами та значеннями
type UserRoles = Record<string, "admin" | "user" | "guest">;

// ReturnType - отримує тип повертаємого значення функції
type AddFunction = (a: number, b: number) => number;
type AddReturnType = ReturnType<AddFunction>; // number

// Parameters - отримує типи параметрів функції
type AddParameters = Parameters<AddFunction>; // [number, number]

// InstanceType - отримує тип екземпляра класу
class UserClass {
  constructor(public name: string) {}
}
type UserInstance = InstanceType<typeof UserClass>;

// NonNullable - видаляє null та undefined
type ValidString = NonNullable<string | null | undefined>; // string

// ThisType - вказує тип this контексту
interface ObjectDescriptor<D, M> {
  data?: D;
  methods?: M & ThisType<D & M>;
}
```

Utility типи спрощують роботу з типами та зменшують дублювання коду.

### Conditional Types - Умовні типи

Conditional типи дозволяють створювати типи, які залежать від умов. Це потужний інструмент для створення складних типових систем, які адаптуються до різних сценаріїв використання.

Conditional типи працюють за принципом тернарного оператора для типів. Вони дозволяють створювати типи, які змінюються залежно від вхідних типів. Це особливо корисно для створення універсальних типів, які працюють з різними типами даних.

Type inference в conditional типах дозволяє витягувати типи з складних структур даних. Рекурсивні conditional типи дозволяють створювати типи, які працюють з глибоко вкладеними структурами даних. Distributive та non-distributive conditional типи надають контроль над поведінкою типів при роботі з union типами.

```typescript
// Базовий conditional тип
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false

// Type inference в conditional типах
type ElementType<T> = T extends (infer U)[] ? U : never;

type StringArray = string[];
type ExtractedType = ElementType<StringArray>; // string

// Рекурсивні conditional типи
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface NestedObject {
  user: {
    profile: {
      name: string;
      age: number;
    };
  };
}

type PartialNested = DeepPartial<NestedObject>;

// Distributive conditional типи
type ToArray<T> = T extends any ? T[] : never;

type StringOrNumber = ToArray<string | number>; // string[] | number[]

// Non-distributive conditional типи
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;

type StringOrNumberNonDist = ToArrayNonDist<string | number>; // (string | number)[]
```

Conditional типи надають потужні інструменти для створення складних типових систем.

## 4. Модулі та namespace

### ES6 Модулі - Сучасна система модулів

TypeScript повністю підтримує ES6 модулі з додатковою типізацією. Це дозволяє створювати модульні додатки з чіткою структурою та ефективним управлінням залежностями.

ES6 модулі в TypeScript забезпечують інкапсуляцію коду, дозволяючи контролювати, які частини коду доступні ззовні. Вони підтримують як named exports (іменовані експорти), так і default exports (експорти за замовчуванням), що забезпечує гнучкість при організації коду.

TypeScript також підтримує re-export, що дозволяє створювати централізовані точки входу для модулів. Dynamic imports дозволяють завантажувати модулі асинхронно, що покращує продуктивність додатку через code splitting та lazy loading.

```typescript
// math.ts
export const PI = 3.14159;

export function add(a: number, b: number): number {
  return a + b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

// Default export
export default class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }

  multiply(a: number, b: number): number {
    return a * b;
  }
}

// types.ts
export interface Point {
  x: number;
  y: number;
}

export type Status = "active" | "inactive";

// main.ts
import Calculator, { PI, add, multiply } from "./math";
import { Point, Status } from "./types";

const calc = new Calculator();
console.log(calc.add(2, 3)); // 5
console.log(PI); // 3.14159

// Re-export
export { Calculator } from "./math";
export * from "./types";

// Dynamic imports
async function loadModule() {
  const { default: Calculator } = await import("./math");
  const calc = new Calculator();
  return calc;
}
```

ES6 модулі забезпечують чітку структуру проекту та ефективне управління залежностями.

### Namespace - Простір імен

Namespace дозволяють організовувати код в логічні групи та уникнути конфліктів імен. Це корисний інструмент для організації коду в великих проектах та створення логічних груп функціональності.

Namespace в TypeScript надають спосіб групування пов'язаних класів, інтерфейсів, функцій та змінних в логічні одиниці. Вони дозволяють створювати ієрархічну структуру коду та уникнути конфліктів імен між різними частинами додатку.

Namespace підтримують вкладеність, що дозволяє створювати складні ієрархії. Ambient declarations дозволяють розширювати існуючі типи та додавати типізацію для зовнішніх бібліотек. Це особливо корисно при роботі з бібліотеками, які не мають вбудованої TypeScript підтримки.

```typescript
// Validation namespace
namespace Validation {
  export interface StringValidator {
    isValid(s: string): boolean;
  }

  export class EmailValidator implements StringValidator {
    isValid(s: string): boolean {
      return s.includes("@");
    }
  }

  export class ZipCodeValidator implements StringValidator {
    isValid(s: string): boolean {
      return s.length === 5 && /^\d+$/.test(s);
    }
  }
}

// Використання namespace
const emailValidator = new Validation.EmailValidator();
const zipValidator = new Validation.ZipCodeValidator();

// Nested namespace
namespace Geometry {
  export namespace Shapes {
    export class Circle {
      constructor(public radius: number) {}

      getArea(): number {
        return Math.PI * this.radius ** 2;
      }
    }

    export class Rectangle {
      constructor(public width: number, public height: number) {}

      getArea(): number {
        return this.width * this.height;
      }
    }
  }
}

const circle = new Geometry.Shapes.Circle(5);
const rectangle = new Geometry.Shapes.Rectangle(10, 20);

// Ambient declarations
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    PORT?: string;
    DATABASE_URL: string;
  }
}
```

Namespace корисні для організації коду в великих проектах та створення логічних груп функціональності.

## 5. Інтеграція з React

### Типізація React компонентів

TypeScript забезпечує повну типізацію для React компонентів, props та state. Це дозволяє створювати безпечні та передбачувані React додатки з чітко визначеними контрактами між компонентами.

Типізація React компонентів в TypeScript включає типізацію props, state, подій та хуків. Це забезпечує, що компоненти отримують правильні props та правильно обробляють події. TypeScript також надає типізацію для функціональних та класових компонентів.

Типізація хуків дозволяє створювати типізовані кастомні хуки з чітко визначеними типами для стану та функцій. Типізація подій забезпечує правильну обробку користувацьких взаємодій та забезпечує безпеку типів при роботі з DOM елементами.

```typescript
import React, { useState, useEffect, useCallback } from "react";

// Типізація props
interface UserCardProps {
  user: {
    id: number;
    name: string;
    email: string;
    avatar?: string;
  };
  onEdit?: (user: UserCardProps["user"]) => void;
  onDelete?: (id: number) => void;
}

// Функціональний компонент
const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = useCallback(() => {
    onEdit?.(user);
    setIsEditing(false);
  }, [user, onEdit]);

  return (
    <div className="user-card">
      <img src={user.avatar || "/default-avatar.png"} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <div className="actions">
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={() => onDelete?.(user.id)}>Delete</button>
      </div>
    </div>
  );
};

// Типізація state
interface UserListState {
  users: UserCardProps["user"][];
  loading: boolean;
  error: string | null;
}

// Класовий компонент
class UserList extends React.Component<{}, UserListState> {
  state: UserListState = {
    users: [],
    loading: false,
    error: null,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    try {
      const response = await fetch("/api/users");
      const users = await response.json();
      this.setState({ users, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  }

  render() {
    const { users, loading, error } = this.state;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
      <div className="user-list">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={this.handleEdit}
            onDelete={this.handleDelete}
          />
        ))}
      </div>
    );
  }

  private handleEdit = (user: UserCardProps["user"]) => {
    // Логіка редагування
  };

  private handleDelete = (id: number) => {
    // Логіка видалення
  };
}

// Типізація хуків
function useUser(id: number) {
  const [user, setUser] = useState<UserCardProps["user"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${id}`);
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  return { user, loading, error };
}

// Типізація подій
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
};

const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // Логіка відправки форми
};

const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log("Button clicked");
};
```

TypeScript забезпечує повну типізацію React компонентів, що покращує розробку та зменшує кількість помилок.

### Типізація Redux

TypeScript забезпечує типізацію для Redux store, actions та reducers. Це дозволяє створювати безпечні та передбачувані системи управління станом з повною типізацією всіх компонентів Redux архітектури.

Типізація Redux в TypeScript включає типізацію state, actions, reducers та middleware. Це забезпечує, що actions мають правильні типи payload, reducers правильно обробляють actions, а state має чітко визначену структуру.

TypeScript також надає типізовані хуки для react-redux, що дозволяє безпечно використовувати useSelector та useDispatch з повною типізацією. Це значно покращує розробку та зменшує кількість помилок при роботі з глобальним станом додатку.

```typescript
import { createStore, applyMiddleware, combineReducers } from "redux";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";

// Типи для state
interface User {
  id: number;
  name: string;
  email: string;
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

interface RootState {
  users: UserState;
}

// Типи для actions
type UserAction =
  | { type: "FETCH_USERS_REQUEST" }
  | { type: "FETCH_USERS_SUCCESS"; payload: User[] }
  | { type: "FETCH_USERS_FAILURE"; payload: string }
  | { type: "ADD_USER"; payload: User }
  | { type: "DELETE_USER"; payload: number };

// Action creators
const fetchUsersRequest = (): UserAction => ({
  type: "FETCH_USERS_REQUEST",
});

const fetchUsersSuccess = (users: User[]): UserAction => ({
  type: "FETCH_USERS_SUCCESS",
  payload: users,
});

const fetchUsersFailure = (error: string): UserAction => ({
  type: "FETCH_USERS_FAILURE",
  payload: error,
});

// Reducer
const userReducer = (
  state: UserState = {
    users: [],
    loading: false,
    error: null,
  },
  action: UserAction
): UserState => {
  switch (action.type) {
    case "FETCH_USERS_REQUEST":
      return { ...state, loading: true, error: null };

    case "FETCH_USERS_SUCCESS":
      return { ...state, users: action.payload, loading: false };

    case "FETCH_USERS_FAILURE":
      return { ...state, error: action.payload, loading: false };

    case "ADD_USER":
      return { ...state, users: [...state.users, action.payload] };

    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };

    default:
      return state;
  }
};

// Store
const rootReducer = combineReducers({
  users: userReducer,
});

const store = createStore(rootReducer);

// Типізовані хуки
type AppDispatch = typeof store.dispatch;
type AppSelector = TypedUseSelectorHook<RootState>;

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: AppSelector = useSelector;

// Використання в компонентах
const UserList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsersRequest());
    fetch("/api/users")
      .then((response) => response.json())
      .then((users) => dispatch(fetchUsersSuccess(users)))
      .catch((error) => dispatch(fetchUsersFailure(error.message)));
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};
```

TypeScript забезпечує повну типізацію Redux, що робить роботу з глобальним станом безпечною та передбачуваною.

## 6. Тестування

### Типізація тестів

TypeScript забезпечує типізацію для тестових фреймворків та покращує якість тестів. Це дозволяє створювати надійні та підтримувані тести з повною типізацією тестових даних та функцій.

Типізація тестів в TypeScript включає типізацію тестових даних, мок функцій, API відповідей та кастомних хуків. Це забезпечує, що тести використовують правильні типи даних та правильно мокають функції та API.

TypeScript також надає типізацію для тестових утиліт, таких як render, screen, fireEvent та waitFor. Це покращує автодоповнення в IDE та зменшує кількість помилок при написанні тестів. Типізація тестів особливо корисна при рефакторингу коду, оскільки TypeScript автоматично виявляє зміни в типах та допомагає оновити тести відповідно.

```typescript
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserCard, UserList } from "./components";

// Типізація тестових даних
const mockUser: UserCardProps["user"] = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  avatar: "/avatar.jpg",
};

// Типізація мок функцій
const mockOnEdit = jest.fn<
  ReturnType<typeof jest.fn>,
  [UserCardProps["user"]]
>();
const mockOnDelete = jest.fn<ReturnType<typeof jest.fn>, [number]>();

// Тести компонентів
describe("UserCard", () => {
  test("renders user information correctly", () => {
    render(
      <UserCard user={mockUser} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    expect(screen.getByAltText(mockUser.name)).toHaveAttribute(
      "src",
      mockUser.avatar
    );
  });

  test("calls onEdit when edit button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <UserCard user={mockUser} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    const editButton = screen.getByText("Edit");
    await user.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledWith(mockUser);
  });

  test("calls onDelete when delete button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <UserCard user={mockUser} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    const deleteButton = screen.getByText("Delete");
    await user.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith(mockUser.id);
  });
});

// Типізація API моків
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

const mockApiResponse: ApiResponse<User[]> = {
  data: [mockUser],
  status: 200,
  message: "Success",
};

// Мок fetch
global.fetch = jest.fn<Promise<Response>, [string]>();

describe("UserList", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  test("fetches and displays users", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => [mockUser],
    });

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledWith("/api/users");
  });

  test("handles API errors", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });
  });
});

// Типізація кастомних хуків
import { renderHook, act } from "@testing-library/react";
import { useUser } from "./hooks";

describe("useUser", () => {
  test("returns user data when API call succeeds", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockUser,
    });

    const { result } = renderHook(() => useUser(1));

    expect(result.current.loading).toBe(true);
    expect(result.current.user).toBe(null);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.error).toBe(null);
  });

  test("returns error when API call fails", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("User not found"));

    const { result } = renderHook(() => useUser(999));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user).toBe(null);
    expect(result.current.error).toBe("User not found");
  });
});
```

TypeScript забезпечує типізацію тестів, що покращує якість тестування та зменшує кількість помилок в тестах.

## 7. Конфігурація та інструменти

### tsconfig.json - Налаштування компілятора

TypeScript компілятор налаштовується через файл tsconfig.json, який визначає опції компіляції та структуру проекту. Цей файл є центральним місцем для конфігурації всіх аспектів TypeScript проекту.

tsconfig.json дозволяє налаштувати цільову версію JavaScript, модульну систему, строгість типізації, шляхи до файлів та багато інших опцій. Це забезпечує консистентну поведінку компілятора та дозволяє адаптувати TypeScript до потреб конкретного проекту.

Важливі опції включають strict mode для максимальної безпеки типів, module resolution для правильного розв'язання модулів, path mapping для спрощення імпортів та source maps для налагодження. Правильна конфігурація tsconfig.json критично важлива для продуктивної роботи з TypeScript.

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": "./src",
    "paths": {
      "@/*": ["*"],
      "@components/*": ["components/*"],
      "@utils/*": ["utils/*"]
    },
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "removeComments": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.spec.ts"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### ESLint з TypeScript - Лінтер для TypeScript

ESLint з TypeScript плагінами забезпечує статичний аналіз коду та виявлення потенційних проблем. Це потужний інструмент для підтримки якості коду та дотримання стандартів кодування в TypeScript проектах.

ESLint з TypeScript плагінами надає специфічні правила для TypeScript, які допомагають виявляти помилки типізації, невикористані змінні, неправильне використання типів та інші проблеми. Це дозволяє підтримувати високу якість коду та запобігати помилкам на етапі розробки.

Налаштування ESLint для TypeScript включає конфігурацію парсера, плагінів та правил. Це дозволяє адаптувати лінтер до потреб конкретного проекту та команди розробників. ESLint також інтегрується з більшістю IDE та може автоматично виправляти деякі проблеми.

```javascript
// .eslintrc.js
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["@typescript-eslint", "react", "react-hooks"],
  extends: [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/prefer-const": "error",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
```

### Prettier - Форматування коду

Prettier забезпечує автоматичне форматування TypeScript коду згідно з встановленими правилами. Це інструмент, який автоматично форматує код, забезпечуючи консистентний стиль кодування в проекті.

Prettier працює з TypeScript файлами та автоматично форматує їх згідно з налаштованими правилами. Це дозволяє зосередитися на логіці коду замість форматування та забезпечує єдиний стиль кодування в команді розробників.

Prettier інтегрується з більшістю IDE та може автоматично форматувати код при збереженні файлу. Він також працює з ESLint та іншими інструментами для забезпечення якості коду. Правильна конфігурація Prettier критично важлива для підтримки консистентного стилю кодування в проекті.

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

TypeScript забезпечує потужну систему типізації, яка покращує якість коду, зменшує кількість помилок та покращує розробку великих проектів.
