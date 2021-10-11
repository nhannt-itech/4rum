import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	isIdentityModalVisible: false,
	applicationLanguage: "vietnam",
};

/* ---------------------SLICE--------------------- */
const settingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {
		setIdentityModalVisible: (state, action) => {
			state.isIdentityModalVisible = action.payload;
		},
	},
});

export const { setIdentityModalVisible } = settingsSlice.actions;

export default settingsSlice.reducer;
