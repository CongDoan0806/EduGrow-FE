import { useState } from 'react';
import './Notification.css';
import axios from 'axios';
const NotificationStudent = ($studentId) =>{
    const [notifications, setNotification] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const toggleNotification = () =>{
        setIsOpen(!isOpen);
    };
    return(
        <div className="notification-container">
            <i
                className="bi bi-bell-fill fs-4 custom-bell"
                style={{ cursor: 'pointer', color: '#333' }}
                onClick={toggleNotification}
            ></i>
            {isOpen && (
                <div className="notification"
                    style={{
                    position: 'absolute',
                    top: '50px',
                    right: '0',
                    width: '300px',
                    backgroundColor: '#F1F0FE',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                    zIndex: 1000,
                    padding: '10px',
                    maxHeight: '400px',
                    overflowY: 'auto',
                    }}
                >
                    <h4>Notification</h4>
                    {notifications.length === 0 ? (
                        <p>No announcement yet</p>
                    ) : (
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                        {notifications.map((notif, index) => (
                            <li
                            key={notif.id || index}
                            style={{
                                padding: '8px 0',
                                borderBottom: '1px solid #eee',
                                fontSize: '14px',
                            }}
                            >
                            <strong>@{notif.student?.name}</strong> mentioned {notif.message}
                            
                            </li>
                        ))}
                        </ul>
                    )}
                    <button
                        className='hover-button'
                        onClick={toggleNotification}
                        style={{
                            marginTop: '10px',
                            padding: '5px 10px',
                            cursor: 'pointer',
                            color:'white',
                            width: '100%',
                            backgroundColor: 'gray',
                            border: 'none',
                            borderRadius: '3px',
                            }}
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
}
export default NotificationStudent;