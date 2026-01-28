import { getBrandConfig } from '@/constants/brand';
import { Theme } from '@/constants/theme';
import React, { createContext, ReactNode, useContext, useState } from 'react';

type ThemeContextType = {
  theme: Theme;
  brand: {
    name: string;
    tagline: string;
  };
  isDark: boolean;
  toggleTheme: () => void;
  colors: {
    background: string;
    card: string;
    text: string;
    textSecondary: string;
    border: string;
    primary: string;
    success: string;
    danger: string;
  };
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(false);

  const brand = getBrandConfig();

  const theme = isDark ? brand.dark : brand.light;


  const toggleTheme = () => setIsDark(prev => !prev);

  const colors = {
    background: theme.background,
    card: theme.card,
    text: theme.text,
    textSecondary: isDark ? '#9ca3af' : '#6b7280',
    border: theme.border,
    primary: theme.primary,
    success: '#22c55e',
    danger: '#ef4444',
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        brand,
        isDark,
        toggleTheme,
        colors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
};
