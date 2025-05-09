import logo from './logo.svg';
import './App.css';
import React from 'react';
import Homepage from './pages/students/homepage/Homepage';
import StudentSidebar from './layouts/sidebars/StudentSidebar';
import TeacherSidebar from './layouts/sidebars/TeacherSidebar';
function App() {
  return (
    <div >
    {/* <Homepage/> */}
    <StudentSidebar/>
    {/* <TeacherSidebar/> */}

    </div>
  );
}

export default App;
