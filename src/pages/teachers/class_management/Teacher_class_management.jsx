import { useEffect, useState } from 'react';
import './Teacher_class_management.css';
import axios  from 'axios';
import { Link } from 'react-router-dom';

export default function TeacherClassManagement() {
    const [classes, setClasses] = useState([])

    const fetchTeacherClasses = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log('Fetching classes with token:', token);
            
            const res = await axios.get("http://127.0.0.1:8000/api/teacher/classes", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('API Response:', res.data);

            if (res.data && Array.isArray(res.data.classes)) {
                console.log('Setting classes:', res.data.classes);
                setClasses(res.data.classes);
            } else {
                console.error("API response structure:", res.data);
                setClasses([]);
            }
        } catch (err) {
            console.error("API Error:", err.response?.data || err.message);
            setClasses([]);
        }
    };

    useEffect(() => {
        fetchTeacherClasses();
    }, []);

    return(
           <div className="teacher-class-management-container">
                <div className="teacher-class-management-header">
                    <h1>My Classes</h1>
                </div>
                <div className="container py-4">
                    <div className="row g-4">
                        {classes.length > 0 ? (
                            classes.map((item, index) => (
                                <div className="col-md-4" key={index}>
                                    <Link to="/teacher/students" style={{ textDecoration: 'none', color: 'black' }}>
                                        <div className="teacher-class-management-item border shadow-sm h-100">
                                            <div className="teacher-class-item-image-container position-relative ps-3 pt-3 pb-3" style={{ height: 160 }}>
                                                <div className="teacher-card-class-image teacher-class-card-back" />
                                                <div className="teacher-card-class-image teacher-class-card-middle" />
                                                <div className="teacher-card-class-image teacher-class-card-front">
                                                <img
                                                    src={item.subject_img || 'https://dp.classroomscreen.com/96138/1744285416-stationrotation_shortthumbnail.png?fm=webp'}
                                                    alt=""
                                                    className="img-fluid "
                                                />
                                                </div>
                                            </div>
                                            <div className="teacher-class-item-content p-3">
                                                <div className="teacher-class-item-name fw-bold mb-1">{item.subject_name}</div>
                                                <div className="teacher-class-item-description text-muted mb-2">
                                                {item.description}
                                                </div>
                                                <div className="teacher-class-item-number-st mb-2">
                                                <strong>{item.student_count}</strong> students
                                                </div>
                                                {/* Teacher info might not be needed here as it's the teacher's own view */}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className="col-12">
                                <p className="text-center text-muted">You are not currently teaching any classes.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
    )
}