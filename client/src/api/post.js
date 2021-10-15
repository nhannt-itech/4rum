import axiosClient from './axiosClient';

export const PostAPI = {
	getAll: () => {
		return axiosClient.get('/post/getAll');
	},
	get: (params) => {
		return axiosClient.get('/post/get/' + params.postId);
	},
	create: (params) => {
		return axiosClient.post('/post/create', params);
	},
	delete: (params) => {
		return axiosClient.post('/post/delete', null, { params });
	},
};
