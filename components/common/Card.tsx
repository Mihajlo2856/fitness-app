import React from 'react';
import { View, ViewStyle, Pressable } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { shadows } from '../../constants/tokens';

interface CardProps {
    children: React.ReactNode;
    variant?: 'elevated' | 'outlined' | 'filled';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    onPress?: () => void;
    style?: ViewStyle;
}

export function Card({
                         children,
                         variant = 'elevated',
                         padding = 'md',
                         onPress,
                         style,
                     }: CardProps) {
    const { colors } = useTheme();

    const getVariantStyles = (): ViewStyle => {
        switch (variant) {
            case 'elevated':
                return {
                    backgroundColor: colors.surface,
                    ...shadows.md,
                };
            case 'outlined':
                return {
                    backgroundColor: colors.surface,
                    borderWidth: 1,
                    borderColor: colors.border,
                };
            case 'filled':
                return {
                    backgroundColor: colors.surfaceSecondary,
                };
            default:
                return {
                    backgroundColor: colors.surface,
                    ...shadows.md,
                };
        }
    };

    const getPaddingStyles = (): ViewStyle => {
        switch (padding) {
            case 'none':
                return { padding: 0 };
            case 'sm':
                return { padding: 12 };
            case 'md':
                return { padding: 16 };
            case 'lg':
                return { padding: 20 };
            default:
                return { padding: 16 };
        }
    };

    const cardStyles: ViewStyle = {
        borderRadius: 12,
        ...getVariantStyles(),
        ...getPaddingStyles(),
        ...style,
    };

    if (onPress) {
        return (
            <Pressable
                onPress={onPress}
                style={cardStyles}
                android_ripple={{ color: colors.primary + '20' }}
            >
                {children}
            </Pressable>
        );
    }

    return <View style={cardStyles}>{children}</View>;
}