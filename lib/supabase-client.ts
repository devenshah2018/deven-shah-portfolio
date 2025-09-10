import { SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env['NEXT_PUBLIC_SUPABASE_URL'] || '';
const supabaseAnonKey = process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'] || '';

export const supabaseClient = new SupabaseClient(
    supabaseUrl, supabaseAnonKey
)