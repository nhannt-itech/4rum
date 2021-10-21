import axiosClient from './axiosClient';

export const CommentAPI = {
	create: (params) => {
		return axiosClient.post('/comment/create', params);
	},
};
