
const stats = ['20+', '12+', '08+', '25+'];

export default function CourseStats (){
  return (
    <section className="stats-section">
      <div className="stat-box">
        <div className="circle-right-1"></div>
        <div className="circle-right-2"></div>
        {stats.map((item, index) => (
          <div className="stat-item" key={index}>
            <h2>{item}</h2>
            <p>Course Hours</p>
          </div>
        ))}
      </div>
    </section>
  );
};


