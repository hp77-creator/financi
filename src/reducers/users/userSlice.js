import { createSlice  } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "counter",
  initialState: {
    transaction: [],
    convertedData: [],
    tags: {},
    openingBalance: 0,
    closingBalance: 0,
  },
  reducers: {
    addTransactions: (state, action) => {
      let arr = [...action.payload];
      state.transaction = arr;
    },
    addConvertedData: (state, action) => {
      let arr = [...action.payload];
      state.convertedData = arr;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTransactions, addConvertedData } =
  userSlice.actions;

export default userSlice.reducer;
