import { Outlet } from 'react-router-dom';
import Header from '../components/admins/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from '../components/admins/SideBar'; 
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
