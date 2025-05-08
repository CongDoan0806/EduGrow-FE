import { useEffect, useState } from "react";
import axios from "axios";
import "./CourseList.css"; 

export default function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("https://6809104e1f1a52874cdbc8bb.mockapi.io/apiCamera/Product")
      .then((res) => {
        setCourses(res.data);
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
              <img src={course.icon} alt={`${course.title} Icon`} />
            </div>
            <div className="course-content">
              <div className="course-title">{course.title}</div>
              <div className="course-description">{course.description}</div>
              <button className="explore-btn">Explore</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

