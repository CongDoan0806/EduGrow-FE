import axios from "axios";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader"; 

export default function Step3_SelectStudent({ formData, updateFormData }) {
    const [students, setStudent] = useState([]);
    const [loading, setLoading] = useState(true);
    const API_URL = process.env.REACT_APP_BE_URL;
    const toggleStudent = (id) => {
        const updatedIds = formData.studentIds.includes(id)
            ? formData.studentIds.filter(sid => sid !== id)
            : [...formData.studentIds, id];
        updateFormData({ studentIds: updatedIds });
    };
    useEffect(() => {
        const token = localStorage.getItem('token'); 

        axios.get(`${API_URL}/api/admin/students`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            const studentData = res.data?.data;
            if (Array.isArray(studentData)) {
                setStudent(studentData); 
            } else {
                console.error("API response does not contain a valid 'student' array:", res.data);
                setStudent([]); 
            }
        })
        .catch((err) => {
            console.error("Lỗi khi gọi API:", err);
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        <>
            <h3 className="fw-bold">CHOOSE STUDENTS</h3>
            <p className="text-muted mb-4">Please provide students of the class.</p>
            <form className="form-add-class" style={{ marginBottom: '6px' }}>
                <div className="mb-3">
                    <label className="form-label">Select students</label>
                    <div className="user-list-container border rounded p-3" style={{ minHeight: 150 }}>
                        {loading ? (
                            <div className="d-flex justify-content-center align-items-center" style={{minHeight: '150px' }}>
                                <ClipLoader size={35} color="#0d6efd" loading={loading} />
                            </div>
                        ) : (
                            <div className="row gy-2 form-container-item">
                                {students.map((item, index) => (
                                    <div className="col-12" key={index}>
                                        <label className="form-check d-flex align-items-center border rounded p-2 user-item">
                                            <input type="checkbox" className="d-none user-checkbox" 
                                                checked={formData.studentIds.includes(item.student_id)}
                                                onChange={() => toggleStudent(item.student_id)}
                                            />
                                            <img src={item.avatar} className="rounded-circle avatar-user-form me-3" alt="Avatar" />
                                            <div>
                                                <div className="fw-bold">{item.name}</div>
                                                <div className="text-muted small">{item.email}</div>
                                            </div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </>
    );
}
