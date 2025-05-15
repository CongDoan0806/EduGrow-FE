import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './Calendar.css';

const Calendar = () => {
  const [events] = useState([
    {
      title: 'Learn toeic in 2 minutes',
      start: '2025-02-22T08:00:00',
      backgroundColor: '#cfe9ff',
      textColor: '#004080',
    },
    {
      title: 'Review code',
      start: '2025-02-22T09:00:00',
      backgroundColor: '#cfe9ff',
    },
    {
      title: 'Do laravel tasks',
      start: '2025-02-24T10:00:00',
      backgroundColor: '#cfe9ff',
    },
    {
      title: '1:1 with Jon',
      start: '2025-02-22T14:00:00',
      backgroundColor: '#ffe5cc',
      textColor: '#804000',
    },
    {
      title: 'Make script for IT English',
      start: '2025-02-26T10:00:00',
      backgroundColor: '#e6ccff',
      textColor: '#4b0082',
    },
  ]);

  return (
    <div className="calendar-wrapper">
      <div className="sidebar">
        <button className="create-btn">Create</button>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
          left: 'title',
          right: 'prev,next',
        }}

          height="auto"
          events={events}
          selectable={false}
        />
      </div>

      <div className="main-calendar">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            start: 'prev,today,next',
            center: 'title',
            end: '',
          }}
          events={events}
          allDaySlot={false}
          slotMinTime="07:00:00"
          slotMaxTime="19:00:00"
          height="auto"
        />
      </div>
    </div>
  );
};

export default Calendar;
