import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Header = () => {
  const navigate = useNavigate(); 

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);
  console.log('user:', user);
  const handleNavigate = (path) => {
    navigate(path);
  };
    return (
        <nav className="navbar navbar-expand-lg custom-navbar">
            <div className="container d-flex justify-content-between align-items-center">
                <a className="navbar-brand text-white fw-bold fs-3" onClick={() => handleNavigate('/student/homePage')}>EduGrow</a>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
                    <ul className="navbar-nav gap-4">
                        <li className="nav-item">
                            <a className="nav-link text-white active">Overview</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white">Study Plan</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white">Set Goals</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white" onClick={() => handleNavigate('/student/journal')}>Learning Journal</a>
                        </li>
                    </ul>
                </div>
                <div className="d-flex align-items-center profile">
                    <img
                        src={user?.avatar || 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'} 
                        alt="avatar"
                        className="rounded-circle me-2"
                        style={{ width: '50px', height: '50px' }}
                    />
                    <span className="text-white fw-medium">{user?.name || 'Guest'}</span>
                </div>
            </div>
        </nav>
    );
};
export default Header;