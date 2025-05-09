import React from 'react';
import './TodayGoals.css';

const TodaysGoal = () => {
  return (
    <div className="todays-goal-container">
      <h1 className="todays-goal-title">Today's Goal</h1>
      
      <div className="todays-goal-subcontainer">
        <div classname="todays-goal-background">
            <p>Well, there are no classes today. <br /> Take a break and don’t forget to review your learning progress!</p>
            <button>Check Calendar</button>
        </div>

        <div className="img-todays-goal">
            <img src="./assets/images/pandaAtTodayGoals.png" alt="img-panda"></img>
        </div>

        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default TodaysGoal;