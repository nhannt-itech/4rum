const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const salt = 10;

const userSchema = new mongoose.Schema(
	{
		userName: {
			type: String,
			unique: true,
		},
		fullName: String,
		password: {
			type: String,
			required: true,
		},
		token: String,
		role: {
			type: String,
			required: true,
			default: 'User',
		},
	},
	{
		timestamps: true,
	}
);

userSchema.pre('save', function (next) {
	var user = this;

	if (user.isModified('password')) {
		bcrypt.genSalt(salt, function (err, salt) {
			if (err) return next(err);

			bcrypt.hash(user.password, salt, function (err, hash) {
				if (err) return next(err);
				user.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});

userSchema.methods.comparePassword = async function (password) {
	const user = this;

	const isMatch = await bcrypt.compare(password, user.password);
	return isMatch;
};

userSchema.statics.findByToken = async function (token) {
	if (!token) {
		return null;
	} else {
		const decode = await jwt.verify(token, process.env.SESSION_SECRET);
		const doc = await this.findOne({ _id: decode, token: token });
		return doc;
	}
};

userSchema.methods.generateToken = async function () {
	const user = this;

	user.token = await jwt.sign(user._id.toHexString(), process.env.SESSION_SECRET);
	const doc = await user.save();
	return doc;
};

userSchema.methods.deleteToken = async function () {
	const user = this;

	const doc = await user.update({ $unset: { token: 1 } });
	return doc;
};

module.exports = mongoose.model('User', userSchema);
