import axios from "axios";

const API_URL = "https://eauth.onrender.com/books";

const createBook = async (bookData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, bookData, config);
  return response.data;
};

const getBooks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};
const deleteBook = async (bookId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/${bookId}`, config);
  return response.data;
};
const updateBook = async (bookId, bookData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(`${API_URL}/${bookId}`, bookData, config);
  return response.data;
};
const bookService = {
  createBook,
  getBooks,
  deleteBook,
  updateBook,
};

export default bookService;
