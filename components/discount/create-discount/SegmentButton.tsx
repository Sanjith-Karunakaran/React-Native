// components/discount/SegmentButton.tsx

import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface SegmentButtonProps {
  active: boolean;
  label: string;
  icon?: string;
  onPress: () => void;
  colors: any;
  position?: 'left' | 'right';
}

export function SegmentButton({ 
  active, 
  label, 
  icon, 
  onPress, 
  colors, 
  position 
}: SegmentButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        position === 'left' && styles.buttonLeft,
        position === 'right' && styles.buttonRight,
        {
          backgroundColor: active ? colors.primary : 'transparent',
          borderColor: colors.border,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon && (
        <Text style={[styles.icon, { color: active ? '#fff' : colors.textSecondary }]}>
          {icon}
        </Text>
      )}
      <Text style={[styles.label, { color: active ? '#fff' : colors.text }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 6,
    borderWidth: 1,
  },
  buttonLeft: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderRightWidth: 0.5,
  },
  buttonRight: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftWidth: 0.5,
  },
  icon: {
    fontSize: 16,
    fontWeight: '700',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
});