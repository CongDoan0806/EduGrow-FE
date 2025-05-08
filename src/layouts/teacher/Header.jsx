import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg custom-navbar">
            <div className="container-fluid">
                <a className="navbar-brand text-white fw-bold fs-4">EduGrow</a>
                <div className="d-flex ms-auto align-items-center gap-3">
                    <form className="position-relative">
                        <input
                            type="search"
                            className="form-control ps-5 form-input"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <i className="bi bi-search position-absolute top-50 end-0 translate-middle-y me-2 text-secondary"></i>
                    </form>
                    <div className="d-flex align-items-center profile">
                        <img
                            src="https://2.bp.blogspot.com/-DRJHYLurSSo/WezG8RReDuI/AAAAAAAAAXs/WiTd7NhjR1EATU0ZZtpBxn9qnFQTakc5QCLcBGAs/s1600/avt-cute-11.jpg"
                            alt="avatar"
                            className="rounded-circle"
                            style={{ width: '50px', height: '50px' }}
                        />
                        <span className="text-white fw-medium ms-2">To Nga</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;

