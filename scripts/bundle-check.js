#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const COLORS = {
  GREEN: '\x1b[32m',
  RED: '\x1b[31m',
  YELLOW: '\x1b[33m',
  BLUE: '\x1b[34m',
  RESET: '\x1b[0m',
  BOLD: '\x1b[1m',
};

function log(message, color = COLORS.RESET) {
  console.log(`${color}${message}${COLORS.RESET}`);
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getDirectorySize(dirPath) {
  let totalSize = 0;

  if (!fs.existsSync(dirPath)) {
    return 0;
  }

  function getSize(itemPath) {
    const stats = fs.statSync(itemPath);

    if (stats.isFile()) {
      totalSize += stats.size;
    } else if (stats.isDirectory()) {
      const items = fs.readdirSync(itemPath);
      items.forEach(item => {
        getSize(path.join(itemPath, item));
      });
    }
  }

  getSize(dirPath);
  return totalSize;
}

function analyzeBundleSize() {
  log('\n📦 Analyzing bundle size...', COLORS.BLUE);

  const nextDir = path.join(process.cwd(), '.next');
  const staticDir = path.join(nextDir, 'static');

  if (!fs.existsSync(nextDir)) {
    log('❌ No .next directory found. Run "npm run build" first.', COLORS.RED);
    return false;
  }

  const totalSize = getDirectorySize(nextDir);
  const staticSize = getDirectorySize(staticDir);
  const gzippedEstimate = staticSize * 0.3; // Rough gzip estimate

  log('\n📊 Bundle Size Analysis:', COLORS.BOLD);
  log(`   Total .next directory: ${formatBytes(totalSize)}`, COLORS.CYAN);
  log(`   Static assets: ${formatBytes(staticSize)}`, COLORS.CYAN);
  log(`   Estimated gzipped: ${formatBytes(gzippedEstimate)}`, COLORS.CYAN);

  const TARGET_SIZE_KB = 500; // 500KB target
  const gzippedKB = gzippedEstimate / 1024;

  if (gzippedKB <= TARGET_SIZE_KB) {
    log(
      `✅ Bundle size ${formatBytes(gzippedEstimate)} is within ${TARGET_SIZE_KB}KB target!`,
      COLORS.GREEN
    );
    return true;
  } else {
    log(
      `❌ Bundle size ${formatBytes(gzippedEstimate)} exceeds ${TARGET_SIZE_KB}KB target!`,
      COLORS.RED
    );
    log(
      `   Consider code splitting, tree shaking, or removing unused dependencies.`,
      COLORS.YELLOW
    );
    return false;
  }
}

function analyzeChunks() {
  log('\n🔍 Analyzing chunks...', COLORS.BLUE);

  const chunksDir = path.join(process.cwd(), '.next', 'static', 'chunks');

  if (!fs.existsSync(chunksDir)) {
    log('❌ No chunks directory found.', COLORS.RED);
    return;
  }

  const chunks = fs
    .readdirSync(chunksDir)
    .filter(file => file.endsWith('.js'))
    .map(file => {
      const filePath = path.join(chunksDir, file);
      const stats = fs.statSync(filePath);
      return {
        name: file,
        size: stats.size,
        formatted: formatBytes(stats.size),
      };
    })
    .sort((a, b) => b.size - a.size);

  log('\n📄 Largest chunks:', COLORS.BOLD);
  chunks.slice(0, 10).forEach((chunk, index) => {
    const color =
      chunk.size > 100000 ? COLORS.RED : chunk.size > 50000 ? COLORS.YELLOW : COLORS.GREEN;
    log(`   ${index + 1}. ${chunk.name}: ${chunk.formatted}`, color);
  });
}

function main() {
  log('📦 Bundle Size Analysis', COLORS.BOLD + COLORS.BLUE);

  const success = analyzeBundleSize();
  analyzeChunks();

  if (success) {
    log('\n🎉 Bundle size check passed!', COLORS.BOLD + COLORS.GREEN);
    process.exit(0);
  } else {
    log('\n🚨 Bundle size check failed!', COLORS.BOLD + COLORS.RED);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { analyzeBundleSize, analyzeChunks };
