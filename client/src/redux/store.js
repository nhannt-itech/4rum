import { combineReducers, compose } from 'redux';
import storage from 'redux-persist/lib/storage';
import userSlice from './user.slice';
import settingsSlice from './settings.slice';
import { configureStore } from '@reduxjs/toolkit';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import chatSlice from '../pages/public-pages/home/chat.slice';
import postSlice from './post.slice';
import commentSlice from '../pages/public-pages/post-detail/comment.slice';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['user'],
};

const rootReducer = combineReducers({
	user: userSlice,
	settings: settingsSlice,
	chat: chatSlice,
	post: postSlice,
	comment: commentSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
	// Khi đẩy lên host thì bật devTools: false
	// devTools: false,
});
const persistedStore = persistStore(store);
store.subscribe(() => {});

export { store, persistedStore };
