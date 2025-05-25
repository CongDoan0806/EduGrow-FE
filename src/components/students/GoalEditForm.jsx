import React from 'react';

const GoalEditForm = ({ 
  showEditForm, 
  setShowEditForm, 
  editingGoal, 
  handleInputChange, 
  handleUpdateGoal 
}) => {
  return (
    showEditForm && (
      <div className="edit-goal-modal">
        <div className="edit-goal-form">
          <h3>Update Goal</h3>
          
          <div className="form-group">
            <label>Goal:</label>
            <textarea 
              name="content" 
              value={editingGoal.content}
              onChange={handleInputChange}
              placeholder="Nhập mục tiêu của bạn"
            />
          </div>
          
          <div className="form-group">
            <label>Reward:</label>
            <input 
              type="text" 
              name="reward" 
              value={editingGoal.reward}
              onChange={handleInputChange}
              placeholder="Phần thưởng khi đạt được mục tiêu"
            />
          </div>
          
          <div className="form-group">
            <label>Status:</label>
            <select
              name="status"
              value={editingGoal.status}
              onChange={handleInputChange}
            >
              <option value="pending">In Progress</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          
          {(editingGoal.status === 'completed' || editingGoal.status === 'failed') && (
            <div className="form-group">
              <label>
                {editingGoal.status === 'completed' ? 'Reflection on success:' : 'Reflection on failure:'}
              </label>
              <textarea
                name="reflect"
                value={editingGoal.reflect || ''}
                onChange={handleInputChange}
                placeholder={
                  editingGoal.status === 'completed' 
                    ? "Nhập phản hồi về việc hoàn thành mục tiêu này"
                    : "Nhập phản hồi về lý do thất bại và bài học rút ra"
                }
              />
            </div>
          )}
          
          <div className="form-actions">
            <button 
              className="cancel-button"
              onClick={() => setShowEditForm(false)}
            >
              Cancel
            </button>
            <button 
              className="save-button"
              onClick={handleUpdateGoal}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default GoalEditForm;