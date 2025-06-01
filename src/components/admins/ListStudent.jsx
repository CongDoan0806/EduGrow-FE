import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import UpdateUserModal from "./UpdateUserModal";
import "react-toastify/dist/ReactToastify.css";

const ListStudent = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const API_URL = process.env.REACT_APP_BE_URL;

  const itemsPerPage = 5;

  const getAuthHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoggedIn(false);
        toast.error("⚠️ You are not logged in.");
        setLoading(false);
        return;
      }
      const response = await axios.get(`${API_URL}/api/admin/students`, {
        headers: getAuthHeader(),
      });
      if (Array.isArray(response.data.data)) {
        setStudents(response.data.data);
        setIsLoggedIn(true);
      } else {
        setStudents([]);
        toast.error("⚠️ Unexpected response format.");
      }
    } catch (err) {
      toast.error("❌ Failed to load student data.");
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  const openUpdateModal = (student) => {
    setSelectedStudent(student);
    setModalOpen(true);
  };

  const closeUpdateModal = () => {
    setModalOpen(false);
    setSelectedStudent(null);
  };

  const handleUserUpdated = () => {
    fetchStudents();
    closeUpdateModal();
    toast.success("Student updated successfully.");
  };

  // Mở confirm modal xóa
  const openDeleteConfirm = (student) => {
    setStudentToDelete(student);
    setDeleteConfirmOpen(true);
  };

  // Đóng confirm modal xóa
  const closeDeleteConfirm = () => {
    setStudentToDelete(null);
    setDeleteConfirmOpen(false);
  };

  // Thực hiện xóa
  const handleDeleteStudent = async () => {
    if (!studentToDelete) return;

    setActionLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Unauthorized. Please log in again.");
        setActionLoading(false);
        return;
      }

      await axios.delete(`${API_URL}/api/admin/users/${studentToDelete.student_id}`, {
        headers: getAuthHeader(),
        data: {
          role: "student",
        },
      });

      setStudents((prev) =>
        prev.filter((s) => s.student_id !== studentToDelete.student_id)
      );
      toast.success("Student deleted successfully.");
      closeDeleteConfirm();
    } catch (err) {
      toast.error("Failed to delete student.");
    } finally {
      setActionLoading(false);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = students.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(students.length / itemsPerPage);

  if (loading)
    return (
      <div className="loading-overlay">
        <div className="loading-spinner"></div>
        <p>⏳ Loading...</p>
      </div>
    );

  if (!isLoggedIn) {
    return (
      <div className="error-message">
        ⚠️ You are not logged in. Please log in to view the student list.
      </div>
    );
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Class</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedStudents.map((student) => (
            <tr key={student.student_id}>
              <td>{student.student_id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.class_name}</td>
              <td>{student.created_at?.split("T")[0]}</td>
              <td>
                <button
                  className="update-btn"
                  onClick={() => openUpdateModal(student)}
                  disabled={actionLoading}
                >
                  Update
                </button>
                <button
                  className="delete-btn"
                  onClick={() => openDeleteConfirm(student)}
                  disabled={actionLoading}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <span
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          style={{ cursor: "pointer" }}
        >
          {"«"}
        </span>
        {Array.from({ length: totalPages }, (_, i) => (
          <span
            key={i}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => setCurrentPage(i + 1)}
            style={{ cursor: "pointer" }}
          >
            {i + 1}
          </span>
        ))}
        <span
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          style={{ cursor: "pointer" }}
        >
          {"»"}
        </span>
      </div>

      {/* Update Modal */}
      {modalOpen && selectedStudent && (
        <UpdateUserModal
          isOpen={modalOpen}
          onClose={closeUpdateModal}
          role={selectedStudent.role}
          userData={selectedStudent}
          userId={selectedStudent.student_id}
          onUserUpdated={handleUserUpdated}
        />
      )}

      {/* Confirm Delete Modal */}
      {deleteConfirmOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Are you sure you want to delete student "{studentToDelete?.name}"?</p>
            <div className="modal-actions">
              <button onClick={handleDeleteStudent} disabled={actionLoading}>
                {actionLoading ? "Deleting..." : "Yes, Delete"}
              </button>
              <button onClick={closeDeleteConfirm} disabled={actionLoading}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default ListStudent;
