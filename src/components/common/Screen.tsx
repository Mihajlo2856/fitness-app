import React from 'react';
import {Platform, ScrollView, View, ViewStyle, StatusBar} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

interface ScreenProps {
    children: React.ReactNode;
    scrollable?: boolean;
    style?: ViewStyle;
}

const SAFE_TOP_PADDING = Platform.select({
    ios: 47, // Standard iOS safe area
    android: StatusBar.currentHeight || 0,
    default: 0,
});

export function Screen({ children, scrollable = true, style }: ScreenProps) {
    const { colors, osStatusBar } = useTheme();

    return (
        <>
            <StatusBar
                barStyle={osStatusBar ? 'light-content' : 'dark-content'}
                backgroundColor={colors.background}
            />
            <View
                style={{
                    flex: 1,
                    backgroundColor: colors.background,
                    paddingTop: SAFE_TOP_PADDING, // Fixed padding - no calculation needed
                }}
            >
                {scrollable ? (
                    <ScrollView
                        contentContainerStyle={[
                            {
                                padding: 20,
                                paddingBottom: 100,
                            },
                            style
                        ]}
                        showsVerticalScrollIndicator={false}
                    >
                        {children}
                    </ScrollView>
                ) : (
                    <View style={[
                        {
                            flex: 1,
                            padding: 20,
                            paddingBottom: 100,
                        },
                        style
                    ]}>
                        {children}
                    </View>
                )}
            </View>
        </>
    );
}