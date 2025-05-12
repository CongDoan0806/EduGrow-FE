import { Outlet } from 'react-router-dom';
import Header from './Header';

function StudentLayout() {
    return (
        <>
        <Header />
        <Outlet />
        </>
    );
}
export default StudentLayout;