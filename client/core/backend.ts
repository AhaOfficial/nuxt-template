import { RestAPI } from './rest-api'

/**
 * * 백엔드에 요청을 바로 보낼 수 있는 래핑 함수 입니다.
 */
export const BackEnd = new RestAPI({
  // * 여기에 백엔드 서버 주소가 담겨야합니다.
  address: ''
})
