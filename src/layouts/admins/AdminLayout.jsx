import { Outlet } from 'react-router-dom';
import HeaderSidebar from './Header';

function AdminLayout() {
    return (
        <>
        <HeaderSidebar />
        <Outlet />
        </>
    );
}
export default AdminLayout;