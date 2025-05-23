import React from 'react';

const GoalForm = ({ 
  showAddForm, 
  setShowAddForm, 
  newGoal, 
  handleInputChange, 
  handleAddGoal, 
  selectedSubject 
}) => {
  return (
    showAddForm && (
      <div className="add-goal-modal">
        <div className="add-goal-form">
          <h3>Add new goal for {selectedSubject}</h3>
          
          <div className="form-group">
            <label>Goal:</label>
            <textarea 
              name="content" 
              value={newGoal.content}
              onChange={handleInputChange}
              placeholder="Nhập mục tiêu của bạn"
            />
          </div>
          
          <div className="form-group">
            <label>Reward:</label>
            <input 
              type="text" 
              name="reward" 
              value={newGoal.reward}
              onChange={handleInputChange}
              placeholder="Phần thưởng khi đạt được mục tiêu"
            />
          </div>
          
          <div className="form-group">
            <label>Status:</label>
            <select
              name="status"
              value={newGoal.status}
              onChange={handleInputChange}
              disabled
            >
              <option value="pending">To do</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          
          <div className="form-actions">
            <button 
              className="cancel-button"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </button>
            <button 
              className="save-button"
              onClick={handleAddGoal}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default GoalForm;