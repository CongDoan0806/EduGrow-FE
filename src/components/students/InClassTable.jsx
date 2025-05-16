import { useState, forwardRef, useImperativeHandle } from 'react';

const InClassTable = forwardRef(({ data = [] }, ref) => {
  const [newRows, setNewRows] = useState([]);
  const [errors, setErrors] = useState({});

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

  useImperativeHandle(ref, () => ({
    getNewRows: () => newRows,
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
                    <td>{formatDate(item.date)}</td>
                    <td>{item.skills_module}</td>
                    <td>{item.my_lesson}</td>
                    <td>{item.self_assessment}</td>
                    <td>{item.my_difficulties}</td>
                    <td>{item.my_plan}</td>
                    <td>{item.problem_solved}</td>
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