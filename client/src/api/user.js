import axiosClient from './axiosClient';

export const UserAPI = {
	//Lưu ý ở hàm post nếu truyền params mà không có body thi phải truyển body = null

	signUp: (params) => {
		// return axiosClient.post(url, null, { params });
		return axiosClient.post('/register', params);
	},
	signIn: (params) => {
		// return axiosClient.get('/login', { params });
		return axiosClient.post('/login', params);
	},
	signOut: () => {
		return axiosClient.post('/logout');
	},
};
