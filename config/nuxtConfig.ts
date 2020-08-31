import { dev, prod } from '../client/env'
import * as Config from '.'

/**
 * * 모든 Nuxt 설정이 여기에 담깁니다.
 */
export const NuxtConfig = {
  // * USSR 을 적용합니다.
  mode: 'universal',

  // * 배포할 경로를 지정합니다.
  srcDir: './client',

  // * Global component를 등록합니다.
  // * 경로는 기본적으로 ~/components를 바라봅니다.
  components: true,

  // * 라우터 설정을 지정합니다.
  router: {
    middleware: ['auth']
  },

  // * Nuxt 의 기능을 확장할 플러그인들을 지정합니다.
  plugins: ['~/plugins/composition-api', '~/plugins/nuxt'],

  // * Nuxt 의 빌드 시 빌드본에 포함될 모듈들을 지정합니다.
  modules: [
    '@nuxtjs/axios',
    'nuxt-lifecycle',
    'nuxt-ssr-cache',
    '@nuxtjs/universal-storage',
    '@nuxtjs/gtm',
    '@nuxtjs/svg-sprite',
    'nuxt-helmet'
  ],

  // * Nuxt 의 빌드 시 작동되는 모듈들을 지정합니다.
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/pwa',
    'nuxt-compress',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/eslint-module'
  ],

  // * Nuxt Server 연결 변수를 설정합니다.
  server: {
    // * 개발용 서버포트 정보
    port: '3000',

    // * 서버 호스트 정보
    host: process.env.BASE_URL || 'localhost',
    // * SSR 걸리는 시간을 측정하는 미들웨어를 추가합니다.
    // * Server-Timing이라는 값이 header에 추가됩니다.
    timing: false
  },

  // * Nuxt 의 환경 설정을 여기에 지정합니다.
  env: {
    ...(Config.Interface.isProductionMode ? prod : dev)
  }
} as Config.Interface.IConfig
