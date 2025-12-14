// lib/workoutQueries.ts
// import { supabase } from '@/lib/supabase';
import { supabase } from "./supabase";

export const fetchWorkoutExercises = async (programId: string, week: number, day: number) => {
    // First get the template_id for this day from program_schedule
    const { data: scheduleData, error: scheduleError } = await supabase
        .from('program_schedule')
        .select('template_id')
        .eq('program_id', programId)
        .eq('day_of_week', day)
        .single();

    if (scheduleError || !scheduleData) {
        console.error('Error fetching schedule:', scheduleError);
        throw scheduleError;
    }

    // Now fetch the exercises for this template
    const { data, error } = await supabase
        .from('template_exercises')
        .select(`
            id,
            exercise_order,
            sets,
            reps_min,
            reps_max,
            rest_seconds,
            notes,
            technique,
            exercises (
                id,
                name,
                muscle_group,
                equipment
            )
        `)
        .eq('template_id', scheduleData.template_id)
        .order('exercise_order', { ascending: true });

    if (error) {
        console.error('Error fetching exercises:', error);
        throw error;
    }

    // Transform to ActiveWorkout format
    return data.map((ex: any) => ({
        id: ex.id,
        exerciseId: ex.exercises.id,
        name: ex.exercises.name,
        muscleGroup: ex.exercises.muscle_group,
        sets: Array.from({ length: ex.sets }, () => ({
            weight: '',
            reps: '',
            completed: false
        })),
        repsRange: `${ex.reps_min}-${ex.reps_max}`,
        restTime: ex.rest_seconds,
        notes: ex.notes,
        technique: ex.technique
    }));
};