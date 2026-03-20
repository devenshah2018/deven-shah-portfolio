export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';

const CACHE_MAX_AGE = 60 * 60 * 24; // 24 hours in seconds

/** Extra idle time (ms) before Microlink captures screenshot — lets SPAs / lazy UI settle. Override with PROJECT_THUMBNAIL_WAIT_MS. */
const SCREENSHOT_WAIT_MS = (() => {
  const n = Number(process.env['PROJECT_THUMBNAIL_WAIT_MS']);
  return Number.isFinite(n) && n >= 0 ? n : 4000;
})();

function microlinkScreenshotParams(targetUrl: string, includeWait: boolean): string {
  const base = new URLSearchParams({
    url: targetUrl,
    screenshot: 'true',
    'screenshot.type': 'jpeg',
    // Total Microlink request budget (page load + wait + render)
    timeout: '55000',
  });
  if (includeWait) {
    base.set('waitForTimeout', String(Math.min(15000, Math.max(0, SCREENSHOT_WAIT_MS))));
  }
  return base.toString();
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');
  if (!url || typeof url !== 'string') {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  try {
    const targetUrl = decodeURIComponent(url);
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      return NextResponse.json({ error: 'Invalid url' }, { status: 400 });
    }

    let imageUrl = null;

    // Try og:image first, then fall back to screenshot for sites without it
    const metaRes = await fetch(
      `https://api.microlink.io?url=${encodeURIComponent(targetUrl)}&screenshot=false`,
      { headers: { 'User-Agent': 'LinkPreview/1.0' }, next: { revalidate: CACHE_MAX_AGE } }
    );
    const metaData = await metaRes.json();
    imageUrl = metaData?.data?.image?.url ?? null;

    if (!imageUrl) {
      const screenRes = await fetch(
        `https://api.microlink.io?${microlinkScreenshotParams(targetUrl, true)}`,
        { headers: { 'User-Agent': 'LinkPreview/1.0' }, next: { revalidate: CACHE_MAX_AGE } }
      );
      const screenData = await screenRes.json();
      imageUrl = screenData?.data?.screenshot?.url ?? null;
    }

    return NextResponse.json({ imageUrl });
  } catch {
    return NextResponse.json({ imageUrl: null });
  }
}
