import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Screen } from '../../components/common/Screen';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';

export function ProfileScreen() {
    const { colors } = useTheme();

    return (
        <Screen>
            <Text style={{ fontSize: 32, fontWeight: 'bold', color: colors.text, marginBottom: 8 }}>
                Profile
            </Text>
            <Text style={{ fontSize: 16, color: colors.textSecondary, marginBottom: 24 }}>
                Your account settings
            </Text>

            <Card variant="elevated" style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 18, fontWeight: '600', color: colors.text, marginBottom: 8 }}>
                    Profile Page
                </Text>
                <Text style={{ color: colors.textSecondary, marginBottom: 16 }}>
                    ✅ Page is working! Manage your profile and settings here.
                </Text>

                <Button
                    title="Edit Profile"
                    onPress={() => {}}
                    variant="outline"
                    fullWidth
                />
            </Card>

            <Card variant="elevated">
                <Text style={{ fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: 12 }}>
                    Settings
                </Text>
                <Text style={{ color: colors.textSecondary }}>
                    Theme, notifications, and more coming soon
                </Text>
            </Card>
        </Screen>
    );
}