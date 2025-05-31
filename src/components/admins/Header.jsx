import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const HeaderAdmin = () => {
  const API_URL = process.env.REACT_APP_BE_URL;
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [user] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const getAuthHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/api/logout`, {}, {
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

  // Ẩn dropdown khi click ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="header_admin d-flex justify-content-between align-items-center px-3 py-2">
      <form className="position-relative form-search-admin">
        <input
          type="search"
          className="form-control ps-3 form-input"
          placeholder="Search"
          aria-label="Search"
        />
        <i className="bi bi-search position-absolute top-50 end-0 translate-middle-y me-4 text-secondary"></i>
      </form>

      <div
        className="d-flex align-items-center position-relative"
        ref={dropdownRef}
        style={{ userSelect: 'none' }}
      >
        <img
          src={
            user?.avatar ||
            'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'
          }
          alt="avatar"
          className="rounded-circle"
          style={{ width: 40, height: 40, cursor: 'pointer', border: '2px solid #7b6ada' }}
          onClick={() => setDropdownVisible((v) => !v)}
        />
        <span
          className="ms-2 me-3"
          style={{ color: 'gray', fontWeight: 600, cursor: 'pointer' }}
          onClick={() => setDropdownVisible((v) => !v)}
        >
          {user?.name || 'Admin'} <i className="bi bi-chevron-compact-down"></i>
        </span>
        <i
          className="bi bi-bell-fill"
          style={{ fontSize: 22, color: 'gray', cursor: 'pointer' }}
        ></i>

        <div className={`custom-dropdown-menu${dropdownVisible ? ' show' : ''}`}>
          <button
            type="button"
            className="dropdown-item text-danger"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;
