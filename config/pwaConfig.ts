import * as Config from './'

/**
 * 프로그레시브 웹앱용 설정들이 여기 담깁니다.
 */
export const PWAConfig = {
  pwa: {
    // * PWA 아이콘 공식 설명 https://pwa.nuxtjs.org/icon/
    icon: {
      fileName: 'favicon.png'
    },
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
            cacheName: `global${Config.Interface.buildVersion}`,
            cacheExpiration: {
              // maxEntries: 500, // * 500 개 까지만 구성합니다.
              maxAgeSeconds: 12 * (60 * 60) // * 12시간 동안 유효합니다.
            }
          }
        }
      ]
    }
  }
} as Config.Interface.IConfig
