import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Screen } from '@/components/common/Screen';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import GymIllustration from '@/components/GymIllustration';
import Write from '@/components/common/Write';
import { Image } from 'react-native';
import Divider from '@/components/common/Divider';

export default function LoginScreen({ navigation }: any) {
    const { colors } = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            await signIn(email, password);
        } catch (error: any) {
            Alert.alert('Login Failed', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Screen>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <View className="flex-1 justify-center px-6">
                    {/* Illustration */}
                    <View className="items-center mb-8">
                        <Write>
                            Logo here
                        </Write>
                    </View>

                    {/* Title */}
                    <View className="items-center mb-12">
                        <Write style={{ fontSize: 36, fontWeight: 'bold', marginBottom: 8 }}>
                            Welcome Back
                        </Write>
                        <Write style={{ fontSize: 16, opacity: 0.6 }}>
                            Log in to continue your journey
                        </Write>
                    </View>

                    {/* Email Input */}
                    <View className="mb-4">
                        <Write style={{ fontSize: 14, fontWeight: '500', marginBottom: 8, opacity: 0.8 }}>
                            Email
                        </Write>
                        <Input
                            placeholder="your@email.com"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            autoComplete="email"
                        />
                    </View>

                    {/* Password Input */}
                    <View className="mb-8">
                        <Write style={{ fontSize: 14, fontWeight: '500', marginBottom: 8, opacity: 0.8 }}>
                            Password
                        </Write>
                        <Input
                            placeholder="••••••••"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            autoComplete="password"
                        />
                    </View>

                    {/* Login Button */}
                    <Button onPress={handleLogin} fullWidth variant='outline' disabled={loading}>
                        <Write style={{ color: colors.primary }}>{loading ? 'Logging in...' : 'Log In'}</Write>
                    </Button>

                    {/* Register Link */}
                        <Divider></Divider>
                    <View className="flex-row justify-center">
                        <Write style={{ fontSize: 14, opacity: 0.6 }}>Don't have an account? </Write>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Write style={{ fontSize: 14, fontWeight: '600', color: colors.primary }}>Sign Up</Write>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Screen>
    );
}