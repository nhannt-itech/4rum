const bcrypt = require('bcrypt');
const User = require('../models/User');
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

		User.findOne({ email: newUser.email }, function (err, user) {
			if (user) return res.status(400).json(error('Email đã tồn tại', res.statusCode));

			newUser.save((err, doc) => {
				if (err) next(err);
				return res.status(200).json(success(doc, 'OK', res.statusCode));
			});
		});
	},

	async login(req, res, next) {
		let token = req.cookies.auth;
		User.findByToken(token, (err, user) => {
			next(err);
			if (user) return res.status(400).json(error('Bạn đã đăng nhập', res.statusCode));
			else {
				User.findOne({ email: req.body.email }, function (err, user) {
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
											isAuth: true,
											id: user._id,
											email: user.email,
										},
										'OK',
										res.statusCode
									)
								);
						});
					});
				});
			}
		});
	},

	async profile(req, res, next) {
		res.json({
			isAuth: true,
		});
	},
};
