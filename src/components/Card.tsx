import React, { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { colors, radius, shadows, spacing } from '@/theme';

interface CardProps {
  style?: StyleProp<ViewStyle>;
  padded?: boolean;
  elevated?: boolean;
}

export function Card({ children, style, padded = true, elevated = true }: PropsWithChildren<CardProps>) {
  return (
    <View style={[styles.card, padded && styles.padded, elevated && shadows.card, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  padded: { padding: spacing.md },
});
