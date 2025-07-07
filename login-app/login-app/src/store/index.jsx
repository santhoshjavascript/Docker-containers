import { configureStore } from "@reduxjs/toolkit";
import userAuth from "../features/authentication/redux/user.Slice";

const store = configureStore({
  reducer: {
    credential: userAuth,
  },
});

export default store;
