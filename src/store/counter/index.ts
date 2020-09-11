import { Store } from 'vue-state-store'
import * as Core from '~/core'

/**
 * 카운터 상태 선언
 */
export interface ICounter {
  /**
   * 1씩 카운팅 되는 숫자입니다.
   */
  count: number
}

/**
 * 카운터 상태 저장소 규격 정의
 */
export class Counter extends Store<ICounter> {}

/**
 * 카운터 상태 저장소 정의
 */
export const counter = new Counter({
  count: 0
})

/**
 * 카운터 상태 사용 주입 클래스
 */
export class UseCount {
  /**
   * 카운터 상태 저장소입니다.
   */
  counter = counter
  /**
   * 바인딩 된 카운터 상태 저장소입니다.
   */
  $counter = counter.bind()
  /**
   * 카운터를 1 상승시키는 액션입니다.
   */
  up = () => this.$counter.count++
  /**
   * 카운터를 1 하락시키는 액션입니다.
   */
  down = () => this.$counter.count--
}

/**
 * 카운터 상태 사용 함수
 */
export const useCount = () => {
  const countInstance = new UseCount()
  return countInstance
}
