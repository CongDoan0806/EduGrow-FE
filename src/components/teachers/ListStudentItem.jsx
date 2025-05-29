import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ListStudentItem() {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/teacher/subjects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubjects(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch subjects:", error);
      setSubjects([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentsBySubject = async (subjectId) => {
    try {
      setLoading(true);
      let url = "/api/teacher/students-by-subject";
      if (subjectId) {
        url += `?subject_id=${subjectId}`;
      }
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setStudents(response.data.data || []);
      } else {
        setStudents([]);
        console.warn("API returned success: false", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    fetchStudentsBySubject(subject);
  }, [subject]);

  return (
    <div className="container" role="main">
      <div className="main-content">
        <header className="header-bar">
          <h1 className="page-title">List Student</h1>
          <div className="filter-group">
            <button className="btn-filter" type="button">
              Total: {students.length}
            </button>

            <select
              className="select-subject"
              name="subject"
              aria-label="Select subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="">All subjects</option>
              {subjects.map((subj) => (
                <option key={subj.id} value={subj.id}>
                  {subj.name}
                </option>
              ))}
            </select>
          </div>
        </header>

        <section className="students-container" aria-label="List of students">
          {loading ? (
            <p>Loading...</p>
          ) : students.length === 0 ? (
            <p>No students found</p>
          ) : (
            students.map((student) => (
              <article key={student.id} className="student-card">
                <img
                  src={
                    student.avatar && student.avatar.trim() !== ""
                      ? student.avatar
                      : "https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png"
                  }
                  alt="Avatar"
                  className="student-avatar"
                  loading="lazy"
                />

                <h2 className="student-name">{student.name}</h2>
                <nav className="tag-list" aria-label="Student tags">
                  <a href="/goal" className="tag tag-goal">
                    goal
                  </a>
                  <Link
                    to={`/teacher/journals/${student.student_id}`}
                    className="tag tag-journal"
                  >
                    learning journal
                  </Link>
                </nav>
                <div className="student-info">
                  <p className="info-line">
                    <i className="fas fa-envelope" style={{ color: "#7b6ada" }}></i>
                    <a href={`mailto:${student.email}`}>{student.email}</a>
                  </p>
                  <p>
                    <i className="fas fa-phone" style={{ color: "#7b6ada" }}></i>
                    {student.phone}
                  </p>
                </div>
              </article>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
