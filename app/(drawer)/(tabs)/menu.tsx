import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';
import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const CATEGORIES = ['All', 'Pizza', 'Burgers', 'Indian', 'Desserts', 'Beverages', 'Pasta'];

const MENU_ITEMS = [
  {
    id: '1',
    name: 'Margherita Pizza',
    price: 299,
    category: 'Pizza',
    description: 'Classic cheese pizza with rich tomato sauce',
    image: 'https://images.unsplash.com/photo-1601924577970-1e6f0d29a4f6',
  },
  {
    id: '2',
    name: 'Chicken Burger',
    price: 199,
    category: 'Burgers',
    description: 'Juicy grilled chicken patty with fresh veggies',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349',
  },
  {
    id: '3',
    name: 'Veg Biryani',
    price: 249,
    category: 'Indian',
    description: 'Aromatic basmati rice cooked with spices',
    image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d34',
  },
  {
    id: '4',
    name: 'Chocolate Ice Cream',
    price: 129,
    category: 'Desserts',
    description: 'Creamy chocolate indulgence',
    image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625',
  },
  {
    id: '5',
    name: 'Pasta Alfredo',
    price: 279,
    category: 'Pasta',
    description: 'Creamy white sauce pasta with herbs',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
  },
];

export default function MenuScreen() {
  const { colors } = useTheme();
  const { addItem } = useCart();

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === 'All' || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search dishes..."
          value={search}
          onChangeText={setSearch}
          placeholderTextColor={colors.textSecondary}
          style={[
            styles.searchInput,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              color: colors.text,
            },
          ]}
        />
      </View>

      {/* Category Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryContainer}
      >
        {CATEGORIES.map(cat => {
          const active = activeCategory === cat;

          return (
            <TouchableOpacity
              key={cat}
              onPress={() => setActiveCategory(cat)}
              style={[
                styles.categoryChip,
                {
                  backgroundColor: active ? colors.primary : colors.card,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text
                style={{
                  color: active ? '#fff' : colors.text,
                  fontWeight: '600',
                }}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Menu List */}
      <FlatList
        data={filteredItems}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.info}>
              <Text style={[styles.name, { color: colors.text }]}>
                {item.name}
              </Text>

              <Text
                style={[
                  styles.description,
                  { color: colors.textSecondary },
                ]}
                numberOfLines={2}
              >
                {item.description}
              </Text>

              <View style={styles.bottomRow}>
                <Text style={styles.price}>₹{item.price}</Text>

                <TouchableOpacity
                  style={[
                    styles.addButton,
                    { backgroundColor: colors.primary },
                  ]}
                  onPress={() => addItem(item)}
                >
                  <Text style={styles.addButtonText}>ADD</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 12,
  },
  searchInput: {
    height: 44,
    borderRadius: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    fontSize: 14,
  },
  categoryScroll: {
    maxHeight: 48,
  },
  categoryContainer: {
    paddingHorizontal: 12,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  list: {
    padding: 12,
  },
  card: {
    flexDirection: 'row',
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  image: {
    width: 110,
    height: 110,
  },
  info: {
    flex: 1,
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
  },
  description: {
    fontSize: 12,
    marginVertical: 6,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#22c55e',
  },
  addButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
});
