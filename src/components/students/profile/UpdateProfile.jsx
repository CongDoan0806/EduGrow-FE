import { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    avatar: null,
  });
  const [imageFile, setImageFile] = useState(null);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Helper function to get the token from localStorage and set it in the headers
  const getAuthHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });

  const getCSRFToken = () => {
    const token = document.querySelector('meta[name="csrf-token"]');
    return token ? token.getAttribute('content') : '';
  };

  // API GET helper function
  const apiGet = async (url) => {
    try {
      const response = await axios.get(url, {
        headers: {
          ...getAuthHeader(),
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error('Error in GET request:', error);
      throw error;
    }
  };

  // API PUT helper function
  const apiPut = async (url, data, isMultipart = false) => {
    try {
      const headers = {
        ...getAuthHeader(),
        'X-CSRF-TOKEN': getCSRFToken(),
      };
      
      if (isMultipart) {
        headers['Content-Type'] = 'multipart/form-data';
      }

      const response = await axios.put(url, data, { 
        headers,
        withCredentials: true 
      });
      return response.data;
    } catch (error) {
      console.error('Error in PUT request:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const data = await apiGet('http://localhost:8000/api/profile');
        setProfile({
          name: data.name,
          phone: data.phone || '',
          avatar: data.avatar || null,
        });
      } catch (err) {
        console.error('Error fetching profile:', err);
        setApiError('Failed to load profile data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const previewImage = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPEG, PNG, etc.)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('Image size should be less than 5MB');
      return;
    }

    // Clean up previous blob URL if exists
    if (profile.avatar?.startsWith('blob:')) {
      URL.revokeObjectURL(profile.avatar);
    }

    setImageFile(file);
    setProfile({ ...profile, avatar: URL.createObjectURL(file) });
  };

  const togglePassword = (e) => {
    const input = e.target.closest('.password-input-wrapper').querySelector('input');
    input.type = input.type === 'password' ? 'text' : 'password';
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setApiError(null);
    
    const formData = new FormData();
    formData.append('name', profile.name);
    formData.append('phone', profile.phone);
    if (imageFile) formData.append('avatar', imageFile);

    try {
      await apiPut('http://localhost:8000/api/profile', formData, true);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      setApiError(err.response?.data?.message || 'Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      alert("Please fill in all password fields.");
      return;
    }

    if (passwords.new.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    if (passwords.new !== passwords.confirm) {
      alert("New passwords do not match.");
      return;
    }

    setIsLoading(true);
    setApiError(null);

    try {
      await apiPut('http://localhost:8000/api/changePassword', {
        current_password: passwords.current,
        new_password: passwords.new,
      });
      alert("Password changed successfully.");
      setPasswords({ current: '', new: '', confirm: '' });
    } catch (err) {
      console.error('Error changing password:', err);
      setApiError(err.response?.data?.message || 'Failed to change password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="student-profile-container" style={{ maxWidth: '900px', marginLeft: 'auto' }}>
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Processing...</p>
        </div>
      )}

      {apiError && (
        <div className="error-message" style={{ color: 'red', marginBottom: '20px' }}>
          {apiError}
        </div>
      )}

      <section className="profile-section">
        <h2 className="section-title">My Profile</h2>
        <div className="profile-content">
          <div className="profile-form">
            <label className="form-label">User name</label>
            <input 
              type="text" 
              name="name" 
              className="form-input" 
              value={profile.name} 
              onChange={handleInputChange} 
            />

            <label className="form-label">Phone Number</label>
            <input 
              type="text" 
              name="phone" 
              className="form-input" 
              value={profile.phone} 
              onChange={handleInputChange} 
            />

            <button 
              className="btn save-btn" 
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

          <div className="profile-image-section">
            {profile.avatar ? (
              <img 
                src={profile.avatar} 
                alt="Profile" 
                className="profile-image" 
                onError={(e) => {
                  e.target.src = '/default-avatar.png';
                }}
              />
            ) : (
              <div className="profile-image-placeholder">
                No Image Selected
              </div>
            )}
            <label htmlFor="imageUpload" className="btn image-btn">
              {profile.avatar ? 'Change Image' : 'Choose Image'}
            </label>
            <input 
              type="file" 
              id="imageUpload" 
              accept="image/*" 
              style={{ display: 'none' }} 
              onChange={previewImage} 
            />
          </div>
        </div>
      </section>

      <section className="password-section">
        <h2 className="section-title">Change Password</h2>
        <div className="form-group">
          <label className="form-label">Current Password</label>
          <input 
            type="password" 
            name="current" 
            className="form-input" 
            value={passwords.current} 
            onChange={handlePasswordChange} 
          />
        </div>

        <div className="password-row">
          <div className="form-group half-width">
            <label className="form-label">New Password</label>
            <div className="password-input-wrapper">
              <input 
                type="password" 
                name="new" 
                className="form-input" 
                value={passwords.new} 
                onChange={handlePasswordChange} 
              />
              <span className="toggle-icon" onClick={togglePassword}>👁</span>
            </div>
          </div>

          <div className="form-group half-width">
            <label className="form-label">Confirm Password</label>
            <div className="password-input-wrapper">
              <input 
                type="password" 
                name="confirm" 
                className="form-input" 
                value={passwords.confirm} 
                onChange={handlePasswordChange} 
              />
              <span className="toggle-icon" onClick={togglePassword}>👁</span>
            </div>
          </div>
        </div>

        <button 
          className="btn" 
          onClick={handleChangePassword}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Change Password'}
        </button>
      </section>

      <style jsx>{`
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
          z-index: 1000;
        }
        
        .loading-spinner {
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top: 4px solid white;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin-bottom: 10px;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .profile-image-placeholder {
          width: 150px;
          height: 150px;
          border: 2px dashed #ccc;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default UpdateProfile;