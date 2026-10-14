import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ScreenContainer } from '@/components/ScreenContainer';
import { colors, radius, spacing, typography } from '@/theme';
import { RootScreenProps } from '@/navigation/types';
import { PLAN_PRICING, useSubscriptionStore } from '@/store/useSubscriptionStore';
import { SubscriptionPlan } from '@/types';

const FEATURES = [
  '30-дневный план с персонализацией',
  'AI-чат с Костей 24/7',
  'Карта тела и динамика по зонам',
  'Фото-прогресс и сравнения',
  'Без рекламы',
];

type PaidPlan = Exclude<SubscriptionPlan, 'free'>;

export function PaywallScreen({ navigation }: RootScreenProps<'Paywall'>) {
  const [selected, setSelected] = useState<PaidPlan>('yearly');
  const [loading, setLoading] = useState(false);
  const purchase = useSubscriptionStore((s) => s.purchase);

  const buy = async () => {
    setLoading(true);
    try {
      await purchase(selected);
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Раскрой весь потенциал 💪</Text>
      <Text style={styles.subtitle}>
        Первые 7 дней — полный доступ бесплатно. Дальше выбери свой план.
      </Text>

      <Card>
        <Text style={styles.featuresTitle}>Что входит</Text>
        {FEATURES.map((f) => (
          <View key={f} style={styles.featureRow}>
            <Text style={styles.check}>✓</Text>
            <Text style={styles.featureText}>{f}</Text>
          </View>
        ))}
      </Card>

      <View style={styles.plans}>
        {(['monthly', 'yearly', 'lifetime'] as PaidPlan[]).map((p) => {
          const info = PLAN_PRICING[p];
          const isSelected = selected === p;
          return (
            <Pressable key={p} onPress={() => setSelected(p)}>
              <Card style={[styles.planCard, isSelected && styles.planSelected]}>
                <View style={styles.planHeader}>
                  <Text style={styles.planName}>
                    {p === 'monthly' ? 'Месяц' : p === 'yearly' ? 'Год' : 'Навсегда'}
                  </Text>
                  {p === 'yearly' && (
                    <View style={styles.bestBadge}>
                      <Text style={styles.bestText}>выгодно −50%</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.planPrice}>
                  {info.price} <Text style={styles.planPeriod}>/ {info.period}</Text>
                </Text>
                <Text style={styles.planNote}>{info.note}</Text>
              </Card>
            </Pressable>
          );
        })}
      </View>

      <Button title="Попробовать 7 дней бесплатно" onPress={buy} loading={loading} />
      <Button title="Восстановить покупки" variant="ghost" onPress={() => navigation.goBack()} />
      <Text style={styles.legal}>
        Подписка продлевается автоматически. Отменить можно в настройках магазина приложений.
      </Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.headingMedium, color: colors.textPrimary, textAlign: 'center' },
  subtitle: { ...typography.body, color: colors.textSecondary, textAlign: 'center' },
  featuresTitle: { ...typography.headingSmall, color: colors.textPrimary, marginBottom: spacing.sm },
  featureRow: { flexDirection: 'row', gap: spacing.sm, paddingVertical: 4 },
  check: { ...typography.body, color: colors.success, fontWeight: '700' },
  featureText: { ...typography.body, color: colors.textSecondary, flex: 1 },
  plans: { gap: spacing.sm },
  planCard: { gap: 4 },
  planSelected: {
    borderColor: colors.accent,
    borderWidth: 2,
    backgroundColor: colors.surfaceElevated,
  },
  planHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  planName: { ...typography.headingSmall, color: colors.textPrimary },
  bestBadge: {
    backgroundColor: `${colors.accent}22`,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  bestText: { ...typography.bodySmall, color: colors.accent, fontWeight: '700' },
  planPrice: { ...typography.headingMedium, color: colors.textPrimary },
  planPeriod: { ...typography.body, color: colors.textMuted },
  planNote: { ...typography.bodySmall, color: colors.textSecondary },
  legal: {
    ...typography.bodySmall,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
