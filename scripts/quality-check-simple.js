#!/usr/bin/env node

const { execSync } = require('child_process');

const COLORS = {
  GREEN: '\x1b[32m',
  RED: '\x1b[31m',
  YELLOW: '\x1b[33m',
  BLUE: '\x1b[34m',
  MAGENTA: '\x1b[35m',
  CYAN: '\x1b[36m',
  RESET: '\x1b[0m',
  BOLD: '\x1b[1m',
};

function log(message, color = COLORS.RESET) {
  console.log(`${color}${message}${COLORS.RESET}`);
}

function runCommand(command, name) {
  log(`\n🔍 Running ${name}...`, COLORS.BLUE);

  try {
    const output = execSync(command, {
      stdio: ['inherit', 'pipe', 'pipe'],
      encoding: 'utf8',
    });
    log(`✅ ${name}: Passed!`, COLORS.GREEN);
    return true;
  } catch (error) {
    log(`❌ ${name}: Failed`, COLORS.RED);
    if (error.stdout) console.log(error.stdout);
    if (error.stderr) console.log(error.stderr);
    return false;
  }
}

function main() {
  log('🚀 Running Code Quality Checks...', COLORS.BOLD + COLORS.MAGENTA);

  const checks = [
    { command: 'npx tsc --noEmit', name: 'TypeScript Type Check' },
    { command: 'npm run lint', name: 'ESLint Check' },
    { command: 'npm run format:check', name: 'Prettier Check' },
    { command: 'npm test -- --passWithNoTests --silent', name: 'Tests' },
  ];

  const results = checks.map(check => ({
    name: check.name,
    passed: runCommand(check.command, check.name),
  }));

  log('\n📋 Summary:', COLORS.BOLD);
  results.forEach(result => {
    const icon = result.passed ? '✅' : '❌';
    const color = result.passed ? COLORS.GREEN : COLORS.RED;
    log(`   ${icon} ${result.name}`, color);
  });

  const allPassed = results.every(result => result.passed);
  const passedCount = results.filter(r => r.passed).length;

  log(`\n📊 Results: ${passedCount}/${results.length} checks passed`, COLORS.CYAN);

  if (allPassed) {
    log('\n🎉 All quality checks passed!', COLORS.BOLD + COLORS.GREEN);
    process.exit(0);
  } else {
    log(
      '\n🚨 Some quality checks failed. Run individual commands to see details.',
      COLORS.BOLD + COLORS.YELLOW
    );
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { runCommand, main };
