import * as Config from './'

/**
 * HTML 헤더에 들어갈 내용들이 여기에 담깁니다.
 */
export const HeadConfig = {
  // * 헤더 정보들이 담깁니다.
  head: {
    htmlAttrs: {
      // * 언어셋을 한국어로 설정합니다.
      lang: 'ko'
    },

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
        content: [
          'width=device-width',
          'initial-scale=1',
          'maximum-scale=1.0',
          'user-scalable=0',
          'viewport-fit=cover'
        ].join(', ')
      },
      {
        hid: 'description',
        name: 'description',
        content: 'nuxt-template'
      }
    ],

    script: [],

    // * 파비콘 주소를 명시합니다.
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'https://d1uevki2ixpef8.cloudfront.net/favicon.ico'
      }
    ]
  }
} as Config.Interface.IConfig
