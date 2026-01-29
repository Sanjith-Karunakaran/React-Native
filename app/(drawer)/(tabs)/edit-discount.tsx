// app/(drawer)/(tabs)/edit-discount.tsx

import { getDiscountById, updateDiscount } from '@/api/discounts';
import { Field } from '@/components/discount/create-discount/Field';
import { useTheme } from '@/context/ThemeContext';
import { editDiscountStyles as styles } from '@/styles/discounts/editDiscount.styles';
import { sharedStyles } from '@/styles/discounts/shared.styles';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function EditDiscountScreen() {
  const { colors } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<any>({});

  const load = async () => {
    try {
      const { data } = await getDiscountById(Number(id));
      setForm(data);
    } catch {
      Alert.alert('Error', 'Failed to load discount');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleUpdate = async () => {
    try {
      await updateDiscount(Number(id), form);
      Alert.alert('Success', 'Discount updated');
      router.back();
    } catch {
      Alert.alert('Error', 'Update failed');
    }
  };

  if (loading) {
    return (
      <View style={[sharedStyles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView 
      style={[sharedStyles.container, { backgroundColor: colors.background }]} 
      contentContainerStyle={sharedStyles.content}
    >
      {/* Header */}
      <Text style={[sharedStyles.title, { color: colors.text }]}>
        Edit Discount
      </Text>

      {/* Form Fields */}
      <Field
        label="Description"
        value={form.description}
        onChangeText={(v: string) => setForm({ ...form, description: v })}
        colors={colors}
      />

      <Field
        label="Priority"
        keyboardType="numeric"
        value={String(form.priority)}
        onChangeText={(v: string) => setForm({ ...form, priority: v })}
        colors={colors}
      />

      {/* Active Toggle */}
      <View style={styles.switchRow}>
        <Text style={[sharedStyles.label, { color: colors.text }]}>
          Active
        </Text>
        <Switch
          value={form.is_active}
          onValueChange={v => setForm({ ...form, is_active: v })}
          trackColor={{ false: colors.border, true: colors.primary + '40' }}
          thumbColor={form.is_active ? colors.primary : colors.textSecondary}
        />
      </View>

      {/* Update Button */}
      <TouchableOpacity
        style={[sharedStyles.button, { backgroundColor: colors.primary }]}
        onPress={handleUpdate}
      >
        <Text style={sharedStyles.buttonText}>Update Discount</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}