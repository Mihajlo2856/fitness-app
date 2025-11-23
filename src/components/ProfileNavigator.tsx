import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import colors from "tailwindcss/colors";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Write from './common/Write';

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
                    backgroundColor: colors.surface,
                    borderColor: colors.primary, // or colors.primary, whatever you want
                    position: 'absolute',
                    top: insets.top + 10,
                    right: 20,
                    width: 42,
                    height: 42,
                    borderWidth: 1,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.15,
                    shadowRadius: 4,
                    elevation: 5,
                }
            ]}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <Write>
                A
            </Write>
        </TouchableOpacity>
    );
}