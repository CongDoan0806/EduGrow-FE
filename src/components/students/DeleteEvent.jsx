import React, { useEffect, useRef, useState } from 'react';

const DeleteEvent = ({ eventInfo, onConfirm, onCancel, position }) => {
  const [animate, setAnimate] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!eventInfo || !position) return;

    setAnimate(false); // tắt animation cũ
    const timer = setTimeout(() => {
      setAnimate(true); // bật animation mới
    }, 10);

    return () => clearTimeout(timer);
  }, [eventInfo, position]);

  if (!eventInfo || !position) return null;

  return (
    <div
      ref={modalRef}
      className={`delete-modal ${animate ? 'fade-in' : ''}`}
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
        width: 260,
        maxWidth: '90vw',
        animation: animate ? 'fadeInScale 0.3s ease' : 'none',
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-event-title"
    >
      <p id="delete-event-title" style={{ marginBottom: '12px' }}>
        Do you want to delete event: <strong>{eventInfo.title}</strong>?
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={onCancel} className="custom-button cancel-button" type="button">
          Cancel
        </button>
        <button onClick={() => onConfirm(eventInfo)} className="custom-button delete-button" type="button">
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteEvent;
