import './Header.css';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

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
      await axios.post('http://localhost:8000/api/logout', {}, {
        headers: getAuthHeader(),
        withCredentials: true,
      });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setDropdownVisible(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="navbar custom-navbar">
      <div className="container d-flex justify-content-between align-items-center">
        <div
          className="navbar-brand text-white fw-bold fs-2"
          onClick={() => navigate('/')}
        >
          EduGrow
        </div>

        <div className="d-flex align-items-center gap-3">
          <form className="position-relative">
            <input
              type="search"
              className="form-control ps-2 form-input"
              placeholder="Search"
              aria-label="Search"
            />
          </form>

          {user ? (
            <div className="profile-container" ref={dropdownRef}>
              <img
                src={user.avatar || 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'}
                alt="avatar"
                className="rounded-circle"
                onClick={() => setDropdownVisible((prev) => !prev)}
              />
              <span className="text-white fw-medium ms-2">{user.name}</span>

              {dropdownVisible && (
                <div className="custom-dropdown-menu">
                  <button
                    className="custom-dropdown-item logout-btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <span className="text-white fw-medium">Guest</span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
