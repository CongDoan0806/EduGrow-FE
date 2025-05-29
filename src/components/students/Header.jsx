import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Header = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const getAuthHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/profile', {
          headers: getAuthHeader(),
          withCredentials: true,
        });

        const studentData = response.data;
        setUser({
          name: studentData.name,
          avatar: studentData.avatar || 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png',
        });
      } catch (error) {
        console.error('Failed to fetch profile in Header:', error);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const menu = document.getElementById('customDropdown');
      if (menu && !menu.contains(event.target) && !event.target.closest('.profile-container')) {
        menu.style.display = 'none';
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const closeDropdown = () => {
    const menu = document.getElementById('customDropdown');
    if (menu) {
      menu.style.display = 'none';
    }
  };

  const handleProfileClick = () => {
    closeDropdown();
    handleNavigate('/student/profile');
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
    }
  };

  const handleLogoutClick = async () => {
    closeDropdown();
    await handleLogout();
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
        <div className="d-flex align-items-center position-relative profile-container">
          <img
            src={user?.avatar || 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'}
            alt="avatar"
            className="rounded-circle me-2"
            style={{ width: '50px', height: '50px', cursor: 'pointer' }}
            onClick={() => {
              const menu = document.getElementById('customDropdown');
              menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
            }}
          />
          <div id="customDropdown" className="custom-dropdown-menu">
            <button className="custom-dropdown-item" onClick={handleProfileClick}>Profile</button>
            <hr className="dropdown-divider" />
            <button className="custom-dropdown-item logout-btn" onClick={handleLogoutClick}>Logout</button>
          </div>
          <span className="text-white fw-medium ms-2">{user?.name || 'Guest'}</span>
        </div>
      </div>
    </nav>
  );
};

export default Header;
