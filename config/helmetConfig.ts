import * as Config from './'

/**
 * nuxt-helment 설정들이 여기에 담깁니다.
 */
export const HelmetConfig = {
  /**
   * @see https://helmetjs.github.io/
   */
  helmet: {
    /**
     * Referrer-Policy
     * 이용자가 다른페이지로 넘어갈 때
     * 현재 페이지에 대한 정보를 얼마나 포함할지를 명시합니다.
     *
     * 기본 설명
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy#Browser_compatibility
     * 
     * GA가 referrer 를 확보하지 못하는 경우
     * @see https://www.artience.com/archives/4777
     *
     * no-referrer - 어떤 정보도 포함하지 않습니다.
     * origin - 현재 도메인에서 넘어왔다는 것만을 알려줍니다.
     * same-origin - 같은 도메인으로만 넘어갈 때 어느주소에서 넘어왔는지를 알려줍니다.
     * strict-origin - 프로토콜 보안 수준이 동일하게 유지되는 경우에만 도메인 주소가 담깁니다.
     * unsafe-url - 어느 페이지로 이동하던 모든 주소를 알려줍니다.
     */
    referrerPolicy: {
      policy: 'strict-origin' // * 기본 no-referrer
    },
    /**
     * X-DNS-Prefetch-Control
     * 도메인을 통해 접근할 IP를 페이지에서 미리 불러올 수 있게 합니다.
     *
     * @example
     * <link rel="dns-prefetch" href="주소">
     */
    dnsPrefetchControl: {
      allow: false // 기본 값: false
    },

    /**
     * CT(Certificate Transparency)는 인증서 투명성의 약자로,
     * 인증 기관에서 발급한 인증서를 거의 실시간으로 모니터링하고
     * 감사하기 위해 Google이 만든 개방형 프레임워크입니다.
     *
     * Expect CT 헤더를 이용하면 모든 인증서가
     * 올바르게 사용되고 있는지 확인할 수 있습니다
     *
     * maxAge
     * 브라우저가 캐시 하여 수신된 정책을 적용할
     * 시간(초)을 지정합니다(강제 적용 또는 보고서 전용).
     *
     * enforce
     * 선택 사항인 enforce 는 브라우저가 정책에 따라
     * 잘못된 인증서의 경우 연결을 거부하게할지
     * 아니면 보고 전용 모드로 처리할지를 제어합니다.
     *
     * reportUri
     * 올바른 CT정보를 수신하지 못할 경우
     * 브라우저가 보고서를 보내야 하는 URL 값 입니다.
     */
    expectCt: {
      maxAge: 0, // 기본 값: 0
      enforce: false // 기본 값: false
    },

    /**
     * X-Frame-Options 헤더 설정하여
     * clickjacking에 대한 보호를 제공합니다.
     *
     * deny
     * 페이지는 시도하는 사이트에 관계없이 프레임으로 표시할 수 없습니다.
     *
     * sameorigin
     * 페이지는 페이지 자체와 동일한 오리진의 프레임으로만 표시할 수 있습니다.
     */
    frameguard: {
      action: 'sameorigin' // 기본 값: sameorigin
    },

    /**
     * SSL/TLS를 통한 HTTP 연결을 적용하는
     * Strict-Transport-Security 헤더를 설정합니다.
     */
    hsts: {
      maxAge: 15552000, // 기본 값: 15552000 (180일)
      includeSubDomains: true, // 기본 값: true
      preload: false // 기본 값: false
    },

    /**
     * X-Permitted-Cross-Domain-Policies
     *
     * 교차 도메인 정책 파일은 웹 클라이언트
     * (예: Adobe Flash Player 또는 Adobe Acrobat)에
     * 도메인 간에 데이터를 처리할 수 있는 권한을 부여하는 XML 문서입니다.
     *
     * 클라이언트가 특정 소스 도메인에 호스트된 콘텐츠를 요청하고
     * 해당 콘텐츠가 자신의 도메인이 아닌 다른 도메인으로 향하는 요청을 하는 경우
     * 원격 도메인은 원본 도메인에 대한 액세스 권한을 부여하는
     * 교차 도메인 정책 파일을 호스팅하여 클라이언트가 트랜잭션을 계속할 수 있도록 합니다.
     *
     * 일반적으로 메타데이터 정책은 마스터 정책 파일에 선언되지만 루트 디렉터리에 쓸 수 없는
     * 사용자는 X-Permited-Cross-Domain-Policies HTTP 응답 헤더를
     * 사용하여 메타데이터 정책을 선언할 수도 있습니다.
     *
     * none
     * 이 마스터 정책 파일을 포함하여 대상 서버의 어느 곳에서도 정책 파일을 사용할 수 없습니다.
     *
     * master-only
     * 이 마스터 정책 파일만 허용됩니다.
     *
     * by-content-type
     * [HTTP/HTTPS만 해당] 내용 유형과 함께 제공되는 정책 파일
     * text/x-cross-domain-policy 만 허용됩니다.
     *
     * by-ftp-filename
     * [FTP만 해당] 파일 이름이 crossdomain.xml인 정책 파일
     * (예: /crossdomain.xml로 끝나는 URL)만 허용됩니다.
     *
     * all
     * 이 대상 도메인의 모든 정책 파일이 허용됩니다.
     */
    permittedCrossDomainPolicies: {
      permittedPolicies: 'none' // * 기본 none
    }
  }
} as Config.Interface.IConfig
