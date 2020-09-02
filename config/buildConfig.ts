import path from 'path'
import * as Config from './'

/**
 * 빌드 설정들이 여기에 담깁니다.
 */
export const BuildConfig = {
  // * 빌드된 결과물을 minify 합니다.
  // * (--plain 인자가 명령어로 입력될 때만 비활성화 합니다.)
  terser: !(process.argv.length > 5 && process.argv[4] === '--plain'),

  // * 번들을 최적화 할 수 있도록 시각화화여 알려줍니다.
  // * (--analyze 인자가 명령어로 입력될 때만 활성화 합니다.)
  analyze: !!(process.argv.length > 5 && process.argv[4] === '--analyze'),

  // * 빌드에 직접 간섭하는 설정들이 담깁니다.
  build: {
    // * HTML 빌드 설정들이 담깁니다.
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,

        // * 인라인 CSS 미니파이어
        // * Optimizer 가 있으므로 켤 필요 없습니다.
        // * https://github.com/nuxt/nuxt.js/blob/5fa768373da1adfd8c76145b2ec95b7824af93b4/packages/webpack/src/config/client.js#L62-L74
        minifyCSS: false,

        // * 인라인 JS 미니파이어
        // * Terser 가 이미 있으므로 켤 필요 없습니다.
        // * https://github.com/nuxt/nuxt.js/blob/da4615a160f356d7368e66956758345d674948d0/packages/webpack/src/config/base.js#L183-L213
        minifyJS: false,
        processConditionalComments: true,
        removeEmptyElements: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true
      }
    },

    // * PostCSS 빌드 설정들이 담깁니다.
    postcss: {
      plugins: {
        // * 테일윈드 CSS 를 추가합니다.
        tailwindcss: path.join(__dirname, 'client/config/tailwind.config.js')
      }
    },

    // * (빌드 가속용 옵션) 빌드시 해석한 파일들을 해시에 따라 캐싱합니다.
    cache: true,

    // * (빌드 가속용 옵션) Client 파일과 Server 파일을 동시에 빌드합니다.
    parallel: true,

    // * 빌드 중 사용될 빌드 플러그인들이 명시됩니다.
    plugins: [],

    // * Nuxt 에서 사용하는 Webpack 설정을 확장합니다.
    extend(config) {
      // * 번들에서 제외할 모듈들을 명시합니다.
      config.externals = {
        vuex: 'vuex'
      }
    },

    // * 이전 브라우저에 맞게 Babel 로 트랜스파일 할 빌드 목록입니다.
    transpile: [],

    // * gzip 을 사용하지 않습니다.
    performance: {
      gzip: false
    }
  }
} as Config.Interface.IConfig
