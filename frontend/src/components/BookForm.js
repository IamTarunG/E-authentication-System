import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBook } from "../features/books/bookSlice";

function GoalForm() {
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
    <div className="text-center">
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
        value={bookData.title}
        className="border-2 rounded-sm border-blue-400 px-4 py-2 mx-4"
      />
      <input
        type="text"
        placeholder="Author"
        onChange={(e) => setBookData({ ...bookData, author: e.target.value })}
        value={bookData.author}
        className="border-2 rounded-sm border-blue-400 px-4 py-2 mx-4"
      />
      <input
        type="text"
        placeholder="Price"
        onChange={(e) => setBookData({ ...bookData, price: e.target.value })}
        value={bookData.price}
        className="border-2 rounded-sm border-blue-400 px-4 py-2 mx-4"
      />
      <button
        onClick={addBook}
        className="bg-blue-400 px-6 py-1 text-white font-bold rounded-sm"
      >
        Add Book
      </button>
    </div>
  );
}

export default GoalForm;
