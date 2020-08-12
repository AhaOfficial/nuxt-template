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
			'Content-Type': contentType[type] || 'JSON',
			Authorization: isSendToken
		};

		return RET;
	};

	private _NOMALIZER = async (response: Promise<AxiosResponse>) => {
		const { data } = await response;

		// TODO 추후 API 스펙이 나온 후 추가 로직 구현 할 예정입니다.

		return { code: '', message: '', data };
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
