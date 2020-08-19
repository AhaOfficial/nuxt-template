import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'

/**
 * * Axios 를 타입스크립트 클래스로 래핑한 클래스 입니다.
 * @example
 * const BackEnd = new RestAPI({ address: 'http://localhost' })
 *
 * // 서버로부터 받을 데이터 규격을 미리 정의합니다.
 * interface IData { message: 'hello' }
 *
 * // 서버로 GET 요청을 보냅니다.
 * const { data } = await <IData>BackEnd.get('/info')
 */
export class RestAPI {
  protected address: string = 'http://localhost'
  protected preprocess?: PreprocessType
  protected globalProcess: IGlobalProcess
  protected postprocess?: PostprocessType
  protected isUseSelfManagementToken?: boolean = false
  protected getToken?: () => string | null
  protected faultTolerance?: (error: Error) => void

  /**
   * * Axios 를 타입스크립트 클래스로 래핑한 클래스 입니다.
   */
  constructor(params: {
    /**
     * * 여기에 백엔드의 주소가 지정되어야합니다.
     */
    address: string

    /**
     * * 서버에서 Httponly 쿠키로 토큰을 관리하지 않고
     * * 자바스크립트가 직접 토큰을 관리하는지 여부가 명시되어야 합니다.
     * * (기본 값은 항상 false 로 httponly 토큰에 의존합니다.)
     */
    isUseSelfManagementToken?: boolean

    /**
     * * isUseSelfManagementToken 가 참인 경우
     * * 토큰을 얻어올 수 있는 함수를 명시해야합니다.
     */
    getToken?: () => string | null

    /**
     * * 요청 중 오류가 발생했을때 이 오류를 받아서
     * * 핸들링하는 중앙 함수를 선택적으로 명시할 수 있습니다.
     */
    faultTolerance?: (error: Error) => void

    /**
     * * 클래스 내부 함수를 호출해서 서버로 보낼 요청을
     * * 실제 서버로 전달해주는 역할의 콜백입니다.
     */
    globalProcess?: IGlobalProcess

    /**
     * * 서버로 요청이 전달되기 전 먼저 요청을 받아서
     * * 요청을 변조할 수 있는 콜백입니다.
     */
    preprocess?: PreprocessType

    /**
     * * 서버로 요청이 전달 된 후 요청 값을
     * * 확인할 수 있는 콜백입니다.
     */
    postprocess?: PostprocessType
  }) {
    const { address, isUseSelfManagementToken, getToken, faultTolerance, globalProcess, preprocess, postprocess } = params

    this.address = address
    this.getToken = getToken
    this.faultTolerance = faultTolerance
    this.preprocess = preprocess
    this.postprocess = postprocess
    this.address = address

    if (globalProcess) this.globalProcess = globalProcess
    if (isUseSelfManagementToken !== undefined) this.isUseSelfManagementToken = isUseSelfManagementToken

    if (!this.postprocess) this.postprocess = this.defaultPostProcess
    if (!this.globalProcess) this.globalProcess = this.defaultGlobalProcess
  }

  /**
   * * 클래스 내부함수로 생명주기에 따라 요청을 발생시킵니다.
   * * (preprocess -> globalProcess -> postprocess 순)
   */
  protected async request<T>(params: IRequestParam) {
    const {
      link,
      process,
      option = {
        noPreprocess: false,
        noAuthorization: false
      },
      processInfo = '',
      header,
      axiosOption
    } = params

    try {
      if (!option.noPreprocess) {
        if (typeof this.preprocess === 'function' && !this.preprocess(params)) return undefined
      }

      const response = await this.globalProcess<T>(params)

      if (typeof this.postprocess === 'function' && !this.postprocess(params, response)) return undefined

      return response
    } catch (e) {
      if (typeof this.faultTolerance === 'function') this.faultTolerance(e)
      return undefined
    }
  }

  /**
   * * 요청을 발생시키고 그 결과 값을 받았을 때
   * * data 의 존재에 따라 함수를 다르게 호출합니다.
   */
  protected async saftyRequest<T>({
    link,
    process,
    option,
    data,
    processInfo,
    header,
    axiosOption
  }: {
    link: string
    process: ((link, header) => Promise<AxiosResponse<any>>) & ((link, data, header) => Promise<AxiosResponse<any>>)
    option?: IRequestOption
    data?: any
    processInfo: string
    header?: any
    axiosOption?: AxiosRequestConfig
  }) {
    return await this.request<T>({
      link,
      process: async (link, header) => {
        let response: AxiosResponse<any>
        if (data) {
          response = await process(link, data, header)
        } else {
          response = await process(link, header)
        }

        return response
      },
      option,
      processInfo,
      header,
      axiosOption
    })
  }

  /**
   * * 백엔드 서버로 GET 요청을 전송한 후 결과 값을 얻어옵니다.
   */
  async get<T>({ link, option, header, axiosOption }: { link: string; option?: IRequestOption; header?: any; axiosOption?: AxiosRequestConfig }) {
    return await this.saftyRequest<T>({
      link,
      option,
      process: axios.get,
      processInfo: `GET ${option ? JSON.stringify(option) : ''}`,
      header,
      axiosOption
    })
  }

