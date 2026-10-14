/** Каталог программ и шаблоны тренировок для backend (MVP-версия, зеркало клиента). */

export interface ExerciseDto {
  id: string;
  name: string;
  durationSec: number | null;
  reps: number | null;
  sets: number;
  restSec: number;
  coachTip: string;
  targetZone: string;
}

export interface WorkoutDto {
  id: string;
  day: number;
  title: string;
  focus: string;
  durationMin: number;
  intensity: 1 | 2 | 3;
  kcalEstimate: number;
  exercises: ExerciseDto[];
}

export interface ProgramMeta {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  durationDays: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  focus: string[];
  kcalRange: [number, number];
  workoutMinutes: number;
  templateIds: string[];
  workDaysPerCycle: number;
}

const exercise = (
  id: string,
  name: string,
  targetZone: string,
  coachTip: string,
  opts: Partial<ExerciseDto> = {},
): ExerciseDto => ({
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

export const SEED_WORKOUTS: WorkoutDto[] = [
  {
    id: 'w-full-ignite',
    day: 0,
    title: 'Жиросжигающий старт',
    focus: 'full_body',
    durationMin: 18,
    intensity: 1,
    kcalEstimate: 140,
    exercises: [
      exercise('e1', 'Разогрев: махи руками', 'full_body', 'Начинаем мягко — разгоняем кровь!', {
        durationSec: 60,
        sets: 1,
      }),
      exercise('e2', 'Приседания', 'legs', 'Спина прямая, колени не выходят за носки.', {
        reps: 15,
      }),
      exercise('e3', 'Отжимания от колен', 'chest', 'Локти вдоль тела — работают грудные.', {
        reps: 10,
      }),
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
      exercise('e1', 'Скручивания', 'abs', 'Подбородок не прижимаем к груди.', { reps: 20 }),
      exercise('e2', 'Велосипед', 'abs', 'Медленно и подконтрольно.', { durationSec: 45 }),
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
      exercise('e1', 'Выпады на месте', 'legs', 'Колено задней ноги почти касается пола.', {
        reps: 12,
      }),
      exercise('e2', 'Ягодичный мостик', 'glutes', 'Сжимай ягодицы в верхней точке.', { reps: 15 }),
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
      exercise('e1', 'Отжимания узким хватом', 'arms', 'Локти назад — качаем трицепс.', {
        reps: 10,
      }),
      exercise('e2', 'Супермен', 'back', 'Тянемся руками и ногами вверх.', { reps: 15 }),
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
      exercise('e1', 'Бег на месте с высоким коленом', 'full_body', 'Темп максимальный!', {
        durationSec: 30,
        restSec: 15,
      }),
      exercise('e2', 'Бёрпи без прыжка', 'full_body', 'Техника — прежде всего.', {
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
      exercise('e1', 'Наклон к ногам сидя', 'legs', 'Тянемся грудью, а не головой.', {
        durationSec: 40,
        sets: 2,
      }),
      exercise('e2', 'Кошка-корова', 'back', 'Медленно, синхронно с дыханием.', {
        durationSec: 45,
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
      exercise('e1', 'Супермен с паузой', 'back', 'Задержка 2 секунды в верхней точке.', {
        reps: 12,
      }),
      exercise('e2', 'Тяга лопаток стоя', 'back', 'Сводим лопатки, шея расслаблена.', {
        reps: 15,
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
      exercise('e1', 'Отжимания с колен', 'chest', 'Локти под 45° к телу.', { reps: 10 }),
      exercise('e2', 'Обратные отжимания', 'arms', 'Плечи вниз, локти назад.', { reps: 12 }),
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
      exercise('e1', 'Шаг в сторону с махом', 'full_body', 'Включаем музыку и улыбаемся!', {
        durationSec: 60,
        sets: 1,
      }),
      exercise('e2', 'Вращения бёдрами', 'abs', 'Сильный центр, лёгкие ноги.', {
        durationSec: 45,
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
      exercise('e1', 'Потягивания стоя', 'full_body', 'Просыпаем тело мягко.', {
        durationSec: 40,
        sets: 1,
      }),
      exercise('e2', 'Приседания в темпе', 'legs', 'Включаем кровообращение.', { reps: 15 }),
    ],
  },
];

export const TRAINING_PROGRAMS: ProgramMeta[] = [
  {
    id: 'p-weight-loss-30',
    title: 'Похудение дома · 30 дней',
    subtitle: 'Классика Kosta Method',
    description: 'Флагманская программа: жиросжигающие тренировки без оборудования.',
    durationDays: 30,
    level: 'beginner',
    focus: ['full_body', 'abs', 'legs'],
    kcalRange: [110, 190],
    workoutMinutes: 18,
    templateIds: ['w-full-ignite', 'w-abs-core', 'w-legs-glutes', 'w-upper', 'w-hiit-lite'],
    workDaysPerCycle: 3,
  },
  {
    id: 'p-flat-stomach-21',
    title: 'Плоский живот · 21 день',
    subtitle: 'Фокус на пресс и талию',
    description: 'Ежедневные короткие тренировки на пресс, косые мышцы и глубокий центр.',
    durationDays: 21,
    level: 'beginner',
    focus: ['abs'],
    kcalRange: [90, 150],
    workoutMinutes: 15,
    templateIds: ['w-abs-core', 'w-morning-boost', 'w-full-ignite', 'w-abs-core'],
    workDaysPerCycle: 4,
  },
  {
    id: 'p-legs-glutes-30',
    title: 'Ноги и ягодицы · 30 дней',
    subtitle: 'Упругая попа без зала',
    description: 'Проработка ног и ягодиц, кардио-дни между ними.',
    durationDays: 30,
    level: 'intermediate',
    focus: ['glutes', 'legs'],
    kcalRange: [120, 190],
    workoutMinutes: 20,
    templateIds: ['w-legs-glutes', 'w-dance-cardio', 'w-legs-glutes', 'w-stretch'],
    workDaysPerCycle: 3,
  },
  {
    id: 'p-hiit-burn-14',
    title: 'HIIT-сжигание · 14 дней',
    subtitle: 'Максимум калорий за минимум времени',
    description: 'Интенсивные интервалы без прыжков — безопасно для коленей.',
    durationDays: 14,
    level: 'advanced',
    focus: ['full_body'],
    kcalRange: [170, 250],
    workoutMinutes: 16,
    templateIds: ['w-hiit-lite', 'w-full-ignite', 'w-dance-cardio', 'w-hiit-lite'],
    workDaysPerCycle: 2,
  },
  {
    id: 'p-back-posture-21',
    title: 'Спина и осанка · 21 день',
    subtitle: 'Для тех, кто за компьютером',
    description: 'Укрепление мышц спины, снятие зажимов, красивая осанка.',
    durationDays: 21,
    level: 'beginner',
    focus: ['back', 'shoulders'],
    kcalRange: [70, 120],
    workoutMinutes: 15,
    templateIds: ['w-back-posture', 'w-stretch', 'w-upper', 'w-back-posture'],
    workDaysPerCycle: 3,
  },
  {
    id: 'p-arms-chest-30',
    title: 'Грудь и руки · 30 дней',
    subtitle: 'Подтянутые руки и зона декольте',
    description: 'Программа на верх тела: грудные, трицепс, плечи.',
    durationDays: 30,
    level: 'intermediate',
    focus: ['chest', 'arms', 'shoulders'],
    kcalRange: [100, 160],
    workoutMinutes: 16,
    templateIds: ['w-arms-chest', 'w-upper', 'w-arms-chest', 'w-stretch'],
    workDaysPerCycle: 3,
  },
  {
    id: 'p-habit-45',
    title: 'Привычка тренироваться · 45 дней',
    subtitle: 'Старт для новичков',
    description: 'Мягкое погружение: короткие тренировки, минимум нагрузки, максимум регулярности.',
    durationDays: 45,
    level: 'beginner',
    focus: ['full_body'],
    kcalRange: [60, 130],
    workoutMinutes: 12,
    templateIds: ['w-morning-boost', 'w-stretch', 'w-full-ignite', 'w-morning-boost'],
    workDaysPerCycle: 3,
  },
  {
    id: 'p-dance-fun-30',
    title: 'Танцевальное похудение · 30 дней',
    subtitle: 'Тренировки в удовольствие',
    description: 'Кардио на основе танцевальных движений: весело и эффективно.',
    durationDays: 30,
    level: 'intermediate',
    focus: ['full_body', 'glutes'],
    kcalRange: [150, 220],
    workoutMinutes: 20,
    templateIds: ['w-dance-cardio', 'w-legs-glutes', 'w-dance-cardio', 'w-stretch'],
    workDaysPerCycle: 3,
  },
];

export interface ProgramPlanEntry {
  day: number;
  isRestDay: boolean;
  workoutId: string | null;
}

export function buildProgramPlan(program: ProgramMeta): ProgramPlanEntry[] {
  const plan: ProgramPlanEntry[] = [];
  for (let day = 1; day <= program.durationDays; day += 1) {
    const isRestDay = day % (program.workDaysPerCycle + 1) === 0;
    plan.push({
      day,
      isRestDay,
      workoutId: isRestDay ? null : program.templateIds[(day - 1) % program.templateIds.length],
    });
  }
  return plan;
}
