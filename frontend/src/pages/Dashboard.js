import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import BookForm from "../components/BookForm";
import { getBooks, deleteBook } from "../features/books/bookSlice";
function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { books, isError, message } = useSelector((state) => state.book);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    dispatch(getBooks());
  }, [navigate, books, isError, message, dispatch, user]);

  return (
    <div>
      <h2 className="text-3xl align-middle text-center my-10">
        Welcome {user && user.name}
      </h2>
      <BookForm />
      {books.map((book) => {
        return (
          <div key={book._id} className="flex justify-evenly items-center my-5">
            <p>{book.title}</p>
            <p>{book.author}</p>
            <p>{book.price}</p>
            <div>{new Date(book.createdAt).toLocaleString("en-US")}</div>
            <button
              onClick={() => dispatch(deleteBook(book._id))}
              className="bg-red-400 px-6 py-1 text-white font-bold rounded-sm"
            >
              Delete
            </button>

            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default Dashboard;
