const User = require("../models/user");
const { success, error } = require("../utils/responseApi");

let auth = (roles = []) => {
	if (typeof roles === "string") {
		roles = [roles];
	}
	return async (req, res, next) => {
		const token = req.cookies.auth;
		console.log("hi");
		try {
			const user = await User.findByToken(token);
			if (!user)
				return res
					.status(401)
					.clearCookie("auth", { path: "/" })
					.json(error("Bạn phải đăng nhập", res.statusCode));
			else if (roles.length && !roles.includes(user.role))
				return res.status(401).json(error("Không có quyền truy cập", res.statusCode));
			else {
				req.token = token;
				req.user = user;
				next();
			}
		} catch (err) {
			next(err);
		}
	};
};

module.exports = { auth };
