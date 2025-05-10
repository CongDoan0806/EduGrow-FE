import { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentSidebar.css';

export default function StudentSidebar() {
  const [student, setStudent] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    axios
      .get('https://6809104e1f1a52874cdbc8bb.mockapi.io/apiCamera/Product')
      .then((res) => {
        if (res.data.length > 0) {
          const studentData = res.data[0];
          setStudent({
            name: studentData.title,
            email: studentData.description,
            avatar: studentData.icon,
          });
        }
      })
      .catch((err) => console.error('API Error:', err));
  }, []);

  const menuItems = [
    { icon: 'fas fa-user', label: 'My Profile' },
    { icon: 'fas fa-trophy', label: 'Achievement' },
    { icon: 'fas fa-bell', label: 'Notification' },
  ];

  return (
    <div className="profile-card">
      <div className="user-info">
        <img src={student?.avatar} alt="Avatar" className="avatar" />
        <div className="info-text">
          <p className="name">{student?.name}</p>
          <p className="email">{student?.email}</p>
        </div>
      </div>

      {menuItems.map((item, index) => (
        <button
          key={index}
          className={`menu-item ${activeIndex === index ? 'active' : ''}`}
          onClick={() => setActiveIndex(index)}
        >
          <i className={item.icon}></i> {item.label}
        </button>
      ))}
    </div>
  );
}
