import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MENU_ITEMS = [
  { id: '1', name: 'Margherita Pizza', price: 299, category: 'Pizza', emoji: '🍕' },
  { id: '2', name: 'Chicken Burger', price: 199, category: 'Burgers', emoji: '🍔' },
  { id: '3', name: 'Pasta Alfredo', price: 249, category: 'Pasta', emoji: '🍝' },
  { id: '4', name: 'Caesar Salad', price: 179, category: 'Salads', emoji: '🥗' },
  { id: '5', name: 'Chocolate Shake', price: 129, category: 'Beverages', emoji: '🥤' },
  { id: '6', name: 'Pepperoni Pizza', price: 349, category: 'Pizza', emoji: '🍕' },
  { id: '7', name: 'Veg Biryani', price: 199, category: 'Indian', emoji: '🍛' },
  { id: '8', name: 'Ice Cream', price: 99, category: 'Desserts', emoji: '🍨' },
];

export default function MenuScreen() {
  const { colors } = useTheme();
  const { addItem } = useCart();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Our Menu</Text>

        {MENU_ITEMS.map(item => (
          <View 
            key={item.id} 
            style={[styles.card, { backgroundColor: colors.card }]}
          >
            <View style={styles.itemInfo}>
              <View style={styles.details}>
                <Text style={[styles.itemName, { color: colors.text }]}>
                  {item.name}
                </Text>
                <Text style={[styles.category, { color: colors.textSecondary }]}>
                  {item.category}
                </Text>
                <Text style={styles.price}>₹{item.price}</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => addItem(item)}
            >
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  details: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
  },
  category: {
    fontSize: 12,
    marginTop: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#22c55e',
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#f97316',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
