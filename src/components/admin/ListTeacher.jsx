import axios from "axios";
import { useEffect, useState } from "react";

const Listteacher = () => {
    const [teachers, setTeacher] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [loading, setLoading] = useState(true); 
    const itemsPerPage = 5;

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsLoggedIn(false);
                setLoading(false);
                return;
            }

            const response = await axios.get('http://localhost:8000/api/admin/teacher', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = response.data;
            if (Array.isArray(data.data)) {
                setTeacher(data.data);
            } else {
                setTeacher([]);
                console.error('data.data is not an array:', data);
            }
        } catch (error) {
            console.error('Error fetching teachers', error);
            setIsLoggedIn(false); 
        } finally {
            setLoading(false);
        }
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedTeacher = teachers.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(teachers.length / itemsPerPage);

    if (loading) {
        return <div>⏳ Loading...</div>;
    }

    if (!isLoggedIn) {
        return <div className="error-message">⚠️ You are not logged in. Please log in to view the student list.</div>;
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Created_at</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedTeacher.map((teacher) => (
                        <tr key={teacher.teacher_id}>
                            <td>{teacher.teacher_id}</td>
                            <td>{teacher.name}</td>
                            <td>{teacher.email}</td>
                            <td>{teacher.created_at?.split('T')[0]}</td>
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

export default Listteacher;
