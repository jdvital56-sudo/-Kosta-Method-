import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { DayPlan, Workout } from '@/types';
import { buildThirtyDayPlan, workoutForDay, PROGRAM_LENGTH_DAYS } from '@/constants/program';

interface WorkoutState {
  plan: DayPlan[];
  currentDay: number;
  completedIds: string[];
  /** Инициализировать план от даты старта (идемпотентно) */
  initPlan: (startDateISO: string) => void;
  getCurrentWorkout: () => Workout | null;
  markDayCompleted: (day: number) => void;
  nextDay: () => void;
}

function buildPlan(startDateISO: string): DayPlan[] {
  const start = new Date(startDateISO);
  return buildThirtyDayPlan(start).map((entry) => {
    const date = new Date(start);
    date.setDate(start.getDate() + entry.day - 1);
    return {
      day: entry.day,
      date: date.toISOString().slice(0, 10),
      workout: entry.workoutId ? workoutForDay(entry.workoutId, entry.day) : null,
      isCompleted: false,
      isRestDay: entry.isRestDay,
    };
  });
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      plan: [],
      currentDay: 1,
      completedIds: [],
      initPlan: (startDateISO) => {
        if (get().plan.length === PROGRAM_LENGTH_DAYS) return;
        set({ plan: buildPlan(startDateISO), currentDay: 1 });
      },
      getCurrentWorkout: () => {
        const { plan, currentDay } = get();
        return plan.find((d) => d.day === currentDay)?.workout ?? null;
      },
      markDayCompleted: (day) =>
        set((state) => {
          const entry = state.plan.find((d) => d.day === day);
          if (!entry || entry.isRestDay) return state;
          return {
            plan: state.plan.map((d) => (d.day === day ? { ...d, isCompleted: true } : d)),
            completedIds: entry.workout
              ? [...new Set([...state.completedIds, entry.workout.id])]
              : state.completedIds,
          };
        }),
      nextDay: () =>
        set((state) => ({
          currentDay: Math.min(PROGRAM_LENGTH_DAYS, state.currentDay + 1),
        })),
    }),
    {
      name: 'kosta-workouts',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
