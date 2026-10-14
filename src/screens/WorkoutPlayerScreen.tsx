import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { ProgressBar } from '@/components/ProgressBar';
import { colors, radius, spacing, typography } from '@/theme';
import { RootScreenProps } from '@/navigation/types';
import { useWorkoutStore } from '@/store/useWorkoutStore';
import { useUserStore } from '@/store/useUserStore';

type Phase = 'ready' | 'work' | 'rest' | 'done';

export function WorkoutPlayerScreen({ route, navigation }: RootScreenProps<'WorkoutPlayer'>) {
  const insets = useSafeAreaInsets();
  const { plan, markDayCompleted, nextDay } = useWorkoutStore();
  const incrementStreak = useUserStore((s) => s.incrementStreak);

  const dayPlan = useMemo(() => plan.find((d) => d.day === route.params.day) ?? null, [plan, route.params.day]);
  const exercises = dayPlan?.workout?.exercises ?? [];

  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('ready');
  const [secondsLeft, setSecondsLeft] = useState(0);

  const exercise = exercises[exerciseIndex] ?? null;
  const isLast = exerciseIndex === exercises.length - 1;

  useEffect(() => {
    if (phase !== 'work' && phase !== 'rest') return;
    const timer = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timer);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase, exerciseIndex]);

  useEffect(() => {
    if (phase === 'work' && secondsLeft === 0 && exercise?.durationSec) {
      // таймерное упражнение завершено → отдых или следующее
      if (isLast) {
        finish();
      } else {
        setPhase('rest');
        setSecondsLeft(exercise.restSec);
      }
    }
    if (phase === 'rest' && secondsLeft === 0) {
      setExerciseIndex((i) => i + 1);
      setPhase('ready');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft, phase]);

  const startExercise = () => {
    if (!exercise) return;
    setPhase('work');
    setSecondsLeft(exercise.durationSec ?? 45); // для повторов — ориентировочное окно
  };

  const completeExercise = () => {
    if (!exercise) return;
    if (isLast) {
      finish();
      return;
    }
    setPhase('rest');
    setSecondsLeft(exercise.restSec);
  };

  const finish = () => {
    setPhase('done');
    markDayCompleted(route.params.day);
    incrementStreak();
    nextDay();
  };

  if (!dayPlan?.workout || !exercise) {
    return (
      <View style={[styles.container, styles.center, { paddingTop: insets.top }]}>
        <Text style={styles.emptyText}>Для этого дня тренировки нет — день отдыха 🧘</Text>
        <Button title="Назад" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  const workout = dayPlan.workout;

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.lg, paddingBottom: insets.bottom + spacing.lg }]}>
      {phase === 'done' ? (
        <View style={styles.center}>
          <Text style={styles.doneEmoji}>🎉</Text>
          <Text style={styles.title}>Тренировка завершена!</Text>
          <Text style={styles.subtitle}>
            {workout.title} · ~{workout.kcalEstimate} ккал. Костя тобой гордится 💪
          </Text>
          <Button title="Отлично!" onPress={() => navigation.goBack()} style={styles.fullButton} />
        </View>
      ) : (
        <>
          <View style={styles.topBar}>
            <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
              <Text style={styles.close}>✕</Text>
            </Pressable>
            <Text style={styles.dayLabel}>День {workout.day} · {workout.title}</Text>
            <Badge label={'🔥'.repeat(workout.intensity)} />
          </View>

          <ProgressBar value={(exerciseIndex + (phase === 'rest' ? 0.5 : 0)) / exercises.length} />

          <View style={styles.exerciseBox}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <Text style={styles.exerciseMeta}>
              {exercise.sets} подхода ·{' '}
              {exercise.durationSec ? `${exercise.durationSec} сек` : `${exercise.reps} повторов`}
            </Text>

            <View style={styles.timerCircle}>
              <Text style={styles.timerValue}>
                {phase === 'ready' ? '—' : secondsLeft}
              </Text>
              <Text style={styles.timerLabel}>
                {phase === 'ready' ? 'готова?' : phase === 'rest' ? 'отдых' : 'секунд'}
              </Text>
            </View>

            <View style={styles.tipBox}>
              <Text style={styles.tipLabel}>Совет Кости</Text>
              <Text style={styles.tipText}>“{exercise.coachTip}”</Text>
            </View>
          </View>

          <View style={styles.controls}>
            {phase === 'ready' && <Button title="Старт" onPress={startExercise} style={styles.fullButton} />}
            {phase === 'work' && (
              <Button title={isLast ? 'Завершить' : 'Упражнение готово'} onPress={completeExercise} style={styles.fullButton} />
            )}
            {phase === 'rest' && (
              <Button
                title="Пропустить отдых"
                variant="secondary"
                onPress={() => setSecondsLeft(0)}
                style={styles.fullButton}
              />
            )}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.md, gap: spacing.md },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: spacing.md },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  close: { ...typography.headingMedium, color: colors.textSecondary },
  dayLabel: { ...typography.bodySmall, color: colors.textSecondary, flex: 1, textAlign: 'center' },
  exerciseBox: { flex: 1, justifyContent: 'center', gap: spacing.md },
  exerciseName: { ...typography.headingMedium, color: colors.textPrimary, textAlign: 'center' },
  exerciseMeta: { ...typography.body, color: colors.textSecondary, textAlign: 'center' },
  timerCircle: {
    alignSelf: 'center',
    width: 180,
    height: 180,
    borderRadius: radius.pill,
    borderWidth: 6,
    borderColor: colors.accent,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerValue: { ...typography.headingLarge, color: colors.textPrimary, fontSize: 56 },
  timerLabel: { ...typography.bodySmall, color: colors.textMuted },
  tipBox: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.xs,
  },
  tipLabel: { ...typography.label, color: colors.accent },
  tipText: { ...typography.body, color: colors.textSecondary, fontStyle: 'italic' },
  controls: { gap: spacing.sm },
  fullButton: { width: '100%' },
  doneEmoji: { fontSize: 80 },
  title: { ...typography.headingMedium, color: colors.textPrimary, textAlign: 'center' },
  subtitle: { ...typography.bodyLarge, color: colors.textSecondary, textAlign: 'center' },
  emptyText: { ...typography.bodyLarge, color: colors.textSecondary, textAlign: 'center' },
});
