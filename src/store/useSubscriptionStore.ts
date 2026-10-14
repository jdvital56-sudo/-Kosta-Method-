import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SubscriptionPlan } from '@/types';

export const PLAN_PRICING: Record<Exclude<SubscriptionPlan, 'free'>, { price: string; period: string; note: string }> = {
  monthly: { price: '$9.99', period: 'в месяц', note: 'Всё + AI, карта тела, фото' },
  yearly: { price: '$59.99', period: 'в год', note: 'То же, скидка 50%' },
  lifetime: { price: '$99.99', period: 'навсегда', note: 'Разовый платёж' },
};

interface SubscriptionState {
  plan: SubscriptionPlan;
  trialEndsAt: string | null;
  isActive: boolean;
  purchase: (plan: Exclude<SubscriptionPlan, 'free'>) => Promise<void>;
  restore: () => Promise<void>;
  startTrial: () => void;
}

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set) => ({
      plan: 'free',
      trialEndsAt: null,
      isActive: false,
      purchase: async (plan) => {
        // TODO(step-08): интеграция RevenueCat
        set({ plan, isActive: true });
      },
      restore: async () => {
        // TODO(step-08): восстановление покупок через RevenueCat
      },
      startTrial: () => {
        const ends = new Date();
        ends.setDate(ends.getDate() + 7);
        set({ trialEndsAt: ends.toISOString() });
      },
    }),
    {
      name: 'kosta-subscription',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
