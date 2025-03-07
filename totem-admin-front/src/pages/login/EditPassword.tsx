import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import Parse from '../../database';
import bcrypt from 'bcryptjs';

const EditPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailFromURL = params.get('email');
    console.log('Email from URL:', emailFromURL);
    if (emailFromURL) {
      setEmail(emailFromURL);
    }
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
      console.log('Email:', email);
      const query = new Parse.Query('Admin');
      query.equalTo('admin_email', email);
      const admin = await query.first();
      if (!admin) {
        setMessage('Admin not found');
        console.log('Admin not found');
        return;
      }

      // Hash the new password
      const saltRounds = 10;
      bcrypt.hash(newPassword, saltRounds, async (err, hashedPassword) => {
        if (err) {
          console.log('Error generating salt: ', err);
          setMessage('An error occured');
          return;
        }
        console.log('Hashed password: ', hashedPassword);

        admin.set('admin_hashed_password', hashedPassword);
        await admin.save();
        setSuccess(true);
        console.log('Password updated successfully');
        setTimeout(() => {
          navigate('/confirmPage');
        }, 2000);
      });
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
