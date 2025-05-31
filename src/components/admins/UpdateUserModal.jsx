import React, { useState, useEffect } from "react";
import "./AddUserModal.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateUserModal = ({ isOpen, onClose, userData, userId, role }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: role || "student",
    class_name: "",
    subject: "",
  });
  const API_URL = process.env.REACT_APP_BE_URL;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        password: "",
        role: userData.role || role || "student",
        class_name: userData.class_name || "",
        subject: userData.subject || "",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: role || "student",
        class_name: "",
        subject: "",
      });
    }
  }, [userData, role]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const dataToSend = { ...formData };
      if (!dataToSend.password) {
        delete dataToSend.password;
      }

      const response = await fetch(
        `${API_URL}/api/admin/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Update user failed");
        return;
      }

      const data = await response.json();
      toast.success("User updated successfully");
      onClose();
    } catch (err) {
      toast.error(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ opacity: loading ? 0.6 : 1 }}
      >
        <h2>Update User</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </label>
          <label>
            Role
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </label>
          <label>
            Phone
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={loading}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Leave blank to keep current password"
              disabled={loading}
            />
          </label>
          {formData.role === "student" && (
            <label>
              Class
              <input
                type="text"
                name="class_name"
                value={formData.class_name}
                onChange={handleChange}
                disabled={loading}
              />
            </label>
          )}
          {formData.role === "teacher" && (
            <label>
              Subject
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                disabled={loading}
              />
            </label>
          )}
          <div className="modal-buttons">
            <button type="submit" disabled={loading} className="save-button">
              {loading ? "Updating..." : "Update"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserModal;
