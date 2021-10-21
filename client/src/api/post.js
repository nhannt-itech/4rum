import axiosClient from './axiosClient';

export const PostAPI = {
	create: (body) => {
		//body: title, content, summary
		return axiosClient.post('/post/create', body);
	},
	readMany: (params) => {
		//query: offset[nullable], pagesize[nullable]
		return axiosClient.get('/post/readMany', { params });
	},
	readOne: (params) => {
		//query: _id
		return axiosClient.get('/post/readOne', { params });
	},
	update: (params, body) => {
		//query: _id
		//body: title, content, summary
		return axiosClient.post('/post/update', body, { params });
	},
	delete: (params) => {
		//query: _id
		return axiosClient.post('/post/delete', null, { params });
	},
};
