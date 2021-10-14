import axiosClient from './axiosClient';

export const ChatAPI = {
	create: (params) => {
		return axiosClient.post('/chat/create', params);
	},
	delete: (params) => {
		return axiosClient.post('/chat/delete', null, { params });
	},
};
