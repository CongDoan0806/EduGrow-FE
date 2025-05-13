import { Outlet } from 'react-router-dom';
import HeaderSidebar from '../components/admins/Header';

function AdminLayout() {
    return (
        <>
        <HeaderSidebar />
        <Outlet />
        </>
    );
}
export default AdminLayout;