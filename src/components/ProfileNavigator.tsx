import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';

export function ProfileButton() {
    const navigation = useNavigation();
    const { colors } = useTheme();
    const insets = useSafeAreaInsets();

    const handlePress = () => {
        // @ts-ignore
        navigation.navigate('Profile');
    };

    return (
        <TouchableOpacity
            style={[
                {
                    position: 'absolute',
                    top: insets.top + 4,
                    right: 20,
                    width: 42,
                    height: 42,
                    borderRadius: 20,
                    zIndex: 1000,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.15,
                    shadowRadius: 4,
                    elevation: 5,
                    overflow: 'hidden', // Important for gradient clipping
                }
            ]}
            onPress={handlePress}
            activeOpacity={0.7}
        >
                <Ionicons name="cog-outline" color={colors.text} size={28} />
        </TouchableOpacity>
    );
    }