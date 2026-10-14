# Kosta Method — Прогресс

## Текущий этап
Этап 1: MVP фронтенда + каркас backend

## Выполнено
- [x] step-00: инициализация проекта
- [x] step-01: инициализация PROGRESS.md, CHANGELOG.md, README.md
- [x] step-02: каркас Expo-приложения (TypeScript, конфиги), дизайн-система, доменные типы, генератор программы тренировок
- [x] step-03: Zustand-сторы (user, workout, progress, subscription) и API-сервисы (api, auth, workouts, aiCoach)
- [x] step-04: навигация (RootStack + BottomTabs), 7 экранов, базовые UI-компоненты
- [x] step-05: backend NestJS — модули auth, users, workouts, ai, progress, payments + Swagger
- [x] step-06: docs/api-contract.md, CI-workflow (typecheck frontend + build backend)
- [x] step-07: каталог из **8 программ тренировок** (14/21/30/45 дней), экран выбора программы, выбор программы в Home, `/workouts/programs` на backend

## Блокеры
нет (deploy key добавлен, push работает)

## Следующий шаг
- step-08: экраны замеров и фото-прогресса, интеграция RevenueCat (клиент)
- step-09: JwtAuthGuard + PostgreSQL-слой на backend, хеширование паролей
- step-10: тесты (jest) + EAS-сборка

## История коммитов
| Дата | Коммит | Что сделано |
|------|--------|-------------|
| 2026-10-13 | step-00 | инициализация проекта: структура папок, PROGRESS.md, CHANGELOG.md, README.md |
| 2026-10-15 | step-02 | каркас Expo-приложения, дизайн-система, типы и 30-дневная программа |
| 2026-10-15 | step-03 | Zustand-сторы и API-сервисы |
| 2026-10-15 | step-04 | навигация, компоненты, экраны |
| 2026-10-15 | step-05 | backend NestJS: auth/users/workouts/ai/progress/payments |
| 2026-10-15 | step-06 | API-контракт, CI, обновление документации |
| 2026-10-15 | step-07 | каталог 8 программ тренировок, экран выбора, /workouts/programs |
