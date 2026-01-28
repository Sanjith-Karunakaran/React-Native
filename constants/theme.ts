/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';





export interface Theme {
  primary: string;
  secondary: string;
  background: string;
  card: string;
  text: string;
  border: string;
  
}

/* FOODHUB THEME */
export const foodhubTheme: Theme = {
  primary: '#f97316',
  secondary: '#fb923c',
  background: '#ffffff',
  card: '#ffffff',
  text: '#111827',
  border: '#e5e7eb',
};

/* UBER EATS THEME */
export const uberEatsTheme: Theme = {
  primary: '#06C167',
  secondary: '#2DD881',
  background: '#ffffff',
  card: '#ffffff',
  text: '#111827',
  border: '#e5e7eb',
};

/* FOODHUB DARK THEME */
export const foodhubDarkTheme: Theme = {
  primary: '#f97316',
  secondary: '#fb923c',
  background: '#0f172a',
  card: '#1e293b',
  text: '#ffffff',
  border: '#334155',
};

/* UBER EATS DARK THEME */
export const uberEatsDarkTheme: Theme = {
  primary: '#06C167',
  secondary: '#2DD881',
  background: '#0f0f0f',
  card: '#1c1c1c',
  text: '#ffffff',
  border: '#2a2a2a',
};


/* DARK THEME */
export const darkTheme: Theme = {
  primary: '#06C167',
  secondary: '#2DD881',
  background: '#0f0f0f',
  card: '#1c1c1c',
  text: '#ffffff',
  border: '#2a2a2a',
};













const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
