import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import { colors, radius, spacing, typography } from '@/theme';

interface BadgeProps {
  label: string;
  color?: string;
  style?: ViewStyle;
}

export function Badge({ label, color = colors.accent, style }: BadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor: `${color}22`, borderColor: `${color}55` }, style]}>
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    borderWidth: 1,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 4,
  },
  text: { ...typography.bodySmall, fontWeight: '600' },
});
