import type { NuxtConfig } from '@nuxt/types'
import webpack from 'webpack'
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin'
import postbuild from '../postbuild'
import * as Config from './'

// * Nuxt 의 ExperimentalWarning 오류를 숨깁니다.
process.removeAllListeners('warning')

/**
 * 빌드 설정들이 모두 구성된 이후
 * 유동적으로 빌드 설정들을 수정합니다.
 */
export const PostConfig = (nuxtConfig: Config.Interface.IConfig) => {
  const config = nuxtConfig as NuxtConfig

  // * 런타임 캐싱을 개발 모드에선 사용하지 않습니다.
  // * HMR 사용 시 캐싱을 막기위한 조치입니다.
  if (!Config.Interface.isProductionMode) {
    if (config && config.pwa && config.pwa.runtimeCaching)
      delete config.pwa.runtimeCaching
  }

  // * Vuex 의 의존 정보를 삭제합니다.
  config.build.plugins.push(new webpack.IgnorePlugin(new RegExp('/vuex/')))

  // * Hardsource 에러 메시지가 해결된 버전을 받습니다.
  config.build.plugins.push(
    new HardSourceWebpackPlugin({
      info: {
        mode: 'none',
        level: 'none'
      }
    })
  )

  // * 사용하지 않는 Vuex 를 제거한 후 DI용으로 남은 의존성 만을 남깁니다.
  ;(nuxtConfig as NuxtConfig).head.script.push({
    innerHTML:
      'window.vuex={Store:function(){return{replaceState:function(){}}}}',
    type: 'text/javascript',
    charset: 'utf-8'
  })

  // * vue-devtools 에서 vue-state-store 를 사용하기 위한 코드 인젝션입니다.
  if (!Config.Interface.isProductionMode) {
    ;(nuxtConfig as NuxtConfig).head.script.push({
      src: 'https://unpkg.com/vue-state-store-devtools@1.0.5/export/devtools.js'
    })
  }

  // * 프로젝트에서 사용하는 모듈을 트랜스파일링 합니다.
  ;(nuxtConfig as NuxtConfig).build.transpile = postbuild()
}
