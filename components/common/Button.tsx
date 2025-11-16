import React from 'react';
import {TouchableOpacity, Text, ActivityIndicator, ViewStyle, TextStyle} from 'react-native';
import {useTheme} from '../../contexts/ThemeContext';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    icon?: React.ReactNode;
    style?: ViewStyle; // Add this line
}

export function Button({
                           title,
                           onPress,
                           variant = 'primary',
                           size = 'md',
                           disabled = false,
                           loading = false,
                           fullWidth = false,
                           icon,
                           style
                       }: ButtonProps) {
    const {colors, isDark} = useTheme();

    const getVariantStyles = (): ViewStyle => {
        const base: ViewStyle = {
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: 8,
        };

        if (disabled || loading) {
            return {
                ...base,
                backgroundColor: colors.borderLight,
                opacity: 0.6,
            };
        }

        switch (variant) {
            case 'primary':
                return {...base, backgroundColor: colors.primary};
            case 'secondary':
                return {...base, backgroundColor: colors.secondary};
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
                    backgroundColor: isDark ? colors.surfaceSecondary : colors.backgroundSecondary,
                };
            case 'danger':
                return {...base, backgroundColor: colors.error};
            default:
                return {...base, backgroundColor: colors.primary};
        }
    };

    const getSizeStyles = (): ViewStyle => {
        switch (size) {
            case 'sm':
                return {paddingHorizontal: 16, paddingVertical: 8};
            case 'md':
                return {paddingHorizontal: 20, paddingVertical: 12};
            case 'lg':
                return {paddingHorizontal: 24, paddingVertical: 16};
            default:
                return {paddingHorizontal: 20, paddingVertical: 12};
        }
    };

    const getTextStyles = (): TextStyle => {
        const base: TextStyle = {
            fontWeight: '600',
        };

        const textColor =
            variant === 'outline'
                ? colors.primary
                : variant === 'ghost'
                    ? colors.text
                    : '#ffffff';

        switch (size) {
            case 'sm':
                return {...base, fontSize: 14, color: textColor};
            case 'md':
                return {...base, fontSize: 16, color: textColor};
            case 'lg':
                return {...base, fontSize: 18, color: textColor};
            default:
                return {...base, fontSize: 16, color: textColor};
        }
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            style={[
                getVariantStyles(),
                getSizeStyles(),
                fullWidth && { width: '100%' },
                style,
            ]}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? colors.primary : '#ffffff'}/>
            ) : (
                <>
                    {icon}
                    <Text style={getTextStyles()}>{title}</Text>
                </>
            )}
        </TouchableOpacity>
    );
}