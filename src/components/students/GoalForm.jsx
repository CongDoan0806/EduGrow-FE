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
    )
  );
};

export default GoalForm;