import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import bookReducer from "../features/books/bookSlice";
import otpReducer from '../features/otp/otpSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    book: bookReducer,
    otp: otpReducer
  },
});
