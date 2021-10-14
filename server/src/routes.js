const { auth } = require('./middleware/auth');
const express = require('express');

const UserController = require('./controllers/UserController');
const ChatController = require('./controllers/ChatController');

const routes = express.Router();

//User
routes.post('/register', UserController.register);
routes.post('/login', UserController.login);
routes.get('/user/:userId', UserController.getUserById);
routes.get('/api/profile', auth(), UserController.profile);
routes.post('/logout', auth(), UserController.logout);

//Chat
// routes.get('/chat/getall', ChatController.getAll);
routes.post('/chat/create', auth(), ChatController.create);
routes.post('/chat/delete/:chatId', auth(['Admin', 'Mod']), ChatController.delete);

module.exports = routes;
