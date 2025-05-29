import './WeeklyGoal.css'; 

const WeeklyGoal = () => {
  return (
    <div className="container">
      <div className="weekly-goals">
        <div className="goals-title">
          <h2>Weekly<br />Goals</h2>
        </div>
        <div className="divider"></div>
        <div className="goals-content">
          <div className="goal-item">
            <img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" alt="Check Icon" />
            <p>I expect this course to understand at least 50%<br />of the listening content.</p>
          </div>
          <div className="goal-item">
            <img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" alt="Check Icon" />
            <p>I expect this course to understand at least 50%<br />of the listening content.</p>
          </div>
        </div>
        <div className="panda-image">
          <img src="/assets/images/pandaAtTodayGoals.png" alt="Panda Image" />
        </div>
      </div>
    </div>
  );
};

export default WeeklyGoal;
