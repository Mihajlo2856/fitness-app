export const colors = {
    // Light theme
    light: {
        primary: '#3b82f6',        // Blue
        primaryDark: '#2563eb',
        primaryLight: '#60a5fa',

        secondary: '#8b5cf6',      // Purple
        secondaryDark: '#7c3aed',
        secondaryLight: '#a78bfa',

        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#06b6d4',

        background: '#ffffff',
        backgroundSecondary: '#f8fafc',
        backgroundTertiary: '#f1f5f9',

        surface: '#ffffff',
        surfaceSecondary: '#f8fafc',

        text: '#0f172a',
        textSecondary: '#475569',
        textTertiary: '#94a3b8',
        textDisabled: '#cbd5e1',

        border: '#e2e8f0',
        borderLight: '#f1f5f9',
        borderDark: '#cbd5e1',

        overlay: 'rgba(0, 0, 0, 0.5)',
    },

    // Dark theme - Refined Midnight Gray with Blue/Purple
    dark: {
        primary: '#6366f1',        // Indigo 500 (blue-purple)
        primaryDark: '#4f46e5',    // Indigo 600
        primaryLight: '#818cf8',   // Indigo 400

        secondary: '#8b5cf6',      // Violet 500 (purple)
        secondaryDark: '#7c3aed',  // Violet 600
        secondaryLight: '#a78bfa', // Violet 400

        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#06b6d4',

        // Neutral gray backgrounds (not black, not blue-tinted)
        background: '#121212',           // True dark gray
        backgroundSecondary: '#1e1e1e',  // Slightly lighter gray
        backgroundTertiary: '#2a2a2a',   // Medium gray

        surface: '#1e1e1e',
        surfaceSecondary: '#2a2a2a',

        // Text - neutral grays
        text: '#f5f5f5',           // Very light gray
        textSecondary: '#b3b3b3',  // Medium light gray
        textTertiary: '#808080',   // Medium gray
        textDisabled: '#5c5c5c',   // Darker gray

        border: '#2a2a2a',
        borderLight: '#3d3d3d',
        borderDark: '#1e1e1e',

        overlay: 'rgba(0, 0, 0, 0.85)',
    },
};

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
};

export const borderRadius = {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 24,
    full: 9999,
};

export const typography = {
    fontSize: {
        xs: 12,
        sm: 14,
        base: 16,
        lg: 18,
        xl: 20,
        '2xl': 24,
        '3xl': 30,
        '4xl': 36,
        '5xl': 48,
    },

    fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
    },

    lineHeight: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.75,
    },
};

export const shadows = {
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
    xl: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 8,
    },
};

export const tokens = {
    colors,
    spacing,
    borderRadius,
    typography,
    shadows,
};