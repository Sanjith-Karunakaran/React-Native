import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function DrawerContent(props: any) {
  const { colors, toggleTheme, isDark } = useTheme();

  const menuItems = [
    { label: 'My Orders', icon: 'receipt' },
    { label: 'Favorites', icon: 'heart' },
    { label: 'Settings', icon: 'settings' },
    { label: 'Help & Support', icon: 'help-circle' },
  ];

  return (
    <DrawerContentScrollView 
      {...props} 
      style={{ backgroundColor: colors.background }}
    >
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Menu</Text>
      </View>
      
      <View style={styles.menuItems}>
        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={index}
            style={[styles.menuItem, { borderBottomColor: colors.border }]}
          >
            <View style={styles.menuItemContent}>
              <Ionicons name={item.icon as any} size={22} color={colors.text} />
              <Text style={[styles.menuItemText, { color: colors.text }]}>
                {item.label}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        ))}
        
        <TouchableOpacity 
          style={[styles.menuItem, { borderBottomColor: colors.border }]}
          onPress={toggleTheme}
        >
          <View style={styles.menuItemContent}>
            <Ionicons 
              name={isDark ? 'moon' : 'sunny'} 
              size={22} 
              color={colors.text} 
            />
            <Text style={[styles.menuItemText, { color: colors.text }]}>
              Theme: {isDark ? 'Dark' : 'Light'}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  menuItems: {
    paddingTop: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemText: {
    fontSize: 16,
  },
});