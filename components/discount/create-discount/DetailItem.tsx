// components/discount/DetailItem.tsx

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface DetailItemProps {
  label: string;
  value: string;
  colors: any;
}

export function DetailItem({ label, value, colors }: DetailItemProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>
        {label}
      </Text>
      <Text style={[styles.value, { color: colors.text }]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: '45%',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
    opacity: 0.7,
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
});