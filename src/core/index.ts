// * 컴포지션 API 를 core 모듈로 선언합니다.
export { VueAPI } from './vue-api'

// * vue-state-store 를 core 모듈로 선언합니다.
export { Store, store } from './vue-state-store'

// * axios 의 래핑 클래스를 core 모듈로 선언합니다.
export { RestAPI } from './rest-api'

// * axios 로 백엔드와 직접 통신 가능하게
// * 래핑 해놓은 함수를 core 모듈로 선언합니다.
export { BackEnd } from './backend'

// * dayjs 의 래핑 함수를 core 모듈로 선언합니다.
export { dayjs } from './dayjs'

// * bignumber.js의 래핑 함수를 core 모듈로 선언합니다.
export { bigNumber } from './bignumber'

// * vue composition-api의 helper 함수를 core 모듈로 선언합니다.
export { injectVueInstance } from './composition-helper'

export { useService } from '../services'