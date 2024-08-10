import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
// import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() { 
//  To set light or dark theme
//   const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors['light'].primary,
        tabBarInactiveTintColor: Colors['light'].subText,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={'home-variant'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: 'Phần thưởng',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={'ticket-percent'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: 'Yêu thích',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={'heart'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Hồ sơ',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={'account'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
