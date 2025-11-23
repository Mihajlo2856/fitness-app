import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Screen } from '../../components/common/Screen';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import Divider from '@/components/common/Divider';
import Write from '@/components/common/Write';

export function WorkoutsScreen() {
    const { colors } = useTheme();

    return (
        <Screen>
            <Write className="text-3xl">
                Workout
            </Write>
            <Write className='text-lg'>
                Continue your workouts!
            </Write>
            <Divider></Divider>
        </Screen>
    );
}