import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';

const HeaderSidebar = () => {
    return (
        <div className="d-flex">

            <div className="sidebar d-flex flex-column p-3">
                <div className="layout-sitebar">
                    <div>
                    <h4 className=" mb-4">EduGrow</h4>
                    </div>
                    <div>
                        <ul className="nav nav-pills flex-column">
                            <div className='menu-sitebar'>
                                <li>MENU</li>
                                <li className="nav-item mb-2 dashboard">
                                    <i class="bi bi-file-bar-graph"></i>
                                    <a href="#" className="nav-link ">Dashboard</a>
                                </li>
                                <li className="nav-item mb-2 active-tab">
                                    <i class="bi bi-person-circle"></i>
                                    <a href="#" className="nav-link ">User management</a>
                                </li>
                                <li className="nav-item mb-2">
                                    <i class="bi bi-menu-up"></i>
                                    <a href="#" className="nav-link ">Class management</a>
                                </li>
                            </div>
                            
                            <div className='mt-section'>
                                <li>OTHERS</li>
                                <li className="nav-item mb-2">
                                    <i class="bi bi-gear-fill"></i>
                                    <a href="#" className="nav-link ">Settings</a>
                                </li>
                                <li className="nav-item">
                                    <i class="bi bi-person-circle"></i>
                                    <a href="#" className="nav-link ">Accounts</a>
                                </li>
                                <li className="nav-item">
                                    <i class="bi bi-info-square-fill"></i>
                                    <a href="#" className="nav-link ">Help</a>
                                </li>
                            </div>
                            
                        </ul>
                    </div>
                </div>
                
                
                
            </div>

            <div className="header flex-grow-1 d-flex justify-content-between align-items-center px-4">
                <form className="position-relative form-search-admin">
                    <input
                        type="search"
                        className="form-control ps-4 form-input"
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

export default HeaderSidebar;
