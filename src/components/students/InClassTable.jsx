import { useState, forwardRef, useImperativeHandle } from 'react';

const InClassTable = forwardRef(({ data = [], onCellUpdate }, ref) => {
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
      self_assessment: '',
      my_difficulties: '',
      my_plan: '',
      problem_solved: 'No',
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
  skills_module: 'skills_module',
  my_lesson: 'my_lesson',
  self_assessment: 'self_assessment',
  my_difficulties: 'difficulties',
  my_plan: 'plan',
  problem_solved: 'isSolved'
};

const transformValue = (field, value) => {
  if (field === 'problem_solved') {
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
        try {
          await onCellUpdate('in_class', rowData.date, backendField, transformedValue);
        } catch (error) {
          console.error('Update failed:', error);
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

    if (field === 'problem_solved') {
      const displayValue = item[field] === 1 ? 'Yes' : item[field] === 0 ? 'No' : item[field];

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
          onClick={() => handleCellClick(rowIndex, field, displayValue)}
          style={{ cursor: 'pointer', padding: '4px', display: 'block' }}
        >
          {displayValue}
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
    getNewRows: () => {
      return newRows.map((row) => {
        const transformedRow = {};
        Object.keys(row).forEach((key) => {
          if (key === 'isNew') return;
          const backendField = fieldMapping[key] || key;
          transformedRow[backendField] = transformValue(key, row[key]);
        });
        return transformedRow;
      });
    },
    clearNewRows: () => setNewRows([]),
  }));

  return (
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
            {data.length > 0 || newRows.length > 0 ? (
              <>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{renderCell(item, index, 'date')}</td>
                    <td>{renderCell(item, index, 'skills_module')}</td>
                    <td>{renderCell(item, index, 'my_lesson')}</td>
                    <td>{renderCell(item, index, 'self_assessment')}</td>
                    <td>{renderCell(item, index, 'my_difficulties')}</td>
                    <td>{renderCell(item, index, 'my_plan')}</td>
                    <td>{renderCell(item, index, 'problem_solved')}</td>
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
                        value={row.self_assessment}
                        onChange={(e) => handleInputChange(index, 'self_assessment', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={row.my_difficulties}
                        onChange={(e) => handleInputChange(index, 'my_difficulties', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={row.my_plan}
                        onChange={(e) => handleInputChange(index, 'my_plan', e.target.value)}
                      />
                    </td>
                    <td>
                      <select
                        value={row.problem_solved}
                        onChange={(e) => handleInputChange(index, 'problem_solved', e.target.value)}
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center' }}>
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <button className="add-button" onClick={addNewRow}> + </button>
      </div>
    </div>
  );
});

export default InClassTable;
