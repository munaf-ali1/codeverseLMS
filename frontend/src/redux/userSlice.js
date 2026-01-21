import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    isLoggedIn: false,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      state.userData = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUserData, logoutUser } = userSlice.actions;
export default userSlice.reducer;







