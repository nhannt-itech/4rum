import axiosClient from "./axiosClient";

export const CommentAPI = {
	create: (body) => {
		//body: post, content
		return axiosClient.post("/comment/create", body);
	},
	readMany: (params) => {
		//query: offset[nullable], pagesize[nullable], post
		return axiosClient.get("/comment/readMany", { params });
	},
	update: (params, body) => {
		//query: _id
		//body: content
		return axiosClient.post("/comment/update", body, { params });
	},
	delete: (params) => {
		//query: _id
		return axiosClient.post("/comment/delete", null, { params });
	},
};
