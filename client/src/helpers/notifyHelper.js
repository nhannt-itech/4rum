import { notification } from 'antd';

export const NotifyHelper = {
	success: (message, title = 'Thành công') => {
		notification['success']({
			message: title,
			description: message,
		});
	},

	info: (message, title = 'Thông tin') => {
		notification['info']({
			message: title,
			description: message,
		});
	},

	warning: (message, title = 'Cảnh báo') => {
		notification['warning']({
			message: title,
			description: message,
		});
	},

	error: (message, title = 'Thất bại') => {
		notification['error']({
			message: title,
			description: message,
		});
	},
};
