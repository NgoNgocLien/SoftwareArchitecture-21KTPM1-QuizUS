import { Stack, Tabs } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StyleSheet } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';

export default function TabLayout() { 
//  To set light or dark theme
  const colorScheme = useColorScheme();

  return (
    // <RootSiblingParent>
    <Tabs
        screenOptions={{
            tabBarActiveTintColor: Colors['light'].primary,
            tabBarInactiveTintColor: Colors['light'].subText,
            headerShown: false,
            tabBarStyle: {
                backgroundColor: Colors['light'].background,
                borderTopColor: 'transparent',
                elevation: 7,
                shadowColor: 'black',
                shadowOffset: { width: 0, height: -5 },
                shadowOpacity: 0.08,
                shadowRadius: 4,
            },
        }}
    >
        <Tabs.Screen
            name="index"
            options={{
                title: 'Trang chủ',
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
        <Tabs.Screen 
            name="search" 
            options={{
                tabBarButton: () => null,
            }} 
        />
        <Tabs.Screen 
            name="coins" 
            options={{
                tabBarButton: () => null,
            }} 
        />
        <Tabs.Screen 
            name="items" 
            options={{
                tabBarButton: () => null,
            }} 
        />
        <Tabs.Screen 
            name="my-vouchers" 
            options={{
                tabBarButton: () => null,
            }}
        />
        <Tabs.Screen 
            name="gift-item"
            options={{
                tabBarButton: () => null,
            }}
        />
        <Tabs.Screen 
            name="noti"
            options={{
                tabBarButton: () => null,
            }}
        />
    </Tabs>
    // </RootSiblingParent> 
  );
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
    },

    container: {
        paddingHorizontal: 20,
    },
});