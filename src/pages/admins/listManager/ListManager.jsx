import { useState } from 'react';
import './ListManager.css';
import AddUserModal from '../../../components/admins/AddUserForm';
import ListTeacher from '../../../components/admins/ListTeacher';
import ListStudent from '../../../components/admins/ListStudent';
import 'bootstrap/dist/css/bootstrap.min.css';

const ListManager = () => {
    const [activeTab, setActiveTab] = useState('student');
    const [studentPage, setStudentPage] = useState(1);
    const [teacherPage, setTeacherPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const itemsPerPage = 5;

    const studentData = Array.from({ length: 20 }, (_, i) => ({ name: `Student ${i + 1}` }));
    const teacherData = Array.from({ length: 12 }, (_, i) => ({ name: `Teacher ${i + 1}` }));

    const handleAddClick = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
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
                            Student
                        </button>
                        <button 
                            className={`tab ${activeTab === 'teacher' ? 'active' : ''}`} 
                            onClick={() => setActiveTab('teacher')}
                        >
                            Teacher
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

            <AddUserModal 
                isOpen={showModal} 
                onClose={handleModalClose} 
                role={activeTab} 
            />
        </div>
    );
};

export default ListManager;
