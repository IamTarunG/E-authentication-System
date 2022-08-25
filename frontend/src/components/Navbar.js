import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const { verifyResp } = useSelector((state) => state.verifyOTP)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate("/");
  };
  return (
    <div className="bg-red-400 flex justify-evenly h-10 items-center">
      <Link to="/" className="text-xl">
        Books
      </Link>
      {user ? (
        <button onClick={onLogout}>Logout</button>
      ) : (
        <div className=" w-1/2 flex justify-evenly">
          <Link to="/signup" className="text-lg">
            Register
          </Link>
          <Link to="/login" className="text-lg">
            Login
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
