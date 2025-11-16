import { NavigationContainer } from '@react-navigation/native';
import {initialWindowMetrics, SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { MainTabNavigator } from './navigation/MainTabNavigator';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {ProfileScreen} from "./screens/profile/ProfileScreen";
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
    // @ts-ignore
    return (
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <ThemeProvider>
                <NavigationContainer>
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
                </NavigationContainer>
            </ThemeProvider>
        </SafeAreaProvider>
    );
}