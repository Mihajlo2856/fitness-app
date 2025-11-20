import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password);
      Alert.alert('Success', 'Account created! Please log in.', [
        { text: 'OK', onPress: () => navigation.navigate('Login') }
      ]);
    } catch (error: any) {
      Alert.alert('Registration Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 justify-center px-6">
          {/* Title */}
          <View className="items-center mb-12">
            <Text className="text-4xl font-bold text-white mb-2">Create Account</Text>
            <Text className="text-slate-400 text-base">Join FitTrack today</Text>
          </View>

          {/* Email Input */}
          <View className="mb-4">
            <Text className="text-slate-300 text-sm font-medium mb-2">Email</Text>
            <TextInput
              className="bg-slate-900 text-white px-4 py-4 rounded-xl text-base border border-slate-800"
              placeholder="your@email.com"
              placeholderTextColor="#64748b"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
            />
          </View>

          {/* Password Input */}
          <View className="mb-4">
            <Text className="text-slate-300 text-sm font-medium mb-2">Password</Text>
            <TextInput
              className="bg-slate-900 text-white px-4 py-4 rounded-xl text-base border border-slate-800"
              placeholder="••••••••"
              placeholderTextColor="#64748b"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password"
            />
          </View>

          {/* Confirm Password Input */}
          <View className="mb-6">
            <Text className="text-slate-300 text-sm font-medium mb-2">Confirm Password</Text>
            <TextInput
              className="bg-slate-900 text-white px-4 py-4 rounded-xl text-base border border-slate-800"
              placeholder="••••••••"
              placeholderTextColor="#64748b"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoComplete="password"
            />
          </View>

          {/* Register Button */}
          <TouchableOpacity
            className={`py-4 rounded-xl mb-4 ${loading ? 'bg-blue-800' : 'bg-blue-600'}`}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text className="text-white text-center font-semibold text-base">
              {loading ? 'Creating account...' : 'Sign Up'}
            </Text>
          </TouchableOpacity>

          {/* Login Link */}
          <View className="flex-row justify-center">
            <Text className="text-slate-400 text-sm">Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className="text-blue-500 text-sm font-semibold">Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}