function JournalInfoPanel({ 
  weekNumber, 
  startDate, 
  endDate, 
  onWeekChange, 
  onNeedReviewClick,
  onSave 
}) {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="journal-info-panel">
      <div className="header-journal">
        <h2 className="title-journal">Learning Journal</h2>
        <div>
          <button className="btn-backward" onClick={() => onWeekChange(-1)}>
            <i className="backward fa-sharp fa-solid fa-backward-step"></i>
          </button>
          <span className="week-journal">Week {weekNumber}</span>
          <button className="btn-forward" onClick={() => onWeekChange(1)}>
            <i className="forward fa-sharp fa-solid fa-forward-step"></i>
          </button>
        </div>
      </div>

      <div className="content-journal">
        <p className="time-journal">
          {formatDate(startDate)}
          <span className="arrow-svg">
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="16" viewBox="0 0 60 16" fill="none">
              <path d="M0 8H54M54 8L48 2M54 8L48 14" stroke="#BFBFBF" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>
          {formatDate(endDate)}
        </p>

        <div className="button-group">
          <button className="button close-btn">Close</button>
          <button className="button save-btn" onClick={onSave}>Save</button>
          <button className="button review-btn" onClick={onNeedReviewClick}>Need review</button>
        </div>
      </div>
    </div>
  );
}

export default JournalInfoPanel;