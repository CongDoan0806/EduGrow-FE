import { addDays, format } from "date-fns";

function JournalInfoPanel ({ onNeedReviewClick, onNextWeek, onPrevWeek, weekNumber, journalDate }) {
   console.log("onNeedReviewClick prop:", onNeedReviewClick); // Xem có undefined không
  const safeParseDate = (str) => {
  const isoString = str.replace(' ', 'T');
  return new Date(isoString);
};

let formattedDate = '';
let dateAfter7Days = '';

if (journalDate) {
  const parsedDate = safeParseDate(journalDate);

  if (!isNaN(parsedDate)) {
    formattedDate = format(parsedDate, 'dd MMM');
    dateAfter7Days = format(addDays(parsedDate, 7), 'dd MMM');
  } else {
    formattedDate = 'Invalid date';
    dateAfter7Days = '-';
  }
}
  return (
    <div className="journal-info-panel">
      <div className="header-journal">
        <h2 className="title-journal">Learning Journal</h2>
        <div>
            <button className="btn-forward" onClick={() => onNextWeek()}><i className="forward fa-sharp fa-solid fa-forward-step"></i></button>
            <span className="week-journal">Week {weekNumber}</span>
            <button className="btn-backward"onClick={() => onPrevWeek()}><i className="backward fa-sharp fa-solid fa-backward-step"></i></button>
        </div>
      </div>
      <div className="content-journal">
        <p class="time-journal">
            {formattedDate}
            <span class="arrow-svg">
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="16" viewBox="0 0 60 16" fill="none">
                <path d="M0 8H54M54 8L48 2M54 8L48 14" stroke="#BFBFBF" stroke-width="3" stroke-linecap="round"/>
                </svg>
            </span>
            {dateAfter7Days}
        </p>

        <div className="button-group">
          <button className="button close-btn">Close</button>
          <button className="button save-btn">Save</button>
          <button className="button review-btn" onClick={() => { console.log("Clicked"); onNeedReviewClick(); }}>Need review</button>
        </div>
      </div>
    </div>
  );
};

export default JournalInfoPanel;