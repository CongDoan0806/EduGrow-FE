import React from 'react';
import './Footer.css'; // Nếu bạn muốn tách CSS ra file riêng

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-decor left">
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
      </div>

      <p className="footer-text">© 2025 Student Progress Tracker. All rights reserved.</p>

      <div className="footer-decor right">
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
      </div>
    </footer>
  );
};

export default Footer;
