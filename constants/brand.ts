import { APP_FLAVOR } from './flavors';
import { foodhubTheme, uberEatsTheme } from './theme';

export const BRAND_CONFIG = {
  foodhub: {
    name: 'Foodhub',
    tagline: 'Order your favorite food from the menu',
    theme: foodhubTheme,
  },
  ubereats: {
    name: 'Uber Eats',
    tagline: 'Delicious food delivered to you',
    theme: uberEatsTheme,
  },
} as const;

export const getBrandConfig = () => {

  return BRAND_CONFIG[APP_FLAVOR] || BRAND_CONFIG.foodhub;
};
