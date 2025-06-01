import { useEffect, useState } from 'react';
import axios from "axios";

export default function HeroSection() {
  const [userName, setUserName] = useState('');
  const API_URL = process.env.REACT_APP_BE_URL;
  useEffect(() => {
    axios.get(`${API_URL}/api/students/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      withCredentials: true
    })
    .then(response => {
      const data = response.data;
      if (data && data.name) {
        setUserName(data.name);
      }
    })
    .catch(error => {
      console.error('Error fetching user profile:', error);
    });
  }, []);

  return (
    <div className="hero-container" style={{ paddingTop: '70px' }}> 
      <section className="hero-section">
        <div className="hero-decor hero-decor-bottom-left-1"></div>
        <div className="hero-decor hero-decor-bottom-left-2"></div>
        <div className="hero-decor hero-decor-bottom-right-1"></div>
        <div className="hero-decor hero-decor-bottom-right-2"></div>

        <div className="hero-content">
          <h1 className="hero-title">
            {userName ? `Welcome ${userName} to EduGrow!` : 'Welcome to EduGrow!'}
          </h1>
          <h2 className="hero-subtitle">We’re thrilled to have you on this learning journey</h2>
          <hr className="hero-divider" />
          <p className="hero-description">
            Set your goals, track your progress, and achieve success along the way!
          </p>
        </div>
      </section>
    </div>
  );
}
