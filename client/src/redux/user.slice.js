import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NotifyHelper } from "../helpers";
const initialState = {
	currentUser: null,
	isLogin: true,
	requesting: false,
	success: false,
	message: "",
};

/* ---------------------ACTIONS--------------------- */
export const signUp = createAsyncThunk("user/signUp", async () => {
	// Gọi API ở đây
	return { userId: "001", username: "rynoz" };
});

const pendingAction = (action) =>
	action.type.endsWith("pending") && action.type.includes("user");
const rejectedAction = (action) =>
	action.type.endsWith("rejected") && action.type.includes("user");

/* ---------------------SLICE--------------------- */
const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		signOut: (state) => {
			state.isLogin = false;
			state.currentUser = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(signUp.fulfilled, (state, action) => {
				state.requesting = false;
				state.success = true;
				state.isLogin = true;
				state.currentUser = action.payload;
				NotifyHelper.success("Bạn đã đăng ký thành công!");
			})

			//Sử dụng chung cho tất cả pending và rejected
			.addMatcher(pendingAction, (state) => {
				state.success = false;
				state.requesting = true;
			})
			.addMatcher(rejectedAction, (state, action) => {
				state.requesting = state.success = false;
				state.message = action.error.message;
				NotifyHelper.error(action.error.message);
			});
	},
});

export const { signOut } = userSlice.actions;

export default userSlice.reducer;
