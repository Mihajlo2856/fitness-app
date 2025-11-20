import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Screen } from '../../components/common/Screen';
import { Card } from '../../components/common/Card';

export function ProgressScreen() {
    const { colors } = useTheme();

    return (
        <Screen>
            <Text style={{ fontSize: 32, fontWeight: 'bold', color: colors.text, marginBottom: 8 }}>
                Progress
            </Text>
            <Text style={{ fontSize: 16, color: colors.textSecondary, marginBottom: 24 }}>
                Track your fitness journey
            </Text>

            <Card variant="elevated" style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 18, fontWeight: '600', color: colors.text, marginBottom: 8 }}>
                    Statistics
                </Text>
                <Text style={{ color: colors.textSecondary }}>
                    ✅ Page is working! View your progress charts here.
                </Text>
            </Card>

            <Card variant="elevated">
                <Text style={{ fontSize: 18, fontWeight: '600', color: colors.text, marginBottom: 8 }}>
                    Personal Records
                </Text>
                <Text style={{ color: colors.textSecondary }}>
                    Track your best lifts
                </Text>
            </Card>
        </Screen>
    );
}