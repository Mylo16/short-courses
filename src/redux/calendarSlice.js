import { createSlice } from "@reduxjs/toolkit";

const initialEvents = JSON.parse(localStorage.getItem("calendarEvents")) || [];

const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: initialEvents,
  },
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
      localStorage.setItem("calendarEvents", JSON.stringify(state.events));
    },
    addEvent: (state, action) => {
      state.events.push(action.payload);
      localStorage.setItem("calendarEvents", JSON.stringify(state.events));
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter((_, index) => index !== action.payload);
      localStorage.setItem("calendarEvents", JSON.stringify(state.events));
    },
    editEvent: (state, action) => {
      const { index, updatedEvent } = action.payload;
      state.events[index] = updatedEvent;
      localStorage.setItem("calendarEvents", JSON.stringify(state.events));
    },
  },
});

export const { setEvents, addEvent, deleteEvent, editEvent } = calendarSlice.actions;
export default calendarSlice.reducer;
