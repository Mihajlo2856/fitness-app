import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// 👇 REPLACE THESE WITH YOUR ACTUAL VALUES
const supabaseUrl = 'https://wfzfaumgraclcntqbhrn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmemZhdW1ncmFjbGNudHFiaHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzMDQ4MTAsImV4cCI6MjA3ODg4MDgxMH0.kITkWsf2GidpHefA66RTuvaaHgGn9xV8-147RQoI7UI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});