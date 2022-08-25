import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import otpService from "./otpService";

const initialState = {
    otpResp: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
};
export const getOTP = createAsyncThunk("get/otp", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await otpService.getOTP(token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
export const otpSlice = createSlice({
    name: "otp",
    initialState,
    reducers: {
        reset: (state) => {
            state.otpResp = null;
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOTP.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOTP.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.otpResp = action.payload;

            })
            .addCase(getOTP.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

    },
});


export const { reset } = otpSlice.actions;
export default otpSlice.reducer;