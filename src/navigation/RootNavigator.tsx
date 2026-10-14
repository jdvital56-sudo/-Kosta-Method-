import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { colors } from '@/theme';
import { RootStackParamList } from '@/navigation/types';
import { MainTabs } from '@/navigation/MainTabs';
import { OnboardingScreen } from '@/screens/OnboardingScreen';
import { PaywallScreen } from '@/screens/PaywallScreen';
import { WorkoutPlayerScreen } from '@/screens/WorkoutPlayerScreen';
import { useUserStore } from '@/store/useUserStore';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const isOnboarded = useUserStore((s) => s.isOnboarded);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: { fontFamily: 'Montserrat_700Bold' },
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      {!isOnboarded ? (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      )}
      <Stack.Screen
        name="Paywall"
        component={PaywallScreen}
        options={{ presentation: 'modal', title: 'Полный доступ' }}
      />
      <Stack.Screen
        name="WorkoutPlayer"
        component={WorkoutPlayerScreen}
        options={{ headerShown: false, presentation: 'fullScreenModal' }}
      />
    </Stack.Navigator>
  );
}
