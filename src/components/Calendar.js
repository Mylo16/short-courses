import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { addEvent, deleteEvent, editEvent } from "../redux/calendarSlice";
import '../css/calendar.css';

const AdminCalendar = ({ user }) => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.calendar.events);

  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    startTime: "",
    endTime: "",
  });

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
    setShowModal(true);
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (newEvent.title && newEvent.startTime && newEvent.endTime) {
      if (newEvent.endTime <= newEvent.startTime) {
        alert("End time must be later than start time!");
        return;
      }

      const newEventData = {
        title: newEvent.title,
        start: `${selectedDate}T${newEvent.startTime}`,
        end: `${selectedDate}T${newEvent.endTime}`,
      };
      dispatch(addEvent(newEventData));
      setNewEvent({ title: "", startTime: "", endTime: "" });
      alert("Event added successfully!");
    } else {
      alert("Please fill in all fields!");
    }
  };

  const handleEditEvent = (e) => {
    e.preventDefault();
    if (newEvent.title && newEvent.startTime && newEvent.endTime) {
      if (newEvent.endTime <= newEvent.startTime) {
          alert("End time must be later than start time!");
          return;
      }

      const updatedEvent = {
        title: newEvent.title,
        start: `${selectedDate}T${newEvent.startTime}`,
        end: `${selectedDate}T${newEvent.endTime}`,
      };
      dispatch(editEvent({ index: editingEvent, updatedEvent }));
      setEditingEvent(null);
      setNewEvent({ title: "", startTime: "", endTime: "" });
      alert("Event updated successfully!");
    }
  };

  const handleDeleteEvent = (index) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      dispatch(deleteEvent(index));
    }
  };

  const getEventsForDate = (date) => {
    return events.filter((event) => event.start.startsWith(date));
  };

  const handleEditClick = (index, event) => {
    setEditingEvent(index);
    setSelectedDate(event.start.split("T")[0]);
    setNewEvent({
      title: event.title,
      startTime: event.start.split("T")[1].slice(0, 5), // Extract time
      endTime: event.end.split("T")[1].slice(0, 5),
    });
  };

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
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
              {getEventsForDate(selectedDate).length > 0 ? (
                getEventsForDate(selectedDate).map((event, index) => (
                  <li key={index}>
                    <strong>{event.title}</strong> <br />
                    {new Date(event.start).toLocaleTimeString()} -{" "}
                    {new Date(event.end).toLocaleTimeString()}
                    <br />
                    {user === "admin" && (
                      <div>
                        <button
                          onClick={() => handleEditClick(index, event)}
                          className="edit-event-btn"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(index)}
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
              <form onSubmit={editingEvent !== null ? handleEditEvent : handleAddEvent}>
                <h3>{editingEvent !== null ? "Edit Event" : "Add New Event"}</h3>
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
                
                <button type="submit" className="save-event-btn">
                  {editingEvent !== null ? "Save Changes" : "Add Event"}
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
