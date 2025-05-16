import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import './Calendar.css';
import AddEvent from '../../../components/students/AddEvent';
import DeleteEvent from '../../../components/students/DeleteEvent';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedRange, setSelectedRange] = useState(null);
  const [formPosition, setFormPosition] = useState(null);
  const [deleteInfo, setDeleteInfo] = useState(null);

  const getAuthHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });

  // Lấy danh sách sự kiện từ backend
  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/study-plans', {
        headers: getAuthHeader(),
        withCredentials: true,
      });

   const formatted = res.data.map((e) => ({
      id: String(e.id),
      title: e.title,
      start: `${e.date}T${e.start_time}`,
      end: `${e.date}T${e.end_time}`,
      backgroundColor: e.color || '#cfe9ff',
    }));

      setEvents(formatted);
    } catch (err) {
      console.error('Error fetching study plans:', err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Khi chọn vùng thời gian để tạo event
  const handleSelect = (selectInfo) => {
    const { jsEvent } = selectInfo;
    setDeleteInfo(null);
    setFormPosition({ x: jsEvent.pageX, y: jsEvent.pageY });
    setSelectedRange({ start: selectInfo.start, end: selectInfo.end });
  };

  // Khi click vào ngày trên mini calendar
  const handleDateClick = (arg) => {
    setDeleteInfo(null);
    setFormPosition({ x: arg.jsEvent.pageX, y: arg.jsEvent.pageY });
    setSelectedRange({ start: arg.date, end: arg.date });
  };

const addEvent = async (newEvent) => {
  try {
    const startDate = new Date(newEvent.start);
    const endDate = new Date(newEvent.end);

    const date = startDate.toISOString().split('T')[0];
    const start_time = startDate.toTimeString().split(' ')[0];
    const end_time = endDate.toTimeString().split(' ')[0];

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day_of_week = days[startDate.getDay()];

    const payload = {
      title: newEvent.title,
      day_of_week,
      date,
      start_time,
      end_time,
      color: newEvent.color, // ✅ Sử dụng đúng color từ EventForm
    };
    console.log('Sending payload:', payload); // THÊM DÒNG NÀY


    await axios.post('http://localhost:8000/api/study-plans', payload, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    await fetchEvents();
    setSelectedRange(null);
  } catch (error) {
    console.error('Failed to add event:', error);
  }
};

  const cancelAdd = () => setSelectedRange(null);

  // Khi click vào sự kiện để xóa
  const handleEventClick = (clickInfo) => {
    const { jsEvent, event } = clickInfo;
    setSelectedRange(null);
    setFormPosition(null);
    setDeleteInfo({
      event,
      position: { x: jsEvent.pageX, y: jsEvent.pageY },
    });
  };

  // Xác nhận xóa sự kiện
  const confirmDelete = async (eventInfo) => {
    const id = String(eventInfo.id);
    try {
      await axios.delete(`http://localhost:8000/api/study-plans/${id}`, {
        headers: getAuthHeader(),
        withCredentials: true,
      });
      setEvents((prev) => prev.filter((e) => e.id !== id));
      setDeleteInfo(null);
    } catch (err) {
      console.error('Failed to delete event:', err);
    }
  };

  const cancelDelete = () => setDeleteInfo(null);

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
            <AddEvent
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

