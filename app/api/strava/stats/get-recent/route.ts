import { supabaseClient } from "@/lib/supabase-client";

export async function GET() {
    const { data, error } = await supabaseClient.from('strava-stats').select('*').order('created_at', { ascending: false }).limit(1);
    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
    return new Response(JSON.stringify(data?.[0] || null), { status: 200 });
}