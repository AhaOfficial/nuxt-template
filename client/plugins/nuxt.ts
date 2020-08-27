// * 이 파일엔 Nuxt 가 불려와진 후 작동할 코드들이 담깁니다.
import * as Lifecycle from 'nuxt-lifecycle'
declare let window: any

// * 아래에 nuxt 가 로딩되기 전에 실행하려는 로직들을 작성할 수 있습니다.

// * 아래에 nuxt 가 로딩된 이후에 실행하려는 로직들을 작성할 수 있습니다.
if (Lifecycle.isClient()) {
  window.onNuxtReady(() => {
    // * Vuex 가 제거되었을때만 작동합니다.
    if (!window.vuex.version) {
      // * Vuex 가 제거되었을 때 이 코드가 있어야지만 HMR 시 에러가 발생하지 않습니다.
      window.$nuxt.$store = {
        hotUpdate: () => {
          // * HMR 에 의해 페이지가 다시 렌더링 될 때
          // * 실행될 로직들을 아래 작성합니다.
        }
      }
    }
  })
}
