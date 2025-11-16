import React from 'react';
import { View, TextInput, Text, TextInputProps, ViewStyle } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    helperText?: string;
    icon?: React.ReactNode;
    containerStyle?: ViewStyle;
}

export function Input({
                          label,
                          error,
                          helperText,
                          icon,
                          containerStyle,
                          style,
                          ...props
                      }: InputProps) {
    const { colors } = useTheme();

    return (
        <View style={containerStyle}>
            {label && (
                <Text
                    style={{
        fontSize: 14,
            fontWeight: '600',
            color: colors.text,
            marginBottom: 8,
    }}
>
    {label}
    </Text>
)}

    <View
        style={{
        flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: error ? colors.error : colors.border,
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 12,
    }}
>
    {icon && <View style={{ marginRight: 8 }}>{icon}</View>}

    <TextInput
        style={[
                {
                    flex: 1,
                    fontSize: 16,
                    color: colors.text,
                },
            style,
    ]}
        placeholderTextColor={colors.textTertiary}
        {...props}
        />
        </View>

        {(error || helperText) && (
            <Text
                style={{
            fontSize: 12,
                color: error ? colors.error : colors.textSecondary,
                marginTop: 4,
                marginLeft: 4,
        }}
        >
            {error || helperText}
            </Text>
        )}
        </View>
    );
    }