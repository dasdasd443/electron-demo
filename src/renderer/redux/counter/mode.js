import { createSlice } from '@reduxjs/toolkit';

export const modeSlice = createSlice({
  name: 'mode',
  initialState: {
    value: false,
  },
  reducers: {
    setModeList: (state) => {
      state.value = true;
    },
    setModeDetails: (state) => {
      state.value = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setModeList, setModeDetails } = modeSlice.actions;

export default modeSlice.reducer;
