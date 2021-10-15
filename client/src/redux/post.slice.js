import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NotifyHelper } from '../helpers';
import { PostAPI } from '../api';

const initialState = {
	post: null,
	posts: [],
	requesting: false,
	success: false,
	message: '',
};

/* ---------------------ACTIONS--------------------- */
export const getAllPost = createAsyncThunk('post/getAll', async (params, thunkAPI) => {
	try {
		const res = await PostAPI.getAll();
		return res;
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response.data);
	}
});

export const createPost = createAsyncThunk('post/create', async (params, thunkAPI) => {
	try {
		const res = await PostAPI.create(params);
		return res;
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response.data);
	}
});

export const deletePost = createAsyncThunk('post/delete', async (params, thunkAPI) => {
	try {
		const res = await PostAPI.delete(params);
		return res;
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response.data);
	}
});

export const getPost = createAsyncThunk('post/get', async (params, thunkAPI) => {
	try {
		const res = await PostAPI.get(params);
		return res;
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response.data);
	}
});

const pendingAction = (action) =>
	action.type.endsWith('pending') && action.type.includes('post');
const rejectedAction = (action) =>
	action.type.endsWith('rejected') && action.type.includes('post');

/* ---------------------SLICE--------------------- */
const postSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllPost.fulfilled, (state, action) => {
				state.posts = action.payload.results;
				state.requesting = false;
				state.success = true;
			})
			.addCase(getPost.fulfilled, (state, action) => {
				state.post = action.payload.results;
				state.requesting = false;
				state.success = true;
			})
			.addCase(createPost.fulfilled, (state, action) => {
				state.requesting = false;
				state.success = true;
				NotifyHelper.success('Bạn đã tạo bài viết thành cống');
			})
			.addCase(deletePost.fulfilled, (state, action) => {
				state.requesting = false;
				state.success = true;
			})
			.addMatcher(pendingAction, (state) => {
				state.post = null;
				state.success = false;
				state.requesting = true;
			})
			.addMatcher(rejectedAction, (state, action) => {
				state.requesting = state.success = false;
				try {
					state.message = action.payload.message;
					NotifyHelper.error(action.payload.message);
				} catch {
					state.message = action.error.message;
					NotifyHelper.error(action.error.message);
				}
			});
	},
});

export default postSlice.reducer;
