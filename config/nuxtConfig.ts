import { dev, prod } from '../src/env'
import * as Config from '.'

/**
 * * 모든 Nuxt 설정이 여기에 담깁니다.
 */
export const NuxtConfig = {
  // * 구형 브라우저 지원 빌드를 작동시킵니다.
  modern: 'server',

  // * 배포할 경로를 지정합니다.
  srcDir: './src',

  // * Global component를 등록합니다.
  // * 경로는 기본적으로 ~/components를 바라봅니다.
  components: true,

  // * 라우터 설정을 지정합니다.
  router: {
    middleware: ['auth']
  },

  // * Nuxt 의 기능을 확장할 플러그인들을 지정합니다.
  plugins: [
    '~/plugins/composition-api',
    '~/plugins/nuxt'
  ],

  // * Nuxt 의 빌드 시 빌드본에 포함될 모듈들을 지정합니다.
  modules: [
    '@nuxtjs/axios',
    'nuxt-lifecycle',
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
    '@nuxtjs/stylelint-module',
    '@nuxtjs/eslint-module'
  ],
  // * Nuxt 의 환경 설정을 여기에 지정합니다.
  env: {
    ...(Config.Interface.isProductionMode ? prod : dev)
  }
} as Config.Interface.IConfig
