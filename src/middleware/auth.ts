import type { Middleware } from '@nuxt/types'

/**
 * 이용자 권한 인증 미들웨어
 */
const middleware: Middleware = ({ app }) => {
  // * 여기에서 인증(JWT, 토큰 등)과 관련된 미들웨어를 작성하실 수 있습니다.
  // * 로컬 스토리지  입력 및 저장 예시는 아래와 같습니다.
  // app.$storage.setUniversal('key', value)
  // const storage = app.$storage.getUniversal('key')
}

export default middleware
