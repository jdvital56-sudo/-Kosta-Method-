import { Injectable, NotFoundException } from '@nestjs/common';

import {
  buildProgramPlan,
  SEED_WORKOUTS,
  TRAINING_PROGRAMS,
  WorkoutDto,
} from './programs.catalog';

export { WorkoutDto };

interface CompletionRecord {
  userId: string;
  workoutId: string;
  durationMin: number;
  kcal: number;
  completedAt: string;
}

@Injectable()
export class WorkoutsService {
  private readonly completions: CompletionRecord[] = [];

  /** Каталог программ тренировок (MVP: статичный список из 8 курсов). */
  getPrograms() {
    return TRAINING_PROGRAMS.map((p) => ({
      id: p.id,
      title: p.title,
      subtitle: p.subtitle,
      description: p.description,
      durationDays: p.durationDays,
      level: p.level,
      focus: p.focus,
      kcalRange: p.kcalRange,
      workoutMinutes: p.workoutMinutes,
    }));
  }

  /** План программы (по умолчанию — флагманская). TODO(step-09): PostgreSQL. */
  getProgram(programId?: string) {
    const program =
      (programId ? TRAINING_PROGRAMS.find((p) => p.id === programId) : undefined) ??
      TRAINING_PROGRAMS[0];
    return buildProgramPlan(program).map((entry) => ({
      day: entry.day,
      date: new Date().toISOString().slice(0, 10),
      workout: entry.workoutId ? this.getWorkout(entry.workoutId) : null,
      isCompleted: false,
      isRestDay: entry.isRestDay,
    }));
  }

  getWorkout(id: string): WorkoutDto {
    const workout = SEED_WORKOUTS.find((w) => w.id === id);
    if (!workout) throw new NotFoundException('Тренировка не найдена');
    return workout;
  }

  complete(
    userId: string,
    body: { workoutId: string; durationMin: number; kcal: number; completedAt: string },
  ) {
    this.getWorkout(body.workoutId); // валидация существования
    this.completions.push({ userId, ...body });
    return { ok: true };
  }

  listCompletions(userId: string) {
    return this.completions.filter((c) => c.userId === userId);
  }
}
