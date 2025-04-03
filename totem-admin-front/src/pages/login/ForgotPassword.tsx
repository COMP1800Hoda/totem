import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Parse from '../../database';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    // Let browser handle validation if the field is empty
    if (!email) return;

    try {
      const query = new Parse.Query('Admin');
      query.equalTo('admin_email', email);
      const adminUser = await query.first();
      if (!adminUser) {
        setMessage('Email not found');
        console.log('Email not found');
        return;
      }

      // change this based on the port
      const response = await fetch(
        'https://totemadmin-fkrivn3y.b4a.run/reset-password-request',
        // 'http://localhost:8080/reset-password-request',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        setMessage('Password reset link sent. Check your email.');
        // navigate("/confirmPage");
      } else {
        console.log('An error occured', response.statusText);
        setMessage('An error occured');
      }
      // navigate("/confirmPage");
    } catch (error) {
      console.log('An error occured', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 shadow-lg"
        style={{
          width: '100%',
          maxWidth: '400px',
          borderRadius: '12px',
          backgroundColor: '#F8F0E9',
        }}
      >
        {/* Back Button */}
        <button
          className="btn btn-light mb-3 d-flex align-items-center justify-content-center"
          onClick={() => navigate('/')}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '60%',
            padding: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 5px rgba(18, 1, 1, 0.1)',
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
              style={{ borderRadius: '8px' }}
            />
          </div>

          {/* Reset Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 p-3"
            onClick={handleReset}
            style={{
              color: '#000000',
              backgroundColor: '#DECBB7',
              borderRadius: '8px',
              border: 'none',
              cursor: email ? 'pointer' : 'not-allowed',
              opacity: email ? 1 : 0.6,
            }}
          >
            Reset Password
          </button>
          {message && <p className="mt-2">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
