import axiosClient from "./axiousClient";

export const UserAPI = {
	//Lưu ý ở hàm post nếu truyền params mà không có body thi phải truyển body = null

	signUp: (params) => {
		const url = "/";
		return axiosClient.post(url, null, { params });
	},
	signIn: (params) => {
		const url = "/";
		return axiosClient.get(url, { params });
	},
};
