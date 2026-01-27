import { DrawerContent } from '@/components/DrawerContent';
import { Drawer } from 'expo-router/drawer';

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: 'Home',
          title: 'FoodApp',
        }}
      />

      <Drawer.Screen
        name="cart"
        options={{
          drawerLabel: 'Cart',
          title: 'Cart',
        }}
      />
    </Drawer>
  );
}
