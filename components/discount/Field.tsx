// components/discount/Field.tsx

import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

interface FieldProps extends TextInputProps {
  label: string;
  colors: any;
  helper?: string;
  suffix?: string;
  compact?: boolean;
}

export function Field({ 
  label, 
  colors, 
  helper, 
  suffix, 
  compact,
  style,
  ...props 
}: FieldProps) {
  const fieldStyles = {
    field: compact ? { gap: 4 } : { gap: 6 },
    label: {
      fontSize: 13,
      fontWeight: '600' as const,
      letterSpacing: -0.1,
      color: colors.text,
    },
    inputWrapper: {
      position: 'relative' as const,
    },
    input: {
      height: 48,
      borderRadius: 10,
      borderWidth: 1,
      paddingHorizontal: 12,
      fontSize: 15,
      backgroundColor: colors.background,
      borderColor: colors.border,
      color: colors.text,
      paddingRight: suffix ? 40 : 12,
    },
    suffix: {
      position: 'absolute' as const,
      right: 12,
      top: 0,
      bottom: 0,
      justifyContent: 'center' as const,
    },
    suffixText: {
      fontSize: 15,
      fontWeight: '600' as const,
      color: colors.textSecondary,
    },
    helper: {
      fontSize: 12,
      marginTop: 4,
      opacity: 0.7,
      color: colors.textSecondary,
    },
  };

  return (
    <View style={fieldStyles.field}>
      <Text style={fieldStyles.label}>{label}</Text>
      <View style={fieldStyles.inputWrapper}>
        <TextInput
          {...props}
          style={[fieldStyles.input, style]}
          placeholderTextColor={colors.textSecondary}
        />
        {suffix && (
          <View style={fieldStyles.suffix}>
            <Text style={fieldStyles.suffixText}>{suffix}</Text>
          </View>
        )}
      </View>
      {helper && <Text style={fieldStyles.helper}>{helper}</Text>}
    </View>
  );
}