# Kosta Method

Мобильное приложение для женского фитнеса (iOS + Android) — лучшая версия приложения для похудения дома с виртуальным тренером Кости.

## Продукт

- **Кости (Kosta)** — виртуальный тренер: ведёт пользователя через 30 дней, демонстрирует упражнения, мотивирует
- Чёткий 30-дневный план с персонализацией (AI подстраивает нагрузку)
- Геймификация, эмоциональная связь с персонажем
- «Карта тела» — визуализация прогресса по зонам
- Тёмная премиум-тема с коралловым акцентом
- 7 дней полного доступа бесплатно, без агрессивного paywall

## Стек

| Слой | Технологии |
|------|------------|
| Frontend | React Native (Expo SDK 51+), TypeScript, React Navigation 6, Zustand |
| Backend | Node.js (NestJS), TypeScript |
| DB | PostgreSQL 15 + Redis |
| Auth | Firebase Auth / JWT |
| Payments | RevenueCat |
| Media | AWS S3 + CloudFront |
| AI | OpenAI API (gpt-4o-mini) |
| Analytics | Mixpanel |
| Push | Firebase Cloud Messaging |

## Структура репозитория

```
docs/               — документация (recon, design-system, api-contract)
src/screens/        — экраны приложения
src/components/     — переиспользуемые компоненты
src/navigation/     — навигация
src/services/       — API-сервисы
src/store/          — состояние (Zustand)
assets/character/   — ассеты персонажа Кости
assets/icons/       — иконки
backend/            — NestJS-сервер
.github/workflows/  — CI/CD
PLAN.md             — план работ
PROGRESS.md         — текущий прогресс
CHANGELOG.md        — история изменений
sessions/           — журнал рабочих сессий
```

## Дизайн-система (кратко)

- Primary `#1A1A2E`, Accent `#E94560`, Background `#0F0F1A`, Surface `#1E1E2E`
- Заголовки: Montserrat Bold, текст: Inter Regular
- Скругления: карточки 16px, кнопки/инпуты 12px

## Монетизация

| План | Цена | Что входит |
|------|------|------------|
| Free | $0 | 7 дней плана, базовые тренировки |
| Monthly | $9.99 | всё + AI, карта тела, фото |
| Yearly | $59.99 | то же, скидка 50% |
| Lifetime | $99.99 | навсегда |
