declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_STRAVA_CLIENT_ID: string;
    NEXT_PUBLIC_STRAVA_CLIENT_SECRET: string;
    NEXT_PUBLIC_STRAVA_REFRESH_TOKEN: string;
    NEXT_PUBLIC_GITHUB_ACCESS_TOKEN: string;
    ANALYZE?: string;
  }
}
