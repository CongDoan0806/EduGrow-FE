import { useState } from 'react';
import Calendar from 'react-calendar';

const TeacherCalendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="calendar-box">
      <div className="calendar-header">
        <h3>Calendar & Deadline</h3>
        <i className="fas fa-chevron-right"></i>
      </div>

     <Calendar
        onChange={setDate}
        value={date}
        className="mini-calendar"
        calendarType="gregory" // hoặc có thể bỏ luôn, vì đây là mặc định
        locale="en-GB"         // để tuần bắt đầu từ Monday
        prevLabel={null}
        nextLabel={null}
        navigationLabel={null}
        showNeighboringMonth={false}
        />


      <button className="deadline-btn">Create a new deadline</button>
    </div>
  );
};

export default TeacherCalendar;
