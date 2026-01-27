import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { RootState } from '@/store';
import { useSelector } from 'react-redux';

export default function HomeScreen() {
  const { colors, brand } = useTheme();

  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        
        <Text style={[styles.title, { color: colors.primary }]}>
          Welcome to {brand.name}
        </Text>

        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {brand.tagline}
        </Text>

        {/* USER DETAILS CARD */}
        {user && (
          <View style={[styles.userCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.userTitle, { color: colors.text }]}>
              Logged in as
            </Text>

            <Text style={[styles.userText, { color: colors.textSecondary }]}>
              👤 {user.username}
            </Text>

            <Text style={[styles.userText, { color: colors.textSecondary }]}>
              📧 {user.email}
            </Text>

            <Text style={[styles.userText, { color: colors.textSecondary }]}>
              📞 {user.phone}
            </Text>

            <Text style={[styles.userText, { color: colors.textSecondary }]}>
              🏠 {user.address}
            </Text>
          </View>
        )}
        
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Quick Actions
          </Text>

          <Text style={[styles.cardText, { color: colors.textSecondary }]}>
            • Browse Menu{'\n'}
            • Add items to cart{'\n'}
            • Checkout your order
          </Text>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },

  userCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
  },
  userTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  userText: {
    fontSize: 14,
    marginBottom: 4,
  },

  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 14,
    lineHeight: 22,
  },
});
