import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import '@fullcalendar/core/index.css';
import '@fullcalendar/daygrid/index.css';
import '@fullcalendar/timegrid/index.css';

const StudentCalendar = () => {
  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Lịch học tập của bạn</h2>
      
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height="auto"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        events={[
          { title: 'Learn toeic', start: '2025-02-22T08:00:00' },
          { title: 'Review code', start: '2025-02-22T09:00:00' },
          { title: 'Do laravel tasks', start: '2025-02-24T10:00:00' },
          { title: 'Make script for IT English', start: '2025-02-26T10:00:00' },
          { title: '1:1 with Jon', start: '2025-02-22T14:00:00' },
        ]}
        dateClick={(info) => {
          alert(`Bạn đã nhấn vào ngày: ${info.dateStr}`);
        }}
      />
    </div>
  );
};

export default StudentCalendar;
