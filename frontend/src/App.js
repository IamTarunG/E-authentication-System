import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Qrcode from "./pages/qrcode";
import Signup from "./pages/Signup";
import Verify from "./pages/Verify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [result, setResult] = useState(null)
  const [otp, setOTP] = useState('')
  return (
    <div>
      <Router>
        {/* <Navbar result={result} otp={otp} /> */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth" element={<Qrcode result={result} setResult={setResult} />} />
          <Route path="/verify" element={<Verify result={result} otp={otp} setOTP={setOTP} />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
