import { SupabaseClient } from '@supabase/supabase-js';
import axios from 'axios';
import { NextResponse } from 'next/server';

interface StravaStats {
  all_run_totals: any;
  all_ride_totals: any;
  all_swim_totals: any;
  recent_run_totals: any;
  recent_ride_totals: any;
  recent_swim_totals: any;
  ytd_run_totals: any;
  ytd_ride_totals: any;
  ytd_swim_totals: any;
  biggest_climb_elevation_gain: number;
  biggest_ride_distance: number;
}

const supabaseClient = new SupabaseClient(
    'https://avtlirighoozmkuvyshp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2dGxpcmlnaG9vem1rdXZ5c2hwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzQzMTIwNiwiZXhwIjoyMDczMDA3MjA2fQ.N-DhH6i2frCDq0r4MsRyJeTxX7pxKYj4nv4SdESI_XQ'
);

export async function GET() {
  const accessToken = await axios.post(`https://deven-shah-portfolio.vercel.app/api/strava/authenticate`);
  const statsResponse = await axios.post(`https://deven-shah-portfolio.vercel.app/api/strava/stats`, {
    access_token: accessToken.data.access_token,
  });
  const stats: StravaStats = statsResponse.data;
let data, error;
try {
    const result = await supabaseClient
        .from('strava-stats')
        .insert([{
            all_run_totals: stats.all_run_totals,
            all_ride_totals: stats.all_ride_totals,
            all_swim_totals: stats.all_swim_totals,
            recent_run_totals: stats.recent_run_totals,
            recent_ride_totals: stats.recent_ride_totals,
            recent_swim_totals: stats.recent_swim_totals,
            ytd_run_totals: stats.ytd_run_totals,
            ytd_ride_totals: stats.ytd_ride_totals,
            ytd_swim_totals: stats.ytd_swim_totals,
            biggest_climb_elevation_gain: stats.biggest_climb_elevation_gain,
            biggest_ride_distance: stats.biggest_ride_distance,
        }])
        .select();
    data = result.data;
    error = result.error;
    if (error) {
        console.error('Error saving Strava stats to Supabase:', error);
        return NextResponse.json({ error }, { status: 500 });
    }
} catch (err) {
    console.error('Unexpected error saving Strava stats:', err);
    return NextResponse.json({ error: 'Unexpected error saving Strava stats' }, { status: 500 });
}
  return NextResponse.json({ data, error });
}
