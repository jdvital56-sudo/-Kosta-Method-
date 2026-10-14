import { Injectable, NotFoundException } from '@nestjs/common';

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

interface CompletionRecord {
  userId: string;
  workoutId: string;
  durationMin: number;
  kcal: number;
  completedAt: string;
}

const SEED_WORKOUTS: WorkoutDto[] = [
  {
    id: 'w-full-ignite',
    day: 1,
    title: 'Жиросжигающий старт',
    focus: 'full_body',
    durationMin: 18,
    intensity: 1,
    kcalEstimate: 140,
    exercises: [
      {
        id: 'e1',
        name: 'Разогрев: махи руками',
        durationSec: 60,
        reps: null,
        sets: 1,
        restSec: 15,
        coachTip: 'Начинаем мягко — разгоняем кровь!',
        targetZone: 'full_body',
      },
      {
        id: 'e2',
        name: 'Приседания',
        durationSec: null,
        reps: 15,
        sets: 3,
        restSec: 30,
        coachTip: 'Спина прямая, колени не выходят за носки.',
        targetZone: 'legs',
      },
    ],
  },
  {
    id: 'w-abs-core',
    day: 2,
    title: 'Пресс и талия',
    focus: 'abs',
    durationMin: 15,
    intensity: 2,
    kcalEstimate: 110,
    exercises: [
      {
        id: 'e1',
        name: 'Скручивания',
        durationSec: null,
        reps: 20,
        sets: 3,
        restSec: 30,
        coachTip: 'Подбородок не прижимаем к груди.',
        targetZone: 'abs',
      },
      {
        id: 'e2',
        name: 'Планка на предплечьях',
        durationSec: 30,
        reps: null,
        sets: 3,
        restSec: 30,
        coachTip: 'Живот подтянут, дышим ровно.',
        targetZone: 'abs',
      },
    ],
  },
];

@Injectable()
export class WorkoutsService {
  private readonly completions: CompletionRecord[] = [];

  /** MVP: возвращает демо-программу. TODO(step-09): генерация под профиль + PostgreSQL. */
  getProgram() {
    return SEED_WORKOUTS.map((w, index) => ({
      day: index + 1,
      date: new Date().toISOString().slice(0, 10),
      workout: w,
      isCompleted: false,
      isRestDay: false,
    }));
  }

  getWorkout(id: string): WorkoutDto {
    const workout = SEED_WORKOUTS.find((w) => w.id === id);
    if (!workout) throw new NotFoundException('Тренировка не найдена');
    return workout;
  }

  complete(userId: string, body: { workoutId: string; durationMin: number; kcal: number; completedAt: string }) {
    this.getWorkout(body.workoutId); // валидация существования
    this.completions.push({ userId, ...body });
    return { ok: true };
  }

  listCompletions(userId: string) {
    return this.completions.filter((c) => c.userId === userId);
  }
}
