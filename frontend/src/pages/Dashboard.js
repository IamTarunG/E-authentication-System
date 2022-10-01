import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import BookForm from "../components/BookForm";
import { getBooks, deleteBook } from "../features/books/bookSlice";
import Navbar from "../components/Navbar";
import 'react-toastify/dist/ReactToastify.css';
function Dashboard() {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { books, isError, message } = useSelector((state) => state.book);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    // if (isSuccess || user) {
    //   toast('Logged In Successfully')
    // }
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
                    className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
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
