// /app/api/vercel-analytics/route.ts
import { NextResponse } from 'next/server';

// You must set these in your Vercel/Next.js environment variables
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;
console.log('Vercel Token:', VERCEL_TOKEN);
console.log('Vercel Project ID:', VERCEL_PROJECT_ID);

export async function GET() {
  if (!VERCEL_TOKEN || !VERCEL_PROJECT_ID) {
    return NextResponse.json({ error: 'Missing Vercel API credentials.' }, { status: 500 });
  }

  // Docs: https://vercel.com/docs/rest-api#endpoints/analytics/get-project-analytics
  const res = await fetch(`https://api.vercel.com/v6/analytics/projects/${VERCEL_PROJECT_ID}/stats?period=1d`, {
    headers: {
      Authorization: `Bearer ${VERCEL_TOKEN}`,
    },
  });

  if (!res.ok) {
    console.log('Failed to fetch Vercel analytics:', res);
    return NextResponse.json({ error: 'Failed to fetch analytics.' }, { status: 500 });
  }

  const data = await res.json();
  // data.uniques is the number of unique visitors in the period
  return NextResponse.json({ uniques: data.uniques ?? 0 });
}
