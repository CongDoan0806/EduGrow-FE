import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
import './TeacherList.css';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/teachers') //api zả
      .then(response => {
        setTeachers(response.data);
      })
      .catch(error => {
        console.error('Lỗi khi lấy danh sách giáo viên:', error);
      });
  }, []);

  return (
    <section className="teacher-section">
      <h2>Our Teachers</h2>
      <div className="teachers-container">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="teacher-card">
            <img
              src={teacher.image}
              alt={teacher.name}
              className="teacher-image"
            />
            <h5 className="teacher-title">{teacher.title}</h5>
            <h4 className="teacher-name">{teacher.name}</h4>
            <div className="social-links">
              <a href={teacher.facebook} className="social-link"><FaFacebook size={20} /></a>
              <a href={teacher.linkedin} className="social-link"><FaLinkedin size={20} /></a>
              <a href={teacher.twitter} className="social-link"><FaTwitter size={20} /></a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeacherList;
