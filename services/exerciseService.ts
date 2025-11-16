import { supabase } from './supabase';
import { Exercise } from '../types';

export const exerciseService = {
    // Get all exercises (default + user's custom)
    async getAllExercises(): Promise<Exercise[]> {
        const { data, error } = await supabase
            .from('exercises')
            .select('*')
            .order('name');

        if (error) throw error;
        return data || [];
    },

    // Get exercises by muscle group
    async getExercisesByMuscleGroup(muscleGroup: string): Promise<Exercise[]> {
        const { data, error } = await supabase
            .from('exercises')
            .select('*')
            .eq('muscle_group', muscleGroup)
            .order('name');

        if (error) throw error;
        return data || [];
    },

    // Search exercises
    async searchExercises(query: string): Promise<Exercise[]> {
        const { data, error } = await supabase
            .from('exercises')
            .select('*')
            .ilike('name', `%${query}%`)
            .order('name');

        if (error) throw error;
        return data || [];
    },

    // Create custom exercise
    async createExercise(exercise: Partial<Exercise>): Promise<Exercise> {
        const { data: { user } } = await supabase.auth.getUser();

        const { data, error } = await supabase
            .from('exercises')
            .insert([{
                ...exercise,
                user_id: user?.id,
                is_custom: true,
            }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },
};