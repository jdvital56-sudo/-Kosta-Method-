import { BodyZone, TrainingProgram, Workout } from '@/types';

/** Все шаблоны тренировок (база для сборки любых программ). */
const ex = (
  id: string,
  name: string,
  targetZone: BodyZone,
  coachTip: string,
  opts: Partial<Workout['exercises'][number]> = {},
): Workout['exercises'][number] => ({
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

export const WORKOUT_TEMPLATES: Workout[] = [
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
      ex('e3', 'Отжимания от колен', 'chest', 'Локти вдоль тела — работают грудные.', { reps: 10 }),
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
      ex('e3', 'Боковая планка (лево)', 'abs', 'Тело — прямая линия.', { durationSec: 25, sets: 2 }),
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
      ex('e1', 'Выпады на месте', 'legs', 'Колено задней ноги почти касается пола.', { reps: 12 }),
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
      ex('e5', 'Планка с подъёмом рук', 'back', 'Корпус неподвижен.', { durationSec: 40, sets: 3 }),
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
  {
    id: 'w-stretch',
    day: 0,
    title: 'Растяжка и гибкость',
    focus: 'full_body',
    durationMin: 12,
    intensity: 1,
    kcalEstimate: 60,
    exercises: [
      ex('e1', 'Наклон к ногам сидя', 'legs', 'Тянемся грудью, а не головой.', {
        durationSec: 40,
        sets: 2,
      }),
      ex('e2', 'Поза голубя', 'glutes', 'Дышим глубоко, расслабляем бёдра.', {
        durationSec: 45,
        sets: 2,
      }),
      ex('e3', 'Кошка-корова', 'back', 'Медленно, синхронно с дыханием.', {
        durationSec: 45,
        sets: 2,
      }),
      ex('e4', 'Растяжка грудных в дверном проёме', 'chest', 'Плечи опущены.', {
        durationSec: 30,
        sets: 2,
      }),
    ],
  },
  {
    id: 'w-back-posture',
    day: 0,
    title: 'Спина и осанка',
    focus: 'back',
    durationMin: 15,
    intensity: 2,
    kcalEstimate: 100,
    exercises: [
      ex('e1', 'Супермен с паузой', 'back', 'Задержка 2 секунды в верхней точке.', { reps: 12 }),
      ex('e2', 'Тяга лопаток стоя', 'back', 'Сводим лопатки, шея расслаблена.', { reps: 15 }),
      ex('e3', 'Мостик', 'glutes', 'Поясница не переразгибается.', { reps: 15 }),
      ex('e4', 'Планка', 'abs', 'Тело — прямая линия от макушки до пяток.', {
        durationSec: 40,
        sets: 3,
      }),
      ex('e5', 'Растяжка «кошка»', 'back', 'Плавно, без рывков.', {
        durationSec: 40,
        sets: 2,
        restSec: 20,
      }),
    ],
  },
  {
    id: 'w-arms-chest',
    day: 0,
    title: 'Грудь и руки',
    focus: 'chest',
    durationMin: 16,
    intensity: 2,
    kcalEstimate: 120,
    exercises: [
      ex('e1', 'Отжимания с колен', 'chest', 'Локти под 45° к телу.', { reps: 10 }),
      ex('e2', 'Алмазные отжимания', 'arms', 'Руки — ромбом под грудью.', { reps: 8 }),
      ex('e3', 'Обратные отжимания', 'arms', 'Плечи вниз, локти назад.', { reps: 12 }),
      ex('e4', 'Пуловер с полотенцем', 'chest', 'Растягиваем грудные.', { reps: 14 }),
      ex('e5', 'Планка на руках', 'abs', 'Корпус держим жёстко.', {
        durationSec: 35,
        sets: 3,
      }),
    ],
  },
  {
    id: 'w-dance-cardio',
    day: 0,
    title: 'Танцевальное кардио',
    focus: 'full_body',
    durationMin: 20,
    intensity: 2,
    kcalEstimate: 180,
    exercises: [
      ex('e1', 'Шаг в сторону с махом', 'full_body', 'Включаем музыку и улыбаемся!', {
        durationSec: 60,
        sets: 1,
      }),
      ex('e2', 'Прыжки «звезда»', 'full_body', 'Можно без прыжка — шагаем широко.', {
        durationSec: 45,
        restSec: 20,
      }),
      ex('e3', 'Вращения бёдрами', 'abs', 'Сильный центр, лёгкие ноги.', { durationSec: 45 }),
      ex('e4', 'Мостик + подъём колена', 'glutes', 'Ритм важнее скорости!', {
        durationSec: 45,
        restSec: 20,
      }),
    ],
  },
  {
    id: 'w-morning-boost',
    day: 0,
    title: 'Утренний заряд',
    focus: 'full_body',
    durationMin: 10,
    intensity: 1,
    kcalEstimate: 70,
    exercises: [
      ex('e1', 'Потягивания стоя', 'full_body', 'Просыпаем тело мягко.', {
        durationSec: 40,
        sets: 1,
      }),
      ex('e2', 'Наклоны в стороны', 'abs', 'Растягиваем бока.', { reps: 12 }),
      ex('e3', 'Приседания в темпе', 'legs', 'Включаем кровообращение.', { reps: 15 }),
      ex('e4', 'Дыхание 4-7-8', 'full_body', 'Вдох 4, задержка 7, выдох 8.', {
        durationSec: 60,
        sets: 1,
        restSec: 10,
      }),
    ],
  },
];

export const TRAINING_PROGRAMS: TrainingProgram[] = [
  {
    id: 'p-weight-loss-30',
    title: 'Похудение дома · 30 дней',
    subtitle: 'Классика Kosta Method',
    description:
      'Флагманская программа: жиросжигающие тренировки без оборудования, рост нагрузки по неделям и контроль прогресса.',
    durationDays: 30,
    level: 'beginner',
    focus: ['full_body', 'abs', 'legs'],
    coverEmoji: '🔥',
    kcalRange: [110, 190],
    workoutMinutes: 18,
    templateIds: ['w-full-ignite', 'w-abs-core', 'w-legs-glutes', 'w-upper', 'w-hiit-lite'],
    workDaysPerCycle: 3,
  },
  {
    id: 'p-flat-stomach-21',
    title: 'Плоский живот · 21 день',
    subtitle: 'Фокус на пресс и талию',
    description:
      'Ежедневные короткие тренировки на пресс, косые мышцы и глубокий центр. Плюс дыхательные практики для «вакуума».',
    durationDays: 21,
    level: 'beginner',
    focus: ['abs'],
    coverEmoji: '🎯',
    kcalRange: [90, 150],
    workoutMinutes: 15,
    templateIds: ['w-abs-core', 'w-morning-boost', 'w-full-ignite', 'w-abs-core'],
    workDaysPerCycle: 4,
  },
  {
    id: 'p-legs-glutes-30',
    title: 'Ноги и ягодицы · 30 дней',
    subtitle: 'Упругая попа без зала',
    description:
      'Проработка ног и ягодиц 3 раза в неделю, кардио-дни между ними. Идеально для домашних тренировок с собственным весом.',
    durationDays: 30,
    level: 'intermediate',
    focus: ['glutes', 'legs'],
    coverEmoji: '🍑',
    kcalRange: [120, 190],
    workoutMinutes: 20,
    templateIds: ['w-legs-glutes', 'w-dance-cardio', 'w-legs-glutes', 'w-stretch'],
    workDaysPerCycle: 3,
  },
  {
    id: 'p-hiit-burn-14',
    title: 'HIIT-сжигание · 14 дней',
    subtitle: 'Максимум калорий за минимум времени',
    description:
      'Интенсивные интервальные тренировки без прыжков — безопасно для коленей, но очень эффективно для похудения.',
    durationDays: 14,
    level: 'advanced',
    focus: ['full_body'],
    coverEmoji: '⚡',
    kcalRange: [170, 250],
    workoutMinutes: 16,
    templateIds: ['w-hiit-lite', 'w-full-ignite', 'w-dance-cardio', 'w-hiit-lite'],
    workDaysPerCycle: 2,
  },
  {
    id: 'p-back-posture-21',
    title: 'Спина и осанка · 21 день',
    subtitle: 'Для тех, кто за компьютером',
    description:
      'Укрепление мышц спины, снятие зажимов, формирование красивой осанки. Отлично сочетается с офисной работой.',
    durationDays: 21,
    level: 'beginner',
    focus: ['back', 'shoulders'],
    coverEmoji: '🧘',
    kcalRange: [70, 120],
    workoutMinutes: 15,
    templateIds: ['w-back-posture', 'w-stretch', 'w-upper', 'w-back-posture'],
    workDaysPerCycle: 3,
  },
  {
    id: 'p-arms-chest-30',
    title: 'Грудь и руки · 30 дней',
    subtitle: 'Подтянутые руки и красивая зона декольте',
    description:
      'Программа на верх тела: грудные, трицепс, плечи. Постепенный прогресс от коленных отжиманий к полным.',
    durationDays: 30,
    level: 'intermediate',
    focus: ['chest', 'arms', 'shoulders'],
    coverEmoji: '💪',
    kcalRange: [100, 160],
    workoutMinutes: 16,
    templateIds: ['w-arms-chest', 'w-upper', 'w-arms-chest', 'w-stretch'],
    workDaysPerCycle: 3,
  },
  {
    id: 'p-habit-45',
    title: 'Привычка тренироваться · 45 дней',
    subtitle: 'Старт для новичков',
    description:
      'Мягкое погружение: короткие тренировки 10-15 минут, минимум нагрузки, максимум регулярности. Сформируй привычку!',
    durationDays: 45,
    level: 'beginner',
    focus: ['full_body'],
    coverEmoji: '🌱',
    kcalRange: [60, 130],
    workoutMinutes: 12,
    templateIds: ['w-morning-boost', 'w-stretch', 'w-full-ignite', 'w-morning-boost'],
    workDaysPerCycle: 3,
  },
  {
    id: 'p-dance-fun-30',
    title: 'Танцевальное похудение · 30 дней',
    subtitle: 'Тренировки в удовольствие',
    description:
      'Кардио-программа на основе танцевальных движений. Весёлые тренировки, много энергии и отличное настроение.',
    durationDays: 30,
    level: 'intermediate',
    focus: ['full_body', 'glutes'],
    coverEmoji: '💃',
    kcalRange: [150, 220],
    workoutMinutes: 20,
    templateIds: ['w-dance-cardio', 'w-legs-glutes', 'w-dance-cardio', 'w-stretch'],
    workDaysPerCycle: 3,
  },
];

export function getProgram(id: string): TrainingProgram | undefined {
  return TRAINING_PROGRAMS.find((p) => p.id === id);
}

export function getWorkoutTemplate(id: string): Workout | undefined {
  return WORKOUT_TEMPLATES.find((w) => w.id === id);
}

/** Workout для конкретного дня программы (интенсивность растёт по неделям). */
export function workoutForDay(templateId: string, day: number): Workout | null {
  const template = getWorkoutTemplate(templateId);
  if (!template) return null;
  const week = Math.floor((day - 1) / 7);
  const intensity = Math.min(3, template.intensity + (week >= 2 ? 1 : 0)) as 1 | 2 | 3;
  return { ...template, day, intensity };
}

export interface ProgramPlanEntry {
  day: number;
  isRestDay: boolean;
  workoutId: string | null;
}

/** Сборка плана программы: цикл N тренировок → 1 отдых, шаблоны чередуются. */
export function buildProgramPlan(program: TrainingProgram): ProgramPlanEntry[] {
  const plan: ProgramPlanEntry[] = [];
  for (let day = 1; day <= program.durationDays; day += 1) {
    const isRestDay = day % (program.workDaysPerCycle + 1) === 0;
    const templateId = isRestDay
      ? null
      : program.templateIds[(day - 1) % program.templateIds.length];
    plan.push({ day, isRestDay, workoutId: templateId });
  }
  return plan;
}
