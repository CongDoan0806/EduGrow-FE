import { Outlet } from 'react-router-dom';
import Header from '../components/students/Header';

function StudentLayout() {
    return (
        <>
        <Header />
        <Outlet />
        </>
    );
}
export default StudentLayout;