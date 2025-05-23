import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import { useEffect, useState } from 'react';
import Notifications from '../../pages/teachers/view_student_journal/Notification';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
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
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container">
        <a
          className="navbar-brand text-white fw-bold fs-2"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          EduGrow
        </a>

        <div className="d-flex ms-auto align-items-center gap-3">
          <form className="position-relative">
            <input
              type="search"
              className="form-control ps-2 form-input"
              placeholder="Search"
              aria-label="Search"
            />
          </form>

          {user ? (
            <div className="dropdown">
              <img
                src={user.avatar || 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'}
                alt="avatar"
                className="rounded-circle"
                style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                id="profileDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              />
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                <li>
                  <button className="dropdown-item text-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
              <span className="text-white fw-medium ms-2">{user.name}</span>
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

