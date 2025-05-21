import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProfile = () => {
  const [profile, setProfile] = useState({ name: '', phone: '', avatar: null });
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getAuthHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });

  useEffect(() => {
    const controller = new AbortController();

    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:8000/api/profile', {
          headers: getAuthHeader(),
          signal: controller.signal,
        });
        setProfile({
          name: response.data.name,
          phone: response.data.phone || '',
          avatar: response.data.avatar || null,
        });
      } catch (err) {
        if (!axios.isCancel(err)) {
          toast.error('Failed to load profile data.');
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
      toast.error('Invalid image file (max 5MB)');
      return;
    }
    if (profile.avatar?.startsWith('blob:')) URL.revokeObjectURL(profile.avatar);
    setImageFile(file);
    setProfile({ ...profile, avatar: URL.createObjectURL(file) });
  };

  const handleTextSubmit = async () => {
    setIsLoading(true);
    try {
      const payload = {
        name: profile.name.trim(),
        phone: profile.phone.trim(),
      };
      await axios.put('http://localhost:8000/api/profile/text', payload, {
        headers: getAuthHeader(),
      });
      toast.success('Profile information updated!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update info.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarSubmit = async () => {
    if (!imageFile) {
      toast.info('Please select an image first.');
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('avatar', imageFile);

      const response = await axios.post('http://localhost:8000/api/profile/avatar', formData, {
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Avatar updated successfully!');
      setProfile((prev) => ({
        ...prev,
        avatar: response.data.user.avatar,
      }));
      setImageFile(null);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to upload avatar.');
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

            <button className="action-save-btn" onClick={handleTextSubmit} disabled={isLoading}>
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
            <button className="btn upload-btn" onClick={handleAvatarSubmit} disabled={isLoading || !imageFile}>
              Upload Image
            </button>
          </div>
        </div>
      </section>

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
    </div>
  );
};

export default UpdateProfile;