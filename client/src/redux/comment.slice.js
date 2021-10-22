import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NotifyHelper } from "../helpers";
import { CommentAPI } from "../api";

const initialState = {
	comments: [],
	requesting: false,
	success: false,
	message: "",
	isChange: false,
	pagesize: 10,
};

/* ---------------------ACTIONS--------------------- */
export const createComment = createAsyncThunk("comment/create", async (req, thunkAPI) => {
	try {
		const { body } = req;
		const res = await CommentAPI.create(body);
		return res;
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response.data);
	}
});

export const readManyComment = createAsyncThunk("comment/readMany", async (req, thunkAPI) => {
	try {
		const { params } = req;
		const res = await CommentAPI.readMany(params);
		return { pagesize: params.pagesize, ...res };
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response.data);
	}
});

export const updateComment = createAsyncThunk("comment/update", async (req, thunkAPI) => {
	try {
		const { params, body } = req;
		const res = await CommentAPI.update(params, body);
		return res;
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response.data);
	}
});

export const deleteComment = createAsyncThunk("comment/delete", async (req, thunkAPI) => {
	try {
		const { params } = req;
		const res = await CommentAPI.delete(params);
		return res;
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response.data);
	}
});

const pendingAction = (action) =>
	action.type.endsWith("pending") && action.type.includes("comment");
const rejectedAction = (action) =>
	action.type.endsWith("rejected") && action.type.includes("comment");

/* ---------------------SLICE--------------------- */
const postSlice = createSlice({
	name: "comment",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createComment.fulfilled, (state, action) => {
				state.requesting = false;
				state.success = true;
				state.isChange = true;
			})
			.addCase(readManyComment.fulfilled, (state, action) => {
				state.comments = action.payload.results;
				state.pagesize = action.payload.pagesize;
				state.requesting = false;
				state.success = true;
			})
			.addCase(updateComment.fulfilled, (state, action) => {
				state.requesting = false;
				state.success = true;
				state.isChange = true;
			})
			.addCase(deleteComment.fulfilled, (state, action) => {
				state.requesting = false;
				state.success = true;
			})
			.addMatcher(pendingAction, (state) => {
				state.success = false;
				state.requesting = true;
				state.isChange = false;
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
