import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addEvent, getStudentEvents, deleteCourseEvent, getEventsForDate } from "../utils/firestoreService";

export const createEvent = createAsyncThunk('calendar/createEvent', async (eventData) => {
  return await addEvent(eventData);
});

export const fetchEvents = createAsyncThunk('calendar/fetchEvent', async (userId) => {
  return await getStudentEvents(userId);
});

export const fetchEventsForDate = createAsyncThunk('calendar/fetchEventsForDate', async ({date, studentId}) => {
  return await getEventsForDate(date, studentId);
});

export const deleteEvent = createAsyncThunk('calendar/deleteEvent', async (eventId) => {
  return await deleteCourseEvent(eventId);
});

const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [],
    eventsForDate: [],
    loading: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
      })
      .addCase(fetchEventsForDate.fulfilled, (state, action) => {
        state.eventsForDate = action.payload;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events.filter((event) => event.id !== action.payload);
      })
  }
});

export default calendarSlice.reducer;
