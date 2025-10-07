import js from '@eslint/js'
import globals from 'globals'
import reactPlugin from 'eslint-plugin-react'
import functionalPlugin from 'eslint-plugin-functional'
import reactRefresh from 'eslint-plugin-react-refresh'
import importPlugin from 'eslint-plugin-import'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import testingLibrary from 'eslint-plugin-testing-library'
import reactHooks from 'eslint-plugin-react-hooks'
import stylisticPlugin from '@stylistic/eslint-plugin'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      react: reactPlugin,
      functional: functionalPlugin,
      'react-hooks': reactHooks,
      import: importPlugin,
      'jsx-a11y': jsxA11y,
      'testing-library': testingLibrary,
      'react-refresh': reactRefresh,
      '@stylistic': stylisticPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    extends: [js.configs.recommended].filter(Boolean),
    rules: {
      '@stylistic/semi': ['error', 'never'],
      'import/extensions': 'off',
      'import/no-unresolved': 'off',
      'react/prop-types': 'off',
      'no-console': 'off',
      'react/react-in-jsx-scope': 'off',
      'functional/no-conditional-statements': 'off',
      'functional/no-expression-statements': 'off',
      'functional/immutable-data': 'off',
      'functional/functional-parameters': 'off',
      'functional/no-try-statements': 'off',
      'functional/no-throw-statements': 'off',
      'functional/no-return-void': 'off',
      'no-underscore-dangle': ['error', { allow: ['__filename', '__dirname'] }],
      'react/function-component-definition': [
        'error',
        { namedComponents: 'arrow-function' },
      ],
      'testing-library/no-debug': 'off',
      'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
