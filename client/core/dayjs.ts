import _dayjs from 'dayjs'

// * 날짜 표현 시 사용할
// * 기본언어를 한국어로 설정합니다.
import 'dayjs/locale/ko'
_dayjs().locale('ko')

/**
 * * 날짜와 관련된 계산을 할 수 있는 모듈입니다.
 * @see https://day.js.org/docs/en/get-set/get-set
 * @see https://john015.netlify.app/moment-js%EB%A5%BC-day-js%EB%A1%9C-%EB%8C%80%EC%B2%B4%ED%95%98%EA%B8%B0
 */
export const dayjs = _dayjs
