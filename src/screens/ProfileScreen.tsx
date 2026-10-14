import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ScreenContainer } from '@/components/ScreenContainer';
import { colors, spacing, typography } from '@/theme';
import { MainTabScreenProps } from '@/navigation/types';
import { useUserStore, GOAL_LABELS, LEVEL_LABELS } from '@/store/useUserStore';
import { useSubscriptionStore, PLAN_PRICING } from '@/store/useSubscriptionStore';
import { useWorkoutStore } from '@/store/useWorkoutStore';

export function ProfileScreen({ navigation }: MainTabScreenProps<'Profile'>) {
  const profile = useUserStore((s) => s.profile);
  const [notifications, setNotifications] = React.useState(true);
  const [sound, setSound] = React.useState(true);
  const { plan, isActive } = useSubscriptionStore();
  const completedCount = useWorkoutStore((s) => s.plan.filter((d) => d.isCompleted).length);

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{(profile?.name ?? 'K')[0].toUpperCase()}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{profile?.name ?? 'Спортсменка'}</Text>
          <Text style={styles.sub}>
            {profile ? GOAL_LABELS[profile.goal] : ''} · {profile ? LEVEL_LABELS[profile.level] : ''}
          </Text>
        </View>
        <Badge label={`🔥 ${profile?.streakDays ?? 0}`} color={colors.warning} />
      </View>

      <Card>
        <Text style={styles.sectionTitle}>Статистика</Text>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{completedCount}</Text>
            <Text style={styles.statLabel}>тренировок</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{profile?.weightKg ?? '—'}</Text>
            <Text style={styles.statLabel}>кг сейчас</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{profile?.heightCm ?? '—'}</Text>
            <Text style={styles.statLabel}>см рост</Text>
          </View>
        </View>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Подписка</Text>
        <Text style={styles.planText}>
          {plan === 'free'
            ? `Free-режим · пробный период: ${profile?.trialDaysLeft ?? 0} дн.`
            : isActive
              ? `Активный план: ${plan === 'monthly' ? PLAN_PRICING.monthly.price + ' / мес' : plan === 'yearly' ? PLAN_PRICING.yearly.price + ' / год' : 'Lifetime'}`
              : 'Free-режим'}
        </Text>
        {plan === 'free' && (
          <Button
            title="Открыть полный доступ"
            onPress={() => navigation.navigate('Paywall', { source: 'profile' })}
            style={styles.button}
          />
        )}
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Настройки</Text>
        <SettingRow label="Напоминания о тренировках" value={notifications} onChange={setNotifications} />
        <SettingRow label="Звуки и голос Кости" value={sound} onChange={setSound} />
      </Card>
    </ScreenContainer>
  );
}

function SettingRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <View style={styles.settingRow}>
      <Text style={styles.settingLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ true: colors.accent, false: colors.surfaceElevated }}
        thumbColor="#fff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { ...typography.headingMedium, color: '#fff' },
  name: { ...typography.headingSmall, color: colors.textPrimary },
  sub: { ...typography.bodySmall, color: colors.textSecondary, marginTop: 2 },
  sectionTitle: { ...typography.headingSmall, color: colors.textPrimary, marginBottom: spacing.sm },
  statsRow: { flexDirection: 'row', gap: spacing.sm },
  stat: {
    flex: 1,
    backgroundColor: colors.surfaceElevated,
    borderRadius: 12,
    padding: spacing.sm,
    alignItems: 'center',
  },
  statValue: { ...typography.headingSmall, color: colors.textPrimary },
  statLabel: { ...typography.bodySmall, color: colors.textMuted },
  planText: { ...typography.body, color: colors.textSecondary, marginBottom: spacing.sm },
  button: { marginTop: spacing.xs },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  settingLabel: { ...typography.body, color: colors.textPrimary, flex: 1 },
});
