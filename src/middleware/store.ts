import type { Middleware } from '@nuxt/types'
import { useSSR } from 'vue-state-store'

/**
 * 상태 저장소의 값을 SSR 된 HTML 상에 포함시킵니다.
 * 이를 통해서 서버 상의 스토어 값이 클라이언트로 전달됩니다.
 */
const middleware: Middleware = ({ beforeNuxtRender }) => {
  if (process.server) {
    // * Nuxt 가 렌더링 되기 전에 해당 로직을 실행합니다.
    beforeNuxtRender(({ nuxtState }) => {
      // * 상태 저장소의 값을 모두 수집합니다.
      const { _vss } = useSSR()

      // * nuxtState 에 값을 추가하면
      // * window.__NUXT__ 에 값이 반영됩니다.
      nuxtState._vss = _vss
    })
  }
}

export default middleware
