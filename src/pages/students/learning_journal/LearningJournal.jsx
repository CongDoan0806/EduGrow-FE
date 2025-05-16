// <<<<<<< HEAD
// import './LearningJournal.css';
// import JournalInfoPanel from '../../../components/students/JournalInfoPanel';
// import InClassTable from '../../../components/students/InClassTable';
// import SelfStudyTable from '../../../components/students/SelfStudyTable';
// import Header from '../../../components/students/Header';
// import { useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// =======
//     import { useState, useEffect, useRef } from 'react';
//     import { useParams, useNavigate } from 'react-router-dom'; 
//     import axios from 'axios';
//     import './LearningJournal.css';
//     import JournalInfoPanel from '../../../components/students/learning_journal/JournalInfoPanel';
//     import InClassTable from '../../../components/students/learning_journal/InClassTable';
//     import SelfStudyTable from '../../../components/students/learning_journal/SelfStudyTable';
//     import { ToastContainer, toast } from 'react-toastify';
//     import 'react-toastify/dist/ReactToastify.css';
// >>>>>>> 479006c16ff5ae0f43ed49610e5caf991b3b1bc0

//     axios.defaults.baseURL = 'http://127.0.0.1:8000';

// function LearningJournal() {
//     const [inClassData, setInClassData] = useState([]);
//     const [selfStudyData, setSelfStudyData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const [startDateFromWeekApi, setStartDateFromWeekApi] = useState(null);
//     const [endDateFromWeekApi, setEndDateFromWeekApi] = useState(null);

//     const [startDate, setStartDate] = useState(null);
//     const [endDate, setEndDate] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);
// <<<<<<< HEAD
//     const [commentText, setCommentText] = useState('');
//     const openModal = () => setIsModalOpen(true);
//     console.log("isModalOpen:", isModalOpen); // 👈 Thêm dòng này
//     // Đóng modal khi nhấp ra ngoài
//     const handleOutsideClick = (e) => {
//         if (e.target.className === 'modal') {
//         setIsModalOpen(false);
//         }
//     };


//     const handleSubmitComment = async () => {
//         const user = JSON.parse(localStorage.getItem('user'));
//         const role = localStorage.getItem('role');
//         console.log('user:', user);
//         console.log('role:', role);

//         const payload = {
//             message: commentText,
//             learning_journal_id: 2, // Cái này khi nào ai làm cái get learnning journal thì lưu id của learnning journal vào state nha 
//             ...(role === 'teacher' ? { teacher_id: user?.teacher_id } : { student_id: user?.student_id }),

//         };

//         const endpoint = role === 'teacher'
//             ? '/api/teachers/feedback'
//             : '/api/students/feedback';

//         try {
//             const response = await axios.post(endpoint, payload, {
//                 withCredentials: true,
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 }
//             });

//             if (response.status === 200 || response.status === 201) {
//                 toast.success('Comment sent successfully!');
//             }
//         } catch (err) {
//             console.error('Error posting comment:', err.response?.data || err.message);
//             toast.error('Comment failed. Please check your information again.');   
//         }
//     };

// =======

//     const inClassRef = useRef();
//     const selfStudyRef = useRef();
//     const navigate = useNavigate();

//     const { weekId } = useParams();
//     const weekNumber = parseInt(weekId?.replace('week', ''), 10) || 1;

//      // Sửa dependency đúng chỉ là weekNumber (sửa lỗi loop)
//     useEffect(() => {
//         fetchStartAndEndDate();
//         fetchLearningJournal();
//     }, [weekNumber]);

//     // Đồng bộ ngày tuần từ API nếu chưa có startDate/endDate (lấy từ learning journal)
//     useEffect(() => {
//         if (startDateFromWeekApi && !startDate) {
//             setStartDate(startDateFromWeekApi);
//         }
//         if (endDateFromWeekApi && !endDate) {
//             setEndDate(endDateFromWeekApi);
//         }
//     }, [startDateFromWeekApi, endDateFromWeekApi, startDate, endDate]);


//     const fetchStartAndEndDate = async () => {
//     console.log(`Fetching week dates for week ${weekNumber}`); 
//     try {
//         const response = await axios.get(`/api/learning-journal/week/${weekNumber}`, {
//             headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         });


//         setStartDateFromWeekApi(response.data.start_date || null);
//         setEndDateFromWeekApi(response.data.end_date || null);
//     } catch (err) {
//         console.error('Failed to fetch start/end date:', err);
//         toast.error('Could not load week dates');
//     }
// };

