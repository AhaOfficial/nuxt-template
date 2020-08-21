const path = require('path')

module.exports = {
  stories: ['../**/*.stories.@(ts|js)'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-viewport',
    '@storybook/addon-knobs'
  ],
  webpackFinal: async config => {
    config.resolve.alias = {
      'vue$': 'vue/dist/vue.esm.js',
      '~': path.resolve(__dirname, '../client')
    }

    config.module.rules.push({
      test: /\.vue$/,
      use: [{
        loader: "vue-svg-inline-loader",
      }]
    })

    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      include: path.resolve(__dirname, '../client')
    }, {
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    })

    return config
  },
  typescript: {
    check: false,
    checkOptions: {}
  }
}