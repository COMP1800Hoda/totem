import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (success) {
      navigate('/main'); // Navigate only when success is true
    }
  }, [success, navigate]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:8080/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(
          data.message || 'Login failed. Please check your credentials.'
        );
        throw new Error(data.message || 'Login failed');
      }
      localStorage.setItem('token', data.token); // Store JWT in local storage
      //to send JWT in Authorization header for subsequent requests
      console.log('token: ', data.token);
      console.log('successful login');
      setSuccess(true);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          'Incorrect email or password. Please try again.'
      );
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 w-100">
      <div
        className="card p-4 shadow-lg"
        style={{ width: '100%', maxWidth: '450px', backgroundColor: '#F8F0E9' }}
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
              className="form-control p-2"
              placeholder="Enter your email"
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
              className="form-control p-2"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Forgot Password Link */}
          <div className="mb-3 text-end text-primary text-decoration-underline">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn mx-auto d-block"
            style={{
              color: '#000000',
              width: '120px',
              height: '50px',
              fontSize: '18px',
              backgroundColor: '#DECBB7',
            }}
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
