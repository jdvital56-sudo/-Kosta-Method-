import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { colors } from '@/theme';
import { MainTabParamList } from '@/navigation/types';
import { HomeScreen } from '@/screens/HomeScreen';
import { KostaScreen } from '@/screens/KostaScreen';
import { BodyMapScreen } from '@/screens/BodyMapScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

/** Простые текстовые иконки-эмодзи до подключения @expo/vector-icons */
const TAB_ICONS: Record<keyof MainTabParamList, string> = {
  Home: '🏠',
  Kosta: '💪',
  Progress: '🗺️',
  Profile: '👤',
};

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarIcon: ({ focused }) => (
          <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.6 }}>{TAB_ICONS[route.name]}</Text>
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Сегодня' }} />
      <Tab.Screen name="Kosta" component={KostaScreen} options={{ title: 'Костя' }} />
      <Tab.Screen name="Progress" component={BodyMapScreen} options={{ title: 'Карта тела' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Профиль' }} />
    </Tab.Navigator>
  );
}
