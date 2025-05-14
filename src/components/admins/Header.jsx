import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';

const Header = () => {
    return (
        <div className="d-flex">
            <div className="header_admin flex-grow-1 d-flex justify-content-between align-items-center px-2">
                <form className="position-relative form-search-admin">
                    <input
                        type="search"
                        className="form-control ps-3 form-input"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <i className="bi bi-search position-absolute top-50 end-0 translate-middle-y me-4 text-secondary"></i>
                </form>
                <div className="d-flex align-items-center">                  
                    <img src="https://2.bp.blogspot.com/-DRJHYLurSSo/WezG8RReDuI/AAAAAAAAAXs/WiTd7NhjR1EATU0ZZtpBxn9qnFQTakc5QCLcBGAs/s1600/avt-cute-11.jpg" alt="avatar" className="rounded-circle me-2" style={{ width: '40px', height: '40px' }} />
                    <span className="me-2" style={{color: 'gray'}}>Cong Doan say hi <i class="bi bi-chevron-compact-down"></i></span>
                    <i class="bi bi-bell-fill" style={{width: '50px'}}></i>
                </div>
            </div>
        </div>
    );
};

export default Header;
