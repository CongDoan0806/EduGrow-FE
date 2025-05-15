import React from 'react';
import './Calendar.css';

const DeleteEvent = ({ eventInfo, onConfirm, onCancel, position }) => {
  return (
    <div
      className="delete-modal"
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: 10000,
        width: 240,
      }}
    >
      <p>
        Do you want to delete event: <strong>{eventInfo.title}</strong>?
      </p>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
        <button
          onClick={onCancel}
          style={{
            marginRight: 8,
            backgroundColor: '#f0f0f0',
            color: '#000',
            padding: '6px 12px',
            borderRadius: 4,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          style={{
            backgroundColor: '#ff4d4f',
            color: '#fff',
            padding: '6px 12px',
            borderRadius: 4,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteEvent;
