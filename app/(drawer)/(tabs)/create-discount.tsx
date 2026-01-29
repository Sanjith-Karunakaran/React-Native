import { useTheme } from '@/context/ThemeContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  Animated,
  Modal,
  Platform,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Chip } from '@/components/discount/create-discount/Chip';
import { DateButton } from '@/components/discount/create-discount/DateButton';
import { DayChip } from '@/components/discount/create-discount/DayChip';
import { Field } from '@/components/discount/create-discount/Field';
import { SegmentButton } from '@/components/discount/create-discount/SegmentButton';

import { createDiscountStyles as styles } from '../../../styles/discounts/createDiscount.styles';
import { sharedStyles } from '../../../styles/discounts/shared.styles';

import {
  ALERTS,
  BUTTONS,
  DAYS,
  DISCOUNT_SCOPES,
  DISCOUNT_TYPES,
  DISCOUNT_TYPE_OPTIONS,
  LABELS,
  PLACEHOLDERS,
  PLATFORMS,
  PLATFORM_OPTIONS,
  SCOPE_OPTIONS,
  SCREEN_TITLES
} from '../../../constants/discount.constants';

// Custom Success Modal Component
const SuccessModal = ({ visible, onClose, colors }: any) => {
  const [scaleAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    if (visible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }).start();
    } else {
      scaleAnim.setValue(0);
    }
  }, [visible]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}>
        <Animated.View style={{
          backgroundColor: colors.card,
          borderRadius: 24,
          padding: 32,
          width: '100%',
          maxWidth: 340,
          alignItems: 'center',
          transform: [{ scale: scaleAnim }],
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 20 },
          shadowOpacity: 0.3,
          shadowRadius: 30,
          elevation: 10,
        }}>
          {/* Success Icon */}
          <View style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: '#10B981',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
          }}>
            <Text style={{
              fontSize: 48,
              color: '#fff',
            }}>✓</Text>
          </View>

          {/* Title */}
          <Text style={{
            fontSize: 26,
            fontWeight: '800',
            color: colors.text,
            marginBottom: 12,
            letterSpacing: -0.5,
            textAlign: 'center',
          }}>
            Discount Created!
          </Text>

          {/* Description */}
          <Text style={{
            fontSize: 16,
            color: colors.textSecondary,
            textAlign: 'center',
            marginBottom: 28,
            lineHeight: 24,
            opacity: 0.7,
          }}>
            Your discount has been successfully created and is now active
          </Text>

          {/* Action Button */}
          <TouchableOpacity
            onPress={onClose}
            style={{
              backgroundColor: colors.primary,
              paddingHorizontal: 40,
              paddingVertical: 16,
              borderRadius: 14,
              width: '100%',
              alignItems: 'center',
              shadowColor: colors.primary,
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 6,
            }}
          >
            <Text style={{
              color: '#fff',
              fontSize: 17,
              fontWeight: '700',
              letterSpacing: -0.3,
            }}>
              Awesome!
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default function CreateDiscountScreen() {
  const { colors } = useTheme();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [form, setForm] = useState({
    description: '',
    type: DISCOUNT_TYPES.PERCENTAGE,
    value: '',
    priority: '1',
    scope: DISCOUNT_SCOPES.ORDER,
    platform: PLATFORMS.BOTH,
    timeEnabled: false,
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    days: [] as number[],
  });

  const [picker, setPicker] = useState<{ mode: 'date' | 'time'; field: string; visible: boolean }>({
    mode: 'date',
    field: '',
    visible: false,
  });

  /* -------------------- Generic Handlers -------------------- */

  const update = useCallback((key: string, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }));
  }, []);

  const bindField = useCallback(
    (key: string) => (value: any) => update(key, value),
    [update]
  );

  const bindPress = useCallback(
    (key: string, value: any) => () => update(key, value),
    [update]
  );

  const toggleDay = useCallback((day: number) => {
    setForm(prev => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day],
    }));
  }, []);

  const openPicker = useCallback((mode: 'date' | 'time', field: string) => {
    setPicker({ visible: true, mode, field });
  }, []);

  const formatDate = (d: Date) => d.toISOString().split('T')[0];
  const formatTime = (d: Date) => d.toTimeString().slice(0, 5);

  const handlePickerChange = useCallback((_: any, date?: Date) => {
    if (!date) return setPicker(prev => ({ ...prev, visible: false }));

    const value = picker.mode === 'date' ? formatDate(date) : formatTime(date);
    update(picker.field, value);
    setPicker(prev => ({ ...prev, visible: false }));
  }, [picker, update]);

  const handleSubmit = useCallback(async () => {
    if (!form.description || !form.value) {
      return Alert.alert(
        ALERTS.VALIDATION_ERROR_TITLE,
        ALERTS.VALIDATION_ERROR_MSG
      );
    }

    // Show success modal after short delay
    setTimeout(() => {
      setShowSuccessModal(true);
    }, 300);
  }, [form]);

  const handleCloseSuccessModal = useCallback(() => {
    setShowSuccessModal(false);
    // Optional: Reset form or navigate away
    // setForm({ ... reset values ... });
  }, []);

  return (
    <>
      <ScrollView style={[sharedStyles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>{SCREEN_TITLES.CREATE}</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Configure your discount settings</Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Field
            label={LABELS.DESCRIPTION}
            placeholder={PLACEHOLDERS.DESCRIPTION}
            value={form.description}
            onChangeText={bindField('description')}
            colors={colors}
          />

          <Text style={[styles.sectionLabel, { color: colors.text }]}>{LABELS.DISCOUNT_TYPE}</Text>
          <View style={[styles.segmentedControl, { backgroundColor: colors.background }]}>
            {DISCOUNT_TYPE_OPTIONS.map((opt, idx) => (
              <SegmentButton
                key={opt.value}
                label={opt.label}
                icon={opt.icon}
                active={form.type === opt.value}
                onPress={bindPress('type', opt.value)}
                colors={colors}
                position={idx === 0 ? 'left' : 'right'}
              />
            ))}
          </View>

          <Field
            label={form.type === DISCOUNT_TYPES.PERCENTAGE ? 'Percentage Value' : 'Amount'}
            placeholder={form.type === DISCOUNT_TYPES.PERCENTAGE ? PLACEHOLDERS.PERCENTAGE : PLACEHOLDERS.AMOUNT}
            keyboardType="numeric"
            value={form.value}
            onChangeText={bindField('value')}
            colors={colors}
          />

          <Text style={[styles.sectionLabel, { color: colors.text }]}>{LABELS.APPLY_TO}</Text>
          <View style={[styles.segmentedControl, { backgroundColor: colors.background }]}>
            {SCOPE_OPTIONS.map((opt, idx) => (
              <SegmentButton
                key={opt.value}
                label={opt.label}
                active={form.scope === opt.value}
                onPress={bindPress('scope', opt.value)}
                colors={colors}
                position={idx === 0 ? 'left' : 'right'}
              />
            ))}
          </View>

          <Text style={[styles.sectionLabel, { color: colors.text }]}>{LABELS.PLATFORM}</Text>
          <View style={styles.chipRow}>
            {PLATFORM_OPTIONS.map(opt => (
              <Chip
                key={opt.value}
                label={opt.label}
                active={form.platform === opt.value}
                onPress={bindPress('platform', opt.value)}
                colors={colors}
              />
            ))}
          </View>

          <Field
            label={LABELS.PRIORITY}
            placeholder={PLACEHOLDERS.PRIORITY}
            keyboardType="numeric"
            value={form.priority}
            onChangeText={bindField('priority')}
            colors={colors}
          />

          <View style={[styles.toggleSection, { backgroundColor: colors.background }]}>
            <Text style={[styles.toggleLabel, { color: colors.text }]}>{LABELS.TIME_RESTRICTIONS}</Text>
            <Switch value={form.timeEnabled} onValueChange={bindField('timeEnabled')} />
          </View>

          {form.timeEnabled && (
            <View style={[styles.timeCard, { backgroundColor: colors.background }]}>
              <View style={styles.timeRow}>
                <DateButton label="Start Date" value={form.startDate} onPress={() => openPicker('date', 'startDate')} colors={colors} />
                <DateButton label="End Date" value={form.endDate} onPress={() => openPicker('date', 'endDate')} colors={colors} />
              </View>
              <View style={styles.timeRow}>
                <DateButton label="Start Time" value={form.startTime} onPress={() => openPicker('time', 'startTime')} colors={colors} />
                <DateButton label="End Time" value={form.endTime} onPress={() => openPicker('time', 'endTime')} colors={colors} />
              </View>
              <View style={styles.daysRow}>
                {DAYS.map(d => (
                  <DayChip key={d.value} label={d.label} active={form.days.includes(d.value)} onPress={() => toggleDay(d.value)} colors={colors} />
                ))}
              </View>
            </View>
          )}
        </View>

        <TouchableOpacity style={[styles.submitButton, { backgroundColor: colors.primary }]} onPress={handleSubmit}>
          <Text style={styles.submitText}>{BUTTONS.CREATE}</Text>
        </TouchableOpacity>
      </ScrollView>

      {picker.visible && (
        <DateTimePicker
          value={new Date()}
          mode={picker.mode}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handlePickerChange}
        />
      )}

      <SuccessModal
        visible={showSuccessModal}
        onClose={handleCloseSuccessModal}
        colors={colors}
      />
    </>
  );
}