import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Screen } from '../../components/common/Screen';
import { Card } from '../../components/common/Card';

export function PlansScreen() {
    const { colors } = useTheme();

    return (
        <Screen>
            <Text style={{ fontSize: 32, fontWeight: 'bold', color: colors.text, marginBottom: 8 }}>
                Plans
            </Text>
            <Text style={{ fontSize: 16, color: colors.textSecondary, marginBottom: 24 }}>
                Weekly workout schedule
            </Text>

            <Card variant="elevated">
                <Text style={{ fontSize: 18, fontWeight: '600', color: colors.text, marginBottom: 8 }}>
                    Plans Page
                </Text>
                <Text style={{ color: colors.textSecondary }}>
                    ✅ Page is working! Plan your weekly workouts here.
                </Text>
            </Card>
        </Screen>
    );
}