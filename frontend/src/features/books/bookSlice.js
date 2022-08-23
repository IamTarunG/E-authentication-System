import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bookService from "./bookService";

const initialState = {
  books: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const createBook = createAsyncThunk(
  "/create/book",
  async (bookData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookService.createBook(bookData, token);
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
export const getBooks = createAsyncThunk("get/book", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await bookService.getBooks(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const deleteBook = createAsyncThunk(
  "delete/book",
  async (bookId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookService.deleteBook(bookId, token);
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
export const updateBook = createAsyncThunk(
  "update/book",
  async (bookId, bookData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookService.updateBook(bookId, bookData, token);
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
export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    reset: (state) => {
      state.books = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books.push(action.payload);
      })
      .addCase(createBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books = action.payload;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books.filter((book) => {
          return book._id !== action.payload.id;
        });
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = true;
        state.message = action.payload;
      })
      .addCase(updateBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books.map((book) => {
          return book._id === action.payload.id ? action.payload : book;
        });
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = bookSlice.actions;
export default bookSlice.reducer;
