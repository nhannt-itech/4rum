import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NotifyHelper } from '../../../helpers';
import { CommentAPI } from '../../../api';

const initialState = {
	requesting: false,
	success: false,
	message: '',
};

/* ---------------------ACTIONS--------------------- */
export const createComment = createAsyncThunk(
	'comment/create',
	async (params, thunkAPI) => {
		try {
			const res = await CommentAPI.create(params);
			return res;
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data);
		}
	}
);

const pendingAction = (action) =>
	action.type.endsWith('pending') && action.type.includes('chat');
const rejectedAction = (action) =>
	action.type.endsWith('rejected') && action.type.includes('chat');

/* ---------------------SLICE--------------------- */
const commentSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createComment.fulfilled, (state, action) => {
				state.requesting = false;
				state.success = true;
			})
			.addMatcher(pendingAction, (state) => {
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

export default commentSlice.reducer;
