export const dynamic = 'force-dynamic';
import { supabaseClient } from "@/lib/supabase-client";

export async function GET() {
    const { data, error } = await supabaseClient.from('posts').select('*');
    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
    return new Response(JSON.stringify(data || []), { status: 200 });
}
