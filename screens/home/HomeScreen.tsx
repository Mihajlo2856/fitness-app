import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Screen } from '../../components/common/Screen';
import { Card } from '../../components/common/Card';

export function HomeScreen() {
    const { colors } = useTheme();

    return (
        <Screen>
            <Text style={{ fontSize: 16, color: colors.textSecondary, marginBottom: 24 }}>
                Your fitness dashboard
            </Text>

            <Card variant="elevated" style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 18, fontWeight: '600', color: colors.text, marginBottom: 8 }}>
                    Quick Stats
                </Text>
                <Text style={{ color: colors.textSecondary }}>
                    This page is working! 🎉
                </Text>
            </Card>

            <Card variant="elevated">
                <Text style={{ fontSize: 18, fontWeight: '600', color: colors.text, marginBottom: 8 }}>
                    Today's Workout
                </Text>
                <Text style={{ color: colors.textSecondary }}>
                    No workout scheduled for today
                </Text>
            </Card>
        </Screen>
    );
}