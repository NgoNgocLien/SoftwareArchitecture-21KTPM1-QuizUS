/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { green } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

const black = '#000000';
const white = '#FFFFFF';
const neutral = '#7A7A81';
const gray = '#949494';

const brand_50 = '#FFE6E7';
const brand_100 = '#FFD7D9';
const brand_200 = '#FFAFB3';
const brand_300 = '#FF888D';
const brand_400 = '#FF6067';
const brand_500 = '#FF3941';
const brand_600 = '#CC2D34';
const brand_700 = '#992227';
const brand_800 = '#66161A';
const brand_900 = '#320B0C';

const gray_100 = '#F8F9FA';
const gray_200 = '#E9ECEF';
const gray_300 = '#DEE2E6';
const gray_400 = '#CED4DA';
const gray_500 = '#ADB5BD';
const gray_600 = '#6C757D';
const gray_700 = '#495057';
const gray_800 = '#343A40';
const gray_900 = '#212529';

const green_50 = '#B7EFC5';
const green_100 = '#92E6A7';
const green_200 = '#6EDE8A';
const green_300 = '#4AD66D';
const green_400 = '#2DC653';
const green_500 = '#25A244';
const green_600 = '#208B3A';
const green_700 = '#1A7431';
const green_800 = '#155D27';
const green_900 = '#10451D';

const success = '#34C759';
const error = '#FF3B30';
const warning = '#FF9500';
const info = '#007AFF';

export const Colors = {
  light: {
    mainText: black,
    subText: gray_600,
    background: white, 
    primary: brand_400,
    secondary: brand_50,
  },
  dark: {
    mainText: black,
    subText: neutral,
    background: white, 
    primary: black,
    secondary: gray,
  },
  brand: {
    _50: brand_50,
    _100: brand_100,
    _200: brand_200,
    _300: brand_300,
    _400: brand_400,
    _500: brand_500,
    _600: brand_600,
    _700: brand_700,
    _800: brand_800,
    _900: brand_900,
  },
  gray: {
    _100: gray_100,
    _200: gray_200,
    _300: gray_300,
    _400: gray_400,
    _500: gray_500,
    _600: gray_600,
    _700: gray_700,
    _800: gray_800,
    _900: gray_900,
  },
  green: {
    _50: green_50,
    _100: green_100,
    _200: green_200,
    _300: green_300,
    _400: green_400,
    _500: green_500,
    _600: green_600,
    _700: green_700,
    _800: green_800,
    _900: green_900,
  },
  feedback: {
    success: success,
    error: error,
    warning: warning,
    info: info,
  }
};
