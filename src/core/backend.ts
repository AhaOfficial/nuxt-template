import * as Lifecycle from 'nuxt-lifecycle'
import { RestAPI } from './rest-api'
import { setupProgress } from './rest-api-plugin'

/**
 * * 백엔드에 요청을 바로 보낼 수 있는 래핑 함수 입니다.
 * * (preprocess -> process -> postprocess 순으로 실행됩니다.)
 */
export const BackEnd = new RestAPI({
  address: process.env.API_URL,

  // * 요청이 발생하기 전에 작동합니다.
  preprocess: params => {
    // * 브라우저에서 개발 중에 어떠한 요청이 송신되고 있는지를 알려줍니다.
    if (Lifecycle.isClient() && process.env.NODE_ENV === 'development') {
      window.console.log(
        `%c📦 API 요청 송신  주소:${params.link} 유형:${params.processInfo}`,
        'color: #E19A56;',
        params
      )
    }
    return true
  },

  // * 요청이 발생한 후에 작동합니다.
  postprocess: (params, response) => {
    // * 브라우저에서 개발 중에 어떠한 응답이 수신되고 있는지를 알려줍니다.
    if (Lifecycle.isClient() && process.env.NODE_ENV === 'development') {
      window.console.log(
        `%c📫 API 응답 수신  주소:${params.link} 유형:${params.processInfo}`,
        'color: #31B4D9;',
        response
      )
    }
    return true
  },

  // * 오류가 발생하였을 때 작동합니다.
  faultTolerance: error => {
    // * 브라우저에서 개발 중에 어떠한 오류가 수신되고 있는지를 알려줍니다.
    if (Lifecycle.isClient() && process.env.NODE_ENV === 'development') {
      let link = ''
      if (error.config && error.config.url) link = error.config.url
      window.console.error(
        `🔥 API 응답 오류 수신  주소:${link}\n\n` + `메시지:${error.message}\n`,
        {
          request: error.request,
          response: error.response,
          stack: error.stack,
          isAxiosError: error.isAxiosError,
          config: error.config
        }
      )
    }
  },

  // * 모든 요청에서 사용될 axiosOption 입니다.
  axiosOption: {
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache'
    },
    withCredentials: true
  }
})

// * 프로그래스 바를 연동시킵니다.
setupProgress(BackEnd)
