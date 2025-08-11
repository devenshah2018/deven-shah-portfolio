import axios from "axios"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getStravaStats() {
  const accessToken = await axios.post('api/strava/authenticate');
  const stats = await axios.post('api/strava/stats', {
    access_token: accessToken.data.access_token,
  });
  return stats.data;
}