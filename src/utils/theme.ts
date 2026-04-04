// Theme utilities for Hive app
// Provides programmatic access to theme values and helper functions

export const theme = {
  colors: {
    primary: "#2D3B5C",
    secondary: "#4A5A7A",
    accent: "#f9f6deff",
    error: "#FF4D4D",
    surface: "#2D3B5C",
    onSurface: "#f9f6deff",
    border: "#4A5A7A",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    "2xl": 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    "2xl": 24,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
  },
};

// Helper functions
export const getThemeColor = (color: keyof typeof theme.colors) =>
  theme.colors[color];

export const getSpacing = (size: keyof typeof theme.spacing) =>
  theme.spacing[size];

export const getBorderRadius = (size: keyof typeof theme.borderRadius) =>
  theme.borderRadius[size];

export const getFontSize = (size: keyof typeof theme.fontSize) =>
  theme.fontSize[size];

// For future theme switching
export type ThemeMode = "light" | "dark" | "hive";

export const themes = {
  hive: theme,
  // Add light/dark themes later
};