  /**
   * * 백엔드 서버로 PUT 요청을 전송한 후 결과 값을 얻어옵니다.
   */
  async put<T>({
    link,
    data,
    option,
    header,
    axiosOption
  }: {
    link: string
    data: any
    option?: IRequestOption
    header?: any
    axiosOption?: AxiosRequestConfig
  }) {
    return await this.saftyRequest<T>({
      link,
      option,
      process: axios.put,
      data,
      processInfo: `PUT ${option ? JSON.stringify(option) : ''}`,
      header,
      axiosOption
    })
  }

  /**
   * * 백엔드 서버로 DELETE 요청을 전송한 후 결과 값을 얻어옵니다.
   */
  async delete<T>({ link, option, header, axiosOption }: { link: string; option?: IRequestOption; header?: any; axiosOption?: AxiosRequestConfig }) {
    return await this.saftyRequest<T>({
      link,
      option,
      process: axios.delete,
      processInfo: `DELETE ${option ? JSON.stringify(option) : ''}`,
      header,
      axiosOption
    })
  }

  /**
   * * 백엔드 서버로 POST 요청을 전송한 후 결과 값을 얻어옵니다.
   */
  async post<T>({
    link,
    data,
    option,
    header,
    axiosOption
  }: {
    link: string
    data: any
    option?: IRequestOption
    header?: any
    axiosOption?: AxiosRequestConfig
  }) {
    return await this.saftyRequest<T>({
      link,
      option,
      process: axios.post,
      data,
      processInfo: `POST ${option ? JSON.stringify(option) : ''}`,
      header
    })
  }

  protected defaultGlobalProcess: IGlobalProcess = async <T>(params: IRequestParam) => {
    const {
      link,
      process,
      option = {
        noPreprocess: false,
        noAuthorization: false
      },
      processInfo = '',
      header,
      axiosOption
    } = params

    let token: any
    try {
      token = this.getToken()
    } catch (e) {}
    const processLink = `${this.address}${link}`

    let processHeader = {
      headers: {}
    }
    if (typeof token === 'string' && token.length > 0) {
      processHeader = {
        ...processHeader,

        ...(this.isUseSelfManagementToken && !option.noAuthorization ? { headers: { Authorization: `Bearer ${token}` } } : {}),

        ...(axiosOption || {})
      }
    }
    if (processHeader && header) {
      if (processHeader.headers) {
        processHeader.headers = {
          ...processHeader.headers,
          ...header
        }
      }
    }

    const response = await params.process<T>(processLink, processHeader)
    return response
  }

  protected defaultPostProcess: PostprocessType = (params, response) => {
    console.log(`%c🚧  ${params.link} ${params.processInfo}`, 'color: #908CFF;', response)
    return true
  }

  protected defaultPreProcess: PreprocessType = params => {
    if (params.option && this.isUseSelfManagementToken && !params.option.noAuthorization && typeof this.getToken === 'function') {
      const token = this.getToken()
      const tokenIsValid = typeof token === 'string' && token.length > 0
      if (!tokenIsValid) return false
    }

    return true
  }
}

/**
 * * 서버에 실제 요청을 보내게 되는 함수의 규격입니다.
 */
export type ProcessType = <T>(link: string, header) => Promise<AxiosResponse<T>>

/**
 * * 서버에 요청이 전송되기 전 미리 요청을 변조할 수 있는 함수의 규격입니다.
 */
export type PreprocessType = (params: IRequestParam) => boolean

/**
 * * 서버에 요청이 전송된 이후 요청 정보를 확인할 수 있는 함수의 규격입니다.
 */
export type PostprocessType = <T>(params: IRequestParam, response: AxiosResponse<T>) => boolean

/**
 * * 요청을 가장 먼저 받아서 내부 함수를 실행시킬 함수의 규격입니다.
 */
export type IGlobalProcess = <T>(params: IRequestParam) => Promise<AxiosResponse<T>>

/**
 * * 서버로 요청을 발생시킬때 내부적으로 사용되는 파라메터들입니다.
 */
export interface IRequestParam {
  /**
   * * API 요청 주소를 적습니다. (백엔드 주소를 제외한 주소를 적어야합니다.)
   */
  link: string
  /**
   * * 실제 서버로 요청을 전송할 함수가 담깁니다.
   */
  process: ProcessType
  /**
   * * 네트워크 요청 시 선택적으로 사용할 수 있는 옵션들입니다.
   */
  option?: IRequestOption
  /**
   * * 어떠한 작업이 어느 주소로 전송되고 있는지를 표현합니다.
   */
  processInfo: string
  /**
   * * 헤더 정보를 여기에 담습니다.
   */
  header?: any
  /**
   * * 엑시오스 옵션을 여기에 담습니다.
   */
  axiosOption?: AxiosRequestConfig
}

/**
 * @description
 * * 네트워크 요청 시 선택적으로 사용할 수 있는 옵션들입니다.
 */
export interface IRequestOption {
  /**
   * @description
   * * 이 옵션이 활성화 되면 preprocessor 를 사용하지 않습니다.
   */
  noPreprocess: boolean

  /**
   * @description
   * * 이 옵션이 활성화 되면 isUseSelfManagementToken 가 참이여도
   * * 해당 요청에서는 인증 필요 여부를 검증하지 않습니다.
   */
  noAuthorization: boolean
}
