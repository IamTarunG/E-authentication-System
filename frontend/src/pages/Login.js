import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { login, reset } from "../features/auth/authSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from "../components/Spinner";
function Login() {
  const [formData, setFromData] = useState({
    email: "",
    password: "",
  });
  const { isSuccess, isError, isLoading, user, message } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (isError) {
      console.log(message);
      toast(message)
    }
    if (isSuccess || user) {
      navigate("/auth");
    }
    dispatch(reset());
  }, [isError, isLoading, isSuccess, message, user, navigate, dispatch]);
  const onLogin = () => {
    const userData = {
      email: formData.email,
      password: formData.password,
    };
    dispatch(login(userData));
  };
  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <Navbar />
      <div className="flex flex-col h-screen justify-evenly items-center">
        <p className="text-2xl">E-Authentication System</p>
        <div className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 h-72 justify-evenly w-1/5">
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setFromData({ ...formData, email: e.target.value })}
            value={formData.email}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setFromData({ ...formData, password: e.target.value })
            }
            value={formData.password}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            onClick={onLogin}
            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Login
          </button>
        </div>

      </div>
    </>
  );
}

export default Login;
