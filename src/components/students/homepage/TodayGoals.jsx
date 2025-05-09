import React from 'react';

const TodaysGoal = () => {
  return (
    <div className="todays-goal-container">
      <h1 className="todays-goal-title">Today's Goal</h1>
      
      //không có goal
      <div className="todays-goal-subcontainer" style={{ height: '300px'}}>
        <div className="todays-goal-background" style={{ height: '300px', borderRadius: '150px 0 0 150px' }}>
            <div className="content-todays-goal">
              <p>Well, there are no classes today. <br /> Take a break and don’t forget to review <br /> your learning progress!</p>
              <button style={{backgroundColor: '#7B6ADA', color: 'white'}}>Check Calendar</button>
            </div>
        </div>

        <div className="img-todays-goal" style={{right: '9%'}}>
            <img src="./assets/images/pandaAtTodayGoals.png" alt="img-panda"></img>
        </div>

        <div class="outer-arc">
          <div class="inner-arc"></div>
        </div>

      </div>

      //có goal
      <div className="todays-goal-subcontainer" style={{ height: '400px' }}>
        <div className="todays-goal-background" style={{ height: '400px', borderRadius: '200px 0 0 200px' }}>
            <div className="content-todays-goal">
              <p>Today, you’ve got <strong>3 goals</strong>. <br /> Take it step by step, and you’ll get there!</p>

              <div className="todays-goal-list">
                <div className="todays-goal-item">
                  <h2 className="time-goal">8:00 - 9:00 am</h2>
                  <h2 className="content-goal">Learn toeic in 1 hour</h2>
                </div>

                <div className="todays-goal-item">
                  <h2 className="time-goal">9:00 - 10:00 am</h2>
                  <h2 className="content-goal">Review Code</h2>
                </div>

                <div className="todays-goal-item">
                  <h2 className="time-goal">1:30 - 2:30 pm</h2>
                  <h2 className="content-goal">Meeting with Mr. Hai</h2>
                </div>
              </div>

              <button style={{margin: '35px 0 0 0', backgroundColor: '#7B6ADA', color: 'white'}}>Check Calendar</button>
            </div>
        </div>

        <div className="img-todays-goal" style={{right: '0', bottom: '-35px'}}>
            <img src="./assets/images/pandaAtTodayHaveGoals.png" alt="img-panda" style={{width: '320px', height: '320px'}}></img>
        </div>
      </div>
    </div>
  );
};

export default TodaysGoal;