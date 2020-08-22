import path from 'path'
import type { NuxtConfig } from '@nuxt/types'
import webpack from 'webpack'

// * env 환경을 확인합니다.
require('dotenv').config()

// * 개발 모드인지를 확인합니다.
const isProductionMode = process.env.NODE_ENV == 'production'

// * 매 빌드마다 캐싱 버전이 자동으로 색인됩니다.
// * (서비스워커를 통한 브라우저 상의 캐싱을 위해 사용되는 버전입니다.)
const cacheVersion = `_${Math.floor(+new Date() / 1000)}`

// * 모든 Nuxt 설정이 여기에 담깁니다.
const nuxtConfig: Config = {
  // * USSR 을 적용합니다.
  mode: 'universal',

  // * 페이지 전체에 이동시 효과를 입힙니다. https://ko.nuxtjs.org/api/pages-transition/
  transition: {
    name: 'fade',
    mode: 'out-in'
  },

  // * 개발자 툴을 활성화할지 여부가 담깁니다.
  vue: {
    config: {
      productionTip: false,
      devtools: !isProductionMode
    }
  },

  // * HTML 헤더에 들어갈 내용을 명시합니다.
  head: {
    // * 브라우저 창 제목을 명시합니다.
    title: 'nuxt-template',

    // * 브라우저 창 제목 템플릿을 명시합니다.
    titleTemplate: '%s | with vue',

    // * 메타 태그들을 명시합니다.
    meta: [
      // * 유니코드 사용을 명시합니다.
      { charset: 'utf-8' },

      // * 모바일 호환용 Viewport 설정입니다.
      {
        name: 'viewport',
        content: ['width=device-width', 'initial-scale=1', 'maximum-scale=1.0', 'user-scalable=0', 'viewport-fit=cover'].join(', ')
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js TypeScript project'
      }
    ],

    script: [],

    // * 파비콘 주소를 명시합니다.
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // * 빌드 설정들을 명시합니다.
  build: {
    // * 빌드된 결과물을 minify 합니다.
    terser: !!isProductionMode,

    // * 모든 모듈을 트랜스파일합니다.
    transpile: ['*'],

    // * 빌드 가속용 옵션들입니다.
    cache: true,
    parallel: true,
    hardSource: true,

    // * 번들을 최적화 할 수 있도록 시각화화여 알려줍니다.
    analyze: false,

    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,

        // * 인라인 CSS 미니파이어
        // * Optimizer 가 있으므로 켤 필요 없습니다. https://github.com/nuxt/nuxt.js/blob/5fa768373da1adfd8c76145b2ec95b7824af93b4/packages/webpack/src/config/client.js#L62-L74
        minifyCSS: false,

        // * 인라인 JS 미니파이어
        // * Terser 가 이미 있으므로 켤 필요 없습니다. https://github.com/nuxt/nuxt.js/blob/da4615a160f356d7368e66956758345d674948d0/packages/webpack/src/config/base.js#L183-L213
        minifyJS: false,
        processConditionalComments: true,
        removeEmptyElements: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true
      }
    },

    plugins: [
      // * Vuex 의 의존 정보를 삭제합니다.
      new webpack.IgnorePlugin(new RegExp('/vuex/'))
    ],

    // * Nuxt 에서 사용하는 Webpack 설정을 확장합니다.
    extend(config) {
      // * 번들에서 제외할 모듈들을 명시합니다.
      if (isProductionMode) {
        config.externals = {
          vuex: 'vuex'
        }
      }
    }
  },

  // * Nuxt 의 환경 설정을 여기에 지정합니다.
  env: {},

  // * 전역으로 사용될 CSS 파일들을 여기 지정할 수 있습니다.
  css: [],

  // * Nuxt 의 빌드 시 빌드본에 포함될 모듈들을 지정합니다.
  modules: ['@nuxtjs/axios', 'nuxt-lifecycle', 'nuxt-ssr-cache', 'cookie-universal-nuxt', '@nuxtjs/gtm'],

  // * Nuxt 의 빌드 시 작동되는 모듈들을 지정합니다.
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/pwa',
    'nuxt-compress',
    ['@nuxtjs/dotenv', { path: './client/env', filename: isProductionMode ? '.env.prod' : '.env.dev' }],
    '@nuxtjs/stylelint-module',
    '@nuxtjs/eslint-module'
  ],

  // * Nuxt 의 기능을 확장할 플러그인들을 지정합니다.
  plugins: ['~/plugins/composition-api'],

  // * 배포할 경로를 지정합니다.
  srcDir: './client',

  // * 라우터 설정을 지정합니다.
  router: {
    middleware: ['auth']
  },

  // * Nuxt-SSR-Cache 용 버전을 제공합니다.
  version: cacheVersion,

  // * Nuxt SSR 캐싱 정책을 명시합니다. https://github.com/arash16/nuxt-ssr-cache
  cache: {
    // * 여러 호스트를 동시에 운용하는 경우
    // * req.hostname 과 같이 명시하거나 false
    useHostPrefix: false,

    // * 어떤 페이지들을 캐싱 대상으로 할지를 명시합니다.
    pages: [
      // * 모든페이지를 캐싱하려면: '/'
      // * 정규식을 쓰려면: /^\/page3\/\d+$/
      // * 최상위 경로만 캐싱하려면: /^\/$/
      // * /page1 을 캐싱하려면: '/page1'

      '/'
    ],

    // * 캐시 저장 정책을 명시합니다.
    store: {
      type: 'memory',

      // * 최대로 캐싱할 페이지 수를 기억합니다.
      // * 최대에 도달하면 마지막에 사용된 페이지
      // * 정보가 캐싱 해제됩니다. (LRU)
      max: 200,

      // * 몇 초 동안 보관할지를 명시합니다.
      ttl: 2
    }
  },

  // * 엑시오스
  axios: {},

  // * 테일윈드
  tailwindcss: {
    configPath: '~/config/tailwind.config.js',
    cssPath: '~/assets/css/tailwind.css',
    exposeConfig: false
  },

  // * gtm ( = 구글 에널리틱스 )
  // * gtm 공식 문서 : https://github.com/nuxt-community/gtm-module#readme
  gtm: {
    id: process.env.GOOGLE_TAG_MANAGER_ID,
    enbaled: !!isProductionMode
  },

  // * Brotli 압축을 적용합니다.
  // * (Brotli 는 HTTPS 상태에 한해서만 제한 적용됩니다.)
  'nuxt-compress': {
    gzip: {
      cache: true
    },
    brotli: {
      threshold: 10240
    }
  },

  // * 프로그레시브 웹앱용 설정들을 명시합니다.
  pwa: {
    // * Workbox 공식 설명 https://pwa.nuxtjs.org/modules/workbox.html#options
    // * PWA-Module 원본파일 참조 https://github.com/nuxt-community/pwa-module/blob/dev/lib/workbox/defaults.js

    workbox: {
      // * 브라우저 상에서 페이지가 활성화 되있는 중에
      // * 캐싱할 리소스들의 조건들을 여기에서 정의할 수 있습니다.
      runtimeCaching: [
        // * urlPattern 은 아래와 같이 주소 형식 또는 확장자도 가능합니다.
        // * urlPattern: 'https://my-cdn.com/.*', // 반드시 .* 이 뒤에 붙어야 하위 경로를 모두 캐싱합니다.
        // * urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

        // * handler 유형 목록입니다.
        // * Cache First   : 네트워크 요청과 캐싱 중 항상 캐시를 먼저 접근하는 방식
        // * Cache Only    : 캐싱 파일만 확인하고 없으면 에러를 뱉는 방식
        // * Network First : 항상 캐싱보다는 네트워크 요청을 먼저 진행하는 방식 (캐싱도 확인, 늦어지면 캐시표시)
        // * Network Only  : 해당 파일에 대해서는 캐싱 파일의 유무와 관계 없이 항상 네트워크 요청만 하는 방식
        // * StaleWhileRevalite :
        // *    캐싱을 먼저 시도하고 없으면 네트워크 요청을 진행하는 방식.
        // *    프로필 이미지와 같이 자주 업데이트 되면서 최신 데이터가 아니어도 되는 데이터 적용하면 좋음

        // * 글로벌 캐싱 정책
        {
          urlPattern: '.*',
          handler: 'StaleWhileRevalidate',
          strategyOptions: {
            cacheName: `global${cacheVersion}`,
            cacheExpiration: {
              // maxEntries: 500, // * 500 개 까지만 구성합니다.
              maxAgeSeconds: 12 * (60 * 60) // * 12시간 동안 유효합니다.
            }
          }
        }
      ]
    }
  },

  // * Nuxt 의 기본 로딩 컴포넌트의 로딩바 설정이 담깁니다.
  // * https://vue-nuxt.gitbook.io/nuxt/configuration/loading
  loading: {
    color: '#3B8070', // 로딩바 색상
    failedColor: 'red', // 전환 중 오류 발생시 표시되는 로딩바 색상
    height: '2px', // 화면에 표시되는 프로세스 바의 높이
    throttle: 200, // 설정된 시간(ms)만큼 대기한 후, 프로세스 바를 화면에 표시합니다.
    duration: 5000, // 프로세스 바의 최대 지속 시간(ms)
    rtl: false // 프로세스 바의 진행 방향
  },

  // * global component를 등록합니다.
  // * 경로는 기본적으로 ~/components를 바라봅니다.
  components: true
}

