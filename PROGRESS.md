# Kosta Method — Прогресс

## Текущий этап
Этап 1: MVP фронтенда + каркас backend

## Выполнено
- [x] step-00: инициализация проекта
- [x] step-01: инициализация PROGRESS.md, CHANGELOG.md, README.md
- [x] step-02: каркас Expo-приложения (TypeScript, конфиги), дизайн-система, доменные типы, генератор 30-дневной программы
- [x] step-03: Zustand-сторы (user, workout, progress, subscription) и API-сервисы (api, auth, workouts, aiCoach)
- [x] step-04: навигация (RootStack + BottomTabs), 7 экранов, базовые UI-компоненты
- [x] step-05: backend NestJS — модули auth, users, workouts, ai, progress, payments + Swagger
- [x] step-06: docs/api-contract.md, CI-workflow (typecheck frontend + build backend)

## Блокеры
- **Push в GitHub**: требуется добавить новый deploy key (публичная часть передана пользователю в чате), см. sessions/2026-10-15.md

## Следующий шаг
- step-07: экраны онбординга-профиля (замеры, фото), интеграция RevenueCat (клиент)
- step-08: JwtAuthGuard + PostgreSQL-слой на backend, хеширование паролей
- step-09: интеграция OpenAI-чата Кости с контекстом плана
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
