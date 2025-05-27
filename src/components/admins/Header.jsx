import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Header = () => {
  const navigate = useNavigate();

  const [user] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

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
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (

      <div className="header_admin d-flex justify-content-between align-items-center ">
        <form className="position-relative form-search-admin">
          <input
            type="search"
            className="form-control ps-3 form-input"
            placeholder="Search"
            aria-label="Search"
          />
          <i className="bi bi-search position-absolute top-50 end-0 translate-middle-y me-4 text-secondary"></i>
        </form>

        <div className="d-flex align-items-center dropdown">
          <img
            src={user?.avatar || 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'}
            alt="avatar"
            className="rounded-circle me-2 dropdown-toggle"
            style={{ width: '40px', height: '40px', cursor: 'pointer' }}
            id="adminProfileDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          />
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="adminProfileDropdown">
            <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
          </ul>
          <span className="me-2" style={{ color: 'gray' }}>
            {user?.name || 'Admin'} <i className="bi bi-chevron-compact-down"></i>
          </span>
          <i className="bi bi-bell-fill" style={{ width: '50px' }}></i>
        </div>
      </div>
  );
};

export default Header;
