import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
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
    <div className="flex flex-col h-screen justify-evenly items-center">
      <div>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setFromData({ ...formData, name: e.target.value })}
          value={formData.name}
          className="border-2 rounded-sm border-blue-400 px-4 py-2 mx-4"
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setFromData({ ...formData, email: e.target.value })}
          value={formData.email}
          className="border-2 rounded-sm border-blue-400 px-4 py-2 mx-4"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setFromData({ ...formData, password: e.target.value })
          }
          value={formData.password}
          className="border-2 rounded-sm border-blue-400 px-4 py-2 mx-4"
        />
        <input
          type="password"
          placeholder="Confirmpassword"
          onChange={(e) =>
            setFromData({ ...formData, cpassword: e.target.value })
          }
          value={formData.cpassword}
          className="border-2 rounded-sm border-blue-400 px-4 py-2 mx-4"
        />
        <button
          onClick={register}
          className="bg-blue-400 px-6 py-1 text-white font-bold rounded-sm"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Signup;
