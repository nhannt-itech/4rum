module.exports = errorHandler;
const { success, error } = require('../utils/responseApi');

function errorHandler(err, req, res, next) {
	if (typeof err === 'string') {
		// custom application error
		return res.status(400).json(error(err.message, res.statusCode));
	}

	if (err.name === 'UnauthorizedError') {
		// jwt authentication error
		return res.status(401).json(error('Invalid Token', res.statusCode));
	}

	// default to 500 server error
	return res.status(500).json(error(err.message, res.statusCode));
}
