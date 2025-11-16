import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { colors } from '../constants/tokens';

type ColorScheme = 'light' | 'dark';

interface ThemeContextType {
    colorScheme: ColorScheme;
    colors: typeof colors.light;
    isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const systemColorScheme = useColorScheme(); // Don't cast yet

    // Properly handle null/undefined from useColorScheme
    const [colorScheme, setColorScheme] = useState<ColorScheme>(() => {
        return systemColorScheme === 'dark' ? 'dark' : 'light';
    });

    // Update when system color scheme changes
    useEffect(() => {
        if (systemColorScheme) {
            setColorScheme(systemColorScheme as ColorScheme);
            console.log('System color scheme detected:', systemColorScheme); // Debug log
        }
    }, [systemColorScheme]);

    const isDark = colorScheme === 'dark';
    const themeColors = isDark ? colors.dark : colors.light;

    console.log('Current theme:', { colorScheme, isDark, systemColorScheme }); // Debug log

    return (
        <ThemeContext.Provider
            value={{
                colorScheme,
                colors: themeColors,
                isDark,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}