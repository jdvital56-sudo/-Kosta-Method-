import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { DayPlan, TrainingProgram, Workout } from '@/types';
import {
  buildProgramPlan,
  getProgram,
  workoutForDay,
  TRAINING_PROGRAMS,
} from '@/constants/programs';

interface WorkoutState {
  /** Активная программа (null — пользователь ещё не выбрал) */
  activeProgramId: string | null;
  plan: DayPlan[];
  currentDay: number;
  completedIds: string[];
  /** Выбрать программу и построить план */
  setActiveProgram: (programId: string, startDateISO: string) => void;
  getActiveProgram: () => TrainingProgram | null;
  getCurrentWorkout: () => Workout | null;
  markDayCompleted: (day: number) => void;
  nextDay: () => void;
  resetPlan: () => void;
}

function buildPlan(program: TrainingProgram, startDateISO: string): DayPlan[] {
  const start = new Date(startDateISO);
  return buildProgramPlan(program).map((entry) => {
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
      activeProgramId: null,
      plan: [],
      currentDay: 1,
      completedIds: [],
      setActiveProgram: (programId, startDateISO) => {
        const program = getProgram(programId);
        if (!program) return;
        set({
          activeProgramId: programId,
          plan: buildPlan(program, startDateISO),
          currentDay: 1,
          completedIds: [],
        });
      },
      getActiveProgram: () => {
        const id = get().activeProgramId;
        return id ? getProgram(id) ?? null : TRAINING_PROGRAMS[0] ?? null;
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
        set((state) => {
          const program = state.activeProgramId ? getProgram(state.activeProgramId) : null;
          const maxDay = program?.durationDays ?? 30;
          return { currentDay: Math.min(maxDay, state.currentDay + 1) };
        }),
      resetPlan: () =>
        set({ activeProgramId: null, plan: [], currentDay: 1, completedIds: [] }),
    }),
    {
      name: 'kosta-workouts',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
