import Axios, { AxiosResponse } from 'axios';
import qs from 'qs';

class CORE {
	constructor() {}

	private _HEADER = (axiosConfig: { type: string; token: boolean }) => {
		const { type, token } = axiosConfig;

		const contentType: { [type in string]: string } = {
			FILE: 'multipart/form-data',
			FORM: 'application/x-www-form-urlencode',
			JSON: 'application/json'
		};

		// TODO API 스펙 나오면 정의 합시당.
		const isSendToken = token ? `Bearer ${token}` : '';

		const RET = {
			'Cache-Control': 'no-cache',
			Pragma: 'no-cache',
			'Content-Type': contentType.type || 'JSON',
			Authorization: isSendToken
		};

		return RET;
	};

	_GET = async <T>(
		url: string,
		value?: T,
		axiosConfig: { type: string; token: boolean } = { type: '', token: false }
	): Promise<AxiosResponse<any>> => {
		try {
			return await Axios.get(
				url,
				Object.assign(
					{},
					{
						params: value,
						paramsSerializer: (v: T) => qs.stringify(v, { arrayFormat: 'repeat' }),
						headers: this._HEADER(axiosConfig)
					}
				)
			);
		} catch (error) {
			return error.response;
		}
	};

	_POST = async <T>(
		url: string,
		value?: T,
		axiosConfig: { type: string; token: boolean } = { type: '', token: false }
	): Promise<AxiosResponse<any>> => {
		try {
			return await Axios.post(url, value, Object.assign({}, { headers: this._HEADER(axiosConfig) }));
		} catch (error) {
			return error.response;
		}
	};

	_PATCH = async <T>(
		url: string,
		value?: T,
		axiosConfig: { type: string; token: boolean } = { type: '', token: false }
	): Promise<AxiosResponse<any>> => {
		try {
			return await Axios.patch(url, value, Object.assign({}, { headers: this._HEADER(axiosConfig) }));
		} catch (error) {
			return error.response;
		}
	};

	_PUT = async <T>(
		url: string,
		value?: T,
		axiosConfig: { type: string; token: boolean } = { type: '', token: false }
	): Promise<AxiosResponse<any>> => {
		try {
			return await Axios.put(url, value, Object.assign({}, { headers: this._HEADER(axiosConfig) }));
		} catch (error) {
			return error.response;
		}
	};

	_DELETE = async <T>(
		url: string,
		value?: T,
		axiosConfig: { type: string; token: boolean } = { type: '', token: false }
	): Promise<AxiosResponse<any>> => {
		try {
			return await Axios.delete(
				url,
				Object.assign(
					{},
					{
						params: value,
						paramsSerializer: (v: T) => qs.stringify(v, { arrayFormat: 'repeat' }),
						headers: this._HEADER(axiosConfig)
					}
				)
			);
		} catch (error) {
			return error.response;
		}
	};
}

export default CORE;
