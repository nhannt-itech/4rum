const Event = require('../models/Event');
const User = require('../models/User');

module.exports = {
	async createEvent(req, res) {
		const { title, description, price } = req.body;
		const { user_id } = req.headers;
		const { filename } = req.file;

		console.log(user_id);

		const user = await User.findById(user_id);

		if (!user) {
			return res.status(400).json({ message: 'User does not exist!' });
		}

		const event = await Event.create({
			title,
			description,
			price: parseFloat(price),
			user: user_id,
			thumbnail: filename,
		});

		return res.json(event);
	},

	async getEventById(req, res, next) {
		const { eventId } = req.params;
		try {
			const event = await Event.findById(eventId);

			if (event) {
				return res.json(event);
			}
		} catch (error) {
			/**
			 * 500 (Internal Server Error) - Something has gone wrong in your application.
			 */
			const httpError = createHttpError(500, error);

			next(httpError);
		}
	},
};
