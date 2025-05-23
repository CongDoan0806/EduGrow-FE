import React from "react";
import Homepage from "./pages/students/homepage/Homepage";
import Login from "./pages/login/Login";
import StudentProfile from "./pages/students/profile/StudentProfile.jsx";
import LearningJounal from "./pages/students/learning_journal/LearningJournal.jsx";
import { Route, Routes } from "react-router-dom";
import StudentLayout from "./layouts/StudentLayout.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import StudentJournal from "./pages/teachers/view_student_journal/StudentJournal.jsx";
import ListStudent from "./pages/admins/listManager/ListManager.jsx";
import AddUserModal from "./components/admins/AddUserForm.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import TeacherLayout from "./layouts/TeacherLayout.jsx";
import Calendar from "./pages/students/calendar/Calendar.jsx";
import teacherHomePage from "./pages/teachers/TeacherHomePage.jsx";
import Notifications from "./pages/teachers/view_student_journal/Notification.jsx";
function AppRoutes() {
  return (
    <Routes>
      {/* student layout */}
      <Route element={<StudentLayout />}>
        <Route path="/student/homePage" element={<Homepage />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/calendar" element={<Calendar />} />
        <Route path="/learning-journal/:weekId" element={<LearningJounal />} />
      </Route>

      {/* User layout */}
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Login />} />
      </Route>

      {/* admin layout */}
      <Route element={<AdminLayout/>}>
        <Route path="/admin/dashboard" element={<h1>Admin</h1>} />
        <Route path="/admin/liststudent" element={<ListStudent/>}/>
      </Route>

       {/*teacher layout  */}
      <Route element={<TeacherLayout/>}>
        <Route path="/teacher/journals/:studentId" element={<StudentJournal />} />
        <Route path = "/teacher/homePage" element={<teacherHomePage/>}/>
      </Route>
      
    </Routes>
  );
}

export default AppRoutes;