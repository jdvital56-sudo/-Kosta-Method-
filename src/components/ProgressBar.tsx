import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, radius } from '@/theme';

interface ProgressBarProps {
  /** 0..1 */
  value: number;
  height?: number;
  color?: string;
  trackColor?: string;
}

export function ProgressBar({
  value,
  height = 8,
  color = colors.accent,
  trackColor = colors.surfaceElevated,
}: ProgressBarProps) {
  const clamped = Math.min(1, Math.max(0, value));
  return (
    <View style={[styles.track, { height, backgroundColor: trackColor, borderRadius: height / 2 }]}>
      <View
        style={[
          styles.fill,
          {
            width: `${clamped * 100}%`,
            height,
            backgroundColor: color,
            borderRadius: height / 2,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: radius.pill,
  },
});
