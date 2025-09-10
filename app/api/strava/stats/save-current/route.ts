import { supabaseClient } from '@/lib/supabase-client';
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

export async function GET() {
  const accessToken = await axios.post(`${process.env['NEXT_PUBLIC_URL']}/api/strava/authenticate`);
  const statsResponse = await axios.post(`${process.env['NEXT_PUBLIC_URL']}/api/strava/stats`, {
    access_token: accessToken.data.access_token,
  });
  const stats: StravaStats = statsResponse.data;
  const { data, error } = await supabaseClient
    .from(process.env['NEXT_SUPABASE_STRAVA_TABLE'] || 'strava-stats')
    .upsert({
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
    })
    .select();
  if (error) {
    console.error('Error saving Strava stats to Supabase:', error);
    return NextResponse.json({ error: 'Failed to save Strava stats' }, { status: 500 });
  }
  return NextResponse.json({ data, error });
}
