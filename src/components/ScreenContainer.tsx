import React, { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, spacing } from '@/theme';

interface ScreenContainerProps {
  scroll?: boolean;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
}

export function ScreenContainer({
  children,
  scroll = true,
  style,
  contentStyle,
}: PropsWithChildren<ScreenContainerProps>) {
  const insets = useSafeAreaInsets();

  if (scroll) {
    return (
      <ScrollView
        style={[styles.screen, style]}
        contentContainerStyle={[
          { paddingTop: insets.top + spacing.md, paddingBottom: insets.bottom + spacing.xxl },
          styles.content,
          contentStyle,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View
      style={[
        styles.screen,
        { paddingTop: insets.top + spacing.md, paddingBottom: insets.bottom + spacing.md },
        styles.content,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: spacing.md, gap: spacing.md },
});
