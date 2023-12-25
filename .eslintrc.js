module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['prettier', 'unused-imports', '@stylistic'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
    'prettier/prettier': 'warn',
    'no-unused-vars': 'off', // or "@typescript-eslint/'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }
    ],
    '@stylistic/padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: ['*'],
        next: ['interface', 'type', 'export']
      }
    ]
  }
};
