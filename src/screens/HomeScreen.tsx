import React, { useMemo } from 'react';
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

export function HomeScreen({ navigation }: MainTabScreenProps<'Home'>) {
  const profile = useUserStore((s) => s.profile);
  const {
    activeProgramId,
    plan,
    currentDay,
    getActiveProgram,
    getCurrentWorkout,
    markDayCompleted,
    nextDay,
  } = useWorkoutStore();

  const program = getActiveProgram();

  const todayPlan = useMemo(() => plan.find((d) => d.day === currentDay) ?? null, [plan, currentDay]);
  const workout = getCurrentWorkout();

  // Состояние «программа не выбрана»
  if (!activeProgramId || plan.length === 0 || !program) {
    return (
      <ScreenContainer>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Привет, {profile?.name ?? 'спортсменка'} 👋</Text>
            <Text style={styles.sub}>Давай выберем твою программу</Text>
          </View>
          <Badge label={`🔥 ${profile?.streakDays ?? 0} дней`} color={colors.warning} />
        </View>

        <Card style={styles.hero}>
          <Text style={styles.heroLabel}>С чего начнём?</Text>
          <Text style={styles.heroTitle}>Выбери программу тренировок</Text>
          <Text style={styles.heroText}>
            8 программ под разные цели: похудение, пресс, ягодицы, осанка, привычка. Костя поможет
            с выбором — и подстроит нагрузку под тебя.
          </Text>
          <Button
            title="Открыть каталог программ"
            onPress={() => navigation.navigate('Programs')}
            style={styles.heroButton}
          />
          <Button
            title="Спросить Костю"
            variant="ghost"
            onPress={() => navigation.navigate('Kosta')}
          />
        </Card>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Привет, {profile?.name ?? 'спортсменка'} 👋</Text>
          <Text style={styles.sub}>
            {program.title} · день {currentDay} из {program.durationDays}
          </Text>
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
        <ProgressBar value={currentDay / program.durationDays} />
        <Text style={styles.sectionHint}>
          Дней пройдено: {Math.max(0, currentDay - 1)} · осталось{' '}
          {program.durationDays - currentDay + 1}
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
        <Button
          title="Сменить программу"
          variant="ghost"
          onPress={() => navigation.navigate('Programs')}
          style={styles.fullButton}
        />
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
  fullButton: { marginTop: spacing.sm },
});
