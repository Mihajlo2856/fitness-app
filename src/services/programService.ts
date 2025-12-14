// import { supabase } from '../lib/supabase';
import { supabase } from "./supabase";
import { TemplateExercise } from "@/types";

// Types
export interface Program {
  id: string;
  user_id: string;
  name: string;
  duration_weeks: number;
  active: boolean;
  current_week: number;
  current_day: number;
  created_at: string;
  updated_at: string;
}

export interface WorkoutTemplate {
  id: string;
  user_id: string;
  description: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface ProgramSchedule {
  id: string;
  program_id: string;
  day_of_week: number;
  template_id: string;
  template?: WorkoutTemplate;
}

export interface ActiveProgramData {
  program: Program;
  currentWorkout: WorkoutTemplate;
  exercises: TemplateExercise[];
}

// Service functions
export const programService = {
  /**
   * Get the active program for the current user
   */
  async getActiveProgram(): Promise<Program | null> {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .eq('active', true)
      .single();

    if (error) {
      console.error('Error fetching active program:', error);
      return null;
    }

    return data;
  },

  /**
   * Get today's workout template for the active program
   */
  async getCurrentWorkout(programId: string, currentDay: number): Promise<WorkoutTemplate | null> {
    // First get the template_id from the schedule
    const { data: scheduleData, error: scheduleError } = await supabase
      .from('program_schedule')
      .select('template_id')
      .eq('program_id', programId)
      .eq('day_of_week', currentDay)
      .single();

    if (scheduleError || !scheduleData) {
      console.error('Error fetching program schedule:', scheduleError);
      return null;
    }

    // Then get the actual workout template
    const { data: templateData, error: templateError } = await supabase
      .from('workout_templates')
      .select('*')
      .eq('id', scheduleData.template_id)
      .single();

    if (templateError) {
      console.error('Error fetching workout template:', templateError);
      return null;
    }
    return templateData;
  },

  /**
   * Get exercises for a workout template
   */
  async getTemplateExercises(templateId: string): Promise<TemplateExercise[]> {
    const { data, error } = await supabase
      .from('template_exercises')
      .select(`
        *,
        exercises (
          id,
          name,
          muscle_group
        )
      `)
      .eq('template_id', templateId)
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching template exercises:', error);
      return [];
    }
    return data as TemplateExercise[];
  },

  /**
   * Get complete active program data (program + current workout + exercises)
   */
  async getActiveProgramData(): Promise<ActiveProgramData | null> {
    // Get active program
    const program = await this.getActiveProgram();
    if (!program) return null;

    // Get current workout template
    const currentWorkout = await this.getCurrentWorkout(program.id, program.current_day);
    if (!currentWorkout) return null;

    // Get exercises for current workout
    const exercises = await this.getTemplateExercises(currentWorkout.id);

    return {
      program,
      currentWorkout,
      exercises,
    };
  },

  /**
   * Get full program schedule (all 7 days)
   */
  async getProgramSchedule(programId: string): Promise<ProgramSchedule[]> {
    const { data, error } = await supabase
      .from('program_schedule')
      .select(`
        *,
        workout_templates (*)
      `)
      .eq('program_id', programId)
      .order('day_of_week', { ascending: true });

    if (error) {
      console.error('Error fetching program schedule:', error);
      return [];
    }

    return data as ProgramSchedule[];
  },

  /**
   * Complete current workout and advance to next day
   */
  async completeWorkout(programId: string): Promise<boolean> {
    // Get current program state
    const program = await this.getActiveProgram();
    if (!program) return false;

    const { current_week, current_day, duration_weeks } = program;

    // Calculate next day
    let nextDay = current_day + 1;
    let nextWeek = current_week;

    // If completed Day 7, move to next week
    if (nextDay > 7) {
      nextDay = 1;
      nextWeek += 1;
    }

    // Check if program is complete
    if (nextWeek > duration_weeks) {
      // Program completed - handle this case
      console.log('Program completed!');
      return true;
    }

    // Update program
    const { error } = await supabase
      .from('programs')
      .update({
        current_week: nextWeek,
        current_day: nextDay,
        updated_at: new Date().toISOString(),
      })
      .eq('id', programId);

    if (error) {
      console.error('Error updating program progress:', error);
      return false;
    }

    return true;
  },
};