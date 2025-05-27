import React from 'react';
import StudentSidebar from '../../../components/students/StudentSidebar';
import UploadAchievement from '../../../components/students/UploadAchievement';
import './UploadAchievementPage.css'

export default function UploadAchievementPage() {
  return (
    <div style={{ display: 'flex' }}>
      {/* Bên trái - Sidebar */}
      <div >
        <StudentSidebar />
      </div>

      <div style={{ flex: 1, padding: '20px' }}>
        <UploadAchievement/>
      </div>
    </div>
  );
}