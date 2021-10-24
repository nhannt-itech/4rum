import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NotifyHelper } from "../helpers";
import { PostAPI } from "../api";

const initialState = {
	newPost: null,
	post: null,
	posts: [],
	requesting: false,
	success: false,
	message: "",
	isCreated: false,
};

/* ---------------------ACTIONS--------------------- */
export const createPost = createAsyncThunk("post/create", async (req, thunkAPI) => {
	try {
		const { params } = req;
		const res = await PostAPI.create(params);
		return res;
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response.data);
	}
});

export const readManyPost = createAsyncThunk("post/readMany", async (req, thunkAPI) => {
	try {
		const res = await PostAPI.readMany();
		return res;
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response.data);
	}
});

export const readOnePost = createAsyncThunk("post/readOne", async (req, thunkAPI) => {
	try {
		const { params } = req;
		const res = await PostAPI.readOne(params);
		return res;
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response.data);
	}
});

export const updatePost = createAsyncThunk("post/update", async (req, thunkAPI) => {
	try {
		const { params, body } = req;
		const res = await PostAPI.update(params, body);
		return res;
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response.data);
	}
});

export const deletePost = createAsyncThunk("post/delete", async (req, thunkAPI) => {
	try {
		const { params } = req;
		const res = await PostAPI.delete(params);
		return res;
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response.data);
	}
});

const pendingAction = (action) => action.type.endsWith("pending") && action.type.includes("post");
const rejectedAction = (action) => action.type.endsWith("rejected") && action.type.includes("post");

/* ---------------------SLICE--------------------- */
const postSlice = createSlice({
	name: "post",
	initialState,
	reducers: {
		setNewPost: (state, action) => {
			state.newPost = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createPost.fulfilled, (state, action) => {
				state.requesting = false;
				state.success = true;
				state.isCreated = true;
				state.newPost = action.payload.results._id;
				NotifyHelper.success("New post was published!");
			})
			.addCase(readManyPost.fulfilled, (state, action) => {
				state.posts = action.payload.results;
				state.requesting = false;
				state.success = true;
			})
			.addCase(readOnePost.fulfilled, (state, action) => {
				state.post = action.payload.results;
				state.requesting = false;
				state.success = true;
			})
			.addCase(updatePost.fulfilled, (state, action) => {
				state.requesting = false;
				state.success = true;
			})
			.addCase(deletePost.fulfilled, (state, action) => {
				state.requesting = false;
				state.success = true;
			})
			.addMatcher(pendingAction, (state) => {
				state.isCreated = false;
				state.newPost = null;
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

export const { setNewPost } = postSlice.actions;
export default postSlice.reducer;
