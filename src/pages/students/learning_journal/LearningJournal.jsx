import React, { useContext } from 'react';
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './LearningJournal.css';
import JournalInfoPanel from '../../../components/students/JournalInfoPanel';
import InClassTable from '../../../components/students/InClassTable';
import SelfStudyTable from '../../../components/students/SelfStudyTable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MentionsInput, Mention } from 'react-mentions';
const API_URL = process.env.REACT_APP_BE_URL;
axios.defaults.baseURL = `${API_URL}`;

function LearningJournal() {
    const [inClassData, setInClassData] = useState([]);
    const [selfStudyData, setSelfStudyData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [startDateFromWeekApi, setStartDateFromWeekApi] = useState(null);
    const [endDateFromWeekApi, setEndDateFromWeekApi] = useState(null);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Tags
    const [subjects, setSubjects] = useState([]);
    const [learningJournals, setLearningJournals] = useState([]);
    const [comments, setComments] = useState([]);
    const [teacherSuggestions, setTeacherSuggestions] = useState([]);
    const [selectedTeacherId, setSelectedTeacherId] = useState(null);
    const [selectedSubjectId, setSelectedSubjectId] = useState('');
    const [learningJournalId, setLearningJournalId] = useState(null);
    const [message, setMessage] = useState('');

// 
    const inClassRef = useRef();
    const selfStudyRef = useRef();
    const navigate = useNavigate();

    const { weekId } = useParams();
    const weekNumber = parseInt(weekId?.replace('week', ''), 10) || 1;

    useEffect(() => {
        fetchStartAndEndDate();
        fetchLearningJournal();
    }, [weekNumber]);

    useEffect(() => {
        if (startDateFromWeekApi && !startDate) {
            setStartDate(startDateFromWeekApi);
        }
        if (endDateFromWeekApi && !endDate) {
            setEndDate(endDateFromWeekApi);
        }
    }, [startDateFromWeekApi, endDateFromWeekApi, startDate, endDate]);



    // Tags
    useEffect(() => {
        if (isModalOpen) {
        fetchSubjectsAndComments();
        }
    }, [isModalOpen, weekNumber]);

    useEffect(() => {
    if (selectedSubjectId && subjects.length > 0) {
        const selectedSubject = subjects.find(
        sub => sub.student_subject_id === parseInt(selectedSubjectId)
        );

        if (selectedSubject && selectedSubject.teacher) {
        const teacherId = selectedSubject.teacher.teacher_id;

        setTeacherSuggestions([{
            id: teacherId,
            display: selectedSubject.teacher.name,
        }]);

        setSelectedTeacherId(teacherId);
        } else {
        setTeacherSuggestions([]);
        setSelectedTeacherId(null);
        }

        console.log('learningJournals:', learningJournals);
        console.log('selectedSubjectId:', selectedSubjectId, 'weekNumber:', weekNumber);

        const matchedJournal = learningJournals.find(
        lj => lj.student_subject_id === parseInt(selectedSubjectId) && lj.week_number === weekNumber
        );
        setLearningJournalId(matchedJournal ? matchedJournal.learning_journal_id : null);

    } else {
        setTeacherSuggestions([]);
        setSelectedTeacherId(null);
        setLearningJournalId(null);
    }
    }, [selectedSubjectId, subjects, learningJournals, weekNumber]);


    const fetchStartAndEndDate = async () => {
    console.log(`Fetching week dates for week ${weekNumber}`); 
    try {
        const response = await axios.get(`/api/students/learning-journal/week/${weekNumber}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });


            setStartDateFromWeekApi(response.data.start_date || null);
            setEndDateFromWeekApi(response.data.end_date || null);
        } catch (err) {
            console.error('Failed to fetch start/end date:', err);
            toast.error('Could not load week dates');
        }
    };

    const fetchLearningJournal = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/students/learning-journals', {
                params: { week_number: weekNumber },
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                
            });

            setInClassData(response.data.data?.in_class || []);
            setSelfStudyData(response.data.data?.self_study || []);
            setStartDate(response.data.data?.start_date || null);
            setEndDate(response.data.data?.end_date || null);
            setLoading(false);
        } catch (err) {
            toast.error('Failed to fetch learning journal data');
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleWeekChange = (change) => {
        const newWeek = Math.max(1, Math.min(10, weekNumber + change));
        navigate(`/learning-journal/week${newWeek}`);
    };

    const openModal = () => setIsModalOpen(true);

    const handleOutsideClick = (e) => {
        if (e.target.className === 'modal-frm') {
            setIsModalOpen(false);
        }
    };

    const validateNewRows = () => {
        if (!startDate || !endDate) {
            toast.error('Start date or end date is missing');
            return false;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);
        if (isNaN(start) || isNaN(end)) {
            toast.error('Invalid start or end date');
            return false;
        }

        const inClassRows = inClassRef.current.getNewRows();
        const selfStudyRows = selfStudyRef.current.getNewRows();

        if (inClassRows.length === 0 && selfStudyRows.length === 0) {
            toast.error('Please add at least one row to save.');
            return false;
        }

        for (let row of inClassRows) {
            const inputDate = new Date(row.date);
            if (isNaN(inputDate)) {
                toast.error('Invalid date format in In Class');
                return false;
            }
            if (inputDate < start || inputDate > end) {
                toast.error(`In Class date must be between ${startDate} and ${endDate}`);
                return false;
            }
            if (!row.skills_module || !row.my_lesson || !row.self_assessment || !row.my_difficulties || !row.my_plan) {
                toast.error('All In Class fields are required');
                return false;
            }
        }

        for (let row of selfStudyRows) {
            const inputDate = new Date(row.date);
            if (isNaN(inputDate)) {
                toast.error('Invalid date format in Self Study');
                return false;
            }
            if (inputDate < start || inputDate > end) {
                toast.error(`Self Study date must be between ${startDate} and ${endDate}`);
                return false;
            }
            if (
                !row.skills_module ||
                !row.my_lesson ||
                !row.time_allocation ||
                !row.learning_resources ||
                !row.learning_activities ||
                !row.evaluation ||
                !row.reinforcing ||
                !row.notes
            ) {
                toast.error('All Self Study fields are required');
                return false;
            }
        }

        return true;
    };

    const handleSave = async () => {
        if (!validateNewRows()) return;

        const inClassRows = inClassRef.current.getNewRows();
        const selfStudyRows = selfStudyRef.current.getNewRows();

        const formattedInClassData = inClassRows.map((row) => ({
            date: row.date,
            skills_module: row.skills_module,
            my_lesson: row.my_lesson,
            self_assessment: row.self_assessment,
            my_difficulties: row.my_difficulties,
            my_plan: row.my_plan,
            problem_solved: row.problem_solved === 'Yes',
        }));

        const formattedSelfStudyData = selfStudyRows.map((row) => ({
            date: row.date,
            skills_module: row.skills_module,
            my_lesson: row.my_lesson,
            time_allocation: row.time_allocation,
            learning_resources: row.learning_resources,
            learning_activities: row.learning_activities,
            concentration: row.concentration === 'Yes',
            plan_follow: row.plan_follow === 'Yes',
            evaluation: row.evaluation,
            reinforcing: row.reinforcing,
            notes: row.notes,
        }));

        console.log('In Class Data to save:', formattedInClassData);
        console.log('Self Study Data to save:', formattedSelfStudyData);

        try {
            const response = await axios.post(
            `/api/students/learning-journals?week_number=${weekNumber}`,
                {
                    week_number: weekNumber,
                    in_class: formattedInClassData.length > 0 ? formattedInClassData : [],
                    self_study: formattedSelfStudyData.length > 0 ? formattedSelfStudyData : [],
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            console.log('Response from API:', response.data);

            if (response.data.data) {
                setInClassData(response.data.data.in_class || []);
                setSelfStudyData(response.data.data.self_study || []);
            } else {
                console.log('No data returned, fetching again...');
                await fetchLearningJournal();
            }

            console.log('Payload sent:', {
                week_number: weekNumber,
                in_class: formattedInClassData,
                self_study: formattedSelfStudyData
            });

            inClassRef.current.clearNewRows();
            selfStudyRef.current.clearNewRows();
            toast.success('Data saved successfully');
        } catch (error) {
                if (error.response) {
                    toast.error(error.response.data.message || 'Failed to save data');
                } else if (error.request) {
                    toast.error('No response from server');
                } else {
                    toast.error(error.message || 'Unexpected error');
                }

                console.error(error);
        }
    }

    const fetchSubjectsAndComments = async () => {
    try {
        const res = await axios.get(`/api/students/tag/subjects-comments?week_number=${weekNumber}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });

        const subjectsRaw = res.data.subjects || [];
        const learningJournalsRaw = res.data.learning_journals || [];
        const subjectsWithStudentSubjectId = subjectsRaw.map(subject => {
        const matchedLJ = learningJournalsRaw.find(
            lj => lj.subject_id === subject.subject_id && lj.week_number === weekNumber
        );

        return {
            ...subject,
            student_subject_id: matchedLJ ? matchedLJ.student_subject_id : null,
            teacher: subject.teachers || null,
        };
        });

        setSubjects(subjectsWithStudentSubjectId);
        setComments(res.data.tags || []);
        setLearningJournals(learningJournalsRaw);
    } catch (err) {
        toast.error('Failed to load subjects or comments');
    }
    };

    const handleSubjectChange = async (event) => {
        const subjectId = event.target.value;
        console.log(subjectId);
        setSelectedSubjectId(subjectId);
        // Reset lại khi đổi môn học
        setSelectedTeacherId(null);
        setMessage('');
        setTeacherSuggestions([]);

        if (subjectId) {
            try {
                const res = await axios.get(`/api/students/tag/teachers?subject_id=${subjectId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });

        console.log("API RESPONSE:", res.data); 

        const teacher = res.data.teacher;
        if (teacher) {
            const suggestion = {
                id: teacher.teacher_id.toString(),
                name: teacher.name,
            };
            console.log("Set suggestion:", suggestion); 
            setTeacherSuggestions([suggestion]);
        } else {
            setTeacherSuggestions([]);
        }
        } catch (err) {
            console.error(err);
            toast.error('Failed to load teachers');
        }
        }
    };

    const handleSendMessage = async () => {
        if (!message.trim()) {
            toast.error('Message cannot be empty');
            return;
        }
        if (!selectedSubjectId) {
            toast.error('Please select a subject');
            return;
        }

        if (!learningJournalId) {
            console.log(learningJournalId)
            toast.error('Learning journal for the selected subject and week not found');
            return;
        }

        if (!selectedTeacherId) {
            toast.error('Please select a teacher');
            return;
        }

        try {
            const res = await axios.post(
            `/api/students/tags?week_number=${weekNumber}`,
            {
                learning_journal_id: learningJournalId,
                teacher_id: selectedTeacherId,
                message,
            },
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            }
            );

            setComments(res.data.all_tags_in_week || []);
            setMessage('');
            toast.success('Comment sent');
        } catch (err) {
            toast.error('Failed to send comment');
        }
    };

    const handleCellUpdate = async (type, date, field, value) => {
        try {
            const response = await axios.patch('/api/students/learning-journals/update-cell', {
                week_number: weekNumber,
                type: type,
                date: date,
                field: field,
                value: value
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            toast.success('Cập nhật thành công');
            
            // Refresh data to show updated content
            await fetchLearningJournal();
            
        } catch (error) {
            console.error('Error updating cell:', error);
            toast.error(error.response?.data?.message || 'Cập nhật thất bại');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='learning-journal-container' style={{ paddingTop: '88px' }}>
            <div className='content'>
                <ToastContainer />
                <section className='journal-info-panel'>
                    <JournalInfoPanel 
                        weekNumber={weekNumber}
                        startDate={startDateFromWeekApi}
                        endDate={endDateFromWeekApi}
                        onWeekChange={handleWeekChange}
                        onNeedReviewClick={openModal}
                        onSave={handleSave}
                    />
                </section>

                <section className='in-class-table'>
                    <InClassTable 
                        data={inClassData} 
                        ref={inClassRef}
                        onCellUpdate={handleCellUpdate}
                    />
                </section>

                <section className='self-study-table'>
                    <SelfStudyTable 
                        data={selfStudyData} 
                        ref={selfStudyRef}
                        onCellUpdate={handleCellUpdate}
                    />
                </section>
            </div>

            {isModalOpen && (
                <div className="modal-frm" onClick={handleOutsideClick}>
                    <div
                    className="modal-frm-content"
                    onClick={(e) => e.stopPropagation()}
                    >
                    <div className="modal_header">
                        <h2 className="modal-title">Comment</h2>
                        <select
                        className="subject-select"
                        value={selectedSubjectId}
                        onChange={handleSubjectChange}
                        >
                        <option value="">-- Select Subject --</option>
                        {subjects.map((subject) => (
                            <option key={subject.subject_id} value={subject.subject_id}>
                            {subject.name}
                            </option>
                        ))}
                        </select>
                        <span className="close-modal-btn" onClick={() => setIsModalOpen(false)}>
                        ×
                        </span>
                    </div>

                    {/* COMMENT LIST */}
                    <div className="comment-list">
                    {comments.map((tag) => (
                        <div key={tag.tag_id} className="comment-item">
                        <div className="comment-container">
                            {/* Header của comment */}
                            <div className="comment-header">
                            <img
                                src={tag.student?.avatar || "/assets/images/avta.png"}
                                alt="Avatar"
                                className="comment-avatar"
                            />
                            <div className="comment-title">
                                <div className="comment-info">
                                <span className="comment-user">{tag.student?.name || "Unknown Student"}</span>
                                <span className="comment-role">student</span>
                                </div>
                                <span className="comment-time">
                                {new Date(tag.created_at).toLocaleDateString()}{" "}
                                {new Date(tag.created_at).toLocaleTimeString()}
                                </span>
                            </div>
                            </div>

                            {/* Nội dung Tag */}
                            <p className="comment-text tag-content-journal mb-4">
                            <span className="tag">@{tag.teachers?.name}</span> {tag.message}
                            </p>
                        </div>

                        {/* Các Replies */}
                        {tag.tag_replies && tag.tag_replies.length > 0 && (
                            <div className="reply-list">
                            {tag.tag_replies.map((reply) => (
                                <div key={reply.reply_id} className="reply-item">
                                <div className="comment-header">
                                    <img
                                    src={tag.teachers?.image || "/assets/images/avta.png"}
                                    alt="Avatar"
                                    className="comment-avatar"
                                    />
                                    <div className="comment-title">
                                    <div className="comment-info">
                                        <span className="comment-user">{tag.teachers?.name || "Teacher"}</span>
                                        <span className="comment-role">teacher</span>
                                    </div>
                                    <span className="comment-time">
                                        {new Date(reply.created_at).toLocaleDateString()}{" "}
                                        {new Date(reply.created_at).toLocaleTimeString()}
                                    </span>
                                    </div>
                                </div>
                                <p className="comment-text tag-content-journal mb-4">{reply.content}</p>
                                </div>
                            ))}
                            </div>
                        )}
                        </div>
                    ))}
                    </div>


                    {/* COMMENT INPUT (REACT-MENTIONS) */}
                    <div className="comment-input-container">
                        <div className="comment-input-wrapper">
                        <img src="/assets/images/avta.png" alt="Avatar" className="comment-avatar" />

                        <MentionsInput
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="mentions"
                            placeholder="Write comment with @teacher ..."
                        >
                        <Mention
                                trigger="@"
                                markup="@__display__"
                                data={teacherSuggestions.map(t => ({ id: t.id, display: t.name }))}
                                displayTransform={(id, display) => `@${display}`}
                            />
                        </MentionsInput>

                    <button
                        className="send-btn"
                        onClick={handleSendMessage}
                        disabled={!selectedSubjectId || message.trim() === ""}
                        title={
                        !selectedSubjectId
                            ? "Select a subject first"
                            : message.trim() === ""
                            ? "Write a message"
                            : ""
                        }
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="#000" />
                        </svg>
                    </button>
                    </div>
                </div>
                </div>
            </div>
        )}
    </div>
);
}

export default LearningJournal;