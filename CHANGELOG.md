# Changelog

## [Unreleased]

### Added
- Каркас Expo-приложения: `package.json`, `app.json`, `tsconfig.json`, `babel.config.js`, `App.tsx`, `index.ts`
- Дизайн-система `src/theme`: цвета (тёмная премиум-тема, коралловый акцент), типографика (Montserrat/Inter), отступы, скругления, тени
- Доменные типы `src/types`: профиль, упражнения, тренировки, зоны тела, подписка
- Генератор 30-дневной программы `src/constants/program.ts` (5 шаблонов тренировок, цикл 3/1, рост интенсивности по неделям)
- Zustand-сторы: `useUserStore`, `useWorkoutStore`, `useProgressStore`, `useSubscriptionStore` (с персистом в AsyncStorage)
- API-сервисы: `api.ts` (fetch-обёртка), `auth.ts`, `workouts.ts`, `aiCoach.ts` (с офлайн-фолбэком)
- Навигация: `RootNavigator` (Onboarding / Main / Paywall / WorkoutPlayer), `MainTabs` (Сегодня, Костя, Карта тела, Профиль)
- UI-компоненты: `Button`, `Card`, `ProgressBar`, `Badge`, `ScreenContainer`
- Экраны: `OnboardingScreen`, `HomeScreen`, `WorkoutPlayerScreen` (таймер интервалов), `KostaScreen` (чат-тренер), `BodyMapScreen` (карта тела), `ProfileScreen`, `PaywallScreen`
- Backend (NestJS): модули `auth`, `users`, `workouts`, `ai`, `progress`, `payments`, Swagger на `/api/docs`
- `docs/api-contract.md` — контракт REST API v1
- CI-workflow: typecheck фронтенда + сборка backend
- `.gitignore`

### Changed
- Nothing yet

### Fixed
- Nothing yet
