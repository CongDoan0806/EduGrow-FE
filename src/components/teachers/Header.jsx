import './Header.css';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Notifications from '../../pages/teachers/view_student_journal/Notification';

const Header = ({ teacherId }) => {
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_BE_URL;
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getAuthHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });

  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_URL}/api/auth/logout`,
        {},
        {
          headers: getAuthHeader(),
          withCredentials: true,
        }
      );
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setDropdownVisible(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container">
        <a className="navbar-brand text-white fw-bold fs-2">EduGrow</a>
        <div className="d-flex ms-auto align-items-center gap-3">
          <form className="position-relative">
            <input
              type="search"
              className="form-control ps-2 form-input"
              placeholder="Search"
              aria-label="Search"
            />
            <i className="bi bi-search position-absolute top-50 end-0 translate-middle-y me-3 text-secondary"></i>
          </form>

          {user ? (
            <div className="profile-container" ref={dropdownRef}>
              <img
                src={
                  user.avatar ||
                  'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'
                }
                alt="avatar"
                className="rounded-circle"
                onClick={() => setDropdownVisible((prev) => !prev)}
              />
              <span className="text-white fw-medium ms-2">{user.name}</span>

              {/* Luôn render dropdown, ẩn/hiện bằng class 'show' */}
              <div className={`custom-dropdown-menu ${dropdownVisible ? 'show' : ''}`}>
                <button className="custom-dropdown-item logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <span className="text-white fw-medium">Guest</span>
          )}
          <div className="notification">
            <Notifications teacherId={teacherId} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
