import React from 'react';

const TodaysGoal = () => {
  return (
    <div className="todays-goal-container">
      <h1 className="todays-goal-title">Today's Goal</h1>
      
      <div className="todays-goal-subcontainer">
        <div className="todays-goal-background">
            <div className="content-todays-goal">
              <p>Well, there are no classes today. <br /> Take a break and don’t forget to review <br /> your learning progress!</p>
              <button>Check Calendar</button>
            </div>
        </div>

        <div className="img-todays-goal">
            <img src="./assets/images/pandaAtTodayGoals.png" alt="img-panda"></img>
        </div>

        <div class="outer-arc">
          <div class="inner-arc"></div>
        </div>

      </div>
    </div>
  );
};

export default TodaysGoal;