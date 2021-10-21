import axiosClient from './axiosClient';

export const UserAPI = {
	signUp: (body) => {
		//body: userName, fullName, password
		return axiosClient.post('/user/signUp', body);
	},
	signIn: (body) => {
		//body: userName, password
		return axiosClient.post('/user/signIn', body);
	},
	signOut: () => {
		return axiosClient.post('/user/signOut');
	},
};
