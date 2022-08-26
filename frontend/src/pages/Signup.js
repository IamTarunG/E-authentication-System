import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Signup() {
  const [formData, setFromData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (state.isError) {
      console.log(state.message);
      toast(state.message)
    }
    if (state.isSuccess || state.user) {
      navigate("/auth");
    }
    dispatch(reset());
  }, [
    state.message,
    state.isError,
    state.isSuccess,
    dispatch,
    navigate,
    state.user,
  ]);
  const register = () => {
    if (formData.password !== formData.cpassword) {
      console.log("Password did not match");
      toast('Passwords did not match')
    } else {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      dispatch(signup(userData));


    }

  };
  if (state.isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <Navbar />
      <div className="flex flex-col h-screen justify-evenly items-center">
        <p className="text-2xl">E authentication System</p>
        <div className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 h-96 justify-evenly w-1/5">
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setFromData({ ...formData, name: e.target.value })}
            value={formData.name}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <input
            type="email"
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
          <input
            type="password"
            placeholder="Confirmpassword"
            onChange={(e) =>
              setFromData({ ...formData, cpassword: e.target.value })
            }
            value={formData.cpassword}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            onClick={register}
            className="bg-blue-400 px-6 py-1 text-white font-bold rounded-sm"
          >
            Register
          </button>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Signup;
