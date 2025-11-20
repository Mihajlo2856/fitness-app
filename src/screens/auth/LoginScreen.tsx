import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Screen } from '@/components/common/Screen';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';

export default function LoginScreen({ navigation }: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();
    const { colors } = useTheme();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            await signIn(email, password);
            // Navigation will happen automatically via auth state change
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
                    <Card>
                        {/* Logo/Title */}
                        <Text className="mb-8" style={{ fontSize: 28, fontWeight: 'bold', color: colors.text, marginBottom: 8, textAlign: 'center', }}>
                            Log in
                        </Text>


                        {/* Email Input */}
                        <View className="mb-4">
                            <Text className="text-slate-300 text-sm font-medium mb-2">Email</Text>
                            <Input
                                placeholder="admin@admin.com"
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                autoComplete="email"
                            />
                        </View>

                        {/* Password Input */}
                        <View className="mb-6">
                            <Text className="text-slate-300 text-sm font-medium mb-2">Password</Text>
                            <Input
                                placeholder="••••••••"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                autoComplete="password"
                            />
                        </View>

                        {/* Login Button */}
                        <Button
                            title={loading ? 'Logging in...' : 'Log In'}
                            onPress={handleLogin}
                            disabled={loading}
                        />

                        {/* Register Link */}
                        <View className="flex-row justify-center mt-4">
                            <Text className="text-slate-400 text-sm">Don't have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                <Text className="text-blue-500 text-sm font-semibold">Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </Card>
                </View>
            </KeyboardAvoidingView>
        </Screen>
    );
}