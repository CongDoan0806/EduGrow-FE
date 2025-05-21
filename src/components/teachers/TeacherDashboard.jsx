const TeacherDashboard = () => {
  return (
    <div>
      <h2 className="dashboard-title">Overview</h2>
      <div className="overview-grid">
        {[
          { number: '01', icon: 'fa-book', label: 'Classes', green: true },
          { number: '42', icon: 'fa-user-graduate', label: 'Students' },
          { number: '4', icon: 'fa-calendar-check', label: 'Activities Today' },
          { number: '42', icon: 'fa-graduation-cap', label: 'Hepp' },
        ].map((item, i) => (
          <div className="overview-box" key={i}>
            <div className="overview-box__top">
              <span className="overview-box__number">{item.number}</span>
              <span className={`overview-box__icon-circle ${item.green ? 'green' : ''}`}>
                <i className={`fas ${item.icon}`}></i>
              </span>
            </div>
            <div className="overview-box__label">
              {item.label} <span className="overview-box__arrow">&gt;</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherDashboard;
