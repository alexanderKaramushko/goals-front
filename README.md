# Goals Front

Frontend-приложение социальной системы целей и наград из набора Melkor Apps. Пользователь создаёт
цели и шаги, запускает их выполнение, отслеживает прогресс и завершает либо отменяет цели.

Приложение работает совместно с `goals-service` и auth-сервисом. Backend-пути доступны frontend через
Vite proxy в локальной разработке и должны проксироваться тем же образом в production.

## Возможности

- вход через Google OAuth;
- просмотр собственных целей по статусам;
- создание целей и последовательности шагов;
- активация и удаление новых целей;
- завершение и отмена активных целей;
- отображение и завершение шагов;
- просмотр списка пользователей и их статистики;
- светлая и тёмная цветовые схемы;
- Docusaurus-документация экранов и общих компонентов.

Кнопка перехода к целям выбранного пользователя уже отображается, но отдельный маршрут и обработчик
этого действия пока не реализованы.

## Архитектура

Код организован по слоям, близким к Feature-Sliced Design:

```text
Route
  ↓
Page / Layout
  ↓
Widget / Feature
  ↓
Entity API
  ↓
goals-service / auth-service
```

- `app` инициализирует приложение, маршруты и тему;
- `pages` содержит экраны и layout-компоненты;
- `widgets` объединяет крупные самостоятельные части интерфейса;
- `features` реализует пользовательские действия;
- `entities` содержит API-запросы и типы предметной области;
- `shared` содержит общие компоненты, библиотеки, иконки и утилиты.

## Технологический стек

- Node.js 24 и TypeScript 6;
- React 19 и React Router 8;
- Vite 8;
- MUI и MUI X Date Pickers;
- TanStack Query и Axios;
- Day.js и Motion;
- Docusaurus 3;
- ESLint и Prettier.

## Быстрый запуск

### Требования

- Node.js `24.0.0` из `.nvmrc`;
- npm и `package-lock.json`;
- доступные `goals-service` и auth-сервис для защищённых сценариев.

Установить рекомендуемую версию Node.js и зависимости:

```bash
nvm use
npm ci
npm --prefix docs ci
```

### Настройка окружения

Скопировать `.env.example` в `.env`:

```bash
cp .env.example .env
```

Основные переменные:

| Переменная               | Назначение                                       |
| ------------------------ | ------------------------------------------------ |
| `VITE_APP_TITLE`         | Название приложения на экране входа              |
| `VITE_APP_ID`            | Идентификатор приложения для auth-сервиса        |
| `VITE_GOALS_SERVICE_API` | Адрес goals-service для dev-proxy `/api`         |
| `VITE_GOALS_AUTH_API`    | Адрес auth-сервиса для входа и dev-proxy `/auth` |

### Локальный запуск

```bash
npm run dev
```

Vite запускает приложение на `http://localhost:5173`. Публичный экран входа доступен по маршруту
`/login`.

### Сборка

```bash
npm run build
```

Команда выполняет TypeScript project build и создаёт production-файлы в `dist/`.

Локальная проверка production-сборки:

```bash
npm run preview
```

## Работа с API

Frontend обращается к относительным путям:

- `/auth` — профиль пользователя и взаимодействие с auth-сервисом;
- `/api/v1` — пользователи, цели и шаги goals-service.

В режиме разработки Vite проксирует эти запросы на адреса из `.env`. Клиент goals-service добавляет
`x-user-timezone`, который backend использует при проверке дедлайнов.

Типы основного API обновляются из OpenAPI-схемы:

```bash
npm run generate:types
```

Команда перезаписывает `src/entities/api/api-types.ts`.

## Тестирование

Автоматические unit- и e2e-тесты в репозитории пока не настроены. Доступны статические проверки:

```bash
npm run lint
npm run format:check
npm run build
```

## Документация

- [Техническое задание](https://goals-front-nu.vercel.app/);
- [Документация](https://goals-front-nu.vercel.app/documentation);
- экраны:
  - [Вход](https://goals-front-nu.vercel.app/screens/login);
  - [Цели](https://goals-front-nu.vercel.app/screens/goals);
  - [Новая цель: просмотр и действия](https://goals-front-nu.vercel.app/screens/new-goal-actions);
  - [Создание цели](https://goals-front-nu.vercel.app/screens/create-goal);
  - [Пользователи](https://goals-front-nu.vercel.app/screens/users);
- [Общие shared-компоненты](https://goals-front-nu.vercel.app/ui/common-elements).

Локальный запуск и production-сборка Docusaurus:

```bash
npm run docs:start
npm run docs:build
```

Docusaurus dev-сервер доступен на `http://localhost:3005`.

## Эксплуатация

Результатом production-сборки является статический каталог `dist/`. Внешний web-сервер должен:

- отдавать `index.html` для клиентских маршрутов `/app`, `/app/create-goal`, `/users` и `/login`;
- проксировать `/api` в goals-service;
- проксировать `/auth` в auth-сервис;
- работать по HTTPS, чтобы auth-cookie передавалась безопасно.

Конфигурация web-сервера, контейнеризация и мониторинг в этот репозиторий не входят.

## Связанные репозитории

- [goals-service](https://github.com/alexanderKaramushko/goals-service) — backend пользователей,
  целей, шагов и наград.
