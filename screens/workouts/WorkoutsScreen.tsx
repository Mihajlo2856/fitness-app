import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Screen } from '../../components/common/Screen';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';

export function WorkoutsScreen() {
    const { colors } = useTheme();

    return (
        <Screen>
            <Text style={{ fontSize: 32, fontWeight: 'bold', color: colors.text, marginBottom: 8 }}>
                Workouts
            </Text>
            <Text style={{ fontSize: 16, color: colors.textSecondary, marginBottom: 24 }}>
                Your workout templates
            </Text>

            <Button
                title="Create New Workout"
                onPress={() => {}}
                variant="primary"
                fullWidth
                style={{ marginBottom: 20 }}
            />

            <Card variant="elevated">
                <Text style={{ fontSize: 18, fontWeight: '600', color: colors.text, marginBottom: 8 }}>
                    Workouts Page
                </Text>
                <Text style={{ color: colors.textSecondary }}>
                    ✅ Page is working! Create and manage your workout templates here.
                </Text>
            </Card>
        </Screen>
    );
}