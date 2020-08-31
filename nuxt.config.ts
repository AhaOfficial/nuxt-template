import * as Merge from 'deepmerge'
import * as Config from './config'

/**
 * 모든 Nuxt 설정이 여기에 담깁니다.
 */
const NuxtConfig = Merge.all([
  Config.NuxtConfig, // * Nuxt
  Config.HeadConfig, // * <head>
  Config.CssConfig, // * 스타일
  Config.BuildConfig, // * 빌드
  Config.SSRCacheConfig, // * SSR 캐싱
  Config.DevtoolsConfig, // * vue-devtools
  Config.PWAConfig, // * PWA
  Config.ExternalModuleConfig // * 기타 모듈
])

// * 빌드 설정들이 최종적으로 변경됩니다.
Config.PostConfig(NuxtConfig)

export default NuxtConfig
