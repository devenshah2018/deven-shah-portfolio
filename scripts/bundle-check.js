/** Measure the assets referenced by the built home page, using real gzip sizes. */
const fs = require('fs');
const path = require('path');
const { gzipSync } = require('zlib');

const TARGET_SIZE_KB = 500;
const formatBytes = bytes => `${(bytes / 1024).toFixed(1)} KiB`;

function getInitialAssets() {
  const htmlPath = path.join(process.cwd(), '.next/server/app/index.html');
  if (!fs.existsSync(htmlPath)) throw new Error('Run npm run build before checking bundle size.');
  const html = fs.readFileSync(htmlPath, 'utf8');
  const urls = new Set();
  for (const [tag] of html.matchAll(/<(?:script|link)\b[^>]*>/g)) {
    // Modern browsers do not fetch the nomodule compatibility bundle.
    if (/\bnomodule\b/i.test(tag)) continue;
    const url = tag.match(/(?:src|href)="(\/_next\/static\/[^"?]+\.(?:js|css))"/);
    if (url) urls.add(url[1]);
  }
  return [...urls].map(url => {
    const data = fs.readFileSync(path.join(process.cwd(), '.next', url.slice('/_next/'.length)));
    return { url, bytes: data.length, gzipBytes: gzipSync(data, { level: 9 }).length };
  });
}

function analyzeBundleSize() {
  const assets = getInitialAssets();
  for (const extension of ['.js', '.css']) {
    const files = assets.filter(asset => asset.url.endsWith(extension));
    const raw = files.reduce((sum, file) => sum + file.bytes, 0);
    const gzip = files.reduce((sum, file) => sum + file.gzipBytes, 0);
    console.log(
      `Initial ${extension === '.js' ? 'JavaScript' : 'CSS'}: ${files.length} files, ${formatBytes(raw)} raw, ${formatBytes(gzip)} gzip`
    );
  }
  const gzipJS = assets
    .filter(asset => asset.url.endsWith('.js'))
    .reduce((sum, file) => sum + file.gzipBytes, 0);
  const passed = gzipJS <= TARGET_SIZE_KB * 1024;
  console.log(
    `Initial JavaScript ${passed ? 'passes' : 'exceeds'} the ${TARGET_SIZE_KB} KiB gzip budget.`
  );
  return passed;
}

function analyzeChunks() {
  console.log('\nLargest initial assets:');
  getInitialAssets()
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 10)
    .forEach(asset => {
      console.log(
        `  ${asset.url}: ${formatBytes(asset.bytes)} raw, ${formatBytes(asset.gzipBytes)} gzip`
      );
    });
}

if (require.main === module) {
  try {
    const passed = analyzeBundleSize();
    analyzeChunks();
    process.exitCode = passed ? 0 : 1;
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = { analyzeBundleSize, analyzeChunks, getInitialAssets };
