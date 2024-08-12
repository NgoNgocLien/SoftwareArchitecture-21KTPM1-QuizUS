/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

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

export const Colors = {
  light: {
    mainText: black,
    subText: neutral,
    gray: gray,
    background: white, 
    primary: brand_500,
    secondary: brand_50,
  },
  dark: {
    mainText: black,
    subText: neutral,
    gray: gray,
    background: white, 
    primary: black,
    secondary: gray,
  },
};
