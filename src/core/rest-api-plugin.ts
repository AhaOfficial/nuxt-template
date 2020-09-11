import Axios from 'axios'
import { RestAPI } from './rest-api'

/**
 * Nuxt 프로그레스바와 axios 를 동기화합니다.
 */
export const setupProgress = (api: RestAPI) => {
  if (process.server) return
  const axios: any = api.extends.getAxios()

  const noopLoading = {
    finish: () => {},
    start: () => {},
    fail: () => {},
    set: () => {}
  }

  const $loading = () => {
    const $nuxt = typeof window !== 'undefined' ? window.$nuxt : undefined
    return $nuxt && $nuxt.$loading ? $nuxt.$loading : noopLoading
  }

  let currentRequests = 0

  api.extends.onRequest(config => {
    if (config && config.progress === false) return
    currentRequests++
  })

  api.extends.onResponse(response => {
    if (response && response.config && response.config.progress === false)
      return

    currentRequests--
    if (currentRequests <= 0) {
      currentRequests = 0
      $loading().finish()
    }
  })

  api.extends.onError(error => {
    // @ts-ignore
    if (error && error.config && error.config.progress === false) {
      return Promise.reject(error)
    }

    currentRequests--

    if (axios.isCancel(error)) {
      if (currentRequests <= 0) {
        currentRequests = 0
        $loading().finish()
      }
      return Promise.reject(error)
    }

    $loading().fail()
    $loading().finish()
  })

  const onProgress = e => {
    if (!currentRequests) {
      return
    }
    const progress = (e.loaded * 100) / (e.total * currentRequests)
    // @ts-ignore
    $loading().set(Math.min(100, progress))
  }

  Axios.defaults.onUploadProgress = onProgress
  Axios.defaults.onDownloadProgress = onProgress
}
