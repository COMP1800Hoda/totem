import React from "react";
import Login from "./Login.tsx"; // No need for .js extension in TypeScript
import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 w-100">
      <Login />
    </div>
  );
};

export default App;
