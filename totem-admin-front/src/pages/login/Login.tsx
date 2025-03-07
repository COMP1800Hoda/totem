import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Parse from '../../database';
import { Link } from 'react-router-dom';
import bcrypt from 'bcryptjs';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const query = new Parse.Query('Admin');
      query.equalTo('admin_email', email);
      console.log(email);
      const admin = await query.first();
      console.log(admin);
      if (!admin) {
        console.log('Email not found');
        setError('Email not found');
        return;
      }

      //Get the hashed password from db
      const hashedPassword = admin.get('admin_hashed_password');
      const isMatch = await bcrypt.compare(password, hashedPassword);
      if (isMatch) {
        console.log('Login successful');
        setSuccess(true);
      } else {
        console.log('Incorrect password');
        setError('Incorrect password');
      }
    } catch (error) {
      console.log('An error occured: ', error);
      setError('An error occured. Please try again');
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
            <Link to="/forgotPassword">Forgot password?</Link>
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
