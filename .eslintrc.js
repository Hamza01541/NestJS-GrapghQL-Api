module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: { project: ['./tsconfig.json'] },
    extends: [
      'plugin:@typescript-eslint/recommended',
      'eslint-config-airbnb-base',
      'plugin:prettier/recommended',
    ],
    env: {
      es6: true,
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      'linebreak-style': 'off',
      'global-require': 'off',
      'no-restricted-globals': 'off',
      'func-names': 'off',
      'no-console': 'off',
      'no-continue': 'off',
      'no-param-reassign': 'off',
      'no-plusplus': 'off',
      'no-loop-func': 'off',
      'class-methods-use-this': 'warn',
  
      'import/no-webpack-loader-syntax': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/prefer-default-export': 'off',
      'no-underscore-dangle': 'off',
      'prefer-destructuring': 'off',
      'prettier/prettier': 'error',
      'import/extensions': 'off',
      'no-empty-function': 'off',
      'no-useless-constructor': 'off',
      'no-unused-vars': 'off',
      'no-shadow': 'off',
  
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-member-accessibility': 'off',
      '@typescript-eslint/indent': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-shadow': 'error',
    },
  };