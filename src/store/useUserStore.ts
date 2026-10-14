import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FitnessLevel, Goal, UserProfile } from '@/types';

interface UserState {
  profile: UserProfile | null;
  isOnboarded: boolean;
  setProfile: (profile: UserProfile) => void;
  updateProfile: (patch: Partial<UserProfile>) => void;
  completeOnboarding: () => void;
  incrementStreak: () => void;
  reset: () => void;
}

const DEFAULT_PROFILE: UserProfile = {
  id: 'local-user',
  name: 'Аня',
  goal: 'weight_loss',
  level: 'beginner',
  weightKg: 68,
  heightCm: 166,
  streakDays: 0,
  trialDaysLeft: 7,
  startDate: new Date().toISOString().slice(0, 10),
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      profile: null,
      isOnboarded: false,
      setProfile: (profile) => set({ profile }),
      updateProfile: (patch) =>
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...patch } : { ...DEFAULT_PROFILE, ...patch },
        })),
      completeOnboarding: () => set({ isOnboarded: true }),
      incrementStreak: () =>
        set((state) => ({
          profile: state.profile
            ? { ...state.profile, streakDays: state.profile.streakDays + 1 }
            : state.profile,
        })),
      reset: () => set({ profile: null, isOnboarded: false }),
    }),
    {
      name: 'kosta-user',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const GOAL_LABELS: Record<Goal, string> = {
  weight_loss: 'Похудение',
  tone: 'Тонус тела',
  endurance: 'Выносливость',
  habit: 'Привычка тренироваться',
};

export const LEVEL_LABELS: Record<FitnessLevel, string> = {
  beginner: 'Начинающий',
  intermediate: 'Средний',
  advanced: 'Продвинутый',
};
