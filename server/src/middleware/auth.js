const User = require('../models/user');
const { success, error } = require('../utils/responseApi');

let auth = (roles = []) => {
	if (typeof roles === 'string') {
		roles = [roles];
	}
	return (req, res, next) => {
		let token = req.cookies.auth;

		User.findByToken(token, (err, user) => {
			if (err) next(err.message);
			if (!user)
				return res
					.status(401)
					.clearCookie('auth', { path: '/' })
					.json(error('Bạn phải đăng nhập', res.statusCode));

			if (roles.length && !roles.includes(user.role))
				return res.status(401).json(error('Bạn không có quyền truy cập', res.statusCode));
			req.token = token;
			req.user = user;
			next();
		});
	};
};

module.exports = { auth };
