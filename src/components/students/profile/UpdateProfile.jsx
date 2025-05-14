import { useState, useEffect } from 'react';
import axios from 'axios';

const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
};

const UpdateProfile = () => {
  const [profile, setProfile] = useState({ name: '', phone: '', avatar: null });
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const getAuthHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });

  const apiPut = async (url, data) => {
    try {
      const headers = { ...getAuthHeader() };
      const response = await axios.put(url, data, { headers, withCredentials: true });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:8000/api/profile', {
          headers: getAuthHeader(),
          withCredentials: true,
          signal: controller.signal,
        });
        setProfile({
          name: response.data.name,
          phone: response.data.phone || '',
          avatar: response.data.avatar
            ? `http://localhost:8000/${response.data.avatar}`
            : null,
        });
      } catch (err) {
        if (!axios.isCancel(err)) {
          setApiError('Failed to load profile data.');
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
    return () => controller.abort();
  }, []);

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const previewImage = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/') || file.size > 5 * 1024 * 1024) {
      alert('Invalid image file.');
      return;
    }
    if (profile.avatar?.startsWith('blob:')) URL.revokeObjectURL(profile.avatar);
    setImageFile(file);
    setProfile({ ...profile, avatar: URL.createObjectURL(file) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setApiError(null);
    setSuccessMessage('');

    try {
      let base64Avatar = null;
      if (imageFile) {
        base64Avatar = await convertFileToBase64(imageFile);
      }

      const payload = {
        name: profile.name.trim(),
        phone: profile.phone.trim(),
        avatar: base64Avatar,
      };

      const response = await apiPut('http://localhost:8000/api/profile', payload);
      setSuccessMessage('Profile updated successfully!');
      if (response.user?.avatar) {
        setProfile((prev) => ({
          ...prev,
          avatar: `http://localhost:8000/${response.user.avatar}`,
        }));
      }
    } catch (error) {
      setApiError(error.response?.data?.message || 'Failed to update profile.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="student-profile-container">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Processing...</p>
        </div>
      )}

      {apiError && <p className="error-message">{apiError}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

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
              <div className="profile-image-placeholder">No Image Selected</div>
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
    </div>
  );
};

export default UpdateProfile;
