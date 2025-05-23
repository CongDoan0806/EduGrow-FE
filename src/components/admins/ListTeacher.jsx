import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import UpdateUserModal from "./UpdateUserModal";
import "react-toastify/dist/ReactToastify.css";

const ListTeacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const itemsPerPage = 5;

  const getAuthHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoggedIn(false);
        toast.error("⚠️ You are not logged in.");
        setLoading(false);
        return;
      }
      const response = await axios.get("http://localhost:8000/api/admin/teacher", {
        headers: getAuthHeader(),
      });
      if (Array.isArray(response.data.data)) {
        setTeachers(response.data.data);
        setIsLoggedIn(true);
      } else {
        setTeachers([]);
        toast.error("⚠️ Unexpected response format.");
      }
    } catch (err) {
      toast.error("❌ Failed to load teacher data.");
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  const openUpdateModal = (teacher) => {
    setSelectedTeacher(teacher);
    setModalOpen(true);
  };

  const closeUpdateModal = () => {
    setModalOpen(false);
    setSelectedTeacher(null);
  };

  const handleUserUpdated = () => {
    fetchTeachers();
    closeUpdateModal();
    toast.success("Teacher updated successfully.");
  };

  const openDeleteConfirm = (teacher) => {
    setTeacherToDelete(teacher);
    setDeleteConfirmOpen(true);
  };

  const closeDeleteConfirm = () => {
    setTeacherToDelete(null);
    setDeleteConfirmOpen(false);
  };

  const handleDeleteTeacher = async () => {
    if (!teacherToDelete) return;

    setActionLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Unauthorized. Please log in again.");
        setActionLoading(false);
        return;
      }

      await axios.delete(`http://localhost:8000/api/delete-user/${teacherToDelete.teacher_id}`, {
        headers: getAuthHeader(),
        data: { role: "teacher" },
      });

      setTeachers((prev) =>
        prev.filter((t) => t.teacher_id !== teacherToDelete.teacher_id)
      );
      toast.success("Teacher deleted successfully.");
      closeDeleteConfirm();
    } catch (err) {
      toast.error("Failed to delete teacher.");
    } finally {
      setActionLoading(false);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTeachers = teachers.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(teachers.length / itemsPerPage);

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
        ⚠️ You are not logged in. Please log in to view the teacher list.
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
            <th>Subject</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTeachers.map((teacher) => (
            <tr key={teacher.teacher_id}>
              <td>{teacher.teacher_id}</td>
              <td>{teacher.name}</td>
              <td>{teacher.email}</td>
              <td>{teacher.subject}</td>
              <td>{teacher.created_at?.split("T")[0]}</td>
              <td>
                <button
                  className="update-btn"
                  onClick={() => openUpdateModal(teacher)}
                  disabled={actionLoading}
                >
                  Update
                </button>
                <button
                  className="delete-btn"
                  onClick={() => openDeleteConfirm(teacher)}
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
      {modalOpen && selectedTeacher && (
        <UpdateUserModal
          isOpen={modalOpen}
          onClose={closeUpdateModal}
          role="teacher"
          userData={selectedTeacher}
          userId={selectedTeacher.teacher_id}
          onUserUpdated={handleUserUpdated}
        />
      )}

      {/* Confirm Delete Modal */}
      {deleteConfirmOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Are you sure you want to delete teacher "{teacherToDelete?.name}"?</p>
            <div className="modal-actions">
              <button onClick={handleDeleteTeacher} disabled={actionLoading}>
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

export default ListTeacher;
