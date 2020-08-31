import * as Post from './post'

/**
 * 네트워크 API 요청을 타입스크립트 함수로 래핑해놓은 것으로,
 * useService 를 통한 예외처리 디자인 패턴을
 * 권장하기 위해서 바깥으로 노출하지 않습니다.
 */
const service = {
  Post
}

/**
 * 서비스를 실제로 사용하려 할 때 호출가능한 함수 입니다.
 * Promise 를 반환하므로 useService 자체에 await 처리가 가능합니다.
 * @param context
 */
export const useService = async (context: IUserServiceContext) => {
  const isClient = !!process.browser

  try {
    await context.action({ service, isClient })
  } catch (error) {
    try {
      if (context.exception)
        await context.exception({
          error,
          service,
          isClient
        })
    } catch (error) {}
  }
}

/**
 * 서비스 사용함수 컨텍스트의 규격입니다.
 */
export interface IUserServiceContext {
  /**
   * API 를 사용하는 공간입니다.
   */
  action: UseServiceActionType
  /**
   * API 사용 중 발생한 예외사항을 처리하는 공간입니다.
   */
  exception?: UseServiceExceptionType
}

/**
 * 액션 함수의 규격입니다.
 */
export type UseServiceActionType = (
  context: IUseServiceActionContext
) => Promise<unknown>

/**
 * 서비스 타입입니다.
 */
export type ServiceType = typeof service

/**
 * 액션 함수 내에 주어질 컨텍스트 규격입니다.
 */
export interface IUseServiceActionContext {
  service: ServiceType
  isClient: boolean
}

/**
 * 예외처리 함수의 규격입니다.
 */
export type UseServiceExceptionType = (
  context: IUseServiceExceptionContext
) => Promise<unknown>

/**
 * 예외처리 함수 내에 주어질 컨텍스트 규격입니다.
 */
export interface IUseServiceExceptionContext {
  error: Error
  service: ServiceType
  isClient: boolean
}
