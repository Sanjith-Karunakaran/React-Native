import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';
import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CartScreen() {
  const { colors } = useTheme();
  const { items, addItem, removeItem, totalPrice } = useCart();

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.text,
        }}
      />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView style={styles.scrollView}>
          {items.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyEmoji}>🛒</Text>
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                Your cart is empty
              </Text>
            </View>
          ) : (
            items.map(item => (
              <View 
                key={item.id} 
                style={[styles.cartItem, { backgroundColor: colors.card }]}
              >
                <View style={styles.itemInfo}>
                  <View style={styles.details}>
                    <Text style={[styles.itemName, { color: colors.text }]}>{item.name}</Text>
                    <Text style={styles.price}>₹{item.price}</Text>
                  </View>
                </View>
                <View style={styles.quantityControl}>
                  <TouchableOpacity 
                    style={styles.removeButton}
                    onPress={() => removeItem(item.id)}
                  >
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={[styles.quantity, { color: colors.text }]}>{item.quantity}</Text>
                  <TouchableOpacity 
                    style={styles.addButton}
                    onPress={() => addItem(item)}
                  >
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
        
        {items.length > 0 && (
          <View style={[styles.footer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
            <View style={styles.totalRow}>
              <Text style={[styles.totalLabel, { color: colors.text }]}>Total:</Text>
              <Text style={styles.totalAmount}>₹{totalPrice}</Text>
            </View>
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  emoji: {
    fontSize: 32,
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#22c55e',
    marginTop: 4,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  removeButton: {
    backgroundColor: '#ef4444',
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#22c55e',
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    minWidth: 20,
    textAlign: 'center',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#22c55e',
  },
  checkoutButton: {
    backgroundColor: '#f97316',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});