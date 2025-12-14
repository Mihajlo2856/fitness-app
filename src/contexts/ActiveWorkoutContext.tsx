import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchWorkoutExercises } from '@/services/workoutService';

interface WorkoutSet {
    weight: string;
    reps: string;
    completed: boolean;
}

interface WorkoutExercise {
    id: string; // template_exercises.id
    exerciseId: string; // exercises.id
    name: string;
    muscleGroup: string;
    sets: WorkoutSet[];
    repsRange: string; // e.g., "8-12"
    restTime: number; // seconds
    notes?: string;
}

interface ActiveWorkout {
    sessionId: string; // unique ID for this session
    programId: string; // which program
    week: number; // which week
    day: number; // which day
    startTime: string; // ISO string for timer calculation
    exercises: WorkoutExercise[];
    currentExerciseIndex: number; // track which exercise user is on
}

interface ActiveWorkoutContextType {
    activeWorkout: ActiveWorkout | null;
    startWorkout: (programId: string, week: number, day: number) => Promise<void>;
    endWorkout: () => void;
    nextExercise: () => void;
    prevExercise: () => void;
    goToExercise: (index: number) => void;
    updateExerciseSet: (exerciseIndex: number, setIndex: number, weight: string, reps: string) => void;
    completeSet: (exerciseIndex: number, setIndex: number) => void;
}

const ActiveWorkoutContext = createContext<ActiveWorkoutContextType | undefined>(undefined);

const ACTIVE_WORKOUT_KEY = '@active_workout_state';

const saveWorkoutState = async (state: ActiveWorkout) => {
    try {
        await AsyncStorage.setItem(ACTIVE_WORKOUT_KEY, JSON.stringify(state));
    } catch (error) {
        console.error('Error saving workout state:', error);
    }
};

const loadWorkoutState = async (): Promise<ActiveWorkout | null> => {
    try {
        const saved = await AsyncStorage.getItem(ACTIVE_WORKOUT_KEY);
        if (!saved) return null;

        const parsed = JSON.parse(saved);

        // Validate structure
        if (!parsed.exercises || !Array.isArray(parsed.exercises) || parsed.exercises.length === 0) {
            console.log('Invalid workout structure, clearing...');
            await clearWorkoutState();
            return null;
        }

        return parsed;
    } catch (error) {
        console.error('Error loading workout state:', error);
        return null;
    }
};

const clearWorkoutState = async () => {
    try {
        await AsyncStorage.removeItem(ACTIVE_WORKOUT_KEY);
    } catch (error) {
        console.error('Error clearing workout state:', error);
    }
};

export const ActiveWorkoutProvider = ({ children }: { children: ReactNode }) => {
    const [activeWorkout, setActiveWorkout] = useState<ActiveWorkout | null>(null);

    // Load saved workout on mount
    useEffect(() => {
        const loadSavedWorkout = async () => {
            const saved = await loadWorkoutState();
            if (saved) {
                setActiveWorkout(saved);
            }
        };
        loadSavedWorkout();
    }, []);

    // Save whenever activeWorkout changes
    useEffect(() => {
        if (activeWorkout) {
            saveWorkoutState(activeWorkout);
        } else {
            clearWorkoutState();
        }
    }, [activeWorkout]);

    const startWorkout = async (programId: string, week: number, day: number) => {
        if (activeWorkout) {
            console.log('Already have an active workout');
            return;
        }

        try {
            console.log('Starting workout:', { programId, week, day });

            // Fetch exercises from Supabase
            const exercises = await fetchWorkoutExercises(programId, week, day);

            if (!exercises || exercises.length === 0) {
                console.error('No exercises found for this workout');
                return;
            }

            console.log('Fetched exercises:', exercises);

            const newWorkout: ActiveWorkout = {
                sessionId: `session_${Date.now()}`,
                programId,
                week,
                day,
                startTime: new Date().toISOString(),
                exercises,
                currentExerciseIndex: 0,
            };

            setActiveWorkout(newWorkout);
            console.log('Workout started successfully');
        } catch (error) {
            console.error('Error starting workout:', error);
        }
    };

    const endWorkout = () => {
        setActiveWorkout(null);
    };

    const nextExercise = () => {
        if (activeWorkout && activeWorkout.currentExerciseIndex < activeWorkout.exercises.length - 1) {
            setActiveWorkout({
                ...activeWorkout,
                currentExerciseIndex: activeWorkout.currentExerciseIndex + 1,
            });
        }
    };

    const prevExercise = () => {
        if (activeWorkout && activeWorkout.currentExerciseIndex > 0) {
            setActiveWorkout({
                ...activeWorkout,
                currentExerciseIndex: activeWorkout.currentExerciseIndex - 1,
            });
        }
    };

    const goToExercise = (index: number) => {
        if (activeWorkout && index >= 0 && index < activeWorkout.exercises.length) {
            setActiveWorkout({
                ...activeWorkout,
                currentExerciseIndex: index,
            });
        }
    };

    const updateExerciseSet = (exerciseIndex: number, setIndex: number, weight: string, reps: string) => {
        if (!activeWorkout) return;

        const updatedExercises = [...activeWorkout.exercises];
        updatedExercises[exerciseIndex].sets[setIndex] = {
            ...updatedExercises[exerciseIndex].sets[setIndex],
            weight,
            reps,
        };

        setActiveWorkout({
            ...activeWorkout,
            exercises: updatedExercises,
        });
    };

    const completeSet = (exerciseIndex: number, setIndex: number) => {
        if (!activeWorkout) return;

        const updatedExercises = [...activeWorkout.exercises];
        updatedExercises[exerciseIndex].sets[setIndex].completed =
            !updatedExercises[exerciseIndex].sets[setIndex].completed;

        setActiveWorkout({
            ...activeWorkout,
            exercises: updatedExercises,
        });
    };

    return (
        <ActiveWorkoutContext.Provider
            value={{
                activeWorkout,
                startWorkout,
                endWorkout,
                nextExercise,
                prevExercise,
                goToExercise,
                updateExerciseSet,
                completeSet,
            }}
        >
            {children}
        </ActiveWorkoutContext.Provider>
    );
};

export const useActiveWorkout = () => {
    const context = useContext(ActiveWorkoutContext);
    if (!context) {
        throw new Error('useActiveWorkout must be used within ActiveWorkoutProvider');
    }
    return context;
};