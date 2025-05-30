import React, { useEffect, useState } from 'react';
import axios from 'axios';
import echo from '../../../echo';
import './Notification.css';

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
  const [loadingMarkRead, setLoadingMarkRead] = useState(false);

  const fetchNotifications = async () => {
    if (!teacherId) return;
    try {
      const response = await axiosInstance.get(`/teacher/combined-notifications?teacher_id=${teacherId}`);
      setNotifications(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Your session has expired, please log in again.');
        localStorage.removeItem('token');
        window.location.href = '/';
      } else {
        console.error('Error fetching notifications:', error);
      }
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [teacherId]);

  const markNotificationAsRead = async () => {
    const unreadIds = notifications.filter(n => !n.is_read).map(n => n.id);
    if (unreadIds.length === 0) return;

    setLoadingMarkRead(true);
    try {
      await axiosInstance.post('/teacher/notifications/mark-as-read', {
        notification_ids: unreadIds
      });
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, is_read: true }))
      );
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    } finally {
      setLoadingMarkRead(false);
    }
  };

  useEffect(() => {
    if (!teacherId) return;

    const channel = echo.channel(`teacher.${teacherId}`);

    channel.listen('TeacherTagged', (e) => {
      const newNotif = {
        id: e.id,
        message: e.message,
        student: e.student,
        type: 'tag',
        created_at: e.created_at,
        is_read: false,
      };
      setNotifications((prev) => [newNotif, ...prev]);
    });

    return () => {
      echo.leave(`teacher.${teacherId}`);
    };
  }, [teacherId]);

  const toggleNotification = () => {
    if (!isOpen) {
      markNotificationAsRead();
    }
    setIsOpen((prev) => !prev);
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="notification-container" style={{ position: 'relative', display: 'inline-block' }}>
      <i
        className="bi bi-bell-fill fs-4 custom-bell"
        style={{ cursor: 'pointer', color: 'white' }}
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
          <h4>Notifications</h4>
          {notifications.length === 0 ? (
            <p>No notifications yet.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {notifications.map((notif) => (
                <li
                  key={notif.id}
                  style={{
                    padding: '8px 0',
                    borderBottom: '1px solid #eee',
                    fontSize: '14px',
                    backgroundColor: notif.is_read ? 'transparent' : '#e0e7ff',
                  }}
                >
                  {notif.type === 'tag' ? (
                    <span>
                      <strong>@{notif.student?.name}</strong> mentioned: {notif.message}
                    </span>
                  ) : (
                    <span>{notif.message}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
          <button
            className="hover-button"
            onClick={toggleNotification}
            disabled={loadingMarkRead}
            style={{
              marginTop: '10px',
              padding: '5px 10px',
              cursor: loadingMarkRead ? 'not-allowed' : 'pointer',
              color: 'white',
              width: '100%',
              backgroundColor: loadingMarkRead ? 'gray' : 'gray',
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
