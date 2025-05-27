import React, { useEffect, useState } from 'react';
import SetGoalsSubject from '../../../components/students/SetGoalsSubject';
// import './SetGoals.css';
import Footer from '../../../components/students/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FaEdit } from 'react-icons/fa';
const StudentGoal = () => {
  const [semesterGoal, setSemesterGoal] = useState({});
  const [showDeadlineModal, setShowDeadlineModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [goalId, setGoalId] = useState(null);
  // const [isEditing, setIsEditing] = useState(false);
  // const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);
const [inputValue, setInputValue] = useState('');

  const { studentId } = useParams();
  const handleKeyDown = async (e, goalId) => {
    if (e.key === 'Enter') {
      if (!inputValue.trim()) return;

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/teachers/student-goal/${goalId}/feedback`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`  
          },
          body: JSON.stringify({ feedback: inputValue }),
        });

        if (response.ok) {
          const updatedGoals = semesterGoal.map((goal) =>
            goal.goal_id === goalId ? { ...goal, teacher_feedback: inputValue } : goal
          );
          setSemesterGoal(updatedGoals);
          console.log('asdasdasd:  ', updatedGoals);
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


  useEffect(() => {
    const fetchSemesterGoal = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/teachers/student-goal/${studentId}`, {
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
        setSemesterGoal(data.data);
        setGoalId(data.data[1]?.sg_id || null); 
      } catch (error) {
        console.error('Error fetching semester goal:', error);
      }
    };
    
    fetchSemesterGoal();
  }, [studentId]);

  console.log('Fetched semester goal:', goalId);

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
      
      const response = await fetch(`http://127.0.0.1:8000/api/teachers/student-goal/${goalId}/deadline`, {
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

      const data = await response.json();
      
      setSemesterGoal(prevGoals =>
          prevGoals.map(goal =>
            goal.sg_id === goalId
              ? { ...goal, deadline: deadlineDateTime }
              : goal
          )
        );


      handleCloseDeadlineModal();
      toast.success('Deadline đã được cập nhật thành công!');
    } catch (error) {
      console.error('Error updating deadline:', error);
      toast.error('Cập nhật deadline thất bại. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };
  console.log('Semester Goal:', semesterGoal );
  console.log('Semester Goal deadline:', semesterGoal?.[1]?.deadline );
  return (
    <div className="setgoal-page-container">
      <main className="content-wrapper">
        <p className='student-name-goal'>Student: {semesterGoal?.[1]?.student_name}</p>
        <p className='student-email-goal'>Email: {semesterGoal?.[1]?.student_email}</p>
        <section className="">
          <div className="set-goals-container">
            <div className="semester-header">
              <h2>Semester Goals</h2>
            </div>

            <div className="subject-selector">
              <div className="subject-selector-dropdown">
                <p className='goal-subject-st'>{semesterGoal?.[1]?.name}</p>
              </div>
              {semesterGoal?.[1]?.deadline ? (
                <p className="deadline">
                  Deadline: <span className="date-deadline">
                    {new Date(semesterGoal?.[1]?.deadline).toLocaleDateString('vi-VN')}
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
                  {semesterGoal.length > 0 ? (
                    semesterGoal.map((goal, index) => (
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
            <div className="modal-header">
              <h3 className="modal-title">
                <i className="bi bi-calendar-event"></i>
                Đặt Deadline
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