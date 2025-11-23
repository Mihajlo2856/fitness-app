import React, { useState } from 'react';
import { View, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Screen } from '@/components/common/Screen';
import Write from '@/components/common/Write';
import { Input } from '@/components/common/Input';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/services/supabase';
import Divider from '@/components/common/Divider';
import { Button } from '@/components/common/Button';

export default function RegisterScreen({ navigation }: any) {
  const { colors } = useTheme();
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [givenName, setGivenName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const steps = [
    { title: 'Your Email', subtitle: 'Let\'s start with your email' },
    { title: 'Your Name', subtitle: 'What should we call you?' },
    { title: 'Create Password', subtitle: 'Choose a secure password' },
    { title: 'Confirm Password', subtitle: 'Re-enter your password' },
  ];

  const validate = () => {
    if (step === 0 && (!email || !email.includes('@'))) {
      Alert.alert('Error', 'Please enter a valid email');
      return false;
    }
    if (step === 1 && !givenName.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return false;
    }
    if (step === 2 && password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return false;
    }
    if (step === 3 && password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: password,
      options: {
        data: {
          given_name: givenName.trim(),
        }
      }
    });

    setLoading(false);

    if (error) {
      Alert.alert('Registration Failed', error.message);
    } else {
      Alert.alert('Success', 'Account created! Please check your email to verify.');
      navigation.navigate('Login');
    }
  };

  const handleNext = async () => {
    if (!validate()) return;

    if (step < 3) {
      setStep(step + 1);
    } else {
      await handleRegister();
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
    else navigation.goBack();
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 px-6">
          {/* Header */}
          <View className="pt-4 pb-6">
            <TouchableOpacity onPress={handleBack} style={{ width: 40, height: 40, justifyContent: 'center' }}>
              <Ionicons name="arrow-back" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          {/* Progress */}
          <View style={{ marginBottom: 24 }}>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {steps.map((_, i) => (
                <View
                  key={i}
                  style={{
                    flex: 1,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: i <= step ? colors.primary : colors.border,
                  }}
                />
              ))}
            </View>
            <Write style={{ fontSize: 12, opacity: 0.6, marginTop: 12 }}>
              Step {step + 1} of {steps.length}
            </Write>
          </View>

          {/* Title */}
          <View className="mb-8">
            <Write style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 8 }}>
              {steps[step].title}
            </Write>
            <Write style={{ fontSize: 16, opacity: 0.6 }}>
              {steps[step].subtitle}
            </Write>
          </View>

          {/* Input */}
          <View className="mb-8">
            {step === 0 && (
              <Input
                placeholder="your@email.com"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
              />
            )}
            {step === 1 && (
              <Input
                placeholder="Your name"
                value={givenName}
                onChangeText={setGivenName}
                autoCapitalize="words"
                autoComplete="name"
              />
            )}
            {step === 2 && (
              <Input
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete="password"
              />
            )}
            {step === 3 && (
              <Input
                placeholder="••••••••"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoComplete="password"
              />
            )}
          </View>

          <View style={{ flex: 1 }} />

          {/* Button */}
          <View className="pb-6">
            <Button onPress={handleNext} fullWidth variant='outline' disabled={loading}>
              <Write style={{ color: colors.primary }}>{loading ? 'Creating account...' : step === 3 ? 'Sign up': 'Continue'}</Write>
            </Button>

            <Divider></Divider>
            {step === 0 && (
              <View className="flex-row justify-center">
                <Write style={{ fontSize: 14, opacity: 0.6 }}>Already have an account? </Write>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Write style={{ fontSize: 14, fontWeight: '600', color: colors.primary }}>Log In</Write>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}