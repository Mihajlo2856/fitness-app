import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { HomeScreen } from '../screens/home/HomeScreen';
import { WorkoutsScreen } from '../screens/workouts/WorkoutsScreen';
import { PlansScreen } from '../screens/plans/PlansScreen';
import { ProgressScreen } from '../screens/progress/ProgressScreen';
import {ProfileButton} from "../components/ProfileNavigator";

const Tab = createBottomTabNavigator();

export function MainTabNavigator() {
    const { colors } = useTheme();

    return (
        <>
        <ProfileButton />
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                lazy: false,
                tabBarStyle: {
                    backgroundColor: colors.surfaceSecondary,
                    borderRadius: 48,
                    width: '92%',
                    marginLeft: '4%',
                    marginBottom: 12,
                    height: 70,
                    paddingBottom: 8,
                    paddingTop: 8,
                    position: 'absolute',
                    overflow: 'hidden',
                    elevation: 0,
                    borderTopWidth: 0,        // Remove top border
                    borderWidth: 0,           // Remove all borders
                    shadowOpacity: 0,         // Remove iOS shadow
                    shadowOffset: {           // Remove iOS shadow
                        width: 0,
                        height: 0,
                    },
                    shadowRadius: 0,          // Remove iOS shadow
                },
                tabBarActiveTintColor: colors.secondary,
                tabBarInactiveTintColor: colors.textTertiary,
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Workouts"
                component={WorkoutsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="barbell" size={size} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Plans"
                component={PlansScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="calendar" size={size} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Progress"
                component={ProgressScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="trending-up" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
        </>
    );
}