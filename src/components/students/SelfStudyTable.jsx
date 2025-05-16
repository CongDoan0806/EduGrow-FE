import { useState, forwardRef, useImperativeHandle } from 'react';

const SelfStudyTable = forwardRef(({ data = [] }, ref) => {
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
                    <td>{formatDate(item.date)}</td>
                    <td>{item.skills_module}</td>
                    <td>{item.my_lesson}</td>
                    <td>{item.time_allocation}</td>
                    <td>{item.learning_resources}</td>
                    <td>{item.learning_activities}</td>
                    <td>{item.concentration}</td>
                    <td>{item.plan_follow}</td>
                    <td>{item.evaluation}</td>
                    <td>{item.reinforcing}</td>
                    <td>{item.notes}</td>
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
