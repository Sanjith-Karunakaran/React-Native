import { CartProvider } from '@/context/CartContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { store } from '@/store';
import { Provider } from 'react-redux';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <ThemeProvider>
          <CartProvider>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            >
              {/* Login Flow */}
              <Stack.Screen name="login" />

              {/* Main App Flow */}
              <Stack.Screen name="(drawer)" />
            </Stack>
          </CartProvider>
        </ThemeProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
