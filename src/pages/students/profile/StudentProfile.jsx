import React from 'react';
import UpdateProfile from '../../../components/students/profile/UpdateProfile';
import StudentSidebar from '../../../layouts/sidebars/StudentSidebar';
import './StudentProfile.css'; // Import your CSS file for styling
import ChangePassword from '../../../components/students/profile/ChangePassword';
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
