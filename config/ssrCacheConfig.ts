import * as Config from './'

/**
 * Nuxt-SSR-Cache 용 설정이 여기 담깁니다.
 */
export const SSRCacheConfig = {
  // * Nuxt-SSR-Cache 용 버전을 제공합니다.
  version: Config.Interface.buildVersion,

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
      ttl: 60
    }
  }
} as Config.Interface.IConfig
