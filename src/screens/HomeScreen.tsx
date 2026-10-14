import React, { useEffect, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { ScreenContainer } from '@/components/ScreenContainer';
import { colors, spacing, typography } from '@/theme';
import { MainTabScreenProps } from '@/navigation/types';
import { useUserStore } from '@/store/useUserStore';
import { useWorkoutStore } from '@/store/useWorkoutStore';
import { PROGRAM_LENGTH_DAYS } from '@/constants/program';

export function HomeScreen({ navigation }: MainTabScreenProps<'Home'>) {
  const profile = useUserStore((s) => s.profile);
  const { plan, currentDay, initPlan, getCurrentWorkout, markDayCompleted, nextDay } =
    useWorkoutStore();

  useEffect(() => {
    if (plan.length === 0) {
      initPlan(profile?.startDate ?? new Date().toISOString().slice(0, 10));
    }
  }, [plan.length, initPlan, profile?.startDate]);

  const todayPlan = useMemo(() => plan.find((d) => d.day === currentDay) ?? null, [plan, currentDay]);
  const workout = getCurrentWorkout();

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Привет, {profile?.name ?? 'спортсменка'} 👋</Text>
          <Text style={styles.sub}>День {currentDay} из {PROGRAM_LENGTH_DAYS}</Text>
        </View>
        <Badge label={`🔥 ${profile?.streakDays ?? 0} дней`} color={colors.warning} />
      </View>

      <Card style={styles.hero}>
        <Text style={styles.heroLabel}>Сегодня</Text>
        {todayPlan?.isRestDay || !workout ? (
          <>
            <Text style={styles.heroTitle}>День отдыха 🧘</Text>
            <Text style={styles.heroText}>
              Восстановление — часть прогресса. Прогулка 20 минут или лёгкая растяжка ускорят
              результат.
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.heroTitle}>{workout.title}</Text>
            <View style={styles.statsRow}>
              <Stat label="минут" value={String(workout.durationMin)} />
              <Stat label="ккал" value={`~${workout.kcalEstimate}`} />
              <Stat label="интенсивность" value={'🔥'.repeat(workout.intensity)} />
            </View>
            <Button
              title="Начать тренировку"
              onPress={() => navigation.navigate('WorkoutPlayer', { day: currentDay })}
              style={styles.heroButton}
            />
            <Button
              title="Отметить выполненной"
              variant="ghost"
              onPress={() => {
                markDayCompleted(currentDay);
                nextDay();
              }}
            />
          </>
        )}
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Прогресс программы</Text>
        <ProgressBar value={currentDay / PROGRAM_LENGTH_DAYS} />
        <Text style={styles.sectionHint}>
          Дней пройдено: {Math.max(0, currentDay - 1)} · осталось {PROGRAM_LENGTH_DAYS - currentDay + 1}
        </Text>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Быстрые действия</Text>
        <View style={styles.quickRow}>
          <Button
            title="Спросить Костю"
            variant="secondary"
            onPress={() => navigation.navigate('Kosta')}
            style={styles.quickButton}
          />
          <Button
            title="Карта тела"
            variant="secondary"
            onPress={() => navigation.navigate('Progress')}
            style={styles.quickButton}
          />
        </View>
      </Card>
    </ScreenContainer>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: { ...typography.headingMedium, color: colors.textPrimary },
  sub: { ...typography.body, color: colors.textSecondary, marginTop: 2 },
  hero: { gap: spacing.sm },
  heroLabel: { ...typography.label, color: colors.accent },
  heroTitle: { ...typography.headingSmall, color: colors.textPrimary },
  heroText: { ...typography.body, color: colors.textSecondary },
  statsRow: { flexDirection: 'row', gap: spacing.md, marginVertical: spacing.sm },
  stat: {
    flex: 1,
    backgroundColor: colors.surfaceElevated,
    borderRadius: 12,
    padding: spacing.sm,
    alignItems: 'center',
  },
  statValue: { ...typography.headingSmall, color: colors.textPrimary },
  statLabel: { ...typography.bodySmall, color: colors.textMuted },
  heroButton: { marginTop: spacing.sm },
  sectionTitle: { ...typography.headingSmall, color: colors.textPrimary, marginBottom: spacing.sm },
  sectionHint: { ...typography.bodySmall, color: colors.textMuted, marginTop: spacing.sm },
  quickRow: { flexDirection: 'row', gap: spacing.sm },
  quickButton: { flex: 1 },
});
