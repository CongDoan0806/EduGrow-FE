import { Outlet } from 'react-router-dom';
import Header from '../components/teachers/Header';
import './TeacherLayout.css';
import TeacherSidebar from '../components/teachers/TeacherSidebar';
function TeacherLayout() {
    return (
        <>
            <div className="app-layout">
                <Header />
                <div className="layout-content">
                    <div className="sidebar_sub">
                    <TeacherSidebar />
                    </div>
                    <main className="main">
                    <Outlet />
                    </main>
                </div>
            </div>
        </>
    );
}
export default TeacherLayout;