const { auth } = require('./middleware/auth');
const express = require('express');

const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.get('/status', (req, res) => {
	res.send({ status: 300 });
});

//User
routes.post('/user/register', UserController.register);
routes.post('/user/login', UserController.login);
routes.get('/user/:userId', UserController.getUserById);
routes.get('/api/profile', auth(), UserController.profile);

module.exports = routes;
