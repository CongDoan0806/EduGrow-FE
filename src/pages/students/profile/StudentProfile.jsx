import React from 'react';
import UpdateProfile from '../../../components/students/UpdateProfile';
import StudentSidebar from '../../../components/students/StudentSidebar';
import ChangePassword from '../../../components/students/ChangePassword';
import './StudentProfile.css';

export default function StudentProfile() {
  return (
    <div style={{ display: 'flex' }}>
      {/* Bên trái - Sidebar */}
      <div >
        <StudentSidebar />
      </div>

      <div style={{ flex: 1, padding: '20px' }}>
        <UpdateProfile />
        <ChangePassword />
      </div>
    </div>
  );
}
