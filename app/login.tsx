import { useTheme } from '@/context/ThemeContext';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { login } from '@/store/authSlice';
import { useDispatch } from 'react-redux';

export default function LoginScreen() {
  const { colors, brand } = useTheme();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    username: '',
    phone: '',
    address: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.username.trim()) newErrors.username = 'Username is required';

    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (form.phone.length < 10) {
      newErrors.phone = 'Enter a valid phone number';
    }

    if (!form.address.trim()) newErrors.address = 'Address is required';

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Enter a valid email';
    }

    if (!form.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    dispatch(
      login({
        username: form.username,
        phone: form.phone,
        address: form.address,
        email: form.email,
      })
    );

    router.replace('/(drawer)/(tabs)');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: colors.background },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.primary }]}>
            Welcome to {brand.name}
          </Text>

          <Text
            style={[styles.subtitle, { color: colors.textSecondary }]}
          >
            Login to continue
          </Text>

          <View
            style={[
              styles.card,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Input
              label="Username"
              placeholder="Enter username"
              value={form.username}
              onChangeText={(v: string) =>
                handleChange('username', v)
              }
              colors={colors}
              error={errors.username}
            />

            <Input
              label="Phone Number"
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              value={form.phone}
              onChangeText={(v: string) =>
                handleChange('phone', v)
              }
              colors={colors}
              error={errors.phone}
            />

            <Input
              label="Address"
              placeholder="Enter address"
              value={form.address}
              onChangeText={(v: string) =>
                handleChange('address', v)
              }
              colors={colors}
              multiline
              error={errors.address}
            />

            <Input
              label="Email"
              placeholder="Enter email"
              keyboardType="email-address"
              value={form.email}
              onChangeText={(v: string) =>
                handleChange('email', v)
              }
              colors={colors}
              error={errors.email}
            />

            <Input
              label="Password"
              placeholder="Enter password"
              secureTextEntry
              value={form.password}
              onChangeText={(v: string) =>
                handleChange('password', v)
              }
              colors={colors}
              error={errors.password}
            />

            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: colors.primary },
              ]}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

/* Reusable Input Component */
function Input({ label, colors, error, ...props }: any) {
  return (
    <View style={styles.inputWrapper}>
      <Text style={[styles.label, { color: colors.text }]}>
        {label}
      </Text>

      <TextInput
        {...props}
        placeholderTextColor={colors.textSecondary}
        style={[
          styles.input,
          {
            backgroundColor: colors.background,
            borderColor: error ? '#ef4444' : colors.border,
            color: colors.text,
          },
        ]}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
  },
  inputWrapper: {
    marginBottom: 14,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 14,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    marginTop: 12,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
