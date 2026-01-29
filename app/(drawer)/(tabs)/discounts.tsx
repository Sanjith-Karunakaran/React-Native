import { deleteDiscount, getDiscounts, toggleDiscount } from '@/api/discounts';
import { DetailItem } from '@/components/discount/create-discount/DetailItem';
import { EmptyState } from '@/components/discount/create-discount/EmptyState';
import { DeleteConfirmModal } from '@/components/discount/modal/DeleteConfirmModal';
import { DeleteSuccessModal } from '@/components/discount/modal/DeleteSuccessModal';
import { useTheme } from '@/context/ThemeContext';
import { discountListStyles as styles } from '@/styles/discounts/discountList.styles';
import { sharedStyles } from '@/styles/discounts/shared.styles';
import { formatDays } from '@/utils/discountHelpers';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  ALERTS,
  BUTTONS,
  CLIENT_ID,
  DISCOUNT_TYPES,
  PLACEHOLDERS,
  SCREEN_TITLES,
} from '../../../constants/discount.constants';

export default function DiscountListScreen() {
  const { colors } = useTheme();

  const [loading, setLoading] = useState(true);
  const [discounts, setDiscounts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteSuccessVisible, setDeleteSuccessVisible] = useState(false);
  const [selectedDiscountId, setSelectedDiscountId] = useState<number | null>(null);

  /* ------------------------ API LOAD HANDLER ------------------------ */

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await getDiscounts(CLIENT_ID);
      setDiscounts(data || []);
    } catch {
      Alert.alert('Error', ALERTS.LOAD_FAILED);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  /* ------------------------ EVENT HANDLERS ------------------------- */

  const handleSearchChange = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  const handleDelete = useCallback((id: number) => {
    setSelectedDiscountId(id);
    setDeleteModalVisible(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (selectedDiscountId === null) return;

    try {
      await deleteDiscount(selectedDiscountId);
      setDeleteModalVisible(false);
      setSelectedDiscountId(null);
      load();

      setTimeout(() => {
        setDeleteSuccessVisible(true);
      }, 300);
    } catch {
      Alert.alert('Error', ALERTS.CREATE_FAILED);
      setDeleteModalVisible(false);
      setSelectedDiscountId(null);
    }
  }, [selectedDiscountId, load]);

  const handleCancelDelete = useCallback(() => {
    setDeleteModalVisible(false);
    setSelectedDiscountId(null);
  }, []);

  const handleCloseDeleteSuccess = useCallback(() => {
    setDeleteSuccessVisible(false);
  }, []);

  const handleToggle = useCallback(async (id: number, active: boolean) => {
    try {
      await toggleDiscount(id, active);
      setDiscounts(prev =>
        prev.map(d => (d.id === id ? { ...d, is_active: active } : d))
      );
    } catch {
      Alert.alert('Error', ALERTS.STATUS_UPDATE_FAILED);
    }
  }, []);

  const handleEdit = useCallback((id: number) => {
    router.push({
      pathname: '/edit-discount',
      params: { id: id.toString() },
    });
  }, []);

  /* ------------------------ FILTERED DATA -------------------------- */

  const filteredDiscounts = discounts.filter(d =>
    d.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.discount_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.discount_value?.toString().includes(searchQuery)
  );

  /* ------------------------ LOADING UI ----------------------------- */

  if (loading) {
    return (
      <View style={[sharedStyles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  /* ------------------------ EMPTY UI ------------------------------- */

  if (discounts.length === 0) {
    return (
      <View style={[sharedStyles.center, { backgroundColor: colors.background }]}>
        <EmptyState
          icon="🏷️"
          title="No Discounts Yet"
          message="Create your first discount to get started"
          colors={colors}
        />
      </View>
    );
  }

  /* ------------------------ MAIN UI -------------------------------- */

  return (
    <>
      <View style={[sharedStyles.container, { backgroundColor: colors.background }]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            {SCREEN_TITLES.LIST}
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
            {discounts.length} configured
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View
            style={[
              styles.searchBar,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder={PLACEHOLDERS.SEARCH}
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={handleSearchChange}
            />
          </View>
        </View>

        {/* Discount List */}
        <FlatList
          data={filteredDiscounts}
          keyExtractor={i => i.id.toString()}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => {
            const scope = item.scopes?.[0];
            const time = item.conditions?.[0]?.time;

            return (
              <View style={[styles.card, { backgroundColor: colors.card }]}>
                {/* Header */}
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={[styles.cardTitle, { color: colors.text }]}>
                      {item.description}
                    </Text>
                    <Text
                      style={[styles.statusText, { color: colors.textSecondary }]}
                    >
                      {item.is_active ? 'Active' : 'Inactive'}
                    </Text>
                  </View>

                  <Switch
                    value={item.is_active}
                    onValueChange={v => handleToggle(item.id, v)}
                    thumbColor={item.is_active ? colors.primary : colors.border}
                  />
                </View>

                {/* Discount Value */}
                <View
                  style={[styles.valueContainer, { backgroundColor: colors.background }]}
                >
                  <Text
                    style={[styles.valueLabel, { color: colors.textSecondary }]}
                  >
                    Discount Value
                  </Text>
                  <Text style={[styles.valueAmount, { color: colors.primary }]}>
                    {item.discount_type === DISCOUNT_TYPES.PERCENTAGE
                      ? `${item.discount_value}%`
                      : `₹${item.discount_value}`}
                  </Text>
                </View>

                {/* Details Grid */}
                <View style={styles.detailsGrid}>
                  <DetailItem label="Type" value={item.discount_type} colors={colors} />
                  <DetailItem label="Scope" value={scope?.type || 'ORDER'} colors={colors} />
                  <DetailItem label="Platform" value={scope?.platform || 'BOTH'} colors={colors} />
                  <DetailItem label="Priority" value={String(item.priority)} colors={colors} />
                </View>

                {/* Time Restrictions */}
                {time && (
                  <View
                    style={[styles.timeCard, { backgroundColor: colors.background }]}
                  >
                    <Text
                      style={[styles.timeLabel, { color: colors.textSecondary }]}
                    >
                      ⏰ Time Window
                    </Text>
                    <Text style={[styles.timeText, { color: colors.text }]}>
                      {time.start_time} — {time.end_time}
                    </Text>
                    <Text
                      style={[styles.daysText, { color: colors.textSecondary }]}
                    >
                      Days: {formatDays(time.days_of_week)}
                    </Text>
                  </View>
                )}

                {/* Actions */}
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: colors.background }]}
                    onPress={() => handleEdit(item.id)}
                  >
                    <Text
                      style={[styles.actionButtonText, { color: colors.primary }]}
                    >
                      {BUTTONS.EDIT}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.actionButton,
                      styles.deleteButton,
                      { backgroundColor: colors.background },
                    ]}
                    onPress={() => handleDelete(item.id)}
                  >
                    <Text
                      style={[
                        styles.actionButtonText,
                        { color: colors.danger || '#ef4444' },
                      ]}
                    >
                      {BUTTONS.DELETE}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>

      {/* Modals */}
      <DeleteConfirmModal
        visible={deleteModalVisible}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        colors={colors}
      />

      <DeleteSuccessModal
        visible={deleteSuccessVisible}
        onClose={handleCloseDeleteSuccess}
        colors={colors}
      />
    </>
  );
}
