import { createSlice } from '@reduxjs/toolkit';

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    login_id: "",
    login_password: "",
  },
  reducers: {
    login_id: (state, action) => {
      state.login_id = action.payload
    },
    login_password: (state, action) => {
      state.login_password = action.payload
    },
  },
});

export const { login_id, login_password } = accountSlice.actions;

export default accountSlice.reducer;