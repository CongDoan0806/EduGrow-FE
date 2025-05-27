import React from "react";
import Homepage from "./pages/students/homepage/Homepage";
import Login from "./pages/login/Login";
import StudentProfile from "./pages/students/profile/StudentProfile.jsx";
import LearningJounal from "./pages/students/learning_journal/LearningJournal.jsx";
import SetGoals from "./pages/students/set_goals/SetGoals.jsx";
import { Route, Routes } from "react-router-dom";
import StudentLayout from "./layouts/StudentLayout.jsx";
import TeacherHomePage from "./pages/teachers/Homepage/HomepageTeacher.jsx";
import TeacherClassManagement from './pages/teachers/class_management/Teacher_class_management';
import AuthLayout from "./layouts/AuthLayout.jsx";
import StudentJournal from "./pages/teachers/view_student_journal/StudentJournal.jsx";
import ListStudent from "./pages/admins/listManager/ListManager.jsx";
import AddUserModal from "./components/admins/AddUserForm.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import TeacherLayout from "./layouts/TeacherLayout.jsx";
import Calendar from "./pages/students/calendar/Calendar.jsx";
import Dashboard from "./pages/admins/dashboard/Dashboard.jsx";
import ClassManagement from "./pages/admins/class_management/class_management.jsx"
function AppRoutes() {
  return (
    <Routes>
      {/* student layout */}
      <Route element={<StudentLayout />}>
        <Route path="/student/homePage" element={<Homepage />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/journal" element={<LearningJounal />} />
        <Route path="/student/setgoals" element={<SetGoals/>} />
        <Route path="/student/calendar" element={<Calendar />} />
        <Route path="/learning-journal/:weekId" element={<LearningJounal />} />
      </Route>

      {/* User layout */}
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Login />} />
      </Route>

      {/* admin layout */}
      <Route element={<AdminLayout/>}>
        <Route path="/admin/dashboard" element={<Dashboard/>}/>
        <Route path="/admin/liststudent" element={<ListStudent/>}/>
        <Route path="/admin/class-management" element={<ClassManagement/>}/>
      </Route>

       {/*teacher layout  */}
      <Route element={<TeacherLayout/>}>
        <Route path="/teacher/journals/:studentId" element={<StudentJournal />} />
        <Route path="/teacher/homePage" element={<TeacherHomePage />} />
        <Route path="/teacher/classes" element={<TeacherClassManagement />} />
      </Route>
      
    </Routes>
  );
}

export default AppRoutes;