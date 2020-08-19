// * vue-state-store 를 core 모듈로 선언합니다.
import { store as _store, Store as _Store } from 'vue-state-store'

/**
 * * 뷰 상태 저장소를 함수형으로 사용합니다.
 * @example
 * const version = store(0)
 * @see https://github.com/AhaOfficial/vue-state-store/blob/master/docs/README.KR.md#-%EA%B8%B0%EB%B3%B8-%ED%83%80%EC%9E%85-%EB%B0%9C%ED%96%89--%EA%B5%AC%EB%8F%85
 */
const store = _store

/**
 * * 뷰 상태 저장소를 클래스로 사용합니다.
 * @see https://github.com/AhaOfficial/vue-state-store/blob/master/docs/README.KR.md#-%EC%83%81%ED%83%9C-%EB%B0%8F-%EB%82%B4%EC%9E%A5%EB%90%9C-%EC%95%A1%EC%85%98-%EC%83%9D%EC%84%B1
 */
const Store = _Store

export { store, Store }
