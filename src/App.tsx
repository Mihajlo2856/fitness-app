import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from 'nativewind';
// Contexts
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Navigation & Screens
import { MainTabNavigator } from './navigation/MainTabNavigator';
import { ProfileScreen } from "./screens/profile/ProfileScreen";
import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import "../global.css"
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';

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

// when not logged in
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

SplashScreen.preventAutoHideAsync();

function AppContent() {
  const { colorScheme } = useColorScheme();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {

    if (colorScheme) {
      setIsReady(true);
    }
  }, [colorScheme]);

  if (!isReady) {
    return <View style={{ flex: 1, backgroundColor: '#000' }} />; // Match your dark theme
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <MainTabNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

export default function App() {
    const [fontsLoaded, fontError] = useFonts({
        'regular': Poppins_400Regular,
        'medium': Poppins_500Medium,
        'semibold': Poppins_600SemiBold,
        'bold': Poppins_700Bold,
    });

    useEffect(() => {
        if (fontsLoaded || fontError) {
            SplashScreen.hideAsync();
        } else {
        }
        
    }, [fontsLoaded]);

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