//     const fetchLearningJournal = async () => {
//         try {
//             setLoading(true);
//             const response = await axios.get('/api/learning-journal', {
//                 params: { week_number: weekNumber },
//                 headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                
//             });

//             setInClassData(response.data.data?.in_class || []);
//             setSelfStudyData(response.data.data?.self_study || []);
//             setStartDate(response.data.data?.start_date || null);
//             setEndDate(response.data.data?.end_date || null);
//             setLoading(false);
//         } catch (err) {
//             toast.error('Failed to fetch learning journal data');
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleWeekChange = (change) => {
//         const newWeek = Math.max(1, Math.min(10, weekNumber + change));
//         navigate(`/learning-journal/week${newWeek}`);
//     };

//     const openModal = () => setIsModalOpen(true);

//     const handleOutsideClick = (e) => {
//         if (e.target.className === 'modal-frm') {
//             setIsModalOpen(false);
//         }
//     };

//     const validateNewRows = () => {
//         if (!startDate || !endDate) {
//             toast.error('Start date or end date is missing');
//             return false;
//         }

//         const start = new Date(startDate);
//         const end = new Date(endDate);
//         if (isNaN(start) || isNaN(end)) {
//             toast.error('Invalid start or end date');
//             return false;
//         }

//         const inClassRows = inClassRef.current.getNewRows();
//         const selfStudyRows = selfStudyRef.current.getNewRows();

//         if (inClassRows.length === 0 && selfStudyRows.length === 0) {
//             toast.error('Please add at least one row to save.');
//             return false;
//         }

//         for (let row of inClassRows) {
//             const inputDate = new Date(row.date);
//             if (isNaN(inputDate)) {
//                 toast.error('Invalid date format in In Class');
//                 return false;
//             }
//             if (inputDate < start || inputDate > end) {
//                 toast.error(`In Class date must be between ${startDate} and ${endDate}`);
//                 return false;
//             }
//             if (!row.skills_module || !row.my_lesson || !row.self_assessment || !row.my_difficulties || !row.my_plan) {
//                 toast.error('All In Class fields are required');
//                 return false;
//             }
//         }

//         for (let row of selfStudyRows) {
//             const inputDate = new Date(row.date);
//             if (isNaN(inputDate)) {
//                 toast.error('Invalid date format in Self Study');
//                 return false;
//             }
//             if (inputDate < start || inputDate > end) {
//                 toast.error(`Self Study date must be between ${startDate} and ${endDate}`);
//                 return false;
//             }
//             if (
//                 !row.skills_module ||
//                 !row.my_lesson ||
//                 !row.time_allocation ||
//                 !row.learning_resources ||
//                 !row.learning_activities ||
//                 !row.evaluation ||
//                 !row.reinforcing ||
//                 !row.notes
//             ) {
//                 toast.error('All Self Study fields are required');
//                 return false;
//             }
//         }

//         return true;
//     };

//     const handleSave = async () => {
//         if (!validateNewRows()) return;

//         const inClassRows = inClassRef.current.getNewRows();
//         const selfStudyRows = selfStudyRef.current.getNewRows();

//         const formattedInClassData = inClassRows.map((row) => ({
//             date: row.date,
//             skills_module: row.skills_module,
//             my_lesson: row.my_lesson,
//             self_assessment: row.self_assessment,
//             my_difficulties: row.my_difficulties,
//             my_plan: row.my_plan,
//             problem_solved: row.problem_solved === 'Yes',
//         }));

//         const formattedSelfStudyData = selfStudyRows.map((row) => ({
//             date: row.date,
//             skills_module: row.skills_module,
//             my_lesson: row.my_lesson,
//             time_allocation: row.time_allocation,
//             learning_resources: row.learning_resources,
//             learning_activities: row.learning_activities,
//             concentration: row.concentration === 'Yes',
//             plan_follow: row.plan_follow === 'Yes',
//             evaluation: row.evaluation,
//             reinforcing: row.reinforcing,
//             notes: row.notes,
//         }));

//         console.log('In Class Data to save:', formattedInClassData);
//         console.log('Self Study Data to save:', formattedSelfStudyData);

//         try {
//             const response = await axios.post(
//                `/api/learning-journal?week_number=${weekNumber}`,
//                 {
//                     week_number: weekNumber,
//                     in_class: formattedInClassData.length > 0 ? formattedInClassData : [],
//                     self_study: formattedSelfStudyData.length > 0 ? formattedSelfStudyData : [],
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 }
//             );

