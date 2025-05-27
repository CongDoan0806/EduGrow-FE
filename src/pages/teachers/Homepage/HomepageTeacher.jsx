import React from "react";
import TeacherDashboard from "../../../components/teachers/TeacherDashboard";
import TeacherCalendar from "../../../components/teachers/TeacherCalandar";
import TeacherNotify from "../../../components/teachers/TeacherNotify";
import "./HomepageTeacher.css"; 
import TeacherSidebar from "../../../components/teachers/TeacherSidebar";
import "react-calendar/dist/Calendar.css";
export default function HomepageTeacher() {
  return (
    <div className="homepage">
      {/* <TeacherSidebar /> */}
      <div className="main-content">
        <TeacherDashboard />
        <div className="bottom-section">
          <TeacherNotify />
          <TeacherCalendar />
        </div>
      </div>
    </div>
  );
}
