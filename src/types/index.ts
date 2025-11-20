export interface Exercise {
    id: string;
    user_id: string | null;
    name: string;
    description?: string;
    muscle_group: string;
    secondary_muscles?: string[];
    equipment: string;
    difficulty: string;
    instructions?: string;
    video_url?: string;
    image_url?: string;
    is_custom: boolean;
    created_at: string;
    updated_at: string;
}

export interface WorkoutTemplate {
    id: string;
    user_id: string;
    name: string;
    description?: string;
    created_at: string;
    updated_at: string;
}

export interface TemplateExercise {
    id: string;
    template_id: string;
    exercise_id: string;
    order_index: number;
    sets: number;
    reps: number;
    rest_seconds: number;
    notes?: string;
    created_at: string;
    exercise?: Exercise; // Joined data
}

export interface WorkoutSession {
    id: string;
    user_id: string;
    template_id?: string;
    name?: string;
    started_at: string;
    completed_at?: string;
    duration_seconds?: number;
    notes?: string;
    created_at: string;
}

export interface LoggedSet {
    id: string;
    session_id: string;
    exercise_id: string;
    set_number: number;
    weight?: number;
    reps?: number;
    duration_seconds?: number;
    rpe?: number;
    notes?: string;
    created_at: string;
    exercise?: Exercise; // Joined data
}

export interface PersonalRecord {
    id: string;
    user_id: string;
    exercise_id: string;
    weight: number;
    reps: number;
    achieved_at: string;
    created_at: string;
    exercise?: Exercise; // Joined data
}

export interface BodyMeasurement {
    id: string;
    user_id: string;
    measured_at: string;
    weight?: number;
    body_fat_percentage?: number;
    chest?: number;
    waist?: number;
    hips?: number;
    arms?: number;
    thighs?: number;
    notes?: string;
    created_at: string;
}

export interface WeeklyPlan {
    id: string;
    user_id: string;
    name: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface PlannedWorkout {
    id: string;
    plan_id: string;
    template_id?: string;
    day_of_week: number; // 0 = Sunday, 6 = Saturday
    created_at: string;
    template?: WorkoutTemplate; // Joined data
}