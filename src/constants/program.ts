import { BodyZone, Exercise, Workout } from '@/types';

/** Шаблоны упражнений — база для генерации 30-дневного плана. */

const ex = (
  id: string,
  name: string,
  targetZone: BodyZone,
  coachTip: string,
  opts: Partial<Exercise> = {},
): Exercise => ({
  id,
  name,
  durationSec: null,
  reps: 12,
  sets: 3,
  restSec: 30,
  coachTip,
  targetZone,
  ...opts,
});

const WORKOUT_TEMPLATES: Workout[] = [
  {
    id: 'w-full-ignite',
    day: 0,
    title: 'Жиросжигающий старт',
    focus: 'full_body',
    durationMin: 18,
    intensity: 1,
    kcalEstimate: 140,
    exercises: [
      ex('e1', 'Разогрев: махи руками', 'full_body', 'Начинаем мягко — разгоняем кровь!', {
        durationSec: 60,
        sets: 1,
      }),
      ex('e2', 'Приседания', 'legs', 'Спина прямая, колени не выходят за носки.', { reps: 15 }),
      ex('e3', 'Отжимания от колен', 'chest', 'Локти вдоль тела — работают грудные.', {
        reps: 10,
      }),
      ex('e4', 'Планка на предплечьях', 'abs', 'Живот подтянут, дышим ровно.', {
        durationSec: 30,
        sets: 3,
      }),
      ex('e5', 'Ягодичный мостик', 'glutes', 'Сжимай ягодицы в верхней точке.', { reps: 15 }),
    ],
  },
  {
    id: 'w-abs-core',
    day: 0,
    title: 'Пресс и талия',
    focus: 'abs',
    durationMin: 15,
    intensity: 2,
    kcalEstimate: 110,
    exercises: [
      ex('e1', 'Скручивания', 'abs', 'Подбородок не прижимаем к груди.', { reps: 20 }),
      ex('e2', 'Велосипед', 'abs', 'Медленно и подконтрольно — качество важнее скорости.', {
        durationSec: 45,
      }),
      ex('e3', 'Боковая планка (лево)', 'abs', 'Тело — прямая линия.', {
        durationSec: 25,
        sets: 2,
      }),
      ex('e4', 'Боковая планка (право)', 'abs', 'Держим дыхание ровным.', {
        durationSec: 25,
        sets: 2,
      }),
      ex('e5', 'Вакуум живота', 'abs', 'Вдох-выдох, втягиваем живот на 10 секунд.', {
        durationSec: 40,
        sets: 3,
        restSec: 20,
      }),
    ],
  },
  {
    id: 'w-legs-glutes',
    day: 0,
    title: 'Ноги и ягодицы',
    focus: 'glutes',
    durationMin: 20,
    intensity: 2,
    kcalEstimate: 170,
    exercises: [
      ex('e1', 'Выпады на месте', 'legs', 'Колено задней ноги почти касается пола.', {
        reps: 12,
      }),
      ex('e2', 'Плие-приседания', 'legs', 'Носки в стороны — включается внутренняя часть бедра.', {
        reps: 15,
      }),
      ex('e3', 'Отведение ноги стоя', 'glutes', 'Работает ягодица, а не спина.', {
        reps: 15,
        sets: 3,
      }),
      ex('e4', 'Ягодичный мостик с паузой', 'glutes', 'Задержись на 2 секунды вверху.', { reps: 15 }),
      ex('e5', 'Стульчик у стены', 'legs', 'Бедра параллельны полу. Дыши!', {
        durationSec: 45,
        sets: 3,
      }),
    ],
  },
  {
    id: 'w-upper',
    day: 0,
    title: 'Руки и спина',
    focus: 'arms',
    durationMin: 16,
    intensity: 2,
    kcalEstimate: 120,
    exercises: [
      ex('e1', 'Отжимания узким хватом', 'arms', 'Локти назад — качаем трицепс.', { reps: 10 }),
      ex('e2', 'Супермен', 'back', 'Тянемся руками и ногами вверх.', { reps: 15 }),
      ex('e3', 'Обратные отжимания', 'arms', 'Локти строго назад.', { reps: 12 }),
      ex('e4', 'Тяга к подбородку (с полотенцем)', 'shoulders', 'Локти выше кистей.', { reps: 14 }),
      ex('e5', 'Планка с подъёмом рук', 'back', 'Корпус неподвижен.', {
        durationSec: 40,
        sets: 3,
      }),
    ],
  },
  {
    id: 'w-hiit-lite',
    day: 0,
    title: 'HIIT без прыжков',
    focus: 'full_body',
    durationMin: 14,
    intensity: 3,
    kcalEstimate: 190,
    exercises: [
      ex('e1', 'Бег на месте с высоким коленом', 'full_body', 'Темп максимальный 30 секунд!', {
        durationSec: 30,
        restSec: 15,
      }),
      ex('e2', 'Бёрпи без прыжка', 'full_body', 'Ускоряемся, но техника — прежде всего.', {
        durationSec: 30,
        restSec: 15,
      }),
      ex('e3', 'Скалолаз', 'abs', 'Колени к груди, темп держим!', {
        durationSec: 30,
        restSec: 15,
      }),
      ex('e4', 'Прыжок звездой (low impact)', 'full_body', 'Можно без прыжка — шаг в сторону.', {
        durationSec: 30,
        restSec: 15,
      }),
    ],
  },
];

/**
 * Генерация 30-дневного плана.
 * Цикл: 3 дня тренировок → 1 день отдыха, интенсивность растёт по неделям.
 */
export function buildThirtyDayPlan(startDate: Date): Array<{ day: number; isRestDay: boolean; workoutId: string | null }> {
  const plan: Array<{ day: number; isRestDay: boolean; workoutId: string | null }> = [];
  for (let day = 1; day <= 30; day += 1) {
    const isRestDay = day % 4 === 0;
    const week = Math.floor((day - 1) / 7);
    const templateIndex = (day + week) % WORKOUT_TEMPLATES.length;
    plan.push({
      day,
      isRestDay,
      workoutId: isRestDay ? null : WORKOUT_TEMPLATES[templateIndex].id,
    });
  }
  return plan;
}

export function getWorkoutTemplate(id: string): Workout | undefined {
  return WORKOUT_TEMPLATES.find((w) => w.id === id);
}

/** Подготовить Workout под конкретный день (проставить day + интенсивность по неделе). */
export function workoutForDay(id: string, day: number): Workout | null {
  const template = getWorkoutTemplate(id);
  if (!template) return null;
  const week = Math.floor((day - 1) / 7);
  const intensity = Math.min(3, template.intensity + (week >= 2 ? 1 : 0)) as 1 | 2 | 3;
  return { ...template, day, intensity };
}

export const PROGRAM_LENGTH_DAYS = 30;
export const WORKOUT_TEMPLATES_LIST = WORKOUT_TEMPLATES;
