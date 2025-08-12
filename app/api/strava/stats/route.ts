import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const accessToken = body.access_token;
  try {
    const response = await axios.get('https://www.strava.com/api/v3/athletes/123793208/stats', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(response.data);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch access token' }, { status: 500 });
  }
}
