import js from '@eslint/js';
import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';

export default [
  {
    ignores: ['tests/e2e/*']
  },
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    plugins: {
      vue: pluginVue
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.jest,
        ...globals.node,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        _: 'writable'
      }
    },
    rules: {
      'vue/order-in-components': 0,
      'vue/require-default-prop': 0,
      'vue/require-explicit-emits': 0,
      'vue/no-template-shadow': 0,
      'vue/component-definition-name-casing': 0,
      'vue/multi-word-component-names': 0,
      'vue/no-v-text-v-html-on-component': 0,
      'vue/no-mutating-props': 0,
      'vue/no-unused-vars': 0,
      'vue/valid-v-slot': 0,
      'vue/no-reserved-component-names': 0,
      'vue/no-use-v-if-with-v-for': 0,
      'vue/require-v-for-key': 0,
      'vue/no-unused-components': 0,
      'vue/no-duplicate-attributes': 0,
      'no-useless-catch': 0,
      'no-console': 'off',
      'eol-last': ['error', 'always'],
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-unused-vars': ['error', {
        'vars': 'all',
        'args': 'after-used',
        'varsIgnorePattern': '^_',
        'argsIgnorePattern': '^_',
        'caughtErrors': 'all',
        'caughtErrorsIgnorePattern': '^_'
      }]
    }
  }
];
