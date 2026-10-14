import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Button } from '@/components/Button';
import { ScreenContainer } from '@/components/ScreenContainer';
import { colors, spacing, typography } from '@/theme';
import { RootScreenProps } from '@/navigation/types';
import { useUserStore, GOAL_LABELS } from '@/store/useUserStore';
import { useSubscriptionStore } from '@/store/useSubscriptionStore';
import { Goal } from '@/types';

const STEPS = [
  {
    title: 'Привет! Я Костя 👋',
    subtitle:
      'Твой виртуальный тренер на 30 дней. Покажу каждое упражнение, поддержу и доведу до результата — без зала и без сложного оборудования.',
  },
  {
    title: 'Что твоя цель?',
    subtitle: 'Я подберу нагрузку под тебя. Потом можно поменять в любой момент.',
  },
  {
    title: '7 дней — полный доступ',
    subtitle:
      'Пробный период включает AI-чата, карту тела и фото-прогресс. Без автосписаний в первые дни.',
  },
];

const GOALS: Goal[] = ['weight_loss', 'tone', 'endurance', 'habit'];

export function OnboardingScreen({ navigation }: RootScreenProps<'Onboarding'>) {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<Goal>('weight_loss');
  const completeOnboarding = useUserStore((s) => s.completeOnboarding);
  const updateProfile = useUserStore((s) => s.updateProfile);
  const startTrial = useSubscriptionStore((s) => s.startTrial);

  const next = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
      return;
    }
    updateProfile({ goal });
    startTrial();
    completeOnboarding();
  };

  return (
    <ScreenContainer scroll={false} contentStyle={styles.container}>
      <LinearGradient colors={[colors.primary, colors.background]} style={styles.hero}>
        <Text style={styles.kosta}>💪</Text>
        <Text style={styles.title}>{STEPS[step].title}</Text>
        <Text style={styles.subtitle}>{STEPS[step].subtitle}</Text>

        {step === 1 && (
          <View style={styles.goals}>
            {GOALS.map((g) => (
              <Button
                key={g}
                title={GOAL_LABELS[g]}
                variant={goal === g ? 'primary' : 'secondary'}
                onPress={() => setGoal(g)}
                style={styles.goalButton}
              />
            ))}
          </View>
        )}
      </LinearGradient>

      <View style={styles.footer}>
        <View style={styles.dots}>
          {STEPS.map((_, i) => (
            <View key={i} style={[styles.dot, i === step && styles.dotActive]} />
          ))}
        </View>
        <Button title={step === STEPS.length - 1 ? 'Начать путь' : 'Далее'} onPress={next} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: 'space-between' },
  hero: {
    flex: 1,
    borderRadius: 24,
    padding: spacing.lg,
    justifyContent: 'center',
    gap: spacing.md,
  },
  kosta: { fontSize: 72, textAlign: 'center' },
  title: { ...typography.headingMedium, color: colors.textPrimary, textAlign: 'center' },
  subtitle: { ...typography.bodyLarge, color: colors.textSecondary, textAlign: 'center' },
  goals: { gap: spacing.sm, marginTop: spacing.md },
  goalButton: { minHeight: 46 },
  footer: { gap: spacing.md, paddingTop: spacing.lg },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: spacing.sm },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.surfaceElevated,
  },
  dotActive: { backgroundColor: colors.accent, width: 24 },
});
