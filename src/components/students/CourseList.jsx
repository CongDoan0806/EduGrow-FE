import { useEffect, useState } from "react";
import axios from "axios";
export default function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/student/subjects")
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