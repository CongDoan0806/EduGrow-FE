import React, { useEffect, useState } from 'react';
import axios from 'axios';
import echo from '../../../echo';
import './Notification.css';

// Tạo axios instance với interceptor thêm token
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

const StudentNotifications = ({ studentId }) => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const markNotificationsAsRead = async (notificationIds) => {
    try {
      await axiosInstance.post('/student/notifications/mark-as-read', {
        notification_ids: notificationIds
      });
    } catch (error) {
      console.error('Lỗi khi đánh dấu thông báo đã đọc:', error);
    }
  };

  const unreadCount = notifications.filter(notif => !notif.is_read).length;
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!studentId) return;

      try {
        const response = await axiosInstance.get(`/student/notifications?student_id=${studentId}`);
        if (Array.isArray(response.data)) {
          setNotifications(response.data);
        } else {
          setNotifications([]);
          console.error('Dữ liệu không phải mảng:', response.data);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.');
          localStorage.removeItem('token');
          window.location.href = '/';
        } else {
          console.error('Lỗi khi lấy thông báo:', error.message);
        }
      }
    };

    fetchNotifications();
  }, [studentId]);
  useEffect(() => {
    if (!studentId) return;

    const channelName = `student.${studentId}`;
    const channel = echo.private(channelName);

    channel.listen('StudentNotification', (e) => {
      if (e.notification) {
        setNotifications((prev) => [e.notification, ...prev]);
      }
    });

    return () => {
      echo.leave(`private-${channelName}`);
    };
  }, [studentId]);


  useEffect(() => {
    if (isOpen) {
      const unreadNotificationIds = notifications
        .filter(notif => !notif.is_read)
        .map(notif => notif.id);

      if (unreadNotificationIds.length > 0) {
        markNotificationsAsRead(unreadNotificationIds);

        setNotifications((prev) =>
          prev.map((notif) =>
            unreadNotificationIds.includes(notif.id)
              ? { ...notif, is_read: true }
              : notif
          )
        );
      }
    }
  }, [isOpen]);

  const toggleNotification = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="notification-container" style={{ position: 'relative', display: 'inline-block' }}>
      <i
        className="bi bi-bell-fill fs-5 custom-bell"
        style={{ cursor: 'pointer', color: 'white', position: 'relative' }}
        onClick={toggleNotification}
      >
        {unreadCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              backgroundColor: 'red',
              color: 'white',
              borderRadius: '50%',
              padding: '2px 6px',
              fontSize: '12px',
              minWidth: '20px',
              textAlign: 'center',
              lineHeight: '16px',
              userSelect: 'none',
            }}
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </i>

      {isOpen && (
        <div
          className="notification"
          style={{
            position: 'absolute',
            top: '50px',  
            right: '0',
            color: 'black',
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
            <p>No announcements yet</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {notifications.map((notif, index) => (
                <li
                  key={notif.id ?? `notif-${index}`}
                  style={{
                    padding: '8px 0',
                    borderBottom: '1px solid #eee',
                    fontSize: '14px',
                    fontWeight: notif.is_read ? 'normal' : 'bold',
                  }}
                >
                  {String(notif.message || 'No notification content')}
                </li>
              ))}
            </ul>
          )}

          <button
            className="hover-button"
            onClick={toggleNotification}
            style={{
              marginTop: '10px',
              padding: '5px 10px',
              cursor: 'pointer',
              color: 'white',
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

export default StudentNotifications;
