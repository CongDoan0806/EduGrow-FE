import React, { useEffect, useState } from 'react';
import axios from 'axios';
import echo from '../../../echo';
import './Notification.css';

// Tạo axios instance, tự động gắn token vào header Authorization
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const Notifications = ({ teacherId }) => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axiosInstance.get('/teacher/tags');
        setNotifications(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại.');
          localStorage.removeItem('token');
          window.location.href = '/';
        } else {
          console.error('Error fetching tags:', error);
        }
      }
    };
    fetchTags();
  }, []);
  useEffect(() => {
    echo.channel(`teacher.${teacherId}`).listen('TeacherTagged', (e) => {
      setNotifications((prev) => [e, ...prev]);
    });

    return () => {
      echo.leave(`teacher.${teacherId}`);
    };
  }, [teacherId]);

  const toggleNotification = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="notification-container" style={{ position: 'relative', display: 'inline-block' }}>
      <i
        className="bi bi-bell-fill fs-4 custom-bell"
        style={{ cursor: 'pointer', color: 'white' }}
        onClick={toggleNotification}
      ></i>
      {isOpen && (
        <div
          className="notification"
          style={{
            position: 'absolute',
            top: '50px',
            right: '0',
            width: '300px',
            backgroundColor: '#F1F0FE',
            border: '1px solid #ddd',
            borderRadius: '5px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            padding: '10px',
            maxHeight: '400px',
            overflowY: 'auto',
          }}
        >
          <h4>Notification</h4>
          {notifications.length === 0 ? (
            <p>Chưa có thông báo</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {notifications.map((notif, index) => (
                <li
                  key={notif.id || index}
                  style={{
                    padding: '8px 0',
                    borderBottom: '1px solid #eee',
                    fontSize: '14px',
                  }}
                >
                  <strong>@{notif.student?.name}</strong> mentioned {notif.message}
                  
                </li>
              ))}
            </ul>
          )}
          <button
            className='hover-button'
            onClick={toggleNotification}
            style={{
              marginTop: '10px',
              padding: '5px 10px',
              cursor: 'pointer',
              color:'white',
              width: '100%',
              backgroundColor: 'gray',
              border: 'none',
              borderRadius: '3px',
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Notifications;