import axios from "axios";
import queryString from "querystring";

const axiosClient = axios.create({
	baseURL: `${process.env.REACT_APP_API_URL}`,
	headers: {
		"Content-Type": "application/json",
	},
	paramsSerializer: (params) => queryString.stringify(params),
	withCredentials: true,
});

axiosClient.interceptors.request.use(async (config) => {
	return config;
});

axiosClient.interceptors.response.use(
	(response) => {
		if (response && response.data) {
			return response.data;
		}
		return response.data;
	},
	(error) => {
		if (error.response && error.response.status === 401) {
			window.location.reload();
		}
		throw error;
	}
);

export default axiosClient;
