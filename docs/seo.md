# SEO audit and rollout

Audited October 16, 2026. The primary target is discovery for **Deven Shah**,
with supporting relevance for Boston University AI research, computer vision,
machine learning, and software engineering. These topics describe the visible
portfolio; no new claims or keyword-only content were added.

## Implemented

- Shared canonical origin, title, and concise description in `lib/seo.ts` keep
  search metadata, social previews, structured data, robots, and feeds aligned.
- Corrected Open Graph dimensions to match the existing 2370 × 1776 image.
- Added connected `WebSite`, `ProfilePage`, and `Person` structured data. The
  website name is Deven Shah, with Deven Shah Portfolio as an alternate name.
  The person uses the real profile photo and existing public social profiles.
- Derived current employers from roles that have started and are still marked
  Present. Suno Analytics is no longer described as current employment; the
  future Accenture position is excluded until its start month. An active degree
  is not represented as completed education.
- Safely serialized JSON-LD so future content cannot close its script element.
- Kept all 12 project descriptions, source links, and four downloadable papers
  in the initial server HTML. The same Featured filter, search, result counts,
  order, and accessible controls determine which rows are visible. Native
  `hidden` prevents inactive results from receiving keyboard focus.
- Kept coursework in the HTML inside its existing collapsed panels. Their
  visibility, toggle controls, and layout are unchanged.
- Replaced fragment-only sitemap entries with the canonical homepage and four
  linked project PDF documents. Removed build-time modification dates because
  they did not track actual content revisions. No artificial priorities remain.
- Preserved crawl access to CSS, JavaScript, images, and PDFs. Existing API and
  admin crawl exclusions remain intact.
- Updated both existing RSS feeds to use accurate identity information, keeping
  subscription URLs and item GUIDs. Sorting no longer mutates the shared
  registry.
- Added regression coverage for server HTML, visible filter defaults, coursework
  toggles, sitemap URLs, entity accuracy, and safe structured-data
  serialization.

## Checks and limitations

- The public apex homepage returned HTTP 200 over HTTPS. The www hostname
  redirected to the apex with HTTP 307 at the hosting layer. For a permanent
  preferred-domain migration, configure that Vercel domain redirect as 308; an
  application change cannot override an earlier hosting redirect.
- The production build has one H1, descriptive section headings, canonical
  metadata, index/follow directives, server-rendered JSON-LD, and readable
  project links. The recent performance optimizations and favicon are preserved.
- Initial JavaScript remains approximately 244.8 KiB gzipped and CSS 14.4 KiB.
  Including the full catalog and coursework adds approximately 2 KiB to the
  gzipped homepage HTML, without an additional client dependency or bundle.
- Google's public PageSpeed Insights endpoint returned HTTP 429 (shared quota
  exceeded). No Lighthouse score or Core Web Vitals pass is claimed. Check
  actual mobile field data in Search Console once enough traffic is available.
- Existing repository test/lint infrastructure has baseline issues: 13 legacy
  suites import removed component paths, and ESLint fails loading the existing
  legacy configuration. Compare against the baseline rather than interpreting
  these as SEO regressions.
- This is a single-page portfolio. Hash sections are navigation targets, not
  independent pages. Unique project case-study pages could support broader
  project searches later, but were not added during this feature-preserving
  pass.

## After deployment

1. In Google Search Console, use the existing verified domain property if one
   exists. Otherwise verify ownership with DNS, or set the optional
   `GOOGLE_SITE_VERIFICATION` deployment environment variable to the token from
   Google's HTML meta verification method and redeploy. Never use a placeholder.
2. Submit `https://deven-shah.com/sitemap.xml` in the Sitemaps report.
3. Inspect `https://deven-shah.com/` with URL Inspection, run the live test,
   check the rendered HTML and Google-selected canonical, and request indexing
   once.
4. Run the deployed homepage through Google's Rich Results Test. Local syntax
   tests do not establish eligibility or guarantee a rich result.
5. Ensure public GitHub and LinkedIn profiles link to the canonical portfolio.
   Seek relevant links from real research, university, and project pages where
   appropriate; do not buy links or create artificial references.
6. Track branded impressions/clicks, indexing, and mobile Core Web Vitals in
   Search Console. Compare actual query data before changing content. Search
   operator checks do not reliably measure full indexing or search position.

No code change can guarantee the first Google result. Relevance, competition,
links, and Google's crawling/indexing decisions still determine results.

## Local validation

```sh
npx jest __tests__/seo.test.tsx __tests__/projects-index.test.tsx __tests__/portfolio-updates.test.tsx __tests__/performance-regressions.test.tsx __tests__/mobile-interactions.test.tsx --runInBand
npm run type-check
npm run build
npm run bundle:check
git diff --check
```

## References

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [ProfilePage structured data](https://developers.google.com/search/docs/appearance/structured-data/profile-page)
- [Site names](https://developers.google.com/search/docs/appearance/site-names)
- [Canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Fix JavaScript search problems](https://developers.google.com/search/docs/crawling-indexing/javascript/fix-search-javascript)
- [Indexable file types](https://developers.google.com/search/docs/crawling-indexing/indexable-file-types)
