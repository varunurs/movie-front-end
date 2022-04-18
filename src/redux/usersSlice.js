import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    userInfo: { isAdmin: true },
  },
  reducers: {
    toggleAdminState: (state, action) => {
      return { ...state, isAdmin: !state.isAdmin };
    },
  },
});

// export const {} = moviesSlice.actions;

export default usersSlice.reducer;
