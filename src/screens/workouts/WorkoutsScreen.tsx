import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Screen } from '../../components/common/Screen';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import Divider from '@/components/common/Divider';
import Write from '@/components/common/Write';
import { useActiveProgram } from '@/hooks/useActiveProgram';
import { Ionicons } from '@expo/vector-icons';
import { NewLine } from '@/components/common/NewLine';
import { ExerciseListTable } from '@/components/workout/ExerciseListTable';
import { useActiveWorkout } from '@/contexts/ActiveWorkoutContext';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export function WorkoutsScreen() {
	const { colors } = useTheme();
	const { program, currentWorkout, exercises, loading, error } = useActiveProgram();
	const { startWorkout } = useActiveWorkout();
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	return (
		<Screen>
			<Write className="text-3xl" style={{ fontFamily: 'semibold' }}>
				Workouts
			</Write>
			<Divider></Divider>
			{loading && (
				<View className="flex-1 items-center justify-center py-8">
					<ActivityIndicator size="large" color={colors.primary} />
				</View>
			)}
			{error && (
				<Card>
					<Write className="text-center" style={{ color: colors.textSecondary }}>
						Failed to load program
					</Write>
				</Card>
			)}
			{!loading && !error && !program && (
				<View className="mt-4">
					<Write className="text-lg mb-4" style={{ fontFamily: 'medium' }}>
						No Active Program
					</Write>
					<Button onPress={() => console.log('Create program')}>
						Create Program
					</Button>
				</View>
			)}
			{!loading && program && currentWorkout && (
				<View className="mt-4">
					<Write className="text-lg mb-3 text-center" style={{ fontFamily: 'medium' }}>
						Dive Back In
					</Write>

					<Card variant='outlined'>
						<Write className="text-xl mb-1 text-center" style={{ fontFamily: 'semibold' }}>
							{program.name}
						</Write>
						<Write
							className="text-sm text-center"
							style={{ color: colors.textSecondary }}
						>
							Week {program.current_week} • Day {program.current_day} <NewLine />{currentWorkout.name}
						</Write>
						<TouchableOpacity
							className="flex-row items-center justify-between py-3"
							activeOpacity={0.7}
						>
						</TouchableOpacity>

						<ExerciseListTable exercises={exercises} />

						{/* Start Workout Button */}
						<Button
							fullWidth
							onPress={() => navigation.navigate('ActiveWorkout')}
						>
							<Ionicons name="barbell-outline" color={'white'} size={24} />
						</Button>
					</Card>
					{/* <Write
                        className="text-lg mb-3 mt-3 text-center"
                        style={{ fontFamily: 'medium' }}
                     >
                        Create a program
                    </Write> */}
					{/* <Button 
                        onPress={() => {}}
												fullWidth
                    >
                        <Write>Create your own custom program</Write>
                    </Button> */}
				</View>
			)}
		</Screen>
	);
}