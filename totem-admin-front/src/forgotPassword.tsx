import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reset link sent to email: ", email);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 shadow-lg"
        style={{ width: "100%", maxWidth: "400px", borderRadius: "12px" }}
      >
        {/* Back Button */}
        <button
          className="btn btn-light mb-3 d-flex align-items-center justify-content-center"
          onClick={() => navigate("/")}
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "60%",
            padding: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 5px rgba(18, 1, 1, 0.1)",
          }}
        >
          ←
        </button>
        <h3 className="fw-bold">Forgot password</h3>
        <p className="text-muted">
          Please enter your email to reset the password
        </p>
        <form onSubmit={handleReset}>
          {/* Email Input */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Your Email</label>
            <input
              type="email"
              className="form-control p-3"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ borderRadius: "8px" }}
            />
          </div>

          {/* Reset Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 p-3"
            disabled={!email}
            style={{
              color: "#000000",
              backgroundColor: "#DECBB7",
              borderRadius: "8px",
              border: "none",
              cursor: email ? "pointer" : "not-allowed",
              opacity: email ? 1 : 0.6,
            }}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
