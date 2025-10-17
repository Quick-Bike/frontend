import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserInfo {
  userId: string;
  name: string;
  myOrders: any[]; // specify the order type if possible, avoid empty []
  myCoin: number;
  email: string | null;
  mobileNo: string | null;
  // add other optional fields as needed
}

interface UserState {
  userInfo: UserInfo | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  userInfo: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserInfo>) {
      state.userInfo = action.payload;
      state.isLoggedIn = true;
      console.log("User set:", state.userInfo);
    },
    clearUser(state) {
      state.userInfo = null;
      state.isLoggedIn = false;
    },
  },
});

export const userSliceActions = userSlice.actions;
export default userSlice.reducer;
