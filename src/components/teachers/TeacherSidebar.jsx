import React from 'react';
import { NavLink } from 'react-router-dom';
import './TeacherSidebar.css';

export default function TeacherSidebar() {
  const sidebarItems = [
    { id: 'overview', icon: 'fas fa-home', label: 'Overview', to: '/teacher/homePage' },
    { id: 'list-students', icon: 'fas fa-user-graduate', label: 'List Students', to: '/teacher/students' },
    { id: 'list-classes', icon: 'fas fa-chalkboard', label: 'List Classes', to: '/teacher/classes' },
    { id: 'recent-activities', icon: 'fas fa-clock', label: 'Recent Activities', to: '/teacher/tags' }
  ];

  return (
    <div className="sidebar">
      {sidebarItems.map(item => (
        <NavLink
          key={item.id}
          to={item.to}
          className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
        >
          <i className={item.icon}></i>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </div>
  );
}
