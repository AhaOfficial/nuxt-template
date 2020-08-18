const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  stories: ['../**/*.stories.@(ts|js)'],
  addons: [
    '@storybook/addon-knobs',
    '@storybook/addon-viewport',
    '@storybook/addon-storysource',
    '@storybook/addon-actions', 
    '@storybook/addon-links'
  ],
  webpackFinal: async config => {
    config.plugins.push(new VueLoaderPlugin())

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
      use: ['style-loader', 'css-loader', 'sass-loader']
    }, {
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    }, {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      loaders: ['file-loader'],
      include: path.resolve(__dirname, '../client')
    })

    return config
  },
  typescript: {
    check: false,
    checkOptions: {}
  }
}