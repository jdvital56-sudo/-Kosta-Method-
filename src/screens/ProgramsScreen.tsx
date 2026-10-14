import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ScreenContainer } from '@/components/ScreenContainer';
import { colors, radius, spacing, typography } from '@/theme';
import { RootScreenProps } from '@/navigation/types';
import { LEVEL_LABELS } from '@/store/useUserStore';
import { useWorkoutStore } from '@/store/useWorkoutStore';
import { TRAINING_PROGRAMS } from '@/constants/programs';
import { BodyZone, TrainingProgram } from '@/types';

const ZONE_LABELS: Record<BodyZone, string> = {
  arms: 'руки',
  shoulders: 'плечи',
  chest: 'грудь',
  abs: 'пресс',
  back: 'спина',
  glutes: 'ягодицы',
  legs: 'ноги',
  full_body: 'всё тело',
};

export function ProgramsScreen({ navigation }: RootScreenProps<'Programs'>) {
  const activeProgramId = useWorkoutStore((s) => s.activeProgramId);
  const setActiveProgram = useWorkoutStore((s) => s.setActiveProgram);

  const select = (program: TrainingProgram) => {
    setActiveProgram(program.id, new Date().toISOString().slice(0, 10));
    navigation.navigate('Main', { screen: 'Home' });
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Программы тренировок</Text>
      <Text style={styles.subtitle}>
        Выбери курс под свою цель. Программу можно сменить в любой момент — прогресс сохраняется.
      </Text>

      {TRAINING_PROGRAMS.map((program) => {
        const isActive = program.id === activeProgramId;
        return (
          <Card key={program.id} style={[styles.card, isActive && styles.cardActive]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cover}>{program.coverEmoji}</Text>
              <View style={styles.cardTitles}>
                <Text style={styles.programTitle}>{program.title}</Text>
                <Text style={styles.programSubtitle}>{program.subtitle}</Text>
              </View>
              {isActive && <Badge label="активна" color={colors.success} />}
            </View>

            <Text style={styles.description}>{program.description}</Text>

            <View style={styles.metaRow}>
              <Badge label={`${program.durationDays} дней`} />
              <Badge label={LEVEL_LABELS[program.level]} color={colors.warning} />
              <Badge
                label={program.focus.map((z) => ZONE_LABELS[z]).join(', ')}
                color={colors.success}
              />
            </View>

            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>~{program.workoutMinutes} мин</Text>
                <Text style={styles.statLabel}>тренировка</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>
                  {program.kcalRange[0]}–{program.kcalRange[1]}
                </Text>
                <Text style={styles.statLabel}>ккал</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>
                  {program.workDaysPerCycle}+1
                </Text>
                <Text style={styles.statLabel}>цикл дней</Text>
              </View>
            </View>

            <Button
              title={isActive ? 'Продолжить программу' : 'Начать программу'}
              onPress={() => select(program)}
              variant={isActive ? 'primary' : 'secondary'}
            />
          </Card>
        );
      })}

      <Pressable onPress={() => navigation.goBack()}>
        <Text style={styles.backLink}>← Назад</Text>
      </Pressable>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.headingMedium, color: colors.textPrimary },
  subtitle: { ...typography.body, color: colors.textSecondary },
  card: { gap: spacing.sm },
  cardActive: { borderColor: colors.success, borderWidth: 2 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  cover: { fontSize: 36 },
  cardTitles: { flex: 1 },
  programTitle: { ...typography.headingSmall, color: colors.textPrimary },
  programSubtitle: { ...typography.bodySmall, color: colors.textSecondary, marginTop: 2 },
  description: { ...typography.body, color: colors.textSecondary },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  statsRow: { flexDirection: 'row', gap: spacing.sm },
  stat: {
    flex: 1,
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.control,
    padding: spacing.sm,
    alignItems: 'center',
  },
  statValue: { ...typography.body, color: colors.textPrimary, fontWeight: '700' },
  statLabel: { ...typography.bodySmall, color: colors.textMuted },
  backLink: { ...typography.body, color: colors.accent, textAlign: 'center', padding: spacing.sm },
});
