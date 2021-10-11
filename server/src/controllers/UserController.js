const bcrypt = require('bcrypt');
const User = require('../models/User');
const createHttpError = require('http-errors');
const { success, error, validation } = require('../utils/responseApi');

module.exports = {
	async createUser(req, res, next) {
		console.log(req.body);
		try {
			const { email, firstName, lastName, password } = req.body;
			const existentUser = await User.findOne({ email });

			if (!existentUser) {
				const hashPassword = await bcrypt.hash(password, 10);
				const user = await User.create({
					email,
					firstName,
					lastName,
					password: hashPassword,
				});
				return res.status(200).json(success(user, 'OK', res.statusCode));
			}
			return res.status(400).json(error('Email đã tồn tại', res.statusCode));
		} catch (err) {
			return res.status(500).json(error('Xảy ra lỗi khi tạo User', res.statusCode));
		}
	},

	async getUserById(req, res, next) {
		const { userId } = req.params;

		try {
			const user = await User.findById(userId);
			return res.status(200).json(success(user, 'OK', res.statusCode));
		} catch (err) {
			return res.status(400).json(error('User không tồn tại', res.statusCode));
		}
	},
};
