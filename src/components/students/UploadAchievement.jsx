import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadAchievement = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date_achieved: '',
    file: null
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ==== Validate CÁC Ô INPUT ====
    if (!formData.title.trim()) {
      toast.error('Achievement title is required');
      return;
    }

    if (!formData.description.trim()) {
      toast.error('Description is required');
      return;
    }

    if (!formData.date_achieved) {
      toast.error('Date is required');
      return;
    }

    if (!formData.file) {
      toast.error('Please select a file to upload');
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('date_achieved', formData.date_achieved);
    data.append('file', formData.file);

    setLoading(true);

    try {
      const res = await axios.post(
        '/api/achievements/uploadAchievement',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      toast.success('Achievement uploaded successfully');
      navigate('/student/achievement');
    } catch (error) {
      console.error(error);

      if (error.response?.status === 401) {
        toast.error('Unauthorized: Please log in again');
      } else {
        toast.error('Upload failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <ToastContainer />
        <div className="upload-achievement-container">
          <h2>Achievements</h2>
          <p className="subtitle">Upload New Achievement</p>
          <form className="achievement-form" onSubmit={handleSubmit}>
            <label>Achievement Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter achievement name"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <label>Description</label>
            <textarea
              name="description"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleChange}
              required
            />

            <label>Date Achieved</label>
            <input
              type="date"
              name="date_achieved"
              value={formData.date_achieved}
              onChange={handleChange}
              required
            />

            <label>Upload File</label>
            <input
              type="file"
              name="file"
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? 'Uploading...' : 'Upload Achievement'}
            </button>
          </form>
        </div>
      </div>
  );
};

export default UploadAchievement;