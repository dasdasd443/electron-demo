import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    value: false,
  },
  reducers: {
    showModal: (state) => {
      state.value = true;
    },
    hideModal: (state) => {
      state.value = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
