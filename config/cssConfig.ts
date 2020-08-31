import * as Config from './'

/**
 * 스타일 관련 설정들이 여기에 담깁니다.
 */
export const CssConfig = {
  // * 페이지 전체에 이동시 효과를 입힙니다.
  // * https://nuxtjs.org/api/configuration-transition
  pageTransition: 'fade',
  layoutTransition: 'fade',

  // * Nuxt 의 기본 로딩 컴포넌트의 로딩바 설정이 담깁니다.
  // * https://vue-nuxt.gitbook.io/nuxt/configuration/loading
  loading: {
    color: '#3B8070', // 로딩바 색상
    failedColor: 'red', // 전환 중 오류 발생시 표시되는 로딩바 색상
    height: '2px', // 화면에 표시되는 프로세스 바의 높이
    throttle: 200, // 설정된 시간(ms)만큼 대기한 후, 프로세스 바를 화면에 표시합니다.
    duration: 5000, // 프로세스 바의 최대 지속 시간(ms)
    rtl: false // 프로세스 바의 진행 방향
  },

  // * 전역으로 사용될 CSS 파일들을 여기 지정할 수 있습니다.
  css: []
} as Config.Interface.IConfig
