import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NotificationStudent from '../../pages/students/notification/Notification';

const Header = ({ studentId }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : { name: 'Guest', avatar: 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png' };
  });

  const getAuthHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/profile', {
          headers: getAuthHeader(),
          withCredentials: true,
        });
        const studentData = response.data;
        const updatedUser = {
          name: studentData.name,
          avatar: studentData.avatar || 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png',
        };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } catch (error) {
        console.error('Failed to fetch profile in Header:', error.response?.data || error.message);
        if (error.response?.status === 401) {
          handleLogout();
        }
      }
    };
    fetchProfile();
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/api/logout', {}, {
        headers: getAuthHeader(),
        withCredentials: true,
      });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Đăng xuất thất bại. Vui lòng thử lại!');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container d-flex justify-content-between align-items-center">
        <a className="navbar-brand text-white fw-bold fs-3" onClick={() => handleNavigate('/student/homePage')}>EduGrow</a>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
          <ul className="navbar-nav gap-4">
            <li className="nav-item">
              <a className="nav-link text-white active" onClick={() => handleNavigate('/student/homePage')}>Overview</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" onClick={() => handleNavigate('/student/calendar')}>Study Plan</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" onClick={() => handleNavigate('/student/setgoals')}>Set Goals</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" onClick={() => handleNavigate('/learning-journal/week1')}>Learning Journal</a>
            </li>
          </ul>
        </div>
        <div className="d-flex align-items-center profile dropdown">
          <img
            src={user.avatar}
            alt="avatar"
            className="rounded-circle me-2 dropdown-toggle"
            style={{ width: '50px', height: '50px', cursor: 'pointer' }}
            id="profileDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          />
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
            <li><button className="dropdown-item" onClick={() => handleNavigate('/student/profile')}>Profile</button></li>
            <li><hr className="dropdown-divider" /></li>
            <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
          </ul>
          <span className="text-white fw-medium ms-2">{user.name}</span>
        </div>
        <div className="notification">
          {studentId && <NotificationStudent studentId={studentId} />}
        </div>
      </div>
    </nav>
  );
};

export default Header;