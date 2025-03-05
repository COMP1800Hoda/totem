import React from "react";
import Login from "./login.tsx"; // No need for .js extension in TypeScript
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import ForgotPassword from "./forgotPassword.tsx";

const App: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 w-100">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
};

export default App;
