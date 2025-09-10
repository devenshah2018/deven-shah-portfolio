export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';

export async function GET() {
  const response = await fetch('https://api.hevyapp.com/v1/workouts?page=1&pageSize=1', {
    headers: {
      accept: 'application/json',
      'api-key': process.env['NEXT_PUBLIC_HEVY_API_KEY'] ?? '',
    },
  });
  const data = await response.json();
  return NextResponse.json(data);
}
