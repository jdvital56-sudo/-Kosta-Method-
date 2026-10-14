import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { ScreenContainer } from '@/components/ScreenContainer';
import { colors, spacing, typography } from '@/theme';
import { useProgressStore } from '@/store/useProgressStore';
import { BodyZone } from '@/types';

const ZONE_LABELS: Record<BodyZone, string> = {
  arms: 'Руки',
  shoulders: 'Плечи',
  chest: 'Грудь',
  abs: 'Пресс',
  back: 'Спина',
  glutes: 'Ягодицы',
  legs: 'Ноги',
  full_body: 'Всё тело',
};

export function BodyMapScreen() {
  const zones = useProgressStore((s) => s.zones);
  const weightLog = useProgressStore((s) => s.weightLog);
  const photosCount = useProgressStore((s) => s.photosCount);

  const currentWeight = weightLog[0]?.weightKg ?? null;
  const firstWeight = weightLog[weightLog.length - 1]?.weightKg ?? currentWeight;
  const delta = currentWeight && firstWeight ? +(currentWeight - firstWeight).toFixed(1) : 0;

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>Карта тела</Text>
        <Badge label="обновляется после каждой тренировки" color={colors.success} />
      </View>

      <Card>
        <Text style={styles.sectionTitle}>Вес</Text>
        <View style={styles.weightRow}>
          <View>
            <Text style={styles.weightValue}>{currentWeight ?? '—'} кг</Text>
            <Text style={styles.weightHint}>
              {delta === 0 ? 'стабильно' : delta < 0 ? `▼ ${Math.abs(delta)} кг` : `▲ ${delta} кг`} за всё время
            </Text>
          </View>
          <View style={styles.photoBox}>
            <Text style={styles.photoCount}>{photosCount}</Text>
            <Text style={styles.photoLabel}>фото</Text>
          </View>
        </View>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Тонус по зонам</Text>
        <View style={styles.zones}>
          {zones.map((z) => (
            <View key={z.zone} style={styles.zoneRow}>
              <View style={styles.zoneHeader}>
                <Text style={styles.zoneName}>{ZONE_LABELS[z.zone]}</Text>
                <Text style={styles.zoneChange}>
                  {z.changeCm === 0 ? '—' : `${z.changeCm > 0 ? '+' : ''}${z.changeCm} см`}
                </Text>
              </View>
              <ProgressBar value={z.tone} height={10} />
            </View>
          ))}
        </View>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Схема зон</Text>
        <View style={styles.diagram}>
          {zones.map((z) => (
            <View
              key={z.zone}
              style={[
                styles.diagramCell,
                {
                  backgroundColor: `${colors.accent}${Math.round(z.tone * 80 + 10)
                    .toString(16)
                    .padStart(2, '0')}`,
                },
              ]}
            >
              <Text style={styles.diagramText}>{ZONE_LABELS[z.zone]}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.hint}>Чем ярче зона — тем выше её тонус. Полная версия карты — с 3D-моделью.</Text>
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: { gap: spacing.sm },
  title: { ...typography.headingMedium, color: colors.textPrimary },
  sectionTitle: { ...typography.headingSmall, color: colors.textPrimary, marginBottom: spacing.sm },
  weightRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  weightValue: { ...typography.headingMedium, color: colors.textPrimary },
  weightHint: { ...typography.bodySmall, color: colors.textSecondary, marginTop: 2 },
  photoBox: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: 12,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  photoCount: { ...typography.headingSmall, color: colors.accent },
  photoLabel: { ...typography.bodySmall, color: colors.textMuted },
  zones: { gap: spacing.md },
  zoneRow: { gap: spacing.xs },
  zoneHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  zoneName: { ...typography.body, color: colors.textPrimary },
  zoneChange: { ...typography.bodySmall, color: colors.textSecondary },
  diagram: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  diagramCell: {
    borderRadius: 12,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    minWidth: 96,
    alignItems: 'center',
  },
  diagramText: { ...typography.bodySmall, color: colors.textPrimary, fontWeight: '600' },
  hint: { ...typography.bodySmall, color: colors.textMuted, marginTop: spacing.sm },
});
