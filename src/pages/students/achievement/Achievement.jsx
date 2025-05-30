import React from 'react';
import StudentSidebar from '../../../components/students/StudentSidebar';
import ShowAchivement from '../../../components/students/ShowAchievement';
import './Achievement.css';

export default function Achievement() {
  return (
    <div style={{ display: 'flex' }}>
      {/* Bên trái - Sidebar */}
      <div >
        <StudentSidebar />
      </div>

      <div style={{ flex: 1, padding: '20px' }}>
        <ShowAchivement/>
      </div>
    </div>
  );
}