// components/discount/Chip.tsx

import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ChipProps {
  active: boolean;
  label: string;
  onPress: () => void;
  colors: any;
}

export function Chip({ active, label, onPress, colors }: ChipProps) {
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        {
          backgroundColor: active ? colors.primary : colors.background,
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
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
});