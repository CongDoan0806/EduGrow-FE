import { useEffect, useState } from 'react';
import './class_management.css';
import axios  from 'axios';
import MultiStepForm from '../../../components/admins/MultiStepForm';
export default function ClassManagement() {
    const [classes, setClasses] = useState([])
    const [showForm, setShowForm] = useState(false);
    const fetchClasses = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get("http://127.0.0.1:8000/api/admin/class", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });

            if (res.data && Array.isArray(res.data.classes)) {
            setClasses(res.data.classes);
            } else {
            console.error("API response does not contain a valid 'classes' array:", res.data);
            setClasses([]);
            }
        } catch (err) {
            console.error("Lỗi khi gọi API:", err);
            setClasses([]);
        }
    };
    useEffect(() => {
        fetchClasses();
    }, []);


    const handleAddClassClick = () => {
        setShowForm(true);
    };

    const handleCloseClassClick = () => {
        setShowForm(false);
    };

    return(
           <div className="class-management-container">
                <div className="class-management-header">
                    <h1>Class Management</h1>
                </div>
                <div className="container py-4">
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div class="add-class-item border shadow-sm h-100" onClick={handleAddClassClick}>
                                <span>+</span>
                            </div>
                        </div>
                        {classes.map((item, index) => (
                            <div className="col-md-4" key={index}>
                                <div className="class-management-item border shadow-sm h-100">
                                    <div className="class-item-image-container position-relative ps-3 pt-3 pb-3" style={{ height: 160 }}>
                                        <div className="card-class-image class-card-back" />
                                        <div className="card-class-image class-card-middle" />
                                        <div className="card-class-image class-card-front">
                                        <img
                                            src={item.subject_img || 'https://dp.classroomscreen.com/96138/1744285416-stationrotation_shortthumbnail.png?fm=webp'}
                                            alt=""
                                            className="img-fluid "
                                        />
                                        </div>
                                    </div>
                                    <div className="class-item-content p-3">
                                        <div className="class-item-name fw-bold mb-1">{item.subject_name}</div>
                                        <div className="class-item-description text-muted mb-2">
                                        {item.description}
                                        </div>
                                        <div className="class-item-number-st mb-2">
                                        <strong>{item.student_count}</strong> students
                                        </div>
                                        <div className="class-item-teacher d-flex align-items-center gap-2">
                                        <img
                                            src={item.teacher_avatar || 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'}
                                            alt=""
                                            width={30}
                                            height={30}
                                        />
                                        <div className="class-teacher-name">{item.teacher_name}</div>
                                        <div className="dropdown ms-auto">
                                            <i
                                            className="bi bi-three-dots dropdown-toggle"
                                            role="button"
                                            id="dropdownMenuButton"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            />
                                            <ul
                                            className="dropdown-menu dropdown-menu-end"
                                            aria-labelledby="dropdownMenuButton"
                                            >
                                            <li>
                                                <a className="dropdown-item" href="#">
                                                View details
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="#">
                                                Edit
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="#">
                                                Delete
                                                </a>
                                            </li>
                                            </ul>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {showForm && (
                    <div className="col-12 mt-4">
                    <MultiStepForm 
                        onClose={handleCloseClassClick}
                        className="class-management-form"
                        onSubmit={fetchClasses} 
                    />
                    </div>
                )}
            </div>

    )
}