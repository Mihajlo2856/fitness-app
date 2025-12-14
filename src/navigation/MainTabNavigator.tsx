import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
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
                    backgroundColor: colors.surface,
                    borderBottomLeftRadius: 48,
                    borderBottomRightRadius: 48,
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                    width: '95%',
                    marginLeft: '2.5%',
                    marginBottom: 10,
                    height: 70,
                    paddingBottom: 8,
                    paddingTop: 8,
                    position: 'absolute',
                    overflow: 'hidden',
                    elevation: 0,
                    borderTopWidth: 0,
                    borderWidth: 0,
                    shadowOpacity: 0,
                    shadowOffset: {
                        width: 0,
                        height: 0,
                    },
                    shadowRadius: 0,
                },
                tabBarActiveTintColor: colors.text,
                tabBarInactiveTintColor: colors.textSecondary,
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },
            }}
        >
            <Tab.Screen
                name="Train"
                component={WorkoutsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="barbell" size={size} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Plan"
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