const activities = [
  { color: 'blue', text: 'To Nga has set a new goal', time: '1 hour ago' },
  { color: 'purple', text: 'Kim Han has added a learning journal', time: '3 hours ago' },
  { color: 'green', text: 'Cong Doan has completed the goal', time: 'Yesterday' },
  { color: 'yellow', text: 'Van Dat tagged you in a learning journal', time: 'Yesterday' },
];

const TeacherNotify = () => {
  return (
    <div className="recent-activities">
      <h3>Recent Activities</h3>
      {activities.map((act, idx) => (
        <div className="activity" key={idx}>
          <div className="left">
            <span className={`dot ${act.color}`}></span>
            <span>{act.text}</span>
          </div>
          <span className="time">{act.time}</span>
        </div>
      ))}
      <button className="see-more-btn">See more</button>
    </div>
  );
};

export default TeacherNotify;
