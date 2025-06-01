import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeacherDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = process.env.REACT_APP_BE_URL;
  useEffect(() => {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage

    if (!token) {
      setError('You are not authenticated. Please login.');
      setLoading(false);
      return;
    }

    axios.get(`${API_URL}/api/teacher/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm header Authorization
      }
    })
      .then(res => {
        if (res.data.success) {
          setDashboardData(res.data.data);
          setError(null);
        } else {
          setError('Failed to load dashboard data.');
        }
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          setError('Unauthorized. Please login again.');
          // Có thể redirect user về trang login ở đây
        } else {
          setError('Failed to load dashboard data.');
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="dashboard-title">Overview</h2>
      <div className="overview-grid">
        {[
          {
            number: dashboardData.class_count,
            icon: 'fa-book',
            label: 'Classes',
            green: true
          },
          {
            number: dashboardData.student_count,
            icon: 'fa-user-graduate',
            label: 'Students'
          },
          {
            number: dashboardData.activities_today ?? 0,
            icon: 'fa-calendar-check',
            label: 'Activities Today'
          },
          {
            number: dashboardData.subject ? dashboardData.subject.length : 0,
            icon: 'fa-graduation-cap',
            label: 'Subjects'
          }
        ].map((item, i) => (
          <div className="overview-box" key={i}>
            <div className="overview-box__top">
              <span className="overview-box__number">{item.number}</span>
              <span className={`overview-box__icon-circle ${item.green ? 'green' : ''}`}>
                <i className={`fas ${item.icon}`}></i>
              </span>
            </div>
            <div className="overview-box__label">
              {item.label} <span className="overview-box__arrow">&gt;</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherDashboard; 