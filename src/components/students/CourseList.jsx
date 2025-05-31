import { useEffect, useState } from "react";
import axios from "axios";
export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const API_URL = process.env.REACT_APP_BE_URL;
  useEffect(() => {
    axios.get(`${API_URL}/api/student/subjects`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (res.data && Array.isArray(res.data.subjects)) {
          setCourses(res.data.subjects); 
        } else {
          console.error("API response does not contain a valid 'subjects' array:", res.data);
          setCourses([]); 
        }
      })
      .catch((err) => {
        console.error("Lỗi khi gọi API:", err);
      });
  }, []);

  return (
    <section className="course-section">
      <div className="course-list">
        {courses.map((course, index) => (
          <div className="course-card" key={index}>
            <div className="icon-circle">
              <img src={course.img} alt={`${course.name} Icon`} />
            </div>
            <div className="course-content">
              <div className="course-title">{course.name}</div>
              <div className="course-description">{course.description}</div>
              <button className="explore-btn">Explore</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};