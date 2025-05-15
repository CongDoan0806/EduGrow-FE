import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import { useEffect, useState } from 'react';

const Header = () => {
     const [user, setUser] = useState(null);
    
      useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);
      }, []);
    return (
        <nav className="navbar navbar-expand-lg custom-navbar">
            <div className="container">
                <a className="navbar-brand text-white fw-bold fs-2">EduGrow</a>
                <div className="d-flex ms-auto align-items-center gap-2">
                    <form className="position-relative">
                        <input
                            type="search"
                            className="form-control ps-2 form-input"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <i className="bi bi-search position-absolute top-50 end-0 translate-middle-y me-3 text-secondary"></i>
                    </form>
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
            </div>
        </nav>
    );
};

export default Header;

