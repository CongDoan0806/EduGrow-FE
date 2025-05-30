import React, { useState, useEffect, useRef } from 'react';

const presetColors = [
  { name: 'Blue', value: '#cfe9ff' },
  { name: 'Orange', value: '#ffe5cc' },
  { name: 'Purple', value: '#e6ccff' },
  { name: 'Green', value: '#d9f2d9' },
  { name: 'Pink', value: '#ffccf2' },
  { name: 'Yellow', value: '#ffffcc' }
];

const AddEvent = ({ datetime, onAdd, onCancel }) => {
  const [title, setTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState(presetColors[0].value);
  const initialized = useRef(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!datetime) return;

    const el = modalRef.current;
    if (el) {
      el.classList.remove('fade-in');
      void el.offsetWidth; // Trigger reflow
      el.classList.add('fade-in');
    }
  }, [datetime]);

  useEffect(() => {
    if (!initialized.current) {
      setSelectedColor(presetColors[0].value);
      initialized.current = true;
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    const newEvent = {
      title,
      start: new Date(datetime.start).toISOString(),
      end: new Date(datetime.end).toISOString(),
      color: selectedColor,
    };

    onAdd(newEvent);
  };

  if (!datetime) return null;

  const startDate = new Date(datetime.start);
  const endDate = new Date(datetime.end);

  return (
    <div ref={modalRef} className="event-form fade-in">
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

        <div style={{ marginTop: 10 }}>
          <label>Choose Color:</label>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            {presetColors.map((color) => (
              <div
                key={color.value}
                onClick={() => setSelectedColor(color.value)}
                title={color.name}
                style={{
                  backgroundColor: color.value,
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  cursor: 'pointer',
                  border: selectedColor === color.value ? '3px solid #000' : '1px solid #ccc',
                }}
              />
            ))}
          </div>
        </div>

        <div className="form-buttons" style={{ marginTop: 16 }}>
          <button type="button" onClick={onCancel}>Cancel</button>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
