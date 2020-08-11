// ! api module
import { API, URL } from './index';

const Service = {
	sample: async <V, T>(args?: { value: T; options: V }) => {
		return await API._GET(URL.SAMPLE);
	}
};

export default Service;
