import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ListStudentItem() {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [studentRating, setStudentRating] = useState({});
  const [openDropdown, setOpenDropdown] = useState(null);

  const API_URL = process.env.REACT_APP_BE_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/api/teacher/subjects`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSubjects(res.data.data || []);
      } catch (error) {
        console.error("Fetch subjects error:", error);
        setSubjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  useEffect(() => {
    const fetchStudentsBySubject = async (subjectId) => {
      try {
        setLoading(true);
        let url = `${API_URL}/api/teacher/students-by-subject`;
        if (subjectId) url += `?subject_id=${subjectId}`;
        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudents(res.data.success ? res.data.data || [] : []);
      } catch (error) {
        console.error("Fetch students error:", error);
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentsBySubject(subject);
  }, [subject]);

  useEffect(() => {
    const fetchRatingForStudent = async (studentId, subjectId) => {
      try {
        if (!subjectId || !studentId) return null;
        const res = await axios.get(
          `${API_URL}/api/teacher/student-rating?student_id=${studentId}&subject_id=${subjectId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.data.success) return res.data.data.rating;
        return null;
      } catch (error) {
        console.error(
          `Error fetching rating for student ${studentId}, subject ${subjectId}:`,
          error
        );
        return null;
      }
    };

    const fetchAllRatings = async () => {
      if (!subject || students.length === 0) {
        setStudentRating({});
        return;
      }
      const newRatings = {};
      for (const student of students) {
        const rating = await fetchRatingForStudent(student.student_id, subject);
        if (rating) newRatings[student.student_id] = rating;
      }
      setStudentRating(newRatings);
    };

    fetchAllRatings();
  }, [subject, students]);

  const handleRatingChange = async (studentId, rating) => {
    if (!subject) {
      alert("Please select a subject first.");
      return;
    }

    console.log("Rating data:", {
      student_id: studentId,
      subject_id: subject,
      rating,
    });

    try {
      const res = await axios.post(
        `${API_URL}/api/teacher/rate-student`,
        {
          student_id: studentId,
          subject_id: subject,
          rating,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.success) {
        setStudentRating((prev) => ({
          ...prev,
          [studentId]: rating,
        }));
        setOpenDropdown(null);
      } else {
        alert("Failed to save rating: " + res.data.message);
      }
    } catch (error) {
      console.error("Error saving rating:", error);
    }
  };

  const getButtonColor = (rating) => {
    switch (rating) {
      case "good":
        return "#137547";
      case "ok":
        return "orange";
      case "bad":
        return "#b91c1c";
      default:
        return "#7b6ada";
    }
  };

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
              <article key={student.student_id} className="student-card">
                <img
                  src={
                    student.avatar?.trim()
                      ? student.avatar
                      : "https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png"
                  }
                  alt="Avatar"
                  className="student-avatar"
                  loading="lazy"
                />
                <h2 className="student-name">{student.name}</h2>
                <nav className="tag-list" aria-label="Student tags">
                  <Link
                    to={`/teacher/student-goal/${student.student_id}`}
                    className="tag tag-goal"
                  >
                    goal
                  </Link>

                  <div className="tag-journal-wrapper">
                    <Link
                      to={`/teacher/journals/${student.student_id}`}
                      className="tag tag-journal"
                      style={{
                        backgroundColor: getButtonColor(
                          studentRating[student.student_id]
                        ),
                        color: "#fff",
                      }}
                    >
                      learning journal
                    </Link>

                    {subject && (
                      <div className="dropdown-container">
                        <img
                          src="/assets/images/listStudent/review.png"
                          alt="More options"
                          className="more-button"
                          onClick={() =>
                            setOpenDropdown(
                              openDropdown === student.student_id
                                ? null
                                : student.student_id
                            )
                          }
                        />
                        {openDropdown === student.student_id && (
                          <div className="dropdown animated-dropdown">
                            <div className="dropdown-header">
                              <span className="dropdown-title">
                                Select Rating
                              </span>
                              <span
                                className="close-button-icon"
                                onClick={() => setOpenDropdown(null)}
                              >
                                ×
                              </span>
                            </div>
                            <button
                              onClick={() =>
                                handleRatingChange(student.student_id, "good")
                              }
                            >
                              Good
                            </button>
                            <button
                              onClick={() =>
                                handleRatingChange(student.student_id, "ok")
                              }
                            >
                              Ok
                            </button>
                            <button
                              onClick={() =>
                                handleRatingChange(student.student_id, "bad")
                              }
                            >
                              Improvements Need
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </nav>
                <div className="student-info">
                  <p className="info-line">
                    <i
                      className="fas fa-envelope"
                      style={{ color: "#7b6ada" }}
                    ></i>
                    <a href={`mailto:${student.email}`}>{student.email}</a>
                  </p>
                  <p>
                    <i
                      className="fas fa-phone"
                      style={{ color: "#7b6ada" }}
                    ></i>
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
