import React from "react";
import Homepage from "./pages/students/homepage/Homepage";
import Login from "./pages/login/Login";
import StudentProfile from "./pages/students/profile/StudentProfile.jsx";
import LearningJounal from "./pages/students/learning_journal/LearningJournal.jsx";
import { Route, Routes } from "react-router-dom";
import StudentLayout from "./layouts/students/StudentLayout.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import AdminLayout from "./layouts/admins/AdminLayout.jsx";
import TeacherLayout from "./layouts/teachers/TeacherLayout.jsx";
import ListStudent from "./pages/admins/listManager/ListManager.jsx";

function AppRoutes() {
  return (
    <Routes>
      {/* student layout */}
      <Route element={<StudentLayout />}>
        <Route path="/student/homePage" element={<Homepage />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/journal" element={<LearningJounal />} />
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
        <Route path="/teacher/homePage" element={<h1>Teacher</h1>} />
      </Route>

    </Routes>
  );
}

export default AppRoutes;