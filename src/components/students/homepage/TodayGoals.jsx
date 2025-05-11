import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodaysGoal = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('Token không tồn tại, vui lòng đăng nhập lại');
      setLoading(false);
      return;
    }
  
    axios.get('http://localhost:8000/api/goals', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        console.log('Dữ liệu nhận được:', response.data);
        setGoals(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Lỗi khi lấy danh sách goals:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="todays-goal-container">
      <h1 className="todays-goal-title">Today's Goal</h1>
      
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        goals.length === 0 ? (
          // Giao diện khi không có goal
          <div className="todays-goal-subcontainer" style={{ height: '300px'}}>
            <div className="todays-goal-background" style={{ height: '300px', borderRadius: '150px 0 0 150px' }}>
                <div className="content-todays-goal">
                  <p>Well, there are no classes today. <br /> Take a break and don't forget to review <br /> your learning progress!</p>
                  <button style={{backgroundColor: '#7B6ADA', color: 'white'}}>Check Calendar</button>
                </div>
            </div>

            <div className="img-todays-goal" style={{right: '9%'}}>
                <img src="./assets/images/pandaAtTodayGoals.png" alt="img-panda"></img>
            </div>

            <div className="outer-arc">
              <div className="inner-arc"></div>
            </div>
          </div>
        ) : (
          // Giao diện khi có goal
          <div className="todays-goal-subcontainer" style={{ height: '400px' }}>
            <div className="todays-goal-background" style={{ height: '400px', borderRadius: '200px 0 0 200px' }}>
                <div className="content-todays-goal">
                  <p>Today, you've got <strong>{goals.length} goals</strong>. <br /> Take it step by step, and you'll get there!</p>

                  <div className="todays-goal-list">
                    {goals.map((goal, index) => (
                      <div key={index} className="todays-goal-item">
                        <h2 className="time-goal">{goal.start_time} - {goal.end_time}</h2>
                        <h2 className="content-goal">{goal.title}</h2>
                      </div>
                    ))}
                  </div>

                  <button style={{margin: '35px 0 0 0', backgroundColor: '#7B6ADA', color: 'white'}}>Check Calendar</button>
                </div>
            </div>

            <div className="img-todays-goal" style={{right: '0', bottom: '-35px'}}>
                <img src="./assets/images/pandaAtTodayHaveGoals.png" alt="img-panda" style={{width: '320px', height: '320px'}}></img>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default TodaysGoal;