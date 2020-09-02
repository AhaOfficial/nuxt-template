import * as Config from './'

/**
 * 프로젝트에서 사용하는 기타 모듈들에 대한
 * 옵션 설정들이 여기에 담깁니다.
 */
export const ExternalModuleConfig = {
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
    enbaled: !!Config.Interface.isProductionMode
  },

  // * svgSprite 라이브러리 옵션을 설정합니다.
  svgSprite: {
    // * default url 입니다.
    input: '~/assets/images/icons'
  },

  // * universal-storage 옵션을 설정합니다.
  // * ssr 모드 시 window 접근 불가 케이스가 있어서 사용했습니다.
  storage: {
    vuex: false, // boolean or {namespace}
    localStorage: true, // boolean or {prefix }
    cookie: false, // boolean or {prefix, options }
    initialState: {},  // Object {}
    ignoreExceptions: false //
  }
} as Config.Interface.IConfig
