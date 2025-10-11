import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface UserInfo {
  // id: string;
  name: string;
  // email: string;
  myOrders: [];
  myCoins: number;
  // avatarUrl?: string;
  // add other fields as needed
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
      console.log("i was here", state.userInfo);
    },
    // userLogged(state) {
    //   state.isLoggedIn = false;
    // },
    clearUser(state) {
      state.userInfo = null;
      state.isLoggedIn = false;
    },
  },
});
export const userSliceACtion = userSlice.actions;
export default userSlice.reducer;
