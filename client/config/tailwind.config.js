/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {},
  variants: {},
  plugins: [],
  purge: {
    enabled: true,
    content: ['components/**/*.vue', 'layouts/**/*.vue', 'pages/**/*.vue', 'plugins/**/*.ts', 'nuxt.config.ts']
  },
  options: {
    whitelist: ['body', 'html', 'nuxt-progress']
  }
}

// styleExtensions: ['.css'],
// 	paths: ['components/**/*.vue', 'layouts/**/*.vue', 'pages/**/*.vue', 'plugins/**/*.js'],
// 	whitelist: ['body', 'html', 'nuxt-progress'],
// 	extractors: [
// 		{
// 			extractor: content => content.match(/[A-z0-9-:\\/]+/g) || [],
// 			extensions: ['html', 'vue', 'js']
// 		}
// 	]
