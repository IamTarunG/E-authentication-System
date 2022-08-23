import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Qrcode from "./pages/qrcode";
import Signup from "./pages/Signup";
import Verify from "./pages/Verify";
function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth" element={<Qrcode />} />
          <Route path="/verify" element={<Verify />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
