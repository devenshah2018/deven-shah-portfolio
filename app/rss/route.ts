import { PROJECTS, RESEARCH_PAPERS } from '@/lib/content-registry';
import { NextResponse } from 'next/server';

const BASE_URL = 'https://deven-shah.com';

function formatRSSDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const day = days[d.getUTCDay()];
  const month = months[d.getUTCMonth()];
  const dateNum = d.getUTCDate();
  const year = d.getUTCFullYear();
  const hours = d.getUTCHours().toString().padStart(2, '0');
  const minutes = d.getUTCMinutes().toString().padStart(2, '0');
  const seconds = d.getUTCSeconds().toString().padStart(2, '0');
  return `${day}, ${dateNum} ${month} ${year} ${hours}:${minutes}:${seconds} GMT`;
}

export async function GET() {
  const currentDate = new Date();
  const rssDate = formatRSSDate(currentDate);

  // Get recent projects (last 10, sorted by date)
  const recentProjects = PROJECTS.sort((a, b) => {
    if (a.sortDate && b.sortDate) {
      return b.sortDate.localeCompare(a.sortDate);
    }
    return 0;
  }).slice(0, 10);

  // Get recent research papers (sorted by date)
  const recentPapers = RESEARCH_PAPERS.sort((a, b) =>
    b.sortDate.localeCompare(a.sortDate)
  );

  const rssItems = [
    ...recentProjects.map(project => {
      const pubDate = project.sortDate
        ? formatRSSDate(new Date(`${project.sortDate}-01`))
        : rssDate;
      return `    <item>
      <title>${escapeXml(project.title)}</title>
      <link>${BASE_URL}/#projects</link>
      <guid isPermaLink="false">${BASE_URL}/#project-${project.id}</guid>
      <description>${escapeXml(project.description)}</description>
      <pubDate>${pubDate}</pubDate>
      <category>Project</category>
    </item>`;
    }),
    ...recentPapers.map(paper => {
      const dateMatch = paper.date.match(/(\w+)\s+(\d{4})/);
      let pubDate = rssDate;
      if (dateMatch) {
        const monthMap: Record<string, string> = {
          January: '01',
          February: '02',
          March: '03',
          April: '04',
          May: '05',
          June: '06',
          July: '07',
          August: '08',
          September: '09',
          October: '10',
          November: '11',
          December: '12',
        };
        const month = monthMap[dateMatch[1]!] || '01';
        pubDate = formatRSSDate(new Date(`${dateMatch[2]}-${month}-01`));
      }
      return `    <item>
      <title>${escapeXml(paper.title)}</title>
      <link>${paper.pdfUrl || `${BASE_URL}/#education`}</link>
      <guid isPermaLink="false">${BASE_URL}/#paper-${paper.id}</guid>
      <description>${escapeXml(paper.abstract?.substring(0, 300) || paper.title)}</description>
      <pubDate>${pubDate}</pubDate>
      <category>Research Paper</category>
    </item>`;
    }),
  ].join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Deven Shah Portfolio</title>
    <link>${BASE_URL}</link>
    <description>Portfolio updates, projects, and research papers from Deven Shah, Co-founder & CTO at Suno Analytics</description>
    <language>en-US</language>
    <lastBuildDate>${rssDate}</lastBuildDate>
    <pubDate>${rssDate}</pubDate>
    <ttl>60</ttl>
    <atom:link href="${BASE_URL}/rss" rel="self" type="application/rss+xml"/>
${rssItems}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

