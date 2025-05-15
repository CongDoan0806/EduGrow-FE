import React, { useState } from 'react';

const presetColors = [
  { name: 'Blue', value: '#cfe9ff' },
  { name: 'Orange', value: '#ffe5cc' },
  { name: 'Purple', value: '#e6ccff' },
  { name: 'Green', value: '#d9f2d9' },
  { name: 'Pink', value: '#ffccf2' },
  { name: 'Yellow', value: '#ffffcc' }
];

const EventForm = ({ datetime, onAdd, onCancel }) => {
  const [title, setTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState(presetColors[0].value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    const newEvent = {
      title,
      start: datetime.start.toISOString(),
      end: datetime.end.toISOString(),
      backgroundColor: selectedColor,
      textColor: '#004080',
    };

    onAdd(newEvent);
  };

  const startDate = datetime.start instanceof Date ? datetime.start : new Date(datetime.start);
  const endDate = datetime.end instanceof Date ? datetime.end : new Date(datetime.end);

  return (
    <div className="event-form">
      <h3>Add Event</h3>
      <p><strong>From:</strong> {startDate.toLocaleString()}</p>
      <p><strong>To:</strong> {endDate.toLocaleString()}</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Choose Color:</label>
          <div className="color-picker">
            {presetColors.map((color) => (
              <div
                key={color.value}
                onClick={() => setSelectedColor(color.value)}
                className={`color-circle ${selectedColor === color.value ? 'selected' : ''}`}
                title={color.name}
                style={{ backgroundColor: color.value }}
              />
            ))}
          </div>
        </div>

        <div className="form-buttons">
          <button type="button" onClick={onCancel}>Cancel</button>
           <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
