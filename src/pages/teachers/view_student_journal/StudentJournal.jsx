import '../../students/learning_journal/LearningJournal.css';
import JournalInfoPanelTeacher from '../../../components/students/JournalInfoPanelTeacher';
import { useState, useEffect  } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import JournalClassItem from '../../../components/teachers/JournalClassItem';
import JournalSelfItem from '../../../components/teachers/JournalSelfItem';
import { BounceLoader} from 'react-spinners';
import { format } from 'date-fns/format';
function StudentJournal () {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [commentTexts, setCommentTexts] = useState({});
    const openModal = () => setIsModalOpen(true);
    console.log("isModalOpen:", isModalOpen); 
    // Đóng modal khi nhấp ra ngoài
    const handleOutsideClick = (e) => {
        if (e.target.className === 'modal') {
        setIsModalOpen(false);
        }
    };
    // Lấy data learning journal
    const { studentId } = useParams();
    const [weekNumber, setWeekNumber] = useState(1);
    const [classJournals, setClassJournals] = useState([]);
    const [selfJournals, setSelfJournals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tagData, setTagData] = useState([]);
    const [journalStartDate, setJournalStartDate] = useState('');
    const [journalEndDate, setJournalEndDate] = useState('');
    const fetchJournalData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/teachers/learning-journal/${studentId}`, {
                headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                withCredentials: true,
            });
            setClassJournals(res.data.class_journals || []);
            setSelfJournals(res.data.self_journals || []);
            setWeekNumber(res.data.class_journals[0]?.week_number || 1);
            setJournalStartDate(res.data.class_journals[0]?.start_date || '');
            setJournalEndDate(res.data.class_journals[0]?.end_date || '');
            fetchTagData(res.data.class_journals[0]?.learning_journal_id || 0); 
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu ban đầu:', error);
        } finally {
            setLoading(false);
        }
    };

    // cái này dể lấy dât theo tuần 
    const fetchJournalDataByWeek = async (weekNumber) => {
        setLoading(true);
        try {
        const res = await axios.get(`/api/teachers/learning-journal/${studentId}`, {
            params: { week_number: weekNumber },
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            withCredentials: true,
        });
        setClassJournals(res.data.class_journals || []);
        console.log("classJournals:", res.data.class_journals);
        setSelfJournals(res.data.self_journals || []); 
        fetchTagData(res.data.class_journals[0]?.learning_journal_id || 0); 
        console.log("tagData:", res.data.class_journals[0]?.learning_journal_id);
        setJournalStartDate(res.data.class_journals[0]?.start_date || '');
        setJournalEndDate(res.data.class_journals[0]?.end_date || '');
        console.log("weekNumber:", res.data.class_journals[0]?.start_date);
        } catch (error) {
        console.error(`Lỗi khi lấy dữ liệu tuần ${weekNumber}:`, error);
        } finally {
        setLoading(false);
        }
    };


    useEffect(() => {
        fetchJournalData();
    }, []);

    const handleNextWeek = () => {
        setWeekNumber(prev => prev + 1);
        fetchJournalDataByWeek(weekNumber + 1);
    };

    const handlePreviousWeek = () => {
        if (weekNumber > 1) {
            setWeekNumber(prev => prev - 1);
            fetchJournalDataByWeek(weekNumber - 1);
        }else{
            toast.error('This is the first week');
        }
    };
    // Xử lý comment, tag
    const handleInputChange = (tagId, value) => {
        setCommentTexts(prev => ({
            ...prev,
            [tagId]: value
        }));
    };

    // lấy các cái comment 
    const fetchTagData = async (id) => {
        try {
            console.log("id:", id);
            const res = await axios.get(`/api/teachers/learning-journals/${id}/tags`, {
                headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                withCredentials: true,
            });
            setTagData(groupTags(res.data || []));
            console.log("tagData:", res.data);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu ban đầu:', error);
        }
    };

    // Nhóm các tag lại với nhau ;)
    const groupTags = (data) => {
        const groupedData = data.reduce((acc, item) => {
            const {
                tag_id,
                message,
                tag_created_at,
                reply_id,
                content,
                reply_created_at,
                student_name,
                student_avatar,
                teacher_name,
                teacher_image,
            } = item;

            const groupKey = `${tag_id}_${student_name}_${student_avatar}`;

            if (!acc[groupKey]) {
                acc[groupKey] = {
                    tag_id,
                    student_name,
                    student_avatar,
                    message,
                    tag_created_at,
                    replies: [],
                };
            }

            acc[groupKey].replies.push({
                reply_id,
                content,
                teacher_name,
                teacher_image,
                reply_created_at,
            });

            return acc;
        }, {});

        // Trả về mảng các nhóm
        return Object.values(groupedData);
    };


    // Xử lý gửi comment 
    const handleSubmitComment = async (tag_id) => {
        const commentText = commentTexts[tag_id];

        if (!commentText?.trim()) {
            toast.error('Comment cannot be empty');
            return;
        }

        const payload = {
            content: commentText,
            tag_id: tag_id,
        };

        const endpoint = '/api/teachers/feedback';

        try {
            const response = await axios.post(endpoint, payload, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });

            if (response.status === 200 || response.status === 201) {
                setCommentTexts(prev => ({
                    ...prev,
                    [tag_id]: ''
                }));          
            }else {
                toast.error('Comment failed. Please check your information again.');
            }
            fetchTagData(classJournals[0]?.learning_journal_id);
        } catch (err) {
            console.error('Error posting comment:', err.response?.data || err.message);
            toast.error('Comment failed. Please check your information again.');   
        }
    };

    const formatTime = (timeStr) => {
        if (!timeStr) return '';
        try {
            return format(new Date(timeStr), 'HH:mm'); // hoặc 'dd MMM' nếu cần ngày
        } catch (e) {
            return '';
        }
    };

    if (loading) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <BounceLoader color="#7B6ADA" loading={loading} size={80} />
        </div>
      );
    }
    return (
        <div>
            <div className='content'>
                <section className='journal-info-panel'>
                   <JournalInfoPanelTeacher 
                        weekNumber={weekNumber}
                        journalStartDate={journalStartDate}
                        journalEndDate={journalEndDate}
                        onNeedReviewClick={openModal} 
                        onNextWeek={handleNextWeek} 
                        onPrevWeek={handlePreviousWeek}
                    />
                </section>
                <section className='in-class-table'>
                    <div className="in-class-container">
                    <h2 className="title-in-class">IN CLASS</h2>
                    <div className="table-wrapper">
                    <table className="in-class-table">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Skills/Module</th>
                            <th>My Lesson</th>
                            <th>Self-assessment</th>
                            <th>My Difficulties</th>
                            <th>My Plan</th>
                            <th>Problem Solved</th>
                        </tr>
                        </thead>
                        <tbody>
                            {classJournals.map((item, index) => (
                                <JournalClassItem key={index} journal={item} />
                            ))}
                        </tbody>
                    </table>
                    </div>
                </div>
                </section>
                <section className='self-study-table'>
                      <div className="self-study-container">
                        <h2 className="title-self-study">SELF-STUDY</h2>
                        <div className="table-wrapper">
                            <table className="self-study-table">
                            <thead>
                                <tr>
                                <th>Date</th>
                                <th>Skills/Module</th>
                                <th>My lesson</th>
                                <th>Time allocation</th>
                                <th>Learning resources</th>
                                <th>Learning activities</th>
                                <th>Concentration</th>
                                <th>Plan & follow plan</th>
                                <th>Evaluation of my work</th>
                                <th>Reinforcing learning</th>
                                <th>Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selfJournals.map((item, index) => (
                                    <JournalSelfItem key={index} journal={item} />
                                ))}
                            </tbody>
                            </table>
                        </div>
                        </div>
                 </section>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal-frm" onClick={handleOutsideClick}>
                    <div className="modal-frm-content">
                        <div className="modal-header">
                            <h2 className='modal-title'>Comment</h2>
                            <span className="close-modal-btn" onClick={() => setIsModalOpen(false)}>×</span>
                        </div>
                        <div className="comment-list">
                            {tagData.length === 0 ? (
                                <div className="no-comments d-flex justify-content-center align-items-center text-white">
                                    <p>No comments found.</p>
                                </div>
                            ) : (
                                tagData.map((tag) => (
                                    <div className="comment-item" key={tag.tag_id}>
                                        <div className='comment-container'>
                                            <div className="comment-header">
                                                <img src={tag.student_avatar} alt="Avatar" className="comment-avatar" />
                                                <div className='comment-title'>
                                                    <div className='comment-info'>
                                                        <span className="comment-user">{tag.student_name}</span>
                                                        <span className="comment-role">student</span>
                                                    </div>
                                                    <span className="comment-time">{formatTime(tag.tag_created_at)}</span>
                                                </div>
                                            </div>
                                            <p className="comment-text tag-content-journal mb-4">
                                                <span className='tag'></span>{tag.message}
                                            </p>
                                        </div>

                                        {/* List of replies */}
                                        <div className="reply-list">
                                            {tag.replies.map(reply => (
                                                <div key={reply.reply_id} className="reply-item">
                                                    <div className="comment-header">
                                                        <img src={reply.teacher_image} alt="Avatar" className="comment-avatar" />
                                                        <div className='comment-title'>
                                                            <div className='comment-info'>
                                                                <span className="comment-user">{reply.teacher_name}</span>
                                                                <span className="comment-role">teacher</span>
                                                            </div>
                                                            <span className="comment-time">{formatTime(reply.reply_created_at)}</span>
                                                        </div>
                                                    </div>
                                                    <p className="comment-text tag-content-journal mb-4">{reply.content}</p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Input for new reply */}
                                        <div className="comment-input-container">
                                            <div className="comment-input-wrapper">
                                                <img src="/assets/images/avta.png" alt="Avatar" className="comment-avatar" />
                                                <input
                                                    type="text"
                                                    placeholder="Write a comment"
                                                    className="comment-input"
                                                    value={commentTexts[tag.tag_id] || ''}
                                                    onChange={(e) => handleInputChange(tag.tag_id, e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            handleSubmitComment(tag.tag_id);
                                                        }
                                                    }}
                                                />
                                                <button className="send-btn">
                                                    <svg
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => handleSubmitComment(tag.tag_id)}
                                                    >
                                                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="#000" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}
export default StudentJournal;