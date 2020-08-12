// ! api module
import { API, URL } from './index'

const Service = {
	sample: async <V>(value?: V, axiosConfig: { type: string; token: false } = { type: '', token: false }) => {
		return await API._GET(URL.SAMPLE)
	}
}

export default Service
