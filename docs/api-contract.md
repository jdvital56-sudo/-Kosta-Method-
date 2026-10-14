# Kosta Method — API Contract (v1)

Base URL: `https://api.kostamethod.app/api/v1` (локально: `http://localhost:3000/api/v1`)
Auth: `Authorization: Bearer <JWT>` (выдаётся через `/auth/*`)

## Auth

| Method | Path | Body | Response |
|--------|------|------|----------|
| POST | `/auth/sign-in` | `{ email, password }` | `{ accessToken, user }` |
| POST | `/auth/sign-up` | `{ email, password, name }` | `{ accessToken, user }` |

## Users

| Method | Path | Response |
|--------|------|----------|
| GET | `/users/me` | профиль пользователя (без пароля) |

## Workouts

| Method | Path | Body / Params | Response |
|--------|------|---------------|----------|
| GET | `/workouts/programs` | — | каталог программ тренировок (8 курсов) |
| GET | `/workouts/program?programId=` | `programId` (опц., по умолчанию флагманская) | `DayPlan[]` план программы |
| GET | `/workouts/:id` | — | `Workout` с упражнениями |
| GET | `/workouts/completions` | — | список завершённых тренировок |
| POST | `/workouts/completions` | `{ workoutId, durationMin, kcal, completedAt }` | `{ ok: true }` |

## AI Coach (Костя)

| Method | Path | Body | Response |
|--------|------|------|----------|
| POST | `/ai/coach` | `{ message, history: [{role, text}] }` | `{ text }` |

Поведение: при наличии `OPENAI_API_KEY` — вызов `gpt-4o-mini` с системным промптом
Кости; иначе — детерминированный фолбэк (приложение деградирует мягко, офлайн тоже работает).

## Progress

| Method | Path | Body / Params | Response |
|--------|------|---------------|----------|
| GET | `/progress/weights` | — | `WeightEntry[]` (до 90 последних) |
| POST | `/progress/weights` | `{ date, weightKg }` | `{ ok: true }` |
| GET | `/progress/zones` | — | `ZoneProgress[]` |
| POST | `/progress/zones` | `{ zone, tone }` | `{ ok: true }` |

## Payments (RevenueCat)

| Method | Path | Body | Response |
|--------|------|------|----------|
| POST | `/payments/webhooks/revenuecat` | событие RevenueCat | `{ received: true }` |
| GET | `/payments/entitlements?plan=` | — | `{ entitlement }` |

## Ошибки

Формат: `{ statusCode, message, error }`. Коды: `400` валидация, `401` auth, `404` не найдено.
