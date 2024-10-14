import { createClient } from "@supabase/supabase-js";

const supabaseUrl = `https://${process.env.EXPO_PUBLIC_SUPABASE_PROJECT_ID}.supabase.co`;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_API_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey!);
