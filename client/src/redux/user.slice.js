import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NotifyHelper } from '../helpers';
import { UserAPI } from '../api';

const initialState = {
	userId: null,
	isSignUp: false,
	isSignIn: false,
	requesting: false,
	success: false,
	message: '',
};

/* ---------------------ACTIONS--------------------- */
export const signUp = createAsyncThunk('user/signUp', async (params, thunkAPI) => {
	try {
		const res = UserAPI.signUp(params);
		return res;
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response.data);
	}
});

export const signIn = createAsyncThunk('user/signIn', async (params, thunkAPI) => {
	try {
		const { userName, password } = params;
		const res = await UserAPI.signIn({ userName, password });
		return res;
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response.data);
	}
});

export const signOut = createAsyncThunk('user/signOut', async (params, thunkAPI) => {
	try {
		const res = await UserAPI.signOut();
		return res;
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response.data);
	}
});

const pendingAction = (action) =>
	action.type.endsWith('pending') && action.type.includes('user');
const rejectedAction = (action) =>
	action.type.endsWith('rejected') && action.type.includes('user');

/* ---------------------SLICE--------------------- */
const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setIsSignUp: (state, action) => {
			state.isSignUp = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(signUp.fulfilled, (state, action) => {
				state.requesting = false;
				state.success = true;
				state.isSignUp = true;
				NotifyHelper.success('Bạn đã đăng ký thành công!');
			})
			.addCase(signIn.fulfilled, (state, action) => {
				state.requesting = false;
				state.success = true;
				state.isSignIn = true;
				state.userId = action.payload.id;
				NotifyHelper.success('Bạn đã đăng nhập thành công!');
			})
			.addCase(signOut.fulfilled, (state, action) => {
				state.requesting = false;
				state.success = true;
				state.isSignIn = false;
				state.userId = null;
				NotifyHelper.success('Bạn đã đăng xuất thành công!');
			})

			//Sử dụng chung cho tất cả pending và rejected
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
export const { setIsSignUp } = userSlice.actions;

export default userSlice.reducer;
