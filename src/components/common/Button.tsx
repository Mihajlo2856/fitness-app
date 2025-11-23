import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

interface ButtonProps {
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean; // Default false - button wraps to content
    iconName?: keyof typeof Ionicons.glyphMap;
    style?: ViewStyle;
    children?: React.ReactNode;
}

export function Button({
    onPress,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    fullWidth = false, // Explicit default: wraps to content
    iconName,
    style,
    children,
}: ButtonProps) {
    const { colors } = useTheme();

    const getVariantStyles = (): ViewStyle => {
        const base: ViewStyle = {
            borderRadius: 48,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: 8,
            alignSelf: fullWidth ? 'stretch' : 'flex-start', // Key line: wraps to content by default
        };

        if (disabled || loading) {
            return {
                ...base,
                backgroundColor: colors.surfaceSecondary,
                opacity: 1,
            };
        }

        switch (variant) {
            case 'primary':
                return { ...base, backgroundColor: colors.primary };
            case 'secondary':
                return { ...base, backgroundColor: colors.secondary };
            case 'outline':
                return {
                    ...base,
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    borderColor: colors.primary,
                };
            case 'ghost':
                return {
                    ...base,
                    backgroundColor: colors.backgroundSecondary,
                };
            case 'danger':
                return { ...base, backgroundColor: colors.error };
            default:
                return { ...base, backgroundColor: colors.primary };
        }
    };

    const getSizeStyles = (): ViewStyle => {
        switch (size) {
            case 'sm':
                return { paddingHorizontal: 16, paddingVertical: 8 };
            case 'md':
                return { paddingHorizontal: 20, paddingVertical: 12 };
            case 'lg':
                return { paddingHorizontal: 24, paddingVertical: 16 };
            default:
                return { paddingHorizontal: 20, paddingVertical: 12 };
        }
    };

    const getTextColor = (): string => {
        if (variant === 'outline') return colors.primary;
        if (variant === 'ghost') return colors.text;
        return '#FFFFFF';
    };

    const getIconColor = (): string => {
        return getTextColor();
    };

    const getTextStyles = (): TextStyle => {
        const base: TextStyle = {
            fontWeight: '600',
            color: getTextColor(),
        };

        switch (size) {
            case 'sm':
                return { ...base, fontSize: 14 };
            case 'md':
                return { ...base, fontSize: 16 };
            case 'lg':
                return { ...base, fontSize: 18 };
            default:
                return { ...base, fontSize: 16 };
        }
    };

    const getIconSize = (): number => {
        switch (size) {
            case 'sm':
                return 18;
            case 'md':
                return 20;
            case 'lg':
                return 24;
            default:
                return 20;
        }
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            style={[
                getVariantStyles(),
                getSizeStyles(),
                style,
            ]}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator color={getTextColor()} />
            ) : (
                <>
                    {iconName && (
                        <Ionicons
                            name={iconName}
                            size={getIconSize()}
                            color={getIconColor()}
                        />
                    )}
                </>
            )}
            {children}
        </TouchableOpacity>
    );
}