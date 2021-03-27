module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    eqeqeq: 'warn',
    'no-empty-function': 'warn',
    'no-useless-constructor': 'warn',
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-var-requires': 'warn',
    '@typescript-eslint/interface-name-prefix': 'off',
    'array-element-newline': ['warn', 'consistent'],
    'handle-callback-err': 'off',
    'require-await': 'off',
    'vue/no-v-html': 'off',
    'no-useless-return': 'off'
  },
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false
  }
}
