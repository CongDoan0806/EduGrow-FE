import React, { useState, useEffect } from 'react';
import './addUserModal.css';

const AddUserModal = ({ isOpen, onClose, role }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        role: role || 'student',
        class_name:'',
        subject:'',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        setFormData((prev) => ({ ...prev, role: role || 'student' }));
    }, [role]);

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
        setError(null);

        try {
            const token = localStorage.getItem("token");
            const response = await fetch('http://localhost:8000/api/Add-user', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
                body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Add user fail');
        }
        const data = await response.json();
        console.log('User added:', data);
        setFormData({
            class_name:'',
            email:'',
            phone:'',
            password: '',
            role: role||'student',
            subject:'',
        });
        onClose();
        } catch (err) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Add User</h2>
            <form onSubmit={handleSubmit}>
            <label>
                Name
                <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                />
            </label>
            <label>
                Role
                <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
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
                />
            </label>
            <label>
                Phone
                <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                />
            </label>
            <label>
                Password
                <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                />
            </label>
            {formData.role === 'student'&&(
                <label>
                    Class
                    <input
                    type="text"
                    name="class_name"
                    value={formData.class_name}
                    onChange={handleChange}
                    />
                </label>
            )}
            {formData.role ==='teacher'&&(
                <label>
                    Add subject
                    <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    />
                </label>
            )}
            
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="modal-buttons">
                <button type="submit" disabled={loading} className="save-button">
                {loading ? 'Saving...' : 'Save'}
                </button>
                <button type="button" onClick={onClose} className="cancel-button">
                Cancel
                </button>
            </div>
            </form>
        </div>
        </div>
    );
};

export default AddUserModal;