import axios from "axios";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader"; 

export default function Step2_SelectTeacher({ formData, updateFormData }) {
  const [teachers, setTeacher] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.REACT_APP_BE_URL;
  const handleSelect = (id) => {
    updateFormData({ teacherId: id });
  };
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${API_URL}/api/admin/teachers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const teacherData = res.data?.data;
        if (Array.isArray(teacherData)) {
          setTeacher(teacherData);
          console.log("teacher data: ", teacherData);
        } else {
          console.error(
            "API response does not contain a valid 'student' array:",
            res.data
          );
          setTeacher([]);
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
      <h3 className="fw-bold">CHOOSE A TEACHER</h3>
      <p className="text-muted mb-4">Please provide teacher of the class.</p>
      <form className="form-add-class" style={{ marginBottom: "6px" }}>
        <div className="mb-3">
          <label className="form-label">Select a teacher</label>
          <div className="user-list-container border rounded p-2" style={{minHeight: '150px' }}>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{minHeight: '150px' }}>
                    <ClipLoader size={35} color="#0d6efd" loading={loading} />
                </div>
            ) : (
            <div className="row gy-2 form-container-item">
                {teachers.map((item, index) => (
                    <div className="col-12" key={index}>
                        <label className="form-check d-flex align-items-center border rounded p-2 user-item">
                        <input
                            className="form-check-input d-none user-radio"
                            type="radio"
                            name="userSelect"
                            checked={formData.teacherId === item.teacher_id}
                            onChange={() => handleSelect(item.teacher_id)}
                        />
                        <img
                            src={item.image}
                            className="rounded-circle avatar-user-form me-3"
                            alt="Avatar"
                        />
                        <div>
                            <div className="fw-bold">{item.name}</div>
                            <div className="text-muted small">
                            {item.email}
                            </div>
                        </div>
                        </label>
                    </div>

                ))}
              {/* Thêm các item khác giống như vậy */}
            </div>
            )}
          </div>
        </div>
      </form>
    </>
  );
}
