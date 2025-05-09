function JournalInfoPanel ({ onNeedReviewClick }) {
  return (
    <div className="journal-info-panel">
      <div className="header-journal">
        <h2 className="title-journal">Learning Journal</h2>
        <div>
            <button className="btn-forward"><i className="forward fa-sharp fa-solid fa-forward-step"></i></button>
            <span className="week-journal">Week 1</span>
            <button className="btn-backward"><i className="backward fa-sharp fa-solid fa-backward-step"></i></button>
        </div>
      </div>
      <div className="content-journal">
        <p class="time-journal">
            29 May
            <span class="arrow-svg">
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="16" viewBox="0 0 60 16" fill="none">
                <path d="M0 8H54M54 8L48 2M54 8L48 14" stroke="#BFBFBF" stroke-width="3" stroke-linecap="round"/>
                </svg>
            </span>
            10 July
        </p>

        <div className="button-group">
          <button className="btn close-btn">Close</button>
          <button className="btn save-btn">Save</button>
          <button className="btn review-btn" onClick={onNeedReviewClick}>Need review</button>
        </div>
      </div>
    </div>
  );
};

export default JournalInfoPanel;