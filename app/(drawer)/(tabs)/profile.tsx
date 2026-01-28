import { useTheme } from '@/context/ThemeContext';
import { RootState } from '@/store';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';

export default function ProfileScreen() {
  const { colors } = useTheme();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
          <Text style={styles.avatarText}>
            {user?.username?.charAt(0)}
          </Text>
        </View>

        <Text style={[styles.name, { color: colors.text }]}>
          {user?.username}
        </Text>

        <Text style={[styles.email, { color: colors.textSecondary }]}>
          {user?.email}
        </Text>
      </View>

      {/* Orders & Rewards */}
      <Section title="Orders & Rewards" colors={colors}>
        <Row icon="receipt-outline" label="My Orders" colors={colors} />
        <Row icon="ticket-outline" label="My Vouchers" colors={colors} />
        <Row icon="heart-outline" label="Favorites" colors={colors} />
        <Row icon="star-outline" label="Rewards" colors={colors} />
      </Section>

      {/* Payments */}
      <Section title="Payments & Address" colors={colors}>
        <Row icon="card-outline" label="Payment Methods" colors={colors} />
        <Row icon="home-outline" label="Saved Addresses" colors={colors} />
      </Section>

      {/* Preferences */}
      <Section title="Preferences" colors={colors}>
        <Row icon="moon-outline" label="Theme" colors={colors} />
        <Row icon="notifications-outline" label="Notifications" colors={colors} />
        <Row icon="language-outline" label="Language" colors={colors} />
      </Section>

      {/* Support */}
      <Section title="Support" colors={colors}>
        <Row icon="help-circle-outline" label="Help Center" colors={colors} />
        <Row icon="call-outline" label="Contact Support" colors={colors} />
        <Row icon="document-text-outline" label="Terms & Privacy" colors={colors} />
      </Section>

      {/* Logout */}
      <TouchableOpacity
        style={[styles.logoutButton, { borderColor: colors.border }]}
      >
        <Ionicons name="log-out-outline" size={22} color={colors.danger} />
        <Text style={[styles.logoutText, { color: colors.danger }]}>
          Logout
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* Section Wrapper */
function Section({
  title,
  children,
  colors,
}: {
  title: string;
  children: React.ReactNode;
  colors: any;
}) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
        {title}
      </Text>

      <View
        style={[
          styles.card,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        {children}
      </View>
    </View>
  );
}

/* Row Item */
function Row({
  icon,
  label,
  colors,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  colors: any;
}) {
  return (
    <TouchableOpacity style={styles.row}>
      <View style={styles.rowLeft}>
        <Ionicons name={icon} size={22} color={colors.primary} />
        <Text style={[styles.rowText, { color: colors.text }]}>
          {label}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward-outline"
        size={20}
        color={colors.textSecondary}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },

  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '700',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
  },
  email: {
    fontSize: 14,
    marginTop: 4,
  },

  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 0.5,
    borderColor: '#e5e7eb',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowText: {
    fontSize: 15,
    fontWeight: '600',
  },

  logoutButton: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
    marginBottom: 40,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
