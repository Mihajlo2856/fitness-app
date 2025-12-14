import React, { useRef } from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle, TextStyle, Animated } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface ButtonProps {
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
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
    fullWidth = false,
    iconName,
    style,
    children,
}: ButtonProps) {
    const { colors } = useTheme();
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.85,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            friction: 3,
            tension: 100,
        }).start();
    };

    const getBaseStyles = (): ViewStyle => ({
        borderRadius: 48,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 8,
        alignSelf: fullWidth ? 'stretch' : 'flex-start',
    });

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
        if (disabled || loading) return colors.textDisabled;
        if (variant === 'outline') return colors.primary;
        if (variant === 'ghost') return colors.text;
        return colors.buttonText; // Use new buttonText color
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
            case 'sm': return 18;
            case 'md': return 20;
            case 'lg': return 24;
            default: return 20;
        }
    };

    // Primary variant uses gradient
    if (variant === 'primary' && !disabled && !loading) {
        return (
            <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
                <TouchableOpacity
                    onPress={onPress}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    activeOpacity={0.9}
                >
                    <LinearGradient
                        colors={colors.gradientPrimary}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={[getBaseStyles(), getSizeStyles()]}
                    >
                        {iconName && (
                            <Ionicons
                                name={iconName}
                                size={getIconSize()}
                                color={colors.buttonText}
                            />
                        )}
                        {typeof children === 'string' ? (
                            <Text style={getTextStyles()}>{children}</Text>
                        ) : (
                            children
                        )}
                    </LinearGradient>
                </TouchableOpacity>
            </Animated.View>
        );
    }

    // All other variants (secondary, outline, ghost, danger, disabled, loading)
    const getVariantBackground = (): ViewStyle => {
        if (disabled || loading) {
            return { backgroundColor: colors.surfaceSecondary };
        }

        switch (variant) {
            case 'secondary':
                return { backgroundColor: colors.secondary };
            case 'outline':
                return {
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    borderColor: colors.primary,
                };
            case 'ghost':
                return { backgroundColor: colors.backgroundSecondary };
            case 'danger':
                return { backgroundColor: colors.error };
            default:
                return { backgroundColor: colors.primary };
        }
    };

    return (
        <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
            <TouchableOpacity
                onPress={onPress}
                disabled={disabled || loading}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={[
                    getBaseStyles(),
                    getSizeStyles(),
                    getVariantBackground(),
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
                                color={getTextColor()}
                            />
                        )}
                        {typeof children === 'string' ? (
                            <Text style={getTextStyles()}>{children}</Text>
                        ) : (
                            children
                        )}
                    </>
                )}
            </TouchableOpacity>
        </Animated.View>
    );
}