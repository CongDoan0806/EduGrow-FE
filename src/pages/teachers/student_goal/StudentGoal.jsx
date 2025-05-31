import React, { useEffect, useState } from 'react';
import SetGoalsSubject from '../../../components/students/SetGoalsSubject';
// import './SetGoals.css';
import Footer from '../../../components/students/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FaEdit } from 'react-icons/fa';

const StudentGoal = () => {
  const API_URL = process.env.REACT_APP_BE_URL;
  const [allGoalsData, setAllGoalsData] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [currentSubjectGoals, setCurrentSubjectGoals] = useState([]);
  const [showDeadlineModal, setShowDeadlineModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSgId, setCurrentSgId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const { studentId } = useParams();

  const handleKeyDown = async (e, goalId) => {
    if (e.key === 'Enter') {
      if (!inputValue.trim()) return;

      try {
        const response = await fetch(`${API_URL}/api/teacher/semester-goals/${goalId}/feedback`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`  
          },
          body: JSON.stringify({ feedback: inputValue }),
        });

        if (response.ok) {
          // Update both allGoalsData and currentSubjectGoals
          const updatedAllGoals = allGoalsData.map((goal) =>
            goal.goal_id === goalId ? { ...goal, teacher_feedback: inputValue } : goal
          );
          setAllGoalsData(updatedAllGoals);
          
          const updatedCurrentGoals = currentSubjectGoals.map((goal) =>
            goal.goal_id === goalId ? { ...goal, teacher_feedback: inputValue } : goal
          );
          setCurrentSubjectGoals(updatedCurrentGoals);
          
          toast.success('Gửi phản hồi thành công!');
        } else {
          toast.error('Lỗi khi gửi phản hồi lên server.');
        }
      } catch (error) {
        console.error('Error submitting feedback:', error);
        toast.error('Gửi phản hồi thất bại. Vui lòng thử lại.');
      }

      setEditingId(null);
    } else if (e.key === 'Escape') {
      setEditingId(null);
    }
  };

  const processGoalsData = (data) => {
    const uniqueSubjects = [...new Set(data.map(goal => goal.name))];
    setSubjects(uniqueSubjects);
    
    if (uniqueSubjects.length > 0 && !selectedSubject) {
      setSelectedSubject(uniqueSubjects[0]);
    }
  };

  const filterGoalsBySubject = (subjectName) => {
    const filteredGoals = allGoalsData.filter(goal => goal.name === subjectName);
    setCurrentSubjectGoals(filteredGoals);
    
    if (filteredGoals.length > 0) {
      setCurrentSgId(filteredGoals[0].sg_id);
    }
  };

  const handleSubjectChange = (e) => {
    const selectedSubjectName = e.target.value;
    setSelectedSubject(selectedSubjectName);
    filterGoalsBySubject(selectedSubjectName);
  };

  useEffect(() => {
    const fetchSemesterGoal = async () => {
      try {
        const response = await fetch(`${API_URL}/api/teacher/students/${studentId}/semester-goals`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`  
          }
        });

        if (!response.ok) { 
          throw new Error('Failed to fetch semester goal');
        }

        const data = await response.json();
        setAllGoalsData(data.data);
        processGoalsData(data.data);
      } catch (error) {
        console.error('Error fetching semester goal:', error);
      }
    };
    
    fetchSemesterGoal();
  }, [studentId]);

  useEffect(() => {
    if (selectedSubject && allGoalsData.length > 0) {
      filterGoalsBySubject(selectedSubject);
    }
  }, [selectedSubject, allGoalsData]);

  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return 'status-done';
      case 'pending':
        return 'status-progress';
      case 'failed':
        return 'status-not-started';
      default:
        return 'status-not-started';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Done';
      case 'pending':
        return 'In Progress';
      case 'failed':
        return 'Failed';
      default:
        return status;
    }
  };

  const handleOpenDeadlineModal = () => {
    setShowDeadlineModal(true);
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const timeStr = today.toTimeString().slice(0, 5);
    setSelectedDate(todayStr);
    setSelectedTime(timeStr);
  };

  const handleCloseDeadlineModal = () => {
    setShowDeadlineModal(false);
    setSelectedDate('');
    setSelectedTime('');
  };

  const handleSubmitDeadline = async () => {
    if (!selectedDate || !selectedTime) {
      alert('Vui lòng chọn ngày và giờ!');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const deadlineDateTime = `${selectedDate}T${selectedTime}:00`;
      
      const response = await fetch(`${API_URL}/api/teacher/semester-goals/${currentSgId}/deadline`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          deadline: deadlineDateTime
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update deadline');
      }

      // Update deadline in both allGoalsData and currentSubjectGoals
      const updatedAllGoals = allGoalsData.map(goal =>
        goal.sg_id === currentSgId
          ? { ...goal, deadline: deadlineDateTime }
          : goal
      );
      setAllGoalsData(updatedAllGoals);
      
      const updatedCurrentGoals = currentSubjectGoals.map(goal =>
        goal.sg_id === currentSgId
          ? { ...goal, deadline: deadlineDateTime }
          : goal
      );
      setCurrentSubjectGoals(updatedCurrentGoals);

      handleCloseDeadlineModal();
      toast.success('Deadline đã được cập nhật thành công!');
    } catch (error) {
      console.error('Error updating deadline:', error);
      toast.error('Cập nhật deadline thất bại. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get current deadline for selected subject
  const getCurrentDeadline = () => {
    return currentSubjectGoals.length > 0 ? currentSubjectGoals[0].deadline : null;
  };

  // Get student info
  const getStudentInfo = () => {
    if (allGoalsData.length > 0) {
      return {
        name: allGoalsData[0].student_name,
        email: allGoalsData[0].student_email
      };
    }
    return { name: '', email: '' };
  };

  const studentInfo = getStudentInfo();

  return (
    <div className="setgoal-page-container">
      <main className="content-wrapper">
        <p className='student-name-goal'>Student: {studentInfo.name}</p>
        <p className='student-email-goal'>Email: {studentInfo.email}</p>
        <section className="">
          <div className="set-goals-container">
            <div className="semester-header">
              <h2>Semester Goals</h2>
            </div>

            <div className="subject-selector">
              <div className="subject-selector-dropdown">
                <select 
                  value={selectedSubject} 
                  onChange={handleSubjectChange}
                  className="form-select subject-select"
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #ddd',
                    backgroundColor: '#fff',
                    fontSize: '16px',
                    cursor: 'pointer'
                  }}
                >
                  {subjects.map((subject, index) => (
                    <option key={index} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
              {getCurrentDeadline() ? (
                <p className="deadline">
                  Deadline: <span className="date-deadline">
                    {new Date(getCurrentDeadline()).toLocaleDateString('vi-VN')}
                  </span>
                </p>
              ) : (
                <p className="deadline no-deadline" onClick={handleOpenDeadlineModal} style={{ cursor: 'pointer' }}>
                  <i className="bi bi-calendar-plus" style={{ marginRight: '8px' }}></i>
                  <span className="add-deadline-text">Thêm deadline</span>
                </p>
              )}
            </div>

            <div className="goals-table">
              <table className="goals-table-content">
                <thead>
                  <tr className="table-header">
                    <th className="col-stt">STT</th>
                    <th className="col-goal">My Goals</th>
                    <th className="col-reward">Reward</th>
                    <th className="col-status">Status</th>
                    <th className="col-reflect">Reflect</th>
                    <th className="col-feedback">Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSubjectGoals.length > 0 ? (
                    currentSubjectGoals.map((goal, index) => (
                      <tr className="table-row" key={goal.goal_id}>
                        <td className="col-stt">{index + 1}</td>
                        <td className="col-goal">{goal.content}</td>
                        <td className="col-reward">{goal.reward}</td>
                        <td className="col-status">
                          <span className={`status-badge ${getStatusClass(goal.status)}`}>
                            {getStatusText(goal.status)}
                          </span>
                        </td>
                        <td className="col-reflect">{goal.reflect}</td>
                        <td className="col-feedback">
                          {goal.teacher_feedback ? (
                            <span className="feedback-text">{goal.teacher_feedback}</span>
                          ) : (
                            <>
                              {editingId !== goal.goal_id ? (
                                <span
                                  className="no-feedback"
                                  onClick={() => {
                                    setEditingId(goal.goal_id);  
                                    setInputValue(''); 
                                  }}
                                  style={{ cursor: 'pointer' }}
                                >
                                  <FaEdit />
                                </span>
                              ) : (
                                <input
                                  type="text"
                                  className="feedback-input"
                                  style={{
                                    border: 'none',
                                    outline: 'none',
                                    backgroundColor: 'transparent',
                                    borderBottom: '1px solid #ccc',
                                    padding: '4px',
                                    width: '100%',
                                  }}
                                  placeholder="Nhập phản hồi..."
                                  autoFocus
                                  value={inputValue}
                                  onChange={(e) => setInputValue(e.target.value)}
                                  onKeyDown={(e) => handleKeyDown(e, goal.goal_id)} 
                                />
                              )}
                            </>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="no-goals">
                        Chưa có mục tiêu nào cho môn học này
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      {showDeadlineModal && (
        <div className="deadline-modal-overlay" onClick={handleCloseDeadlineModal}>
          <div className="deadline-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-goal">
              <h3 className="modal-title">
                <i className="bi bi-calendar-event"></i>
                Đặt Deadline cho {selectedSubject}
              </h3>
              <button className="close-btn" onClick={handleCloseDeadlineModal}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            
            <div className="modal-body">
              <div className="datetime-container">
                <div className="date-input-group">
                  <label className="input-label">
                    <i className="bi bi-calendar3"></i>
                    Chọn ngày
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="modern-date-input"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div className="time-input-group">
                  <label className="input-label">
                    <i className="bi bi-clock"></i>
                    Chọn giờ
                  </label>
                  <input
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="modern-time-input"
                  />
                </div>
              </div>
              
              {selectedDate && selectedTime && (
                <div className="preview-deadline">
                  <div className="preview-card">
                    <i className="bi bi-info-circle"></i>
                    <div className="preview-text">
                      <strong>Deadline được đặt:</strong>
                      <br />
                      {new Date(`${selectedDate}T${selectedTime}`).toLocaleString('vi-VN', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="modal-footer">
              <button className="cancel-btn" onClick={handleCloseDeadlineModal}>
                <i className="bi bi-x-circle"></i>
                Hủy
              </button>
              <button 
                className="submit-btn" 
                onClick={handleSubmitDeadline}
                disabled={isSubmitting || !selectedDate || !selectedTime}
              >
                {isSubmitting ? (
                  <>
                    <i className="bi bi-arrow-clockwise spinning"></i>
                    Đang lưu...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle"></i>
                    Đặt Deadline
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default StudentGoal;