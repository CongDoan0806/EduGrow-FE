import { Outlet } from 'react-router-dom';
import Header from '../components/teachers/Header';

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