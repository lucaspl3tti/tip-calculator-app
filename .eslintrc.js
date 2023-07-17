module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    // 'eslint-config-airbnb',
  ],
  rules: {
    'max-len': ['error', {'code': 80}],
    'semi': 0,
    'prefer-const': 0,
    'no-underscore-dangle': 0,
    'lines-between-class-members': [
      'error',
      'always',
      { 'exceptAfterSingleLine': true },
    ],
    '@typescript-eslint/no-this-alias': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    'curly': 0,
    'nonblock-statement-body-position': 0,
    'no-restricted-syntax': 0,
    'guard-for-in': 0,
    'class-methods-use-this': 0,
    'comma-dangle': 0,
    'no-param-reassign': 0,
    'consistent-return': 0,
    'no-plusplus': 0,
    'prefer-destructuring': 0,
  },
  ignorePatterns: [
    '**/node_modules/*.js',
    '**/dist/*.js'
  ]
};
