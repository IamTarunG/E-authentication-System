import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../features/auth/authSlice";
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
    return <h1>Loading...</h1>;
  }
  return (
    <div className="flex flex-col h-screen justify-evenly items-center">
      <div>
        <input
          type="text"
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
        <button
          onClick={onLogin}
          className="bg-blue-400 px-6 py-1 text-white font-bold rounded-sm"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
