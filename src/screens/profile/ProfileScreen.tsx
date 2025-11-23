import React from 'react';
import { Text, View } from 'react-native';
import { Screen } from '../../components/common/Screen';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { useAuth } from '@/contexts/AuthContext';

export function ProfileScreen() {
    const auth = useAuth();
    const {user} = useAuth();

    return (
        <Screen>
            <View className='mb-12'>
                <Text>
                    Current user: {user?.email}
                </Text>
                <Text className='text-rg'>Profile settings</Text>
                <Text>Change your account and app settings</Text>
            </View>
            <View>
                <Button title="Sign out" onPress={auth.signOut} variant='primary' iconName='exit'>

                </Button>


            </View>
        </Screen>
    );
}