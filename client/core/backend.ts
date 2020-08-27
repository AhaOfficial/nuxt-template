import { RestAPI } from './rest-api'

/**
 * * 백엔드에 요청을 바로 보낼 수 있는 래핑 함수 입니다.
 * * (preprocess -> process -> postprocess 순으로 실행됩니다.)
 */
export const BackEnd = new RestAPI({
  // * 여기에 백엔드 서버 주소가 담겨야합니다.
  // ? 테스트용 주소입니다.
  address: 'https://jsonplaceholder.typicode.com',

  preprocess: params => {
    // * 브라우저에서 개발 중에 어떠한 요청이 송신되고 있는지를 알려줍니다.
    if (window && process.env.NODE_ENV === 'development') {
      window.console.log(`%c📦 API 요청 송신  주소:${params.link} 유형:${params.processInfo}`, 'color: #E19A56;', params)
    }
    return true
  },

  postprocess: (params, response) => {
    // * 브라우저에서 개발 중에 어떠한 응답이 수신되고 있는지를 알려줍니다.
    if (window && process.env.NODE_ENV === 'development') {
      window.console.log(`%c📫 API 응답 수신  주소:${params.link} 유형:${params.processInfo}`, 'color: #31B4D9;', response)
    }
    return true
  }
})
