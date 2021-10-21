const User = require('../models/user');
const { success, error } = require('../utils/responseApi');

module.exports = {
	async signUp(req, res, next) {
		try {
			const reqData = ({ userName, fullName, password } = req.body);
			const doc = await User.findOne({ userName: reqData.userName });
			if (doc) {
				return res.status(400).json(error('username đã tồn tại', res.statusCode));
			} else {
				const newDoc = await User.create(new User(reqData));
				return res.status(200).json(success(newDoc, 'OK', res.statusCode));
			}
		} catch (err) {
			next(err);
		}
	},

	async signIn(req, res, next) {
		try {
			const userToken = await User.findByToken(req.cookies.auth);

			if (userToken) return res.status(200).json(success(userToken, 'OK', res.statusCode));
			else {
				const { userName, password } = req.body;
				const user = await User.findOne({ userName });

				if (!user) return res.status(400).json(error('Tài khoản không tồn tại', res.statusCode));
				else {
					const isMatch = await user.comparePassword(password);
					if (!isMatch) return res.status(400).json(error('Mật khẩu sai', res.statusCode));
					else {
						const doc = await user.generateToken();
						return res
							.status(200)
							.cookie('auth', user.token)
							.json(success(doc, 'OK', res.statusCode));
					}
				}
			}
		} catch (err) {
			next(err);
		}
	},

	async signOut(req, res, next) {
		const { user } = req;
		const doc = await user.deleteToken();
		return res
			.clearCookie('auth', { path: '/' })
			.status(200)
			.json(success(doc, 'OK', res.statusCode));
	},
};
