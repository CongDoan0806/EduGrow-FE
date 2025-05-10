import { useEffect, useState } from 'react';
import axios from "axios";
export default function HeroSection() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Gọi API giả định
   axios.get("https://6809104e1f1a52874cdbc8bb.mockapi.io/apiCamera/Product")
  .then(response => {
    const data = response.data;
    if (data.length > 0) {
       setUserName(data[0].title);
    }
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

  }, []);

  return (
    <div>
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
