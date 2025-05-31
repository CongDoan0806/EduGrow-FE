import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.REACT_APP_BE_URL;
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_URL}/api/students/achievements`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAchievements(res.data.achievements || []);
      } catch (error) {
        console.error('Failed to fetch achievements:', error);
        setAchievements([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  if (loading) {
    return <div>Loading achievements...</div>;
  }

  return (
    <div className="achievement-container">
      <div className="achievement-header">
        <div>
          <h2 className='achievement-title'>Achievements</h2>
          <p className='achievement-subtitle'>Uploaded Achievements</p>
        </div>
        <Link to="/student/uploadachievement">
          <button className="create-button">Create</button>
        </Link>
      </div>

      <div className="achievement-grid">
        {achievements.length === 0 ? (
          <p>No achievements found.</p>
        ) : (
          achievements.map((item, index) => (
            <div className="achievement-card" key={index}>
              <img src={item.file_path} alt={item.title} className="certificate-img" />
              <h3 className='item-title'>{item.title}</h3>
              <p className="description">{item.description}</p>
              <p className="date">{new Date(item.date_achieved).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
