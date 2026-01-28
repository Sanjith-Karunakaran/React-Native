import { useTheme } from '@/context/ThemeContext';
import { RootState } from '@/store';
import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';

const CATEGORIES = [
  { label: 'Pizza', emoji: '🍕' },
  { label: 'Burgers', emoji: '🍔' },
  { label: 'Indian', emoji: '🍛' },
  { label: 'Desserts', emoji: '🍨' },
];

const POPULAR_ITEMS = [
  { id: '1', name: 'Margherita Pizza', price: 299 },
  { id: '2', name: 'Chicken Burger', price: 199 },
  { id: '3', name: 'Veg Biryani', price: 249 },
];

export default function HomeScreen() {
  const { colors, brand } = useTheme();
  const user = useSelector((state: RootState) => state.auth.user);

  const greeting = getGreeting();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Greeting */}
      <Text style={[styles.title, { color: colors.text }]}>
        {greeting}, {user?.username} 👋
      </Text>

      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        What would you like to eat today?
      </Text>

      {/* Search Bar */}
      <TouchableOpacity
        style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border }]}
      >
        <Text style={{ color: colors.textSecondary }}>
          🔍 Search dishes, restaurants...
        </Text>
      </TouchableOpacity>

      {/* Offers */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        🔥 Today offers
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <OfferCard text="50% OFF on first order 🎉" />
        <OfferCard text="Free Delivery 🚚" />
        <OfferCard text="Flat ₹100 OFF 💸" />
      </ScrollView>

      {/* Categories */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        🍽 Categories
      </Text>

      <View style={styles.categoryRow}>
        {CATEGORIES.map(cat => (
          <View
            key={cat.label}
            style={[styles.categoryCard, { backgroundColor: colors.card }]}
          >
            <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
            <Text style={{ color: colors.text }}>{cat.label}</Text>
          </View>
        ))}
      </View>

      {/* Popular Picks */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        🔥 Popular Picks
      </Text>

      <FlatList
        horizontal
        data={POPULAR_ITEMS}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={[styles.popularCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.popularName, { color: colors.text }]}>
              {item.name}
            </Text>
            <Text style={[styles.popularPrice]}>
              ₹{item.price}
            </Text>
          </View>
        )}
      />

      {/* Reorder */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        🔁 Order Again
      </Text>

      <TouchableOpacity
        style={[styles.reorderCard, { backgroundColor: colors.primary }]}
      >
        <Text style={styles.reorderText}>
          Reorder last meal in 1 tap 🚀
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

/* Greeting Logic */
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
}

/* Offer Card */
function OfferCard({ text }: { text: string }) {
  return (
    <View style={styles.offerCard}>
      <Text style={styles.offerText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },

  title: {
    fontSize: 26,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 16,
  },

  searchBar: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },

  offerCard: {
    height: 100,
    width: 220,
    borderRadius: 16,
    backgroundColor: '#f97316',
    marginRight: 12,
    justifyContent: 'center',
    padding: 16,
  },
  offerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryCard: {
    width: '22%',
    height: 90,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryEmoji: {
    fontSize: 28,
    marginBottom: 4,
  },

  popularCard: {
    width: 180,
    padding: 14,
    borderRadius: 14,
    marginRight: 12,
  },
  popularName: {
    fontSize: 14,
    fontWeight: '700',
  },
  popularPrice: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 6,
    color: '#22c55e',
  },

  reorderCard: {
    height: 54,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  reorderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
