const path = require('path')

module.exports = {
  stories: ['../**/*.stories.@(ts|js)'],
  addons: [
    '@storybook/addon-knobs',
    '@storybook/addon-viewport',
    '@storybook/addon-storysource',
    '@storybook/addon-actions', 
    '@storybook/addon-links'
  ],
  webpackFinal: config => {
    config.resolve.alias = {
      'vue$': 'vue/dist/vue.esm.js',
      '~': path.resolve(__dirname, '../client')
    }

    return config
  },
  typescript: {
    check: false,
    checkOptions: {}
  }
}