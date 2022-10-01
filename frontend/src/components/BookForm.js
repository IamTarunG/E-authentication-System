import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBook } from "../features/books/bookSlice";

function BookForm() {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    price: "",
  });

  const dispatch = useDispatch();

  const addBook = () => {
    const newBook = {
      title: bookData.title,
      author: bookData.author,
      price: bookData.price,
    };
    dispatch(createBook(newBook));
    setBookData({
      title: "",
      author: "",
      price: "",
    });
  };
  return (
    <div className="flex flex-col h-90 justify-evenly items-center">
      <div className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 h-72 justify-evenly w-1/5">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
          value={bookData.title}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <input
          type="text"
          placeholder="Author"
          onChange={(e) => setBookData({ ...bookData, author: e.target.value })}
          value={bookData.author}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <input
          type="text"
          placeholder="Price"
          onChange={(e) => setBookData({ ...bookData, price: e.target.value })}
          value={bookData.price}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
          onClick={addBook}
          className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Add Book
        </button>
      </div>
    </div>
  );
}

export default BookForm;
