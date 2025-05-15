import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import EventForm from './EventForm';
import DeleteEvent from './DeleteEvent';
import './Calendar.css';

const Calendar = () => {
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Learn toeic',
      start: '2025-05-15T08:00:00',
      backgroundColor: '#cfe9ff',
      textColor: '#004080',
    },
  ]);

  const [selectedRange, setSelectedRange] = useState(null);
  const [formPosition, setFormPosition] = useState(null);
  const [deleteInfo, setDeleteInfo] = useState(null); // { event, position }

  const handleSelect = (selectInfo) => {
    const { jsEvent } = selectInfo;
    setFormPosition({ x: jsEvent.pageX, y: jsEvent.pageY });
    setSelectedRange({
      start: selectInfo.start,
      end: selectInfo.end,
    });
  };

  const handleDateClick = (arg) => {
    setFormPosition({ x: arg.jsEvent.pageX, y: arg.jsEvent.pageY });
    setSelectedRange({ start: arg.date, end: arg.date });
  };

  const addEvent = (newEvent) => {
    const eventWithId = {
      ...newEvent,
      id: String(Date.now()), // dùng string để đồng nhất kiểu
    };
    setEvents([...events, eventWithId]);
    setSelectedRange(null);
  };

  const cancelAdd = () => {
    setSelectedRange(null);
  };

  const handleEventClick = (clickInfo) => {
    const { jsEvent, event } = clickInfo;
    setDeleteInfo({
      event,
      position: { x: jsEvent.pageX, y: jsEvent.pageY },
    });
  };

  const confirmDelete = () => {
    const idToDelete = String(deleteInfo.event.id);
    setEvents(events.filter((e) => String(e.id) !== idToDelete));
    setDeleteInfo(null);
  };

  const cancelDelete = () => {
    setDeleteInfo(null);
  };

  return (
    <div className="calendar-wrapper" style={{ position: 'relative', minHeight: '700px' }}>
      <div className="calendar-sidebar">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          initialDate="2025-05-15"
          headerToolbar={{
            left: 'title',
            right: 'prev,next',
          }}
          height="auto"
          selectable={true}
          dateClick={handleDateClick}
          dayHeaderFormat={{ weekday: 'narrow' }}
          className="mini-calendar"
        />
      </div>

      <div className="calendar-main">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          initialDate="2025-05-15"
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
          selectable={true}
          select={handleSelect}
          eventClick={handleEventClick}
          className="weekly-calendar"
        />

        {selectedRange && formPosition && (
          <div
            style={{
              position: 'absolute',
              left: formPosition.x - 310,
              top: formPosition.y,
              backgroundColor: '#fff',
              boxShadow: '0 4px 8px rgba(142, 78, 201, 0.2)',
              borderRadius: '8px',
              zIndex: 9999,
              width: 200,
            }}
          >
            <EventForm
              datetime={selectedRange}
              onAdd={addEvent}
              onCancel={cancelAdd}
            />
          </div>
        )}

        {deleteInfo && (
          <DeleteEvent
            eventInfo={deleteInfo.event}
            position={deleteInfo.position}
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
          />
        )}
      </div>
    </div>
  );
};

export default Calendar;
