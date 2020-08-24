import path from 'path'

module.exports = {
  stories: ['../**/*.stories.@(ts|js)'],
  addons: [
    '@storybook/addon-viewport',
    '@storybook/addon-knobs',
    '@storybook/addon-docs'
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
      use: ['style-loader', 'css-loader', 'sass-loader', {
        loader: 'postcss-loader',
        options: {
          config: {
            path: './.storybook/'
          }
        }
      }]
    }, {
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    })

    return config
  },
  typescript: {
    check: true,
    checkOptions: {}
  }
}