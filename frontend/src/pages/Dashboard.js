import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import BookForm from "../components/BookForm";
import { getBooks, deleteBook } from "../features/books/bookSlice";
import Navbar from "../components/Navbar";
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
      <Navbar />
      <h2 className="text-3xl align-middle text-center my-10">
        Welcome {user && user.name}
      </h2>
      <BookForm />


      <table class="table w-full">

        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            books.map((book) => {
              return (
                <tr key={book._id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.price}</td>
                  <td>{new Date(book.createdAt).toLocaleString("en-US")}</td>
                  <td><button
                    onClick={() => dispatch(deleteBook(book._id))}
                    className="bg-red-400 px-6 py-1 text-black font-bold rounded-sm"
                  >
                    Delete
                  </button></td>
                </tr>
              )
            })
          }

        </tbody>
      </table>



    </div >
  );
}

export default Dashboard;
