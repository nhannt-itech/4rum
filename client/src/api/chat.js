import axiosClient from './axiosClient';

export const ChatAPI = {
	create: (params) => {
		//body: content, author
		return axiosClient.post('/chat/create', params);
	},
	delete: (params) => {
		//query: _id
		return axiosClient.post('/chat/delete', null, { params });
	},
};
