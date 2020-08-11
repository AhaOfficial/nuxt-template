import Axios, { AxiosResponse } from 'axios';
import qs from 'qs';

class CORE {
	constructor() {}

	_HEADER = (o: { type: string; tocken: boolean }) => {
		const { type, tocken } = o;

		const O: { [type in string]: string } = {
			FILE: 'multipart/form-data',
			FORM: 'application/x-www-form-urlencode',
			JSON: 'application/json'
		};

		// TODO API 스펙 나오면 정의 합시당.
		const T = tocken ? `Bearer ${tocken}` : '';

		const RET = {
			'Cache-Control': 'no-cache',
			Pragma: 'no-cache',
			'Content-Type': O.type || 'JSON',
			Authorization: T
		};

		return RET;
	};

	_GET = async <T>(u: string, v?: T, o: { type: string; tocken: boolean } = { type: '', tocken: false }): Promise<AxiosResponse<any>> => {
		try {
			return await Axios.get(
				u,
				Object.assign(
					{},
					{
						params: v,
						paramsSerializer: (v: T) => qs.stringify(v, { arrayFormat: 'repeat' }),
						headers: this._HEADER(o)
					}
				)
			);
		} catch (error) {
			return error.response;
		}
	};

	_POST = async <T>(u: string, v?: T, o: { type: string; tocken: boolean } = { type: '', tocken: false }): Promise<AxiosResponse<any>> => {
		try {
			return await Axios.post(u, v, Object.assign({}, { headers: this._HEADER(o) }));
		} catch (error) {
			return error.response;
		}
	};

	_PATCH = async <T>(u: string, v?: T, o: { type: string; tocken: boolean } = { type: '', tocken: false }): Promise<AxiosResponse<any>> => {
		try {
			return await Axios.patch(u, v, Object.assign({}, { headers: this._HEADER(o) }));
		} catch (error) {
			return error.response;
		}
	};

	_PUT = async <T>(u: string, v?: T, o: { type: string; tocken: boolean } = { type: '', tocken: false }): Promise<AxiosResponse<any>> => {
		try {
			return await Axios.put(u, v, Object.assign({}, { headers: this._HEADER(o) }));
		} catch (error) {
			return error.response;
		}
	};

	_DELETE = async <T>(u: string, v?: T, o: { type: string; tocken: boolean } = { type: '', tocken: false }): Promise<AxiosResponse<any>> => {
		try {
			return await Axios.delete(
				u,
				Object.assign(
					{},
					{
						params: v,
						paramsSerializer: (v: T) => qs.stringify(v, { arrayFormat: 'repeat' }),
						headers: this._HEADER(o)
					}
				)
			);
		} catch (error) {
			return error.response;
		}
	};
}

export default CORE;
