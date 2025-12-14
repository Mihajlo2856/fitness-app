export const colors = {
    light: {
        // Primary: Premium Burnt Orange - sophisticated, energetic
        primary: '#EA580C',        // Deep Orange
        primaryDark: '#C2410C',    // Burnt Orange
        primaryLight: '#F97316',   // Bright Orange
        gradientPrimary: ['#F97316', '#FB923C', '#FBBF24'] as const, // Orange to Amber
        gradientSecondary: ['#EA580C', '#DC2626', '#F59E0B'] as const, // Deep Orange to Amber

        // Secondary: Rich Amber Gold - premium accent
        secondary: '#F59E0B',      // Amber
        secondaryDark: '#D97706',  // Deep Amber
        secondaryLight: '#FBBF24', // Light Gold

        // Status colors - balanced, not screaming
        success: '#059669',        // Emerald
        warning: '#D97706',        // Amber (matches secondary)
        error: '#DC2626',          // Red
        info: '#0284C7',           // Sky blue

        // Backgrounds: Soft, not pure white (easier on eyes)
        background: '#FAFAFA',     // Very light gray
        backgroundSecondary: '#F4F4F5',
        backgroundTertiary: '#E4E4E7',

        surface: '#FFFFFF',
        surfaceSecondary: '#F1EFEF',

        // Text: High contrast but not pure black
        text: '#18181B',           // Near black
        buttonText: '#FFFFFF',
        textSecondary: '#52525B',  // Medium gray
        textTertiary: '#A1A1AA',   // Light gray
        textDisabled: '#D4D4D8',   // Very light

        // Borders: Subtle, unobtrusive
        border: '#E4E4E7',
        borderLight: '#F4F4F5',
        borderDark: '#D4D4D8',

        overlay: 'rgba(0, 0, 0, 0.4)',
    },
    dark: {
        // Primary: Vibrant Orange - pops beautifully in dark mode
        primary: '#F97316',        // Bright Orange
        primaryDark: '#EA580C',    // Deep Orange
        primaryLight: '#FB923C',   // Light Orange
        gradientPrimary: ['#F97316', '#FB923C', '#FBBF24'] as const, // Orange to Gold
        gradientSecondary: ['#FB923C', '#F59E0B', '#EAB308'] as const, // Warm gradient

        // Secondary: Golden Amber - luxury feel
        secondary: '#FBBF24',      // Gold
        secondaryDark: '#F59E0B',  // Amber
        secondaryLight: '#FCD34D', // Light Gold

        // Status colors - slightly brighter for dark mode visibility
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#06B6D4',

        // Backgrounds: True dark, comfortable
        background: '#1A1919',     // Near black
        backgroundSecondary: '#141414',
        backgroundTertiary: '#1F1F1F',

        surface: '#2C2C2C',
        surfaceSecondary: '#1F1F1F',

        // Text: Soft whites, not harsh
        text: '#FAFAFA',           // Soft white
        buttonText: '#FFFFFF',
        textSecondary: '#A1A1AA',  // Medium gray
        textTertiary: '#71717A',   // Darker gray
        textDisabled: '#3F3F46',   // Very dark

        // Borders: Subtle in dark mode
        border: '#27272A',
        borderLight: '#3F3F46',
        borderDark: '#18181B',

        overlay: 'rgba(0, 0, 0, 0.75)',
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
        elevation: 2,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 6,
    },
    xl: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 10,
    },
};

export const dividers = {
    light: '#E4E4E7',  // Soft gray - matches your border color
    dark: '#27272A',   // Dark gray - subtle in dark mode
}

export const tokens = {
    colors,
    spacing,
    borderRadius,
    typography,
    shadows,
    dividers,
};