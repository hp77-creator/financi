import { createSlice, current } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "counter",
  initialState: {
    uid: "",
    email: "",
    isLoggedIn: false,
    user_name: "",
    transaction: [],
    convertedData: [],
    tags: {},
    openingBalance: 0,
    closingBalance: 0,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.email = action.payload.email;
      state.user_name = action.payload.username;
      state.uid = action.payload.uid;
      state.user_id = action.payload.user_id;
      state = {
        isLoggedIn: true,
        ...action.payload,
      };
    },
    addTags: (state, action) => {
      let obj = {};
      action.payload.forEach((element) => {
        obj[element.tag_id] = element;
      });
      state.tags = obj;
    },
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
export const { login, addTags, addTransactions, addConvertedData } =
  userSlice.actions;

export default userSlice.reducer;
