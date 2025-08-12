import axios from "axios";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = await axios.post(
      "https://www.strava.com/api/v3/oauth/token",
      {
        client_id: process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_STRAVA_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: process.env.NEXT_PUBLIC_STRAVA_REFRESH_TOKEN,
      },
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching Strava access token:", error);
    return NextResponse.json(
      { error: "Failed to fetch access token" },
      { status: 500 },
    );
  }
}
