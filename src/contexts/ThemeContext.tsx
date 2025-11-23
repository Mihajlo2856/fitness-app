import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { colors, shadows, dividers } from '../constants/tokens';

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

    useEffect(() => {
        if (systemColorScheme) {
            setColorScheme(systemColorScheme as ColorScheme);
        }
    }, [systemColorScheme]);

    const osStatusBar = colorScheme === 'dark';
    
    // Dynamic theme selection
    const theme = {
        colors: colors[colorScheme],
        dividers: dividers[colorScheme],
    };

    return (
        <ThemeContext.Provider
            value={{
                colorScheme,
                colors: theme.colors,
                shadows,
                dividers: theme.dividers,
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