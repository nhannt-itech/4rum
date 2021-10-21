const { auth } = require('./middleware/auth');
const express = require('express');

const UserController = require('./controllers/UserController');
const ChatController = require('./controllers/ChatController');
const PostController = require('./controllers/PostController');
const CommentController = require('./controllers/CommentController');

const routes = express.Router();

//User
routes.post('/user/signUp', UserController.signUp);
routes.post('/user/signIn', UserController.signIn);
routes.post('/user/signOut', auth(), UserController.signOut);

//Chat
routes.post('/chat/create', auth(), ChatController.create);
routes.post('/chat/delete', auth(['Admin', 'Mod']), ChatController.delete);

//Post
routes.post('/post/create', auth(), PostController.create);
routes.get('/post/readOne', PostController.readOne);
routes.get('/post/readMany', PostController.readMany);
routes.post('/post/update', auth(), PostController.update);
routes.post('/post/delete', auth(), PostController.delete);

//Comment
routes.post('/comment/create', auth(), CommentController.create);
routes.get('/comment/readMany', CommentController.readMany);
routes.post('/comment/update', auth(), CommentController.update);
routes.post('/comment/delete', auth(), CommentController.delete);

module.exports = routes;

// routes.use(
// 	'/api/chat',
// 	require('./utils/crud')(Chat, {
// 		create: auth(),
// 		delete: auth(),
//         delete:
// 	})
// );
