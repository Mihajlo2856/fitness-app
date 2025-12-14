import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Screen } from '../../components/common/Screen';
import { Card } from '../../components/common/Card';
import Write from '@/components/common/Write';
import Divider from '@/components/common/Divider';

export function ProgressScreen() {
    const { colors } = useTheme();

    return (
        <Screen>
            <Write className="text-3xl" style={{ fontFamily: 'semibold' }}>
                Progress
            </Write>
            <Divider></Divider>
        </Screen>
    );
}