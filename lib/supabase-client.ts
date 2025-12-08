import { SupabaseClient } from '@supabase/supabase-js';

// Support both .env and .env.local
const supabaseUrl = process.env['NEXT_PUBLIC_SUPABASE_URL'] || process.env['SUPABASE_URL'] || '';
const supabaseKey = process.env['NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY'] || process.env['SUPABASE_SERVICE_ROLE_KEY'] || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase credentials not found. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY in your .env file');
}

export const supabaseClient = new SupabaseClient(supabaseUrl, supabaseKey);
