import axios from "axios";
import { useEffect, useState } from "react";

const ListStudent = () => {
    const [students, setStudent] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 5;

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsLoggedIn(false);
                setLoading(false);
                return;
            }

            const response = await axios.get('http://localhost:8000/api/admin/student', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = response.data;
            if (Array.isArray(data.data)) {
                setStudent(data.data);
            } else {
                setStudent([]);
                console.error('data.data is not an array:', data);
            }
        } catch (error) {
            console.error('Error fetching students', error);
            setIsLoggedIn(false); 
        } finally {
            setLoading(false);
        }
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedStudents = students.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(students.length / itemsPerPage);

    if (loading) {
        return <div>⏳ Loading...</div>;
    }

    if (!isLoggedIn) {
        return <div className="error-message">⚠️You are not logged in. Please log in to view the student list.</div>;
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
                        <th>Created_at</th>
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
                            <td>{student.created_at?.split('T')[0]}</td>
                            <td>
                                <button className="update-btn">Update</button>
                                <button className="delete-btn">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                <span onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>{'«'}</span>
                {Array.from({ length: totalPages }, (_, i) => (
                    <span
                        key={i}
                        className={currentPage === i + 1 ? 'active' : ''}
                        onClick={() => setCurrentPage(i + 1)}
                    >
                        {i + 1}
                    </span>
                ))}
                <span onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}>{'»'}</span>
            </div>
        </>
    );
};

export default ListStudent;
