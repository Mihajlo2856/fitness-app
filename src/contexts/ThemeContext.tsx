import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { colors, shadows, dividers } from '../constants/tokens';
import { log } from 'console';

type ColorScheme = 'light' | 'dark';

interface ThemeContextType {
    colorScheme: ColorScheme;
    colors: typeof colors.light;
    shadows: typeof shadows;
    dividers: typeof dividers.light;
    osStatusBar: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const systemColorScheme = useColorScheme();
    const [colorScheme, setColorScheme] = useState<ColorScheme>(() => {
        return systemColorScheme === 'dark' ? 'dark' : 'light';
    });
    const osStatusBar = colorScheme === 'dark';

    useEffect(() => {
        if (systemColorScheme) {
            setColorScheme(systemColorScheme);
        }
    }, [systemColorScheme]);

    return (
        <ThemeContext.Provider
            value={{
                colorScheme,
                colors: colors[colorScheme],
                shadows,
                dividers: dividers[colorScheme],
                osStatusBar,
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