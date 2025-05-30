import { useState } from 'react';
import axios from 'axios';

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

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
      alert("Please fill in all fields.");
      return;
    }

    if (passwords.new.length < 8) {
      alert("New password must be at least 8 characters.");
      return;
    }

    if (passwords.new !== passwords.confirm) {
      alert("Password confirmation does not match.");
      return;
    }

    setIsLoading(true);
    setApiError(null);
    setSuccessMessage(null);

    const payload = {
      current_password: passwords.current,
      new_password: passwords.new,
      new_password_confirmation: passwords.confirm,
    };

    try {
      const data = await apiPut('http://localhost:8000/api/changePassword', payload);
      setSuccessMessage("Password changed successfully!");
      setPasswords({ current: '', new: '', confirm: '' });
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to change password.';
      setApiError(message);
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

      {apiError && <p className="error-message">{apiError}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

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
    </section>
  );
};

export default ChangePassword;
