import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import Parse from '../../database';
import bcrypt from 'bcryptjs';
import { jwtDecode } from 'jwt-decode';
import { checkTokenAndRedirect, getToken } from '../../utils/tokenUtils.js';
import { Header } from '../../components/header/Header.js';
const ChangePassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState<string | ''>('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true); // prevent rendering before token check
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      checkTokenAndRedirect();
      setIsCheckingToken(false); // Set to false after token check
    };
    checkToken();
  }, []);

  useEffect(() => {
    if (isCheckingToken) return; // Prevent rendering until token check is complete
    const token = getToken(); // Get the token from local storage
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const adminEmail = decodedToken?.email;
        setEmail(adminEmail || '');
        console.log('Email from token:', adminEmail);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      console.log('No token found');
      setError('No token found'); // Handle case where token is not found
      navigate('/'); // Redirect to login if no token is found
    }
  }, [isCheckingToken]);

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
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
        setMessage('Admin not found. Cannot Change Password');
        console.log('Admin not found. Cannot Change Password');
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
          navigate('/main');
        }, 2000);
      });
    } catch (error) {
      setMessage('An error occured');
      console.log('An error occured: ', error);
    }
  };

  //Check if the token is being checked or if there is an error
  if (isCheckingToken) return null; // Prevent rendering UI until token check is complete
  if (error) navigate('/'); // Redirect to login if there's an error
  return (
    <div className="d-flex justify-content-center vh-100 w-100 align-items-start">
      <Header />
      <div
        style={{
          marginTop: '8rem',
          width: '75%',
          maxWidth: '400px',
        }}
      >
        {success && (
          <div className="alert alert-success">
            Password updated successfully
          </div>
        )}
        <h3 className="fw-bold">Change password</h3>
        <form onSubmit={handleChangePassword}>
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

          {/* Buttons */}
          <div className="d-flex justify-content-center gap-3 mt-3">
            <button
              type="button"
              className="btn"
              style={{
                color: '#000000',
                width: '120px',
                height: '50px',
                fontSize: '18px',
                backgroundColor: '#E0E0E0',
                cursor: 'pointer',
              }}
              onClick={() => {
                // Add your cancel logic here, for example:
                navigate('/main');
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn"
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
          </div>

          {message && <p className="mt-2">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
