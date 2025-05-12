import { Outlet } from 'react-router-dom';
import Header from './Header';

function TeacherLayout() {
    return (
        <>
        <Header />
        <main>
            <Outlet />
        </main>
        </>
    );
}
export default TeacherLayout;