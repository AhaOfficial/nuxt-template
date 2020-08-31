/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        black: '#333',
        gray: {
          100: '#fafafa',
          200: '#f6f6f6',
          300: '#f5f5f5',
          350: '#efefef',
          400: '#eeeeee',
          500: '#d2d2d2',
          600: '#afafaf',
          700: '#989898',
          800: '#7d7d7d',
          900: '#333333'
        }
      }
    }
  },
  variants: {},
  plugins: [],
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'client/components/**/*.vue',
      'client/layouts/**/*.vue',
      'client/pages/**/*.vue',
      'client/plugins/**/*.ts',
      'nuxt.config.ts'
    ]
  },
  options: {
    // whitelist: ['body', 'html', 'nuxt-progress']
  },
  future: {
    removeDeprecatedGapUtilities: true
  }
}
