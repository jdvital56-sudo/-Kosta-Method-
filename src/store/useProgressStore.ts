import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { WeightEntry, ZoneProgress } from '@/types';

interface ProgressState {
  zones: ZoneProgress[];
  weightLog: WeightEntry[];
  photosCount: number;
  addWeight: (weightKg: number, dateISO: string) => void;
  updateZone: (zone: ZoneProgress['zone'], tone: number) => void;
  addPhoto: () => void;
}

const INITIAL_ZONES: ZoneProgress[] = [
  { zone: 'arms', tone: 0.25, changeCm: 0 },
  { zone: 'shoulders', tone: 0.2, changeCm: 0 },
  { zone: 'chest', tone: 0.3, changeCm: 0 },
  { zone: 'abs', tone: 0.15, changeCm: 0 },
  { zone: 'back', tone: 0.25, changeCm: 0 },
  { zone: 'glutes', tone: 0.2, changeCm: 0 },
  { zone: 'legs', tone: 0.35, changeCm: 0 },
];

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      zones: INITIAL_ZONES,
      weightLog: [],
      photosCount: 0,
      addWeight: (weightKg, dateISO) =>
        set((state) => {
          const previous = state.weightLog[0]?.weightKg ?? weightKg;
          const delta = +(weightKg - previous).toFixed(1);
          return {
            weightLog: [{ date: dateISO, weightKg }, ...state.weightLog].slice(0, 90),
            zones: state.zones.map((z) => ({ ...z, changeCm: +(z.changeCm + delta / 7).toFixed(2) })),
          };
        }),
      updateZone: (zone, tone) =>
        set((state) => ({
          zones: state.zones.map((z) =>
            z.zone === zone ? { ...z, tone: Math.min(1, Math.max(0, tone)) } : z,
          ),
        })),
      addPhoto: () => set((state) => ({ photosCount: state.photosCount + 1 })),
    }),
    {
      name: 'kosta-progress',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
