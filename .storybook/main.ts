// * 스토리북 메인 설정 파일 입니다.

import path from 'path'

module.exports = {
  stories: ['../**/*.stories.@(ts|js|mdx)'],
  addons: [
    '@storybook/addon-viewport',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null
      }
    },
    '@storybook/addon-controls',
    'storybook-zeplin/register'
  ],
  webpackFinal: async config => {
    config.resolve.alias = {
      vue$: 'vue/dist/vue.esm.js',
      '~': path.resolve(__dirname, '../client')
    }

    config.module.rules.push({
      test: /\.vue$/,
      use: ['vue-svg-inline-loader']
    })

    config.module.rules.push(
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: './.storybook/'
              }
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader']
      }
    )

    return config
  },
  typescript: {
    check: true,
    checkOptions: {}
  }
}
