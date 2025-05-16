const DeleteEvent = ({ eventInfo, onConfirm, onCancel, position }) => {
  if (!eventInfo || !position) return null;

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
        width: 260,
        maxWidth: '90vw', // tránh tràn màn hình nhỏ
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-event-title"
    >
      <p id="delete-event-title" style={{ marginBottom: '12px' }}>
        Do you want to delete event: <strong>{eventInfo.title}</strong>?
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={onCancel}
          className="custom-button cancel-button"
          tabIndex={0}
          type="button"
        >
          Cancel
        </button>
        <button
          onClick={() => onConfirm(eventInfo)}
          className="custom-button delete-button"
          tabIndex={0}
          type="button"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteEvent;
