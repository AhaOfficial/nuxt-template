import Axios, {
  AxiosResponse,
  AxiosRequestConfig,
  AxiosError,
  AxiosInstance
} from 'axios'

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
  protected axios: AxiosInstance
  protected address: string = 'http://localhost'
  protected isUseSelfManagementToken?: boolean = false
  protected axiosOption: AxiosRequestConfig = {}

  protected preprocess?: (params: IRequestParam) => boolean
  protected globalProcess: IGlobalProcess
  protected postprocess?: PostprocessType
  protected getToken?: () => string | null
  protected faultTolerance?: (error: AxiosError) => void

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
    faultTolerance?: (error: AxiosError) => void

    /**
     * * 클래스 내부 함수를 호출해서 서버로 보낼 요청을
     * * 실제 서버로 전달해주는 역할의 콜백입니다.
     */
    globalProcess?: IGlobalProcess

    /**
     * * 서버로 요청이 전달되기 전 먼저 요청을 받아서
     * * 요청을 변조할 수 있는 콜백입니다.
     */
    preprocess?: (params: IRequestParam) => boolean

    /**
     * * 서버로 요청이 전달 된 후 요청 값을
     * * 확인할 수 있는 콜백입니다.
     */
    postprocess?: PostprocessType

    /**
     * * 매 요청마다 기본적으로 설정될
     * * Axios 옵션들을 명시할 수 있습니다.
     */
    axiosOption?: AxiosRequestConfig
  }) {
    const {
      address,
      axiosOption,
      isUseSelfManagementToken,
      getToken,
      faultTolerance,
      globalProcess,
      preprocess,
      postprocess
    } = params

    this.address = address
    if (axiosOption) this.axiosOption = axiosOption

    this.axios = Axios.create(axiosOption)
    // @ts-ignore
    this.axios.CancelToken = Axios.CancelToken
    // @ts-ignore
    this.axios.isCancel = Axios.isCancel

    this.getToken = getToken
    this.faultTolerance = faultTolerance
    this.preprocess = preprocess
    this.postprocess = postprocess

    // * 서버 주소 뒤에 / 가 붙는 경우 / 를 제거합니다.
    if (
      this.address &&
      this.address.length > 0 &&
      this.address[this.address.length - 1] === '/'
    ) {
      const _address = this.address.split('')
      _address.pop()
      this.address = _address.join('')
    }
    if (globalProcess) this.globalProcess = globalProcess
    if (isUseSelfManagementToken !== undefined)
      this.isUseSelfManagementToken = isUseSelfManagementToken
    if (!this.globalProcess) this.globalProcess = this.defaultGlobalProcess
  }

  /**
   * * 클래스 내부함수로 생명주기에 따라 요청을 발생시킵니다.
   * * (preprocess -> globalProcess -> postprocess 순)
   */
  protected async request<T>(params: IRequestParam): Promise<AxiosResponse<T>> {
    const {
      option = {
        noPreprocess: false,
        noAuthorization: false
      },
    } = params

    try {
      if (!option.noPreprocess) {
        if (typeof this.preprocess === 'function' && !this.preprocess(params))
          return undefined
      }

      const response = await this.globalProcess<T>(params)

      if (
        typeof this.postprocess === 'function' &&
        !this.postprocess(params, response)
      )
        return undefined

      return response
    } catch (error) {
      if (typeof this.faultTolerance === 'function') this.faultTolerance(error)
      throw error
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
    process: ((link, header) => Promise<AxiosResponse<any>>) &
      ((link, data, header) => Promise<AxiosResponse<any>>)
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
  async get<T>({
    link,
    option,
    header,
    axiosOption
  }: {
    /**
     * 요청이 전송될 API 주소가 담깁니다.
     */
    link: string
    option?: IRequestOption
    header?: any
    axiosOption?: AxiosRequestConfig
  }) {
    return await this.saftyRequest<T>({
      link,
      option,
      process: this.axios.get,
      processInfo: `GET ${option ? JSON.stringify(option) : ''}`,
      header,
      axiosOption
    })
  }

  /**
   * * 백엔드 서버로 DELETE 요청을 전송한 후 결과 값을 얻어옵니다.
   */
  async delete<T>({
    link,
    option,
    header,
    axiosOption
  }: {
    link: string
    option?: IRequestOption
    header?: any
    axiosOption?: AxiosRequestConfig
  }) {
    return await this.saftyRequest<T>({
      link,
      option,
      process: this.axios.delete,
      processInfo: `DELETE ${option ? JSON.stringify(option) : ''}`,
      header,
      axiosOption
    })
  }

  /**
   * * 백엔드 서버로 HEAD 요청을 전송한 후 결과 값을 얻어옵니다.
   */
  async head<T>({
    link,
    option,
    header,
    axiosOption
  }: {
    /**
     * 요청이 전송될 API 주소가 담깁니다.
     */
    link: string
    option?: IRequestOption
    header?: any
    axiosOption?: AxiosRequestConfig
  }) {
    return await this.saftyRequest<T>({
      link,
      option,
      process: this.axios.head,
      processInfo: `HEAD ${option ? JSON.stringify(option) : ''}`,
      header,
      axiosOption
    })
  }

  /**
   * * 백엔드 서버로 OPTIONS 요청을 전송한 후 결과 값을 얻어옵니다.
   */
  async options<T>({
    link,
    option,
    header,
    axiosOption
  }: {
    /**
     * 요청이 전송될 API 주소가 담깁니다.
     */
    link: string
    option?: IRequestOption
    header?: any
    axiosOption?: AxiosRequestConfig
  }) {
    return await this.saftyRequest<T>({
      link,
      option,
      process: this.axios.options,
      processInfo: `OPTIONS ${option ? JSON.stringify(option) : ''}`,
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
      process: this.axios.put,
      data,
      processInfo: `PUT ${option ? JSON.stringify(option) : ''}`,
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
      process: this.axios.post,
      data,
      processInfo: `POST ${option ? JSON.stringify(option) : ''}`,
      header
    })
  }

  /**
   * * 백엔드 서버로 PATCH 요청을 전송한 후 결과 값을 얻어옵니다.
   */
  async patch<T>({
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
      process: this.axios.patch,
      data,
      processInfo: `PATCH ${option ? JSON.stringify(option) : ''}`,
      header
    })
  }

  protected defaultGlobalProcess: IGlobalProcess = async <T>(
    params: IRequestParam
  ) => {
    const {
      link,
      process,
      option = {
        noPreprocess: false,
        noAuthorization: false
      },
      header,
      axiosOption
    } = params

    let token: any
    try {
      token = this.getToken()
    } catch (e) {}

    // * API 경로명이 / 로 시작하지 않는 경우 이를 붙여줍니다.
    let _link = link
    if (_link[0] !== '/') _link += '/'

    const processLink = `${this.address}${_link}`

    let _axiosOption: AxiosRequestConfig = {
      withCredentials: true,
      ...this.axiosOption
    }
    if (!_axiosOption.headers) _axiosOption.headers = {}

    _axiosOption = {
      ..._axiosOption,
      ...(axiosOption || {})
    }

    if (typeof token === 'string' && token.length > 0) {
      _axiosOption = {
        ..._axiosOption,
        ...(this.isUseSelfManagementToken && !option.noAuthorization
          ? { headers: { Authorization: `Bearer ${token}` } }
          : {})
      }
    }
    if (_axiosOption && header) {
      if (_axiosOption.headers) {
        _axiosOption.headers = {
          ..._axiosOption.headers,
          ...header
        }
      }
    }

    const response = await params.process<T>(processLink, _axiosOption)
    return response
  }

  get extends() {
    return {
      getAxios: () => this.axios,
      onRequest: fn => {
        this.axios.interceptors.request.use(config => fn(config) || config)
      },
      onResponse: fn => {
        this.axios.interceptors.response.use(
          response => fn(response) || response
        )
      },
      onRequestError: fn => {
        this.axios.interceptors.request.use(
          undefined,
          error => fn(error) || Promise.reject(error)
        )
      },
      onResponseError: fn => {
        this.axios.interceptors.response.use(
          undefined,
          error => fn(error) || Promise.reject(error)
        )
      },
      onError: fn => {
        this.extends.onRequestError(fn)
        this.extends.onResponseError(fn)
      }
    }
  }
}

/**
 * * 서버에 실제 요청을 보내게 되는 함수의 규격입니다.
 */
export type ProcessType = <T>(
  link: string,
  axiosOption: AxiosRequestConfig
) => Promise<AxiosResponse<T>>

/**
 * * 서버에 요청이 전송된 이후 요청 정보를 확인할 수 있는 함수의 규격입니다.
 */
export type PostprocessType = <T>(
  params: IRequestParam,
  response: AxiosResponse<T>
) => boolean

/**
 * * 요청을 가장 먼저 받아서 내부 함수를 실행시킬 함수의 규격입니다.
 */
export type IGlobalProcess = <T>(
  params: IRequestParam
) => Promise<AxiosResponse<T>>

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
