import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate(); 

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
                    <img src="https://2.bp.blogspot.com/-DRJHYLurSSo/WezG8RReDuI/AAAAAAAAAXs/WiTd7NhjR1EATU0ZZtpBxn9qnFQTakc5QCLcBGAs/s1600/avt-cute-11.jpg" alt="avatar" className="rounded-circle me-2" style={{ width: '50px', height: '50px' }} />
                    <span className="text-white fw-medium">To Nga</span>
                </div>
            </div>
        </nav>
    );
};
export default Header;