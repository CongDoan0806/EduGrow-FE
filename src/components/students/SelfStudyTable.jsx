import { useState, forwardRef, useImperativeHandle } from 'react';

const SelfStudyTable = forwardRef(({ data = [], onCellUpdate }, ref) => {
  const [newRows, setNewRows] = useState([]);
  const [errors, setErrors] = useState({});
  const [editingCell, setEditingCell] = useState(null);
  const [tempValue, setTempValue] = useState('');

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const addNewRow = () => {
    const newRow = {
      date: '',
      skills_module: '',
      my_lesson: '',
      time_allocation: '',
      learning_resources: '',
      learning_activities: '',
      concentration: 'No',
      plan_follow: 'No',
      evaluation: '',
      reinforcing: '',
      notes: '',
      isNew: true,
    };
    setNewRows([...newRows, newRow]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...newRows];
    updatedRows[index] = { ...updatedRows[index], [field]: value };
    setNewRows(updatedRows);
  };

  const validateDate = (index, date) => {
    const lastDate = data.length > 0 ? new Date(data[data.length - 1].date) : null;
    const inputDate = new Date(date);
    const newErrors = { ...errors };

    if (lastDate && inputDate <= lastDate) {
      newErrors[index] = `Date must be after ${formatDate(lastDate)}`;
    } else {
      delete newErrors[index];
    }
    setErrors(newErrors);
  };

  const handleCellClick = (rowIndex, field, currentValue) => {
    if (field === 'date') return; 
    
    setEditingCell({ rowIndex, field });
    setTempValue(currentValue);
  };

  const fieldMapping = {
    'skills_module': 'skills_module', 
    'my_lesson': 'my_lesson',
    'time_allocation': 'time_allocation', 
    'learning_resources': 'learning_resources',
    'learning_activities': 'learning_activities',
    'concentration': 'isConcentration',
    'plan_follow': 'isFollowPlan', 
    'evaluation': 'evaluation',
    'reinforcing': 'reinforcing',
    'notes': 'note'
  };

  const transformValue = (field, value) => {
    if (field === 'concentration' || field === 'plan_follow') {
      return value === 'Yes' ? 1 : 0; 
    }
    return value;
  };

  const handleCellKeyPress = async (e, rowIndex, field) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const rowData = data[rowIndex];
      
      if (onCellUpdate) {
        const backendField = fieldMapping[field] || field;
        const transformedValue = transformValue(field, tempValue);
        
        console.log('Updating cell:', {
          table: 'self_study',
          date: rowData.date,
          frontendField: field,
          backendField: backendField,
          originalValue: tempValue,
          transformedValue: transformedValue
        });
        
        try {
          await onCellUpdate('self_study', rowData.date, backendField, transformedValue);
          console.log('Update successful');
        } catch (error) {
          console.error('Update failed:', error);
          console.error('Error details:', error.response?.data);
        }
      }
      
      setEditingCell(null);
      setTempValue('');
    } else if (e.key === 'Escape') {
      setEditingCell(null);
      setTempValue('');
    }
  };

  const handleCellBlur = () => {
    setEditingCell(null);
    setTempValue('');
  };

  const renderCell = (item, rowIndex, field) => {
    const isEditing = editingCell?.rowIndex === rowIndex && editingCell?.field === field;
    
    if (field === 'date') {
      return formatDate(item[field]);
    }
    
    if (field === 'concentration' || field === 'plan_follow') {
      if (isEditing) {
        return (
          <select
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onKeyDown={(e) => handleCellKeyPress(e, rowIndex, field)}
            onBlur={handleCellBlur}
            autoFocus
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        );
      }
      return (
        <span
          onClick={() => handleCellClick(rowIndex, field, item[field])}
          style={{ cursor: 'pointer', padding: '4px', display: 'block' }}
        >
          {item[field]}
        </span>
      );
    }
    
    if (isEditing) {
      return (
        <input
          type="text"
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onKeyDown={(e) => handleCellKeyPress(e, rowIndex, field)}
          onBlur={handleCellBlur}
          autoFocus
          style={{ width: '100%', border: '1px solid #ccc', padding: '4px' }}
        />
      );
    }
    
    return (
      <span
        onClick={() => handleCellClick(rowIndex, field, item[field])}
        style={{ cursor: 'pointer', padding: '4px', display: 'block' }}
      >
        {item[field]}
      </span>
    );
  };

  useImperativeHandle(ref, () => ({
    getNewRows: () => newRows,
    clearNewRows: () => setNewRows([]),
  }));

  return (
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
            {data.length > 0 || newRows.length > 0 ? (
              <>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{renderCell(item, index, 'date')}</td>
                    <td>{renderCell(item, index, 'skills_module')}</td>
                    <td>{renderCell(item, index, 'my_lesson')}</td>
                    <td>{renderCell(item, index, 'time_allocation')}</td>
                    <td>{renderCell(item, index, 'learning_resources')}</td>
                    <td>{renderCell(item, index, 'learning_activities')}</td>
                    <td>{renderCell(item, index, 'concentration')}</td>
                    <td>{renderCell(item, index, 'plan_follow')}</td>
                    <td>{renderCell(item, index, 'evaluation')}</td>
                    <td>{renderCell(item, index, 'reinforcing')}</td>
                    <td>{renderCell(item, index, 'notes')}</td>
                  </tr>
                ))}
                {newRows.map((row, index) => (
                  <tr key={`new-${index}`}>
                    <td>
                      <input
                        type="date"
                        value={row.date}
                        onChange={(e) => {
                          handleInputChange(index, 'date', e.target.value);
                          validateDate(index, e.target.value);
                        }}
                      />
                      {errors[index] && <span className="error">{errors[index]}</span>}
                    </td>
                    <td>
                      <input
                        type="text"
                        value={row.skills_module}
                        onChange={(e) => handleInputChange(index, 'skills_module', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={row.my_lesson}
                        onChange={(e) => handleInputChange(index, 'my_lesson', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={row.time_allocation}
                        onChange={(e) => handleInputChange(index, 'time_allocation', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={row.learning_resources}
                        onChange={(e) => handleInputChange(index, 'learning_resources', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={row.learning_activities}
                        onChange={(e) => handleInputChange(index, 'learning_activities', e.target.value)}
                      />
                    </td>
                    <td>
                      <select
                        value={row.concentration}
                        onChange={(e) => handleInputChange(index, 'concentration', e.target.value)}
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </td>
                    <td>
                      <select
                        value={row.plan_follow}
                        onChange={(e) => handleInputChange(index, 'plan_follow', e.target.value)}
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        value={row.evaluation}
                        onChange={(e) => handleInputChange(index, 'evaluation', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={row.reinforcing}
                        onChange={(e) => handleInputChange(index, 'reinforcing', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={row.notes}
                        onChange={(e) => handleInputChange(index, 'notes', e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan="11" style={{ textAlign: 'center' }}>
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <button className="add-button" onClick={addNewRow}>+</button>
      </div>
    </div>
  );
});

export default SelfStudyTable;