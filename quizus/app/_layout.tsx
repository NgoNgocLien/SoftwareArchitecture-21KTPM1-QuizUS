import React, { useEffect, useState } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from '@/hooks/useColorScheme';
import 'react-native-reanimated';
import * as SecureStore from 'expo-secure-store';
import config from '@/constants/config';
import {retrieveFromSecureStore} from '@/api/SecureStoreService'
SplashScreen.preventAutoHideAsync();

import { LogBox } from 'react-native'; // Import LogBox at the top of the file

if (__DEV__) {
  LogBox.ignoreAllLogs(); // Ignore all logs in development
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const router = useRouter();

  const [id_player, setIdPlayer] = useState<string|null>(null);
  
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();

      retrieveFromSecureStore('id_player', setIdPlayer);
      if (id_player) {
        router.push('/(tabs)');
      } else {
        router.push('/login'); 
      }

      // router.push('/(tabs)');
    }
  }, [loaded, id_player]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" />
          {/* <Stack.Screen name="otp" /> */}
          <Stack.Screen name="signup" />

          <Stack.Screen name="(tabs)" />

          <Stack.Screen name="campaign" />
          <Stack.Screen name="voucher" />
          <Stack.Screen name="campaignsOfVoucher" />

          <Stack.Screen name="quizgame/detail" />
          <Stack.Screen name="quizgame/result" />
          <Stack.Screen name="+not-found" />

          <Stack.Screen name="qr" />
        </Stack>
    </ThemeProvider>
  );
}
