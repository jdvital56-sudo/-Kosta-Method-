/**
 * Конфигурация API.
 * Для локальной разработки: `adb reverse tcp:3000 tcp:3000` или указать IP хоста.
 */
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000/api/v1';
