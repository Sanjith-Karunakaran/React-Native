import { APP_FLAVOR } from './flavors';
import {
    foodhubDarkTheme,
    foodhubTheme,
    uberEatsDarkTheme,
    uberEatsTheme,
} from './theme';

export const BRAND_CONFIG = {
  foodhub: {
    name: 'Foodhub',
    tagline: 'Order your favorite food from the menu',
    light: foodhubTheme,
    dark: foodhubDarkTheme,
  },
  ubereats: {
    name: 'Uber Eats',
    tagline: 'Delicious food delivered to you',
    light: uberEatsTheme,
    dark: uberEatsDarkTheme,
  },
} as const;

export const getBrandConfig = () => {
  return BRAND_CONFIG[APP_FLAVOR] || BRAND_CONFIG.foodhub;
};
