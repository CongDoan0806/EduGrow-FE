import axios from "axios";
import { useEffect, useState } from "react";

const ListStudent = ({ currentPage, itemsPerPage, onPageChange }) => {
    const [students, setStudent] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/admin/student');
            const data = response.data;

            if (Array.isArray(data.data)) {
                setStudent(data.data);
            } else {
                setStudent([]);
                console.error('data.data is not an array:', data);
            }
        } catch (error) {
            console.error('Error fetch students', error);
        }
    };
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedStudents = students.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(students.length / itemsPerPage);

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
                            <td>{student.created_at}</td>
                            <td>
                                <button className="update-btn">Update</button>
                                <button className="delete-btn">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                <span onClick={() => onPageChange(Math.max(1, currentPage - 1))}>{'«'}</span>
                {Array.from({ length: totalPages }, (_, i) => (
                    <span
                        key={i}
                        className={currentPage === i + 1 ? 'active' : ''}
                        onClick={() => onPageChange(i + 1)}
                    >
                        {i + 1}
                    </span>
                ))}
                <span onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}>{'»'}</span>
            </div>
        </>
    );
};

export default ListStudent;
