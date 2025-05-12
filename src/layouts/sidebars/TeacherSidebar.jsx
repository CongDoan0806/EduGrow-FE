import React, { useState } from 'react';  
import './TeacherSidebar.css';


export default function TeacherSidebar(){
  const [activeItem, setActiveItem] = useState('overview');

  const sidebarItems = [
    { id: 'overview', icon: 'fas fa-home', label: 'Overview' },
    { id: 'list-students', icon: 'fas fa-user-graduate', label: 'List Students' },
    { id: 'list-classes', icon: 'fas fa-chalkboard', label: 'List Classes' },
    { id: 'recent-activities', icon: 'fas fa-clock', label: 'Recent Activities' }
  ];

  const handleItemClick = (id) => {
    setActiveItem(id);
  };

  return (
    <div className="sidebar">
      {sidebarItems.map(item => (
        <div
          key={item.id}
          className={`sidebar-item ${activeItem === item.id ? 'active' : ''}`}
          onClick={() => handleItemClick(item.id)}
        >
          <i className={item.icon}></i>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};
