import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableWithoutFeedback, Keyboard, SafeAreaView, View, Image, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() { 
//  To set light or dark theme
//   const colorScheme = useColorScheme();

  return (
    <LinearGradient
    colors={[Colors.light.background, Colors.light.background, Colors.light.secondary]} // Gradient colors
    locations={[0, 0.49, 0.79]} // Start the gradient at 49% and end at 79%
    style={styles.safeArea}
    >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Image
            source={require('@/assets/images/logo.png')}
          />  
          <FontAwesome5 name="bell" size={26} color="black" solid={false} />
        </View>
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
      </SafeAreaView>
    </TouchableWithoutFeedback>
    </LinearGradient> 
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 20,
    
    // Shadow for iOS
    shadowColor: Colors.light.mainText,
    shadowOffset: { width: 0, height: 8 }, // Adds shadow below the header
    shadowOpacity: 0.05,
    shadowRadius: 3.84,

    // Shadow for Android
    elevation: 5, // Elevation for the shadow effect
  },


  alignCenter: {
    alignSelf: 'center',
  },

  title: {
    marginTop: 40,
    marginBottom: 20,
  },

  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },

  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },

  separator: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.light.subText,
  },

  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    gap: 3
  },
});