// * 런타임 캐싱을 개발 모드에선 사용하지 않습니다.
// * HMR 사용 시 캐싱을 막기위한 조치입니다.
if (!isProductionMode) {
  const config = nuxtConfig as NuxtConfig
  if (config && config.pwa && config.pwa.runtimeCaching) delete config.pwa.runtimeCaching
}

// * ExperimentalWarning 오류를 숨깁니다.
process.removeAllListeners('warning')

// * Nuxt Config 의 타입을 선언합니다.
type Config =
  | NuxtConfig
  | {
    build: {
      postcss: any
    }
  }

// * 빌드 결과물을 분석하기 위해 빌드 결과를 브라우저로 출력합니다.
if (process.argv.length > 5 && process.argv[4] == '--analyze') (nuxtConfig as NuxtConfig).build.analyze = true

// * 빌드 결과물을 minify 하지 않고 그대로 내보냅니다.
if (process.argv.length > 5 && process.argv[4] == '--plain') (nuxtConfig as NuxtConfig).build.terser = false



// * 사용하지 않는 Vuex 를 제거한 후 DI용으로 남은 의존성 만을 남깁니다.
if (isProductionMode) {
  nuxtConfig.head.script.push({
    innerHTML: 'window.vuex={Store:function(){return{replaceState:function(){}}}}',
    type: 'text/javascript',
    charset: 'utf-8'
  })
}

// * vue-devtools 에서 vue-state-store 를 사용하기 위한 코드 인젝션입니다.
if (!isProductionMode) nuxtConfig.head.script.push({ src: 'https://unpkg.com/vue-state-store-devtools@1.0.2/export/devtools.js' })


export default nuxtConfig
