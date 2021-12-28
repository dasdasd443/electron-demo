import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'authenticated',
  initialState: {
    value: localStorage.getItem('cur-user') !== null,
  },
  reducers: {
    authenticate: (state) => {
      state.value = true;
    },
    unAuthenticate: (state) => {
      state.value = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { authenticate, unAuthenticate } = authSlice.actions;

export default authSlice.reducer;
