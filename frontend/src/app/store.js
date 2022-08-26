import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import bookReducer from "../features/books/bookSlice";
import otpReducer from '../features/otp/otpSlice'
import verifyOTPReducer from '../features/verifyotp/verifySlice'
import resendOTPReducer from '../features/resendotp/resendSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    book: bookReducer,
    otp: otpReducer,
    verifyOTP: verifyOTPReducer,
    resendOTP: resendOTPReducer
  },
});
