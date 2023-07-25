module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'prettier',
  ],
  overrides: [
    {
      files: ['*.ts', '.eslintrc.{cjs}'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      env: {
        node: true,
        jest: true,
      },
      parserOptions: {
        sourceType: 'script',
      },
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: ['@typescript-eslint', 'import', 'prettier', 'jest'],
  rules: {
    'import/extensions': [1, { ts: 'always' }],
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'import/no-unresolved': 'off',
  },
};
