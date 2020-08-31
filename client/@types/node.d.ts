declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * API 를 전송할 기본 백엔드 서버 주소입니다.
     */
    API_URL: string
    /**
     * 기본적으로 표시할 웹앱 접속 주소입니다.
     */
    WEB_URL: string
    /**
     * 정적 파일들을 받을 수 있는 별도의 정적 파일 서버 주소입니다.
     */
    STATIC_URL: string
    /**
     * 노드 환경이 개발용인지 출시용인지가 문자열로 담깁니다.
     */
    NODE_ENV: 'development' | 'production'
  }
}
