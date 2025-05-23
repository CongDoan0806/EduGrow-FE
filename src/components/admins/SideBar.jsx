import './SideBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
const SideBar = () =>{
    return (
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
                                    <a href="/admin/dashboard" className="nav-link ">Dashboard</a>
                                </li>
                                <li className="nav-item mb-2 active-tab">
                                    <i class="bi bi-person-circle"></i>
                                    <a href="/admin/liststudent" className="nav-link ">User management</a>
                                </li>
                                <li className="nav-item mb-2">
                                    <i class="bi bi-menu-up"></i>
                                    <Link to="/admin/class-management" className="nav-link ">Class management</Link>
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
    );

}
export default SideBar;