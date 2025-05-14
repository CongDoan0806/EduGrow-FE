import { Outlet } from 'react-router-dom';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from './SideBar'; 
import './AdminLayout.css';

function AdminLayout() {
    return (
        <div className="admin-layout">
            <SideBar />
            <div className="main-content">
                <Header />
                <div className="content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;
