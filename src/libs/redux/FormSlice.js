import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    form: "stocklist",
  },
  reducers: {
    stocklist: (state) => {
      state.form = "stocklist"
    },
    inout: (state) => {
      state.form = "inout"
    },
    master_inventory: (state) => {
      state.form = "master_inventory"
    },
    master_category: (state) => {
      state.form = "master_category"
    },
  },
});

export const { stocklist, inout, master_inventory, master_category } = formSlice.actions;

export default formSlice.reducer;