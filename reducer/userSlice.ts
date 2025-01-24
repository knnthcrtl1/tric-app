import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserAuthInfo {
  email?: string;
  phone?: string;
  address?: string;
}

export interface CounterState {
  userAuthInfo: UserAuthInfo | any;
}

const initialState: CounterState = {
  userAuthInfo: {},
};

export const counterSlice = createSlice({
  name: "userS",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserAuthInfo>) => {
      state.userAuthInfo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserInfo } = counterSlice.actions;

export default counterSlice.reducer;
