// components/discount/DateButton.tsx

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface DateButtonProps {
  label: string;
  value: string;
  onPress: () => void;
  colors: any;
}

export function DateButton({ label, value, onPress, colors }: DateButtonProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <View style={[
        styles.button, 
        { 
          backgroundColor: colors.background, 
          borderColor: colors.border 
        }
      ]}>
        <Text style={{ color: value ? colors.text : colors.textSecondary }}>
          {value || 'Select'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  button: {
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
});