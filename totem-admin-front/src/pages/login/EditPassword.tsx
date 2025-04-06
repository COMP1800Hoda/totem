import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
const EditPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenParam = params.get('token');
    setToken(tokenParam);
  }, [location]);

  const handleEditPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/reset-password', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      });

      if (response.ok) {
        setSuccess(true);
        setMessage('Password updated successfully');
        setTimeout(() => {
          navigate('/confirm-page');
        }, 2000);
      }
    } catch (error) {
      setMessage('An error occured');
      console.log('An error occured: ', error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 w-100">
      <div
        className="card p-4 shadow-lg"
        style={{
          width: '100%',
          maxWidth: '400px',
          borderRadius: '12px',
          backgroundColor: '#F8F0E9',
        }}
      >
        {success && (
          <div className="alert alert-success">
            Password updated successfully
          </div>
        )}
        <h3 className="fw-bold">Set a new password</h3>
        <form onSubmit={handleEditPassword}>
          {/* New Password Input */}
          <label className="form-label">New Password:</label>
          <div className="mb-3">
            <input
              type="password"
              className="form-control p-2"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password Input */}
          <label className="form-label">Confirm Password:</label>
          <div className="mb-3">
            <input
              type="password"
              className="form-control p-2"
              placeholder="Re-enter your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="btn mx-auto d-block"
            style={{
              color: '#000000',
              width: '120px',
              height: '50px',
              fontSize: '18px',
              backgroundColor: '#DECBB7',
              cursor: 'pointer',
            }}
          >
            Save
          </button>
          {message && <p className="mt-2">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default EditPassword;
