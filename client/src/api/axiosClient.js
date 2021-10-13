import axios from 'axios';
import queryString from 'querystring';

const axiosClient = axios.create({
	baseURL: 'http://localhost:8000',
	headers: {
		'Content-Type': 'application/json',
	},
	paramsSerializer: (params) => queryString.stringify(params),
	withCredentials: true,
});

axiosClient.interceptors.request.use(async (config) => {
	return config;
});

axiosClient.interceptors.response.use(
	async (response) => {
		if (response && response.data) {
			return response.data;
		}
		return response.data;
	},
	(error) => {
		throw error;
	}
);

export default axiosClient;
