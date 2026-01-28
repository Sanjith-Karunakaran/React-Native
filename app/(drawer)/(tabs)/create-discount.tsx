import { createDiscount } from '@/api/discounts';
import { useTheme } from '@/context/ThemeContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { createDiscountStyles as styles } from '../../../styles/discounts/createDiscount.styles';
import { sharedStyles } from '../../../styles/discounts/shared.styles';


import { DateButton } from '@/components/discount/DateButton';
import { DayChip } from '@/components/discount/DayChip';
import { Field } from '@/components/discount/Field';
import { SegmentButton } from '@/components/discount/SegmentButton';
import { Chip } from '../../../components/discount/Chip';




const CLIENT_ID = 1;

export default function CreateDiscountScreen() {
  const { colors } = useTheme();

  const [form, setForm] = useState({
    description: '',
    type: 'PERCENTAGE',
    value: '',
    priority: '1',
    scope: 'ORDER',
    platform: 'BOTH',
    timeEnabled: false,
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    days: [] as number[],
  });

  const [picker, setPicker] = useState<{
    mode: 'date' | 'time';
    field: string;
    visible: boolean;
  }>({ mode: 'date', field: '', visible: false });

  const update = (key: string, value: any) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const toggleDay = (day: number) =>
    setForm(prev => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day],
    }));

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const formatTime = (date: Date) => date.toTimeString().slice(0, 5);

  const handlePickerChange = (_: any, date?: Date) => {
    if (!date) return setPicker({ ...picker, visible: false });

    const value =
      picker.mode === 'date'
        ? formatDate(date)
        : formatTime(date);

    update(picker.field, value);
    setPicker({ ...picker, visible: false });
  };

  const handleSubmit = async () => {
    if (!form.description || !form.value) {
      return Alert.alert('Validation Error', 'Please fill all required fields');
    }

    const payload: any = {
      client_id: CLIENT_ID,
      description: form.description,
      discount_type: form.type,
      discount_value: Number(form.value),
      priority: Number(form.priority),
      scopes: [
        {
          type: form.scope,
          platform: form.platform,
        },
      ],
    };

    if (form.timeEnabled) {
      payload.conditions = [
        {
          time: {
            start_date: form.startDate,
            end_date: form.endDate,
            start_time: form.startTime,
            end_time: form.endTime,
            days_of_week: form.days.join(','),
          },
        },
      ];
    }

    try {
      console.log('CREATE PAYLOAD →', payload);
      await createDiscount(payload);
      Alert.alert('Success', 'Discount created successfully');
    } catch (err: any) {
      console.log('CREATE ERROR →', err?.response?.data || err.message);
      Alert.alert('Error', 'Failed to create discount');
    }
  };

  return (
    <>
      <ScrollView
        style={[sharedStyles.container, { backgroundColor: colors.background }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            New Discount
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Configure your discount settings
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.section}>
            <Field
              label="Description"
              placeholder="e.g., Weekend Special Offer"
              value={form.description}
              onChangeText={(v: string) => update('description', v)}
              colors={colors}
            />
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: colors.text }]}>
              Discount Type
            </Text>

            <View style={styles.segmentedControl}>
              <SegmentButton
                label="Percentage"
                icon="%"
                active={form.type === 'PERCENTAGE'}
                onPress={() => update('type', 'PERCENTAGE')}
                colors={colors}
                position="left"
              />
              <SegmentButton
                label="Fixed Amount"
                icon="₹"
                active={form.type === 'FLAT'}
                onPress={() => update('type', 'FLAT')}
                colors={colors}
                position="right"
              />
            </View>

            <View style={styles.valueContainer}>
              <Field
                label={form.type === 'PERCENTAGE' ? 'Percentage Value' : 'Amount'}
                placeholder={form.type === 'PERCENTAGE' ? '10' : '100'}
                keyboardType="numeric"
                value={form.value}
                onChangeText={(v: string) => update('value', v)}
                colors={colors}
                suffix={form.type === 'PERCENTAGE' ? '%' : '₹'}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: colors.text }]}>
              Apply To
            </Text>

            <View style={styles.segmentedControl}>
              <SegmentButton
                label="Entire Order"
                active={form.scope === 'ORDER'}
                onPress={() => update('scope', 'ORDER')}
                colors={colors}
                position="left"
              />
              <SegmentButton
                label="Per Item"
                active={form.scope === 'ITEM'}
                onPress={() => update('scope', 'ITEM')}
                colors={colors}
                position="right"
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: colors.text }]}>
              Platform
            </Text>

            <View style={styles.chipRow}>
              <Chip label="All" active={form.platform === 'BOTH'} onPress={() => update('platform', 'BOTH')} colors={colors} />
              <Chip label="Dine-in" active={form.platform === 'DINE_IN'} onPress={() => update('platform', 'DINE_IN')} colors={colors} />
              <Chip label="POS" active={form.platform === 'POS'} onPress={() => update('platform', 'POS')} colors={colors} />
            </View>
          </View>

          <View style={styles.section}>
            <Field
              label="Priority"
              placeholder="1"
              keyboardType="numeric"
              value={form.priority}
              onChangeText={(v: string) => update('priority', v)}
              colors={colors}
              helper="Higher priority discounts are applied first"
            />
          </View>

          <View style={[styles.toggleSection, { backgroundColor: colors.background }]}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.toggleLabel, { color: colors.text }]}>
                Time Restrictions
              </Text>
              <Text style={[styles.toggleHelper, { color: colors.textSecondary }]}>
                Set specific dates and times
              </Text>
            </View>

            <Switch
              value={form.timeEnabled}
              onValueChange={v => update('timeEnabled', v)}
              trackColor={{ false: colors.border, true: colors.primary + '40' }}
              thumbColor={form.timeEnabled ? colors.primary : colors.textSecondary}
            />
          </View>

          {form.timeEnabled && (
            <View style={[styles.timeCard, { backgroundColor: colors.background }]}>
              <View style={styles.timeRow}>
                <DateButton label="Start Date" value={form.startDate} onPress={() => setPicker({ visible: true, mode: 'date', field: 'startDate' })} colors={colors} />
                <DateButton label="End Date" value={form.endDate} onPress={() => setPicker({ visible: true, mode: 'date', field: 'endDate' })} colors={colors} />
              </View>

              <View style={styles.timeRow}>
                <DateButton label="Start Time" value={form.startTime} onPress={() => setPicker({ visible: true, mode: 'time', field: 'startTime' })} colors={colors} />
                <DateButton label="End Time" value={form.endTime} onPress={() => setPicker({ visible: true, mode: 'time', field: 'endTime' })} colors={colors} />
              </View>

              <View>
                <Text style={[styles.sectionLabel, { color: colors.text }]}>
                  Active Days
                </Text>
                <View style={styles.daysRow}>
                  {[1,2,3,4,5,6,7].map(d => (
                    <DayChip
                      key={d}
                      label={['M','T','W','T','F','S','S'][d-1]}
                      active={form.days.includes(d)}
                      onPress={() => toggleDay(d)}
                      colors={colors}
                    />
                  ))}
                </View>
              </View>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={[styles.submitButton, { backgroundColor: colors.primary }]}
          onPress={handleSubmit}
        >
          <Text style={styles.submitText}>Create Discount</Text>
        </TouchableOpacity>

        <View style={{ height: 24 }} />
      </ScrollView>

      {picker.visible && (
        <DateTimePicker
          value={new Date()}
          mode={picker.mode}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handlePickerChange}
        />
      )}
    </>
  );
}




