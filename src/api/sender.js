import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = process.env.REACT_APP_BASE_API || '/api';

function handleResponse(res) {
  if (!res.data) {
    return Promise.reject(new Error('Something went wrong'));
  }
  if (res.data.success) {
    if (res.data.warning) {
      // toast
      toast.warn(res.data.warning);
    }
    return Promise.resolve(res.data.data);
  }

  return Promise.reject(res.data.reason);
}

export function httpGet(route, params, { token, cancelToken }) {
	const url = `${API_BASE_URL}${route}`;
	const headers = token ? { token } : undefined;
	return axios
		.get(url, { headers, params, cancelToken })
		.then(handleResponse);
}

export function httpPost(route, payload, { token, cancelToken, onUploadProgress }) {
	const url = `${API_BASE_URL}${route}`;
	const headers = token ? { token } : undefined;
	return axios
		.post(url, payload, { headers, cancelToken, onUploadProgress })
		.then(handleResponse);
}

export function httpPut(route, payload, { token, cancelToken }) {
	const url = `${API_BASE_URL}${route}`;
	const headers = token ? { token } : undefined;
	return axios
		.put(url, payload, { headers, cancelToken })
		.then(handleResponse);
}


export const getData = (type, province) =>
	fetch(type[province.key]).then(d => d.json());