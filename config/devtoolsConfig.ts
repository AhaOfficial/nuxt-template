import * as Config from '.'

/**
 * 데브툴을 활성화하는 옵션들이 여기 담깁니다.
 */
export const DevtoolsConfig = {
  // * 개발자 툴을 활성화할지 여부가 담깁니다.
  vue: {
    config: {
      // * 프로덕션 모드를 활성화해달라는 주의 메시지를 끕니다.
      productionTip: false,
      // * 프로덕션 모드가 아닐 때에만 데브툴을 활성화 합니다.
      devtools: !Config.Interface.isProductionMode
    }
  }
} as Config.Interface.IConfig
