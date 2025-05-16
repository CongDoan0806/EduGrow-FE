  import { useEffect, useState } from 'react';
  import axios from 'axios';
  import './StudentSidebar.css';

  export default function StudentSidebar() {
    const [student, setStudent] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [apiError, setApiError] = useState(null);

    const getAuthHeader = () => ({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    useEffect(() => {
      const fetchProfile = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get('http://localhost:8000/api/profile', {
            headers: getAuthHeader(),
            withCredentials: true,
          });

          const studentData = response.data;
          setStudent({
            name: studentData.name,
            email: studentData.email || '',
            avatar: studentData.avatar || null,
          });
        } catch (error) {
          console.error('Error fetching profile:', error);
          setApiError('Failed to load profile data. Please try again.');
        } finally {
          setIsLoading(false);
        }
      };

      fetchProfile();
    }, []);

    const menuItems = [
      { icon: 'fas fa-user', label: 'My Profile' },
      { icon: 'fas fa-trophy', label: 'Achievement' },
      { icon: 'fas fa-bell', label: 'Notification' },
    ];

    if (isLoading) {
      return <div className="profile-card">Loading...</div>;
    }

    if (apiError) {
      return <div className="profile-card error">{apiError}</div>;
    }

    return (
      <div className="profile-card">
        <div className="user-info">
          <img
            src={student?.avatar || '/images/default-avatar.png'}
            alt="Avatar"
            className="avatar"
          />
          <div className="info-text">
            <p className="name">{student?.name}</p>
            <p className="email">{student?.email}</p>
          </div>
        </div>

        <div className="menu-list">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`menu-item ${activeIndex === index ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
            >
              <i className={item.icon}></i> {item.label}
            </button>
          ))}
        </div>
      </div>
    );
  }
