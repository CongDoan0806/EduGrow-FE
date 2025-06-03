import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const API_URL = process.env.REACT_APP_BE_URL;
  const getAuthHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });

  const apiPut = async (url, payload) => {
    try {
      const headers = {
        ...getAuthHeader(),
        'Content-Type': 'application/json',
      };
      const response = await axios.put(url, payload, {
        headers,
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleChangePassword = async () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      toast.warn("Please fill in all fields.");
      return;
    }

    if (passwords.new.length < 8) {
      toast.warn("New password must be at least 8 characters.");
      return;
    }

    if (passwords.new !== passwords.confirm) {
      toast.warn("Password confirmation does not match.");
      return;
    }

    setIsLoading(true);

    const payload = {
      current_password: passwords.current,
      new_password: passwords.new,
      new_password_confirmation: passwords.confirm,
    };

    try {
      await apiPut(`${API_URL}/api/students/profile/password`, payload);
      toast.success("Password changed successfully!");
      setPasswords({ current: '', new: '', confirm: '' });
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to change password.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <section className="password-section">
      <h2 className="section-title">Change Password</h2>

      <div className="form-group">
        <label className="form-label">Current Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          name="current"
          placeholder="Current Password"
          value={passwords.current}
          onChange={handlePasswordChange}
          className="form-input"
        />
      </div>

      <div className="password-row">
        <div className="form-group half-width">
          <label className="form-label">New Password</label>
          <div className="password-input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              name="new"
              placeholder="New Password"
              value={passwords.new}
              onChange={handlePasswordChange}
              className="form-input"
            />
            <span className="toggle-icon" onClick={togglePassword}>👁</span>
          </div>
        </div>

        <div className="form-group half-width">
          <label className="form-label">Confirm Password</label>
          <div className="password-input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirm"
              placeholder="Confirm Password"
              value={passwords.confirm}
              onChange={handlePasswordChange}
              className="form-input"
            />
            <span className="toggle-icon" onClick={togglePassword}>👁</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleChangePassword}
        disabled={isLoading}
        className="btn submitPassword-btn"
      >
        {isLoading ? 'Processing...' : 'Change Password'}
      </button>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </section>
  );
};

export default ChangePassword;
