import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import verifyService from "./verifyService";

const initialState = {
    verifyResp: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
};

export const verifyOTP = createAsyncThunk(
    "/create/verifyOTP",
    async (inputOTP, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await verifyService.verifyOTP(inputOTP, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);



export const verifySlice = createSlice({
    name: "verifyOTP",
    initialState,
    reducers: {
        reset: (state) => {
            state.verifyResp = null;
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(verifyOTP.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(verifyOTP.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true;
                state.verifyResp = action.payload;

            })
            .addCase(verifyOTP.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

    },
});

export const { reset } = verifySlice.actions;
export default verifySlice.reducer;
