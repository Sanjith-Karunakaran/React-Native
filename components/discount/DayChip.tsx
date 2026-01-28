// components/discount/DayChip.tsx

import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface DayChipProps {
  active: boolean;
  label: string;
  onPress: () => void;
  colors: any;
}

export function DayChip({ active, label, onPress, colors }: DayChipProps) {
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        {
          backgroundColor: active ? colors.primary : colors.card,
          borderColor: active ? colors.primary : colors.border,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, { color: active ? '#fff' : colors.text }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
});