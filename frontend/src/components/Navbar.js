import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  // const { otpResp, isLoading } = useSelector((state) => state.otp)
  // const { verifyResp } = useSelector((state) => state.verifyOTP)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate("/");
  };
  return (
    <div className="flex justify-evenly py-6 ring-1 ring-black ring-opacity-5 focus:outline-none rounded-md shadow-lg bg-white">
      <Link to="/" className="text-gray-800 hover:bg-blue-600 hover:text-white block px-3 py-2 rounded-md font-semibold text-xl">
        Books
      </Link>
      {user ? (
        <button onClick={onLogout} className="text-gray-800 hover:bg-red-400 hover:text-white block px-3 py-2 rounded-md font-semibold text-lg">Logout</button>
      ) : (
        <div className="flex justify-evenly w-1/2">
          <Link to="/signup" className="text-gray-600 hover:bg-blue-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Register
          </Link>
          <Link to="/login" className="text-gray-600 hover:bg-blue-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Login
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
