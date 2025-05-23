import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import GoalForm from './GoalForm';
import axios from 'axios';

const SetGoalsSubject = () => {
  const [goals, setGoals] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [semesterGoal, setSemesterGoal] = useState(null);
  const [newGoal, setNewGoal] = useState({
    subject: '',
    goal: '',
    reward: '',
    status: 'pending',
    reflection: ''
  });

  // Lấy danh sách môn học khi component được mount
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('/api/subjects', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (response.data.success && response.data.data.length > 0) {
          setSubjects(response.data.data);
          // Chọn môn học đầu tiên làm mặc định
          setSelectedSubject(response.data.data[0].subject_id);
        }
      } catch (err) {
        console.error('Lỗi khi lấy danh sách môn học:', err);
        setError('Không thể lấy danh sách môn học. Vui lòng thử lại sau.');
      }
    };

    fetchSubjects();
  }, []);

  // Lấy mục tiêu học kỳ khi selectedSubject thay đổi
  useEffect(() => {
    if (selectedSubject) {
      fetchSemesterGoals();
    }
  }, [selectedSubject]);

  const fetchSemesterGoals = async () => {
  setLoading(true);
  try {
    const response = await axios.get(`/api/semester-goals?subject_id=${selectedSubject}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (response.data.success && response.data.data.length > 0) {
      // Lấy tất cả các semester goals
      const semesterGoalsData = response.data.data;
      
      // Lấy semester goal đầu tiên để hiển thị thông tin chung
      setSemesterGoal(semesterGoalsData[0]);
      
      // Tạo mảng chứa tất cả các nội dung mục tiêu từ tất cả các semester goals
      let allGoals = [];
      
      // Duyệt qua từng semester goal và lấy các nội dung mục tiêu
      semesterGoalsData.forEach(semesterGoal => {
        if (semesterGoal.contents && semesterGoal.contents.length > 0) {
          const formattedGoals = semesterGoal.contents.map(content => ({
            id: content.goal_id,
            subject: semesterGoal.subject && semesterGoal.subject.name ? semesterGoal.subject.name : 'Không xác định',
            goal: content.content,
            reward: content.reward || '',
            status: content.status,
            reflection: content.reflect || '---',
            semester: semesterGoal.semester // Thêm thông tin học kỳ
          }));
          
          allGoals = [...allGoals, ...formattedGoals];
        }
      });
      
      setGoals(allGoals);
    } else {
      setGoals([]);
      setSemesterGoal(null);
    }
  } catch (err) {
    console.error('Lỗi khi lấy mục tiêu học kỳ:', err);
    setError('Không thể lấy mục tiêu học kỳ. Vui lòng thử lại sau.');
  } finally {
    setLoading(false);
  }
};

  const handleAddGoal = async () => {
    if (newGoal.goal.trim() === '' || newGoal.reward.trim() === '') {
      alert('Vui lòng điền đầy đủ thông tin mục tiêu và phần thưởng');
      return;
    }

    try {
      // Nếu đã có semester goal cho môn học này
      if (semesterGoal) {
        // Thêm nội dung mục tiêu mới
        const response = await axios.post('/api/semester-goals/content', {
          content: newGoal.goal,
          reward: newGoal.reward,
          status: 'pending',
          sg_id: semesterGoal.sg_id
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.data.success) {
          // Cập nhật lại danh sách mục tiêu
          fetchSemesterGoals();
        }
      } else {
        // Tạo semester goal mới nếu chưa có
        const response = await axios.post('/api/semester-goals', {
          subject_id: selectedSubject,
          semester: 'Học kỳ 1 2024-2025', // Có thể thay đổi theo nhu cầu
          deadline: new Date().toISOString().split('T')[0], // Ngày hiện tại
          contents: [
            {
              content: newGoal.goal,
              reward: newGoal.reward
            }
          ]
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.data.success) {
          // Cập nhật lại danh sách mục tiêu
          fetchSemesterGoals();
        }
      }

      // Reset form
      setShowAddForm(false);
      setNewGoal({
        subject: selectedSubject,
        goal: '',
        reward: '',
        status: 'pending',
        reflection: ''
      });
    } catch (err) {
      console.error('Lỗi khi thêm mục tiêu:', err);
      alert('Có lỗi xảy ra khi thêm mục tiêu. Vui lòng thử lại sau.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoal({
      ...newGoal,
      [name]: value
    });
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

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

  if (loading && !goals.length) {
    return <div className="loading">Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="set-goals-container">
      <div className="semester-header">
        <h2>Semester Goals</h2>
      </div>

      <div className="subject-selector">
        <div className="subject-selector-dropdown">
          <select onChange={handleSubjectChange} value={selectedSubject || ''}>
            {subjects.map(subject => (
              <option key={subject.subject_id} value={subject.subject_id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
        {semesterGoal && (
          <p className="deadline">Deadline: <span className="date-deadline">
            {new Date(semesterGoal.deadline).toLocaleDateString('vi-VN')}
          </span></p>
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
            </tr>
          </thead>
          <tbody>
            {goals.length > 0 ? (
              goals.map((goal, index) => (
                <tr className="table-row" key={goal.id}>
                  <td className="col-stt">{index + 1}</td>
                  <td className="col-goal">{goal.goal}</td>
                  <td className="col-reward">{goal.reward}</td>
                  <td className="col-status">
                    <span className={`status-badge ${getStatusClass(goal.status)}`}>
                      {getStatusText(goal.status)}
                    </span>
                  </td>
                  <td className="col-reflect">{goal.reflection}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-goals">
                  Chưa có mục tiêu nào cho môn học này. Hãy thêm mục tiêu mới!
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <button 
          className="add-goal-corner-button" 
          onClick={() => setShowAddForm(true)}
        >
          <FaPlus />
        </button>
      </div>

      <GoalForm 
        showAddForm={showAddForm}
        setShowAddForm={setShowAddForm}
        newGoal={newGoal}
        handleInputChange={handleInputChange}
        handleAddGoal={handleAddGoal}
        selectedSubject={subjects.find(s => s.subject_id === selectedSubject)?.name || ''}
      />

      <div className="add-goal-floating">
        <button 
          className="add-goal-button-mobile"
          onClick={() => setShowAddForm(true)}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default SetGoalsSubject;