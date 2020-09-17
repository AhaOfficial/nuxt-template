/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
const plugin = require('tailwindcss/plugin')

module.exports = {
  theme: {
    container: {
      center: true
    },
    extend: {
      colors: {
        primary: { default: '#1fc7c1', lighter: '#27ddd7', dark: '#1cb0ab' },
        black: '#333',
        gray: {
          100: '#f0f0f0',
          200: '#bbbbbb',
          300: '#666666',
          400: '#999999'
        },
        warn: { default: '#FF5454' }
      },
      borderRadius: {
        sm: '3px',
        default: '5px',
        lg: '10px',
        xl: '25px'
      },
      animation: {
        'fade-in': 'fade-in 1s ease-out'
      },
      keyframes: {
        'fade-in': {
          from: { opacity: 0 },
          to: { opacity: 1 }
        }
      }
    }
  },
  variants: ['hover'],
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        svg: {
          display: 'inline'
        }
      })
    })
  ],
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'src/components/**/*.vue',
      'src/layouts/**/*.vue',
      'src/pages/**/*.vue',
      'src/plugins/**/*.ts',
      'nuxt.config.ts'
    ]
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  }
}