//             console.log('Response from API:', response.data);

//             if (response.data.data) {
//                 setInClassData(response.data.data.in_class || []);
//                 setSelfStudyData(response.data.data.self_study || []);
//             } else {
//                 console.log('No data returned, fetching again...');
//                 await fetchLearningJournal();
//             }

//             console.log('Payload sent:', {
//                 week_number: weekNumber,
//                 in_class: formattedInClassData,
//                 self_study: formattedSelfStudyData
//             });

//             inClassRef.current.clearNewRows();
//             selfStudyRef.current.clearNewRows();
//             toast.success('Data saved successfully');
//         } catch (error) {
//                 if (error.response) {
//                     toast.error(error.response.data.message || 'Failed to save data');
//                 } else if (error.request) {
//                     toast.error('No response from server');
//                 } else {
//                     toast.error(error.message || 'Unexpected error');
//                 }

//                 console.error(error);
//             }
//         }

//         if (loading) return <div>Loading...</div>;
//         if (error) return <div>{error}</div>;
// >>>>>>> 479006c16ff5ae0f43ed49610e5caf991b3b1bc0

//     return (
//         <div>
//             <div className='content'>
//                 <ToastContainer />
//                 <section className='journal-info-panel'>
//                     <JournalInfoPanel 
//                         weekNumber={weekNumber}
//                         startDate={startDateFromWeekApi}
//                         endDate={endDateFromWeekApi}
//                         onWeekChange={handleWeekChange}
//                         onNeedReviewClick={openModal}
//                         onSave={handleSave}
//                     />
//                 </section>
//                 <section className='in-class-table'>
//                     <InClassTable data={inClassData} ref={inClassRef} />
//                 </section>
//                 <section className='self-study-table'>
//                     <SelfStudyTable data={selfStudyData} ref={selfStudyRef} />
//                 </section> 
//             </div>

//             {isModalOpen && (
//                 <div className="modal-frm" onClick={handleOutsideClick}>
//                     <div className="modal-frm-content">
//                         <div className="modal-header">
//                             <h2 className='modal-title'>Comment</h2>
//                             <span className="close-modal-btn" onClick={() => setIsModalOpen(false)}>×</span>
//                         </div>
//                         <div className="comment-list">
//                             <div className="comment-item">
//                                 <div className='comment-container'>
//                                     <div className="comment-header">
//                                         <img src="/assets/images/avta.png" alt="Avatar" className="comment-avatar" />
//                                         <div className='comment-title'>
//                                             <div className='comment-info'>
//                                                 <span className="comment-user">Talbony student</span>
//                                                 <span className="comment-role">student</span>
//                                             </div>
//                                             <span className="comment-time">6:00AM</span>
//                                         </div>
//                                     </div>
//                                     <p className="comment-text">
//                                         <span className='tag'>@Thuy Trang </span>Could you give me some feedback on this part, please?
//                                     </p>
//                                 </div>
//                                 <div className="comment-input-container">
//                                     <div className="comment-input-wrapper">
//                                         <img src="/assets/images/avta.png" alt="Avatar" className="comment-avatar" />
//                                         <input
// <<<<<<< HEAD
//                                         type="text"
//                                         placeholder="Write a comment"
//                                         className="comment-input"
//                                         value={commentText}
//                                         onChange={(e) => setCommentText(e.target.value)}
//                                         onKeyDown={(e) => {
//                                             if (e.key === 'Enter') {
//                                                 handleSubmitComment();
//                                                 setCommentText('');
//                                             }
//                                         }}
//                                         />
//                                         <button className="send-btn">
//                                         <svg
//                                             width="20"
//                                             height="20"
//                                             viewBox="0 0 24 24"
//                                             fill="none"
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             style={{ cursor: 'pointer' }}
//                                             onClick={() => {
//                                                 handleSubmitComment();
//                                                 setCommentText('');
//                                             }}
//                                             >
//                                             <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="#000" />
//                                         </svg>

// =======
//                                             type="text"
//                                             placeholder="Write a comment"
//                                             className="comment-input"
//                                         />
//                                         <button className="send-btn" disabled>
//                                             <svg
//                                                 width="20"
//                                                 height="20"
//                                                 viewBox="0 0 24 24"
//                                                 fill="none"
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                             >
//                                                 <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="#000" />
//                                             </svg>
// >>>>>>> 479006c16ff5ae0f43ed49610e5caf991b3b1bc0
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//             <ToastContainer />
//         </div>
//     );
// }

// export default LearningJournal;