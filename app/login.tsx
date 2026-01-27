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

  const handleChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
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
        contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.primary }]}>
            Welcome to {brand.name}
          </Text>

          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Login to continue
          </Text>

          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Input
              label="Username"
              placeholder="Enter username"
              value={form.username}
              onChangeText={(v: string) => handleChange('username', v)}
              colors={colors}
            />

            <Input
              label="Phone Number"
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              value={form.phone}
              onChangeText={(v: string) => handleChange('phone', v)}
              colors={colors}
            />

            <Input
              label="Address"
              placeholder="Enter address"
              value={form.address}
              onChangeText={(v: string) => handleChange('address', v)}
              colors={colors}
              multiline
            />

            <Input
              label="Email"
              placeholder="Enter email"
              keyboardType="email-address"
              value={form.email}
              onChangeText={(v: string) => handleChange('email', v)}
              colors={colors}
            />

            <Input
              label="Password"
              placeholder="Enter password"
              secureTextEntry
              value={form.password}
              onChangeText={(v: string) => handleChange('password', v)}
              colors={colors}
            />

            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.primary }]}
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
function Input({ label, colors, ...props }: any) {
  return (
    <View style={styles.inputWrapper}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <TextInput
        {...props}
        placeholderTextColor={colors.textSecondary}
        style={[
          styles.input,
          { backgroundColor: colors.background, borderColor: colors.border, color: colors.text },
        ]}
      />
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
