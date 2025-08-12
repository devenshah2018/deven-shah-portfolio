module.exports = {
  extends: ['next/core-web-vitals', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    // TypeScript specific rules
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',

    // React specific rules
    'react/react-in-jsx-scope': 'off', // Not needed in Next.js 13+
    'react/jsx-props-no-spreading': 'off', // Allow prop spreading
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
    'react/require-default-props': 'off', // Not needed with TypeScript

    // General rules
    'no-console': 'warn',
    'prefer-template': 'off',
    'no-nested-ternary': 'off',
    'no-plusplus': 'off',
    'consistent-return': 'off',
    'default-case': 'off',
    'no-restricted-syntax': 'off',
    '@next/next/no-img-element': 'warn',
    'react/no-array-index-key': 'warn',
    'react/self-closing-comp': 'warn',
    'react/jsx-boolean-value': 'off',
    'react/jsx-no-useless-fragment': 'warn',
    'react/jsx-no-constructed-context-values': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'no-promise-executor-return': 'warn',
    'react/no-unescaped-entities': 'warn',
    'react/button-has-type': 'warn',
    'import/no-duplicates': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  ignorePatterns: [
    '.next',
    'node_modules',
    'public',
    '*.config.js',
    '*.config.mjs',
    'tailwind.config.js',
    'postcss.config.js',
    'next-env.d.ts',
  ],
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
      env: {
        jest: true,
      },
      extends: ['plugin:testing-library/react'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'react/jsx-props-no-spreading': 'off',
      },
    },
  ],
};
