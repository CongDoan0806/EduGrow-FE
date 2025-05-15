import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';

const SetGoalsSubject = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      subject: 'Toeic',
      goal: 'I expect this course to understand at least 50% of the listening content in each listening exercise.',
      reward: 'Travel to Japan',
      status: 'Done',
      reflection: 'I need to improve my speed in recognizing sentence components. Some complex sentences took me longer to analyze.'
    },
    {
      id: 2,
      subject: 'Toeic',
      goal: 'I expect this course to understand at least 50% of the listening content in each listening exercise.',
      reward: 'An Elsa course',
      status: 'In Progress',
      reflection: '---'
    }
  ]);

  const [selectedSubject, setSelectedSubject] = useState('Toeic');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    subject: 'Toeic',
    goal: '',
    reward: '',
    status: 'Not Started',
    reflection: ''
  });

  const handleAddGoal = () => {
    if (newGoal.goal.trim() === '' || newGoal.reward.trim() === '') {
      alert('Vui lòng điền đầy đủ thông tin mục tiêu và phần thưởng');
      return;
    }

    const updatedGoals = [
      ...goals,
      {
        id: goals.length + 1,
        ...newGoal
      }
    ];

    setGoals(updatedGoals);
    setShowAddForm(false);
    setNewGoal({
      subject: selectedSubject,
      goal: '',
      reward: '',
      status: 'Not Started',
      reflection: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoal({
      ...newGoal,
      [name]: value
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Done':
        return 'status-done';
      case 'In Progress':
        return 'status-progress';
      default:
        return 'status-not-started';
    }
  };

  return (
    <div className="set-goals-container">
      <div className="semester-header">
        <h2>Semester 1 Goals</h2>
        <button 
          className="add-goal-button" 
          onClick={() => setShowAddForm(true)}
        >
          <FaPlus />
        </button>
      </div>

      <div className="subject-selector">
        <h3>{selectedSubject}</h3>
        <p className="deadline">Deadline: <span className="date-deadline">10/02/2025</span></p>
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
            {goals
              .filter(goal => goal.subject === selectedSubject)
              .map((goal, index) => (
                <tr className="table-row" key={goal.id}>
                  <td className="col-stt">{index + 1}</td>
                  <td className="col-goal">{goal.goal}</td>
                  <td className="col-reward">{goal.reward}</td>
                  <td className="col-status">
                    <span className={`status-badge ${getStatusClass(goal.status)}`}>
                      {goal.status}
                    </span>
                  </td>
                  <td className="col-reflect">{goal.reflection}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <button 
          className="add-goal-corner-button" 
          onClick={() => setShowAddForm(true)}
        >
          <FaPlus />
        </button>
      </div>

      {showAddForm && (
        <div className="add-goal-modal">
          <div className="add-goal-form">
            <h3>Thêm mục tiêu mới cho {selectedSubject}</h3>
            
            <div className="form-group">
              <label>Mục tiêu:</label>
              <textarea 
                name="goal" 
                value={newGoal.goal}
                onChange={handleInputChange}
                placeholder="Nhập mục tiêu của bạn"
              />
            </div>
            
            <div className="form-group">
              <label>Phần thưởng:</label>
              <input 
                type="text" 
                name="reward" 
                value={newGoal.reward}
                onChange={handleInputChange}
                placeholder="Phần thưởng khi đạt được mục tiêu"
              />
            </div>
            
            <div className="form-group">
              <label>Trạng thái:</label>
              <select 
                name="status" 
                value={newGoal.status}
                onChange={handleInputChange}
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Phản ánh:</label>
              <textarea 
                name="reflection" 
                value={newGoal.reflection}
                onChange={handleInputChange}
                placeholder="Nhập phản ánh của bạn (nếu có)"
              />
            </div>
            
            <div className="form-actions">
              <button 
                className="cancel-button"
                onClick={() => setShowAddForm(false)}
              >
                Hủy
              </button>
              <button 
                className="save-button"
                onClick={handleAddGoal}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

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