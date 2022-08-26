import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import resendService from "./resendService";

const initialState = {
    resendResp: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
};
export const resendOTP = createAsyncThunk("get/resendotp", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        const data = await resendService.resndOTP(token)
        console.log(data)
        return await resendService.resndOTP(token);

    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
export const resendSlice = createSlice({
    name: "resendOTP",
    initialState,
    reducers: {
        reset: (state) => {
            state.resendResp = null;
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(resendOTP.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resendOTP.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.otpResp = action.payload;

            })
            .addCase(resendOTP.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

    },
});


export const { reset } = resendSlice.actions;
export default resendSlice.reducer;