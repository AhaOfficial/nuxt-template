// ! api module
import { API, URL } from './index'

const Service = {
  sampleGET: async <T>(value?: T, axiosConfig: { type: string; token: false } = { type: '', token: false }) => {
    return await API._GET(URL.SAMPLE)
  },
  samplePOST: async <T>(value?: T, axiosConfig: { type: string; token: false } = { type: '', token: false }) => {
    return await API._POST(URL.SAMPLE_POST, value, axiosConfig)
  },
  samplePUT: async <T>(value?: T, axiosConfig: { type: string; token: false } = { type: '', token: false }) => {
    return await API._PUT(URL.SAMPLE_PUT, value, axiosConfig)
  },
  samplePATCH: async <T>(value?: T, axiosConfig: { type: string; token: false } = { type: '', token: false }) => {
    return await API._PATCH(URL.SAMPLE, value, axiosConfig)
  },
  sampleDELETE: async <T>(value?: T, axiosConfig: { type: string; token: false } = { type: '', token: false }) => {
    return await API._DELETE(URL.SAMPLE)
  }
}

export default Service
