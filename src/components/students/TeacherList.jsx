import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8000/api/teachers')
      .then(response => {
        setTeachers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Lỗi khi lấy danh sách giáo viên:', error);
        setError('Không thể tải danh sách giáo viên. Vui lòng thử lại sau.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Đang tải danh sách giáo viên...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <section className="teacher-section">
      <h2>Our Teachers</h2>
      <div className="teachers-container">
        {teachers.length > 0 ? (
          teachers.map((teacher) => (
            <div key={teacher.teacher_id} className="teacher-card">
              <img
                src={teacher.image}
                alt={teacher.name}
                className="teacher-image"
              />
              <h5 className="teacher-title">{teacher.title}</h5>
              <h4 className="teacher-name">{teacher.name}</h4>
              <div className="social-links">
                <a href={teacher.facebook} target="_blank" rel="noopener noreferrer" className="social-link"><FaFacebook size={20} /></a>
                <a href={teacher.linkedin} target="_blank" rel="noopener noreferrer" className="social-link"><FaLinkedin size={20} /></a>
                <a href={teacher.twitter} target="_blank" rel="noopener noreferrer" className="social-link"><FaTwitter size={20} /></a>
              </div>
            </div>
          ))
        ) : (
          <p>Không có giáo viên nào.</p>
        )}
      </div>
    </section>
  );
};

export default TeacherList;