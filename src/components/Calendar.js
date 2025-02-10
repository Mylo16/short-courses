import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { createEvent, deleteEvent, fetchEvents, fetchEventsForDate } from "../redux/calendarSlice";
import '../css/calendar.css';
import { auth } from "../utils/firebaseConfig";
import { fetchCourses } from "../redux/coursesSlice";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const AdminCalendar = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { eventsOnCalendar, eventsForDate } = useSelector((state) => state.calendar);
  const { courses } = useSelector((state) => state.courses);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchEvents(auth.currentUser.uid));
  }, []);

  const handleDateClick = (arg) => {
    getEventsForDate(arg.dateStr);
    setSelectedDate(arg.dateStr);
    setShowModal(true);
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();

    if (newEvent.title && newEvent.startTime && newEvent.endTime && selectedCourse.value) {
      if (new Date(new Date(`${selectedDate}T${newEvent.endTime}:00`)) <= new Date(`${selectedDate}T${newEvent.startTime}:00`)) {
        alert("End time must be later than start time!");
        return;
      }

      if (new Date(selectedDate) < new Date()) {
        alert("Event can't be scheduled for past dates");
        return;
      }

      const newEventData = {
        title: newEvent.title,
        startTime: newEvent.startTime,
        endTime: newEvent.endTime,
        eventDate: selectedDate,
        courseId: selectedCourse.value,
      };

      await dispatch(createEvent(newEventData));
      setNewEvent({ title: "", startTime: "", endTime: "" });
      navigate(0);
    } else {
      alert("Please fill in all fields!");
    }
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      dispatch(deleteEvent(eventId));
    }
  };

  const getEventsForDate = (date) => {
    dispatch(fetchEventsForDate({ date, studentId: auth.currentUser.uid }));
  };

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={eventsOnCalendar}
        dateClick={handleDateClick}
        eventClick={(info) => {
          handleDateClick({ dateStr: info.event.startStr.split("T")[0] });
        }}
      />

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Events on {selectedDate}</h2>
            <ul>
              {eventsForDate.length > 0 ? (
                eventsForDate.map((event, index) => (
                  <li key={index}>
                    <strong>{event.title}</strong> <br />
                    {event.startTime} -{" "}
                    {event.endTime}
                    <br />
                    {user === "admin" && (
                      <div>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="delete-event-btn"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </li>
                ))
              ) : (
                <p>No events for this date.</p>
              )}
            </ul>

            {user === "admin" && (
              <form onSubmit={handleAddEvent}>
                <h3>"Add New Event</h3>
                <div className="input-ctn">
                  <label>Title</label>
                  <input
                    type="text"
                    placeholder="Event Title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    required
                  />
                </div>
                <div className="input-ctn">
                   <label>Start Time</label>
                   <input
                     type="time"
                     placeholder="Start Time"
                     value={newEvent.startTime}
                     onChange={(e) =>
                       setNewEvent({ ...newEvent, startTime: e.target.value })
                     }
                     required
                   />
                </div>
                <div className="input-ctn">
                  <label>End Time</label>
                  <input
                    type="time"
                    placeholder="End Time"
                    value={newEvent.endTime}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, endTime: e.target.value })
                    }
                    required
                  />
                </div>
                <Select
                  options={courses.map((course) => ({ value: course.id, label: course.course_name }))}
                  onChange={setSelectedCourse}
                  placeholder="Select Course"
                  className="react-select"
                />
                <button type="submit" className="save-event-btn">
                  Add Event
                </button>
              </form>
            )}

            <button onClick={() => setShowModal(false)} className="close-modal-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCalendar;
