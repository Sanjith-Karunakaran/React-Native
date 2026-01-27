export type AppFlavor = 'foodhub' | 'ubereats';

export const APP_FLAVOR: AppFlavor =
  (process.env.EXPO_PUBLIC_APP_FLAVOUR as AppFlavor) || 'foodhub';

console.log('APP_FLAVOR:', APP_FLAVOR);
