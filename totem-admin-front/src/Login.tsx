import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Parse from "./database.d.ts";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const query = new Parse.Query("Admin");
      query.equalTo("admin_email", email);
      query.equalTo("admin_hashed_password", password);
      const result = await query.first();

      if (result) {
        console.log("Login successful");
        setSuccess(true);
      } else {
        console.log("Invalid email or password");
        setError("Invalid email or password");
      }
    } catch {
      console.log("An error occured");
      setError("An error occured");
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 w-100">
      <div
        className="card p-4 shadow-lg"
        style={{ width: "100%", maxWidth: "450px" }}
      >
        <h2 className="text-center mb-4">Log in to your account</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">Login successful</div>}

        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn btn-primary mx-auto d-block"
            style={{ width: "100px" }}
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
