const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const salt = 10;

const userSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	password: String,
	email: String,
	token: String,
	role: String,
});

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

userSchema.methods.comparePassword = function (password, cb) {
	bcrypt.compare(password, this.password, function (err, isMatch) {
		if (err) return cb(next);
		cb(null, isMatch);
	});
};

userSchema.methods.generateToken = function (cb) {
	var user = this;
	var token = jwt.sign(user._id.toHexString(), process.env.SESSION_SECRET);

	user.token = token;
	user.save(function (err, user) {
		if (err) return cb(err);
		cb(null, user);
	});
};

userSchema.statics.findByToken = function (token, cb) {
	var user = this;

	jwt.verify(token, process.env.SESSION_SECRET, function (err, decode) {
		user.findOne({ _id: decode, token: token }, function (err, user) {
			if (err) return cb(err);
			cb(null, user);
		});
	});
};

userSchema.methods.deleteToken = function (token, cb) {
	var user = this;

	user.update({ $unset: { token: 1 } }, function (err, user) {
		if (err) return cb(err);
		cb(null, user);
	});
};

module.exports = mongoose.model('User', userSchema);
