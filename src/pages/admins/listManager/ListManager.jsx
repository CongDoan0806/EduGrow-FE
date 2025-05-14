import { useState } from 'react';
import './ListManager.css';
import ListTeacher from '../../../components/admins/ListTeacher';
import ListStudent from '../../../components/admins/ListStudent';
import 'bootstrap/dist/css/bootstrap.min.css';

const ListManager = () => {
    const [activeTab, setActiveTab] = useState('student');
    const [studentPage, setStudentPage] = useState(1);
    const [teacherPage, setTeacherPage] = useState(1);
    const itemsPerPage = 5;

    const studentData = Array.from({ length: 20 }, (_, i) => ({ name: `Student ${i + 1}` }));
    const teacherData = Array.from({ length: 12 }, (_, i) => ({ name: `Teacher ${i + 1}` }));

    const handleAddClick = () => {
        if (activeTab === 'student') {
            console.log("ADD Student");
        } else {
            console.log("ADD Teacher");
        }
    };

    return (
        <div className="user-management">
            <div className="header">
                <div className="header-left">
                    <h2>User management</h2>
                    <div className="tabs-container">
                        <div 
                            className="highlight" 
                            style={{ left: activeTab === 'student' ? '0%' : '50%' }}
                        ></div>
                        <button 
                            className={`tab ${activeTab === 'student' ? 'active' : ''}`} 
                            onClick={() => setActiveTab('student')}
                        >
                            student
                        </button>
                        <button 
                            className={`tab ${activeTab === 'teacher' ? 'active' : ''}`} 
                            onClick={() => setActiveTab('teacher')}
                        >
                            teacher
                        </button>
                    </div>
                </div>
                <button className="add_button" onClick={handleAddClick}>Add</button>
            </div>
            {activeTab === 'student' ? (
                <ListStudent 
                    currentPage={studentPage}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setStudentPage}
                    data={studentData}
                />
            ) : (
                <ListTeacher 
                    currentPage={teacherPage}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setTeacherPage}
                    data={teacherData}
                />
            )}
        </div>
    );
};
export default ListManager;