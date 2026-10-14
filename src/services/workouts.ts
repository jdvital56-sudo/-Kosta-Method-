import { apiRequest } from '@/services/api';
import { DayPlan, Workout } from '@/types';

export async function fetchProgram(): Promise<DayPlan[]> {
  return apiRequest<DayPlan[]>('/workouts/program');
}

export async function fetchWorkout(workoutId: string): Promise<Workout> {
  return apiRequest<Workout>(`/workouts/${workoutId}`);
}

export async function completeWorkoutOnServer(
  workoutId: string,
  durationMin: number,
  kcal: number,
): Promise<void> {
  await apiRequest('/workouts/completions', {
    method: 'POST',
    body: { workoutId, durationMin, kcal, completedAt: new Date().toISOString() },
  });
}
