import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Contexts
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Navigation & Screens
import { MainTabNavigator } from './navigation/MainTabNavigator';
import { ProfileScreen } from "./screens/profile/ProfileScreen";
import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import "../global.css"

const Stack = createNativeStackNavigator();

// Main App Stack (when logged in)
function MainStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={MainTabNavigator} />
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    headerShown: false,
                    title: '',
                    presentation: 'modal',
                }}
            />
        </Stack.Navigator>
    );
}

// Root Navigator - handles auth state
function RootNavigator() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <View className="flex-1 bg-slate-950 justify-center items-center">
                <ActivityIndicator size="large" color="#3b82f6" />
            </View>
        );
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (
                <Stack.Screen name="App" component={MainStack} />
            ) : (
                <>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                </>
            )}
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <AuthProvider>
                <ThemeProvider>
                    <NavigationContainer>
                    <RootNavigator />
                    </NavigationContainer>
                </ThemeProvider>
            </AuthProvider>
        </SafeAreaProvider>
    );
}