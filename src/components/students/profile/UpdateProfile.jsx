import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UpdateProfile.css';

const UpdateProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  useEffect(() => {
    axios.get('https://6809104e1f1a52874cdbc8bb.mockapi.io/apiCamera/Product/3')
      .then(res => {
        const data = res.data;
        setProfile({
          name: data.title,
          email: data.description,
          phone: '0123456789',
          avatar: data.icon,
        });
      });
  }, []);

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const previewImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setProfile({ ...profile, avatar: URL.createObjectURL(file) });
    }
  };

  const togglePassword = (e) => {
    const input = e.target.closest('.password-input-wrapper').querySelector('input');
    input.type = input.type === 'password' ? 'text' : 'password';
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', profile.name);
    formData.append('email', profile.email);
    formData.append('phone', profile.phone);
    if (imageFile) formData.append('avatar', imageFile);

    try {
      await axios.put('https://6809104e1f1a52874cdbc8bb.mockapi.io/apiCamera/Product/1', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Profile updated!');
    } catch (err) {
      alert('Update failed.');
    }
  };

  return (
    <div className="student-profile-container" style={{ maxWidth: '900px', marginLeft: 'auto' }}>
      <section className="profile-section">
        <h2 className="section-title">My Profile</h2>
        <div className="profile-content">
          <div className="profile-form">
            <label className="form-label">User name</label>
            <input type="text" name="name" className="form-input" value={profile.name} onChange={handleInputChange} />

            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-input" value={profile.email} onChange={handleInputChange} />

            <label className="form-label">Phone Number</label>
            <input type="text" name="phone" className="form-input" value={profile.phone} onChange={handleInputChange} />

            <button className="btn save-btn" onClick={handleSubmit}>Save Changes</button>
          </div>

          <div className="profile-image-section">
            <img src={profile.avatar} alt="Profile" className="profile-image" />
            <label htmlFor="imageUpload" className="btn image-btn">Choose Image</label>
            <input type="file" id="imageUpload" accept="image/*" style={{ display: 'none' }} onChange={previewImage} />
          </div>
        </div>
      </section>

      <section className="password-section">
        <h2 className="section-title">Change Password</h2>

        <div className="form-group">
          <label className="form-label">Current Password</label>
          <input type="password" name="current" className="form-input" value={passwords.current} onChange={handlePasswordChange} />
        </div>

        <div className="password-row">
          <div className="form-group half-width">
            <label className="form-label">New Password</label>
            <div className="password-input-wrapper">
              <input type="password" name="new" className="form-input" value={passwords.new} onChange={handlePasswordChange} />
              <span className="toggle-icon" onClick={togglePassword}>
                👁
              </span>
            </div>
          </div>

          <div className="form-group half-width">
            <label className="form-label">Confirm Password</label>
            <div className="password-input-wrapper">
              <input type="password" name="confirm" className="form-input" value={passwords.confirm} onChange={handlePasswordChange} />
              <span className="toggle-icon" onClick={togglePassword}>
                👁
              </span>
            </div>
          </div>
        </div>

        <button className="btn">Change Password</button>
      </section>
    </div>
  );
};

export default UpdateProfile;
