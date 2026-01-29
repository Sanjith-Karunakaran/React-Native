import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useTheme } from '../../../context/ThemeContext';

import { dashboardStyles } from '../../../styles/discounts/dashboard.styles';
import { sharedStyles } from '../../../styles/discounts/shared.styles';

/* ---------------- Dummy Data ---------------- */

const STATS = {
  totalDiscounts: 24,
  activeDiscounts: 18,
  inactiveDiscounts: 6,
  totalSavings: 12450,
};

const RECENT_DISCOUNTS = [
  {
    id: '1',
    description: 'Summer Sale - 20% Off',
    type: 'percentage',
    value: 20,
    status: 'active',
    platform: 'both',
    usageCount: 145,
  },
  {
    id: '2',
    description: 'New Customer Discount',
    type: 'amount',
    value: 50,
    status: 'active',
    platform: 'mobile',
    usageCount: 89,
  },
  {
    id: '3',
    description: 'Weekend Special',
    type: 'percentage',
    value: 15,
    status: 'inactive',
    platform: 'web',
    usageCount: 234,
  },
];

/* ---------------- Components ---------------- */

const StatCard = ({ title, value, subtitle, icon, colors, trend }: any) => (
  <View style={[dashboardStyles.statCard, { backgroundColor: colors.card }]}>
    <View style={dashboardStyles.statHeader}>
      <View
        style={[
          dashboardStyles.iconContainer,
          { backgroundColor: `${colors.primary}15` },
        ]}
      >
        <Ionicons name={icon} size={24} color={colors.primary} />
      </View>

      {trend && (
        <View style={dashboardStyles.trendBadge}>
          <Ionicons
            name={trend > 0 ? 'trending-up' : 'trending-down'}
            size={14}
            color={trend > 0 ? '#10B981' : '#EF4444'}
          />
          <Text
            style={[
              dashboardStyles.trendText,
              { color: trend > 0 ? '#10B981' : '#EF4444' },
            ]}
          >
            {Math.abs(trend)}%
          </Text>
        </View>
      )}
    </View>

    <Text style={[dashboardStyles.statValue, { color: colors.text }]}>
      {value}
    </Text>
    <Text
      style={[dashboardStyles.statTitle, { color: colors.textSecondary }]}
    >
      {title}
    </Text>

    {subtitle && (
      <Text
        style={[
          dashboardStyles.statSubtitle,
          { color: colors.textSecondary },
        ]}
      >
        {subtitle}
      </Text>
    )}
  </View>
);

const DiscountItem = ({ item, colors }: any) => (
  <View
    style={[dashboardStyles.discountItem, { backgroundColor: colors.card }]}
  >
    <View style={dashboardStyles.discountHeader}>
      <View style={dashboardStyles.discountInfo}>
        <Text
          style={[
            dashboardStyles.discountDescription,
            { color: colors.text },
          ]}
        >
          {item.description}
        </Text>

        <View style={dashboardStyles.discountMeta}>
          <View
            style={[
              dashboardStyles.statusBadge,
              {
                backgroundColor:
                  item.status === 'active'
                    ? '#10B98120'
                    : '#EF444420',
              },
            ]}
          >
            <Text
              style={[
                dashboardStyles.statusText,
                {
                  color:
                    item.status === 'active' ? '#10B981' : '#EF4444',
                },
              ]}
            >
              {item.status === 'active' ? '● Active' : '○ Inactive'}
            </Text>
          </View>

          <Text
            style={[
              dashboardStyles.usageText,
              { color: colors.textSecondary },
            ]}
          >
            {item.usageCount} uses
          </Text>
        </View>
      </View>

      <View style={dashboardStyles.discountValue}>
        <Text
          style={[dashboardStyles.valueText, { color: colors.primary }]}
        >
          {item.type === 'percentage'
            ? `${item.value}%`
            : `$${item.value}`}
        </Text>
        <Text
          style={[
            dashboardStyles.valueLabel,
            { color: colors.textSecondary },
          ]}
        >
          {item.type === 'percentage' ? 'OFF' : 'DISCOUNT'}
        </Text>
      </View>
    </View>
  </View>
);

/* ---------------- Screen ---------------- */

export default function DashboardScreen() {
  const { colors } = useTheme();

  return (
    <ScrollView
      style={[sharedStyles.container, { backgroundColor: colors.background }]}
    >
      <View style={dashboardStyles.header}>
        <View>
          <Text
            style={[
              dashboardStyles.greeting,
              { color: colors.textSecondary },
            ]}
          >
            Welcome back!
          </Text>
          <Text
            style={[dashboardStyles.title, { color: colors.text }]}
          >
            Dashboard
          </Text>
        </View>

        <TouchableOpacity
          style={[
            dashboardStyles.notificationButton,
            { backgroundColor: colors.card },
          ]}
        >
          <Ionicons
            name="notifications-outline"
            size={24}
            color={colors.text}
          />
          <View style={dashboardStyles.notificationDot} />
        </TouchableOpacity>
      </View>

      <View style={dashboardStyles.statsGrid}>
        <StatCard title="Total Discounts" value={STATS.totalDiscounts} icon="pricetags" colors={colors} trend={12} />
        <StatCard title="Active Now" value={STATS.activeDiscounts} icon="checkmark-circle" colors={colors} trend={8} />
        <StatCard title="Inactive" value={STATS.inactiveDiscounts} icon="close-circle" colors={colors} trend={-3} />
        <StatCard title="Total Savings" value={`$${STATS.totalSavings.toLocaleString()}`} subtitle="This month" icon="trending-up" colors={colors} trend={15} />
      </View>

      <View style={dashboardStyles.recentSection}>
        <View style={dashboardStyles.recentHeader}>
          <Text
            style={[
              dashboardStyles.sectionTitle,
              { color: colors.text },
            ]}
          >
            Recent Discounts
          </Text>
        </View>

        {RECENT_DISCOUNTS.map(item => (
          <DiscountItem key={item.id} item={item} colors={colors} />
        ))}
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}
