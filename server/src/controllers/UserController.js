const User = require('../models/user');
const { success, error } = require('../utils/responseApi');

module.exports = {
	async getUserById(req, res, next) {
		const { userId } = req.params;

		try {
			const user = await User.findById(userId);
			return res.status(200).json(success(user, 'OK', res.statusCode));
		} catch (err) {
			return next(err);
		}
	},

	async register(req, res, next) {
		const newUser = new User(req.body);

		User.findOne({ userName: newUser.userName }, function (err, user) {
			if (user) return res.status(400).json(error('username đã tồn tại', res.statusCode));

			newUser.save((err, doc) => {
				let { password, ...userWithoutPassword } = doc;
				if (err) next(err);
				return res
					.cookie('pass', newUser.password)
					.status(200)
					.json(success(userWithoutPassword, 'OK', res.statusCode));
			});
		});
	},

	async login(req, res, next) {
		User.findByToken(req.cookies.auth, (err, user) => {
			if (user) {
				return res.status(200).json(success(user, 'OK', res.statusCode));
			}

			User.findOne({ userName: req.body.userName }, function (err, user) {
				if (!user)
					return res
						.status(400)
						.json(error('Tài khoản hoặc mật khẩu không chính xác', res.statusCode));

				user.comparePassword(req.body.password, (err, isMatch) => {
					if (!isMatch)
						return res
							.status(400)
							.json(error('Tài khoản hoặc mật khẩu không chính xác', res.statusCode));
					user.generateToken((err, user) => {
						return res
							.cookie('auth', user.token)
							.status(200)
							.json(
								success(
									{
										id: user._id,
										userName: user.userName,
									},
									'OK',
									res.statusCode
								)
							);
					});
				});
			});
		});
	},

	async logout(req, res, next) {
		req.user.deleteToken(req.token, (err, user) => {
			if (err) next(err);
			res.clearCookie('auth', { path: '/' }).sendStatus(200);
		});
	},
};